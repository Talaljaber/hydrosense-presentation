HydroSense Jordan — Prototype Implementation Plan
7-Day Hackathon Sprint | Acoustic Leak Detection Demo
PROTOTYPE OVERVIEW
This document defines the implementation plan for a functional, end-to-end prototype of the HydroSense Jordan leak detection system. The goal is a working demo that demonstrates the full signal-to-decision pipeline: two sensors on a metal pipe test rig, raw data streamed to a laptop, processed in real time, and visualized on a live dashboard.

The prototype is scoped for two conditions only:

Class 0 — Normal Flow: Water running, no leak
Class 1 — Leak: Small controlled crack or orifice in the pipe
This is not a production deployment. It is an engineering proof-of-concept built to validate the core technical approach within one week.

SYSTEM ARCHITECTURE
Code
┌──────────────────────────────────────────────────────────────┐
│                     HARDWARE TEST RIG                        │
│                                                              │
│   [Metal Pipe with Water Flow]                               │
│         │                  │                                 │
│   [Hydrophone]      [Vibration Sensor / Accelerometer]       │
│   (Primary CH)      (Secondary CH)                          │
│         │                  │                                 │
│         └──────┬───────────┘                                 │
│                │ Analog signals                              │
│         [Op-Amp Preamp Circuit]                              │
│                │                                             │
│           [ESP32 ADC]                                        │
│           GPIO34 (Hydrophone)                                │
│           GPIO35 (Vibration)                                 │
│                │                                             │
│         USB Serial @ 921,600 baud                            │
│         Binary struct frames                                 │
└────────────────┼─────────────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────────────┐
│                  LAPTOP — EDGE HUB (Python)                  │
│                                                              │
│  ┌──────────────────┐  deque   ┌────────────────────────┐   │
│  │ serial_reader.py │─────────►│   dsp_pipeline.py      │   │
│  │ Thread 1         │  shared  │   Thread 2             │   │
│  │                  │  buffer  │  1. Detrend            │   │
│  │ Parse frames     │          │  2. Butterworth Filter │   │
│  │ Decode int16     │          │  3. FFT + Windowing    │   │
│  │ Push to deque    │          │  4. Feature Extraction │   │
│  └──────────────────┘          └────────────┬───────────┘   │
│                                             │               │
│                                ┌────────────▼───────────┐   │
│                                │  inference_engine.py   │   │
│                                │  RandomForest.predict()│   │
│                                │  → leak / no-leak      │   │
│                                │  → confidence score    │   │
│                                └────────────┬───────────┘   │
│                                             │ JSON result   │
│                                ┌────────────▼───────────┐   │
│                                │  api_server.py         │   │
│                                │  Thread 3              │   │
│                                │  FastAPI + SSE         │   │
│                                └────────────┬───────────┘   │
└─────────────────────────────────────────────┼───────────────┘
                                              │ HTTP / SSE
                              ┌───────────────▼──────────────┐
                              │  Dashboard (Browser)         │
                              │  hydrosensejo.netlify.app    │
                              │  • Leak / No-Leak indicator  │
                              │  • Confidence score gauge    │
                              │  • Live signal waveform      │
                              │  • Recent event log          │
                              └──────────────────────────────┘
SENSOR ROLES
Sensor	Channel	Role in Prototype
Hydrophone	Primary (GPIO34)	Main acoustic detection channel. Directly comparable to the Southampton dataset's hydrophone recordings. Used as the primary feature source for the ML model.
Vibration Sensor / Accelerometer	Secondary (GPIO35)	Supplementary channel. Provides additional features and cross-sensor comparison. Not fused at model level in v1 — kept as parallel input for analysis and future improvement.
Dataset Alignment Note: The Southampton dataset (eprints 489055) was recorded using hydrophones and accelerometers on MDPE plastic pipes. Our test rig uses a metal pipe, which has different acoustic propagation properties. The dataset is used for initial pipeline development and baseline model training only. Final tuning and validation must include signal data collected from our own hardware setup under our specific pipe and sensor conditions.

FILE STRUCTURE
Code
hydrosense-jordan/
│
├── config.py                        ← Single source of truth for all constants
│
├── data/
│   ├── raw/                         ← Downloaded Southampton ZIPs (not extracted manually)
│   │   ├── Steady_state_leak_signals.zip
│   │   ├── Background_noise.zip
│   │   └── Pipe_material_characterisation.zip
│   ├── sampled/                     ← Auto-extracted subset of .mat files
│   ├── recorded/                    ← Our own hardware recordings (.csv or .npy)
│   │   ├── normal_flow/
│   │   └── leak/
│   └── features_balanced.csv        ← Final training-ready feature matrix
│
├── scripts/                         ← Offline, run-once pipeline
│   ├── 01_smart_sampler.py          ← Stratified extraction from ZIP without full unzip
│   ├── 02_feature_extractor.py      ← 4-stage DSP on sampled files → features_balanced.csv
│   └── 03_train_model.py            ← Train RF → model.pkl + scaler.pkl
│
├── models/
│   ├── random_forest_model.pkl      ← Trained classifier
│   └── scaler.pkl                   ← StandardScaler (must match training exactly)
│
├── edge_hub/                        ← Live real-time inference (runs on laptop during demo)
│   ├── serial_reader.py             ← Thread 1: read ESP32 frames → shared deque
│   ├── dsp_pipeline.py              ← Thread 2: DSP + feature extraction per window
│   ├── inference_engine.py          ← Load model, run predict(), update result_store
│   ├── api_server.py                ← Thread 3: FastAPI + SSE endpoint
│   └── main.py                      ← Orchestrator: start all threads, handle shutdown
│
├── firmware/
│   └── hydrosense_esp32/
│       ├── hydrosense_esp32.ino     ← Main sketch: ADC init, timer, serial TX
│       ├── sampler.h                ← Hardware timer ISR for exact-fs dual-channel sampling
│       └── serial_framer.h          ← Binary frame packer with sync bytes + checksum
│
├── notebooks/
│   └── pipeline_validation.ipynb    ← Visual checks: PSD, filtered signal, FFT, feature dist.
│
└── requirements.txt
config.py — Constants Reference
Python
# Sampling
FS              = 10000       # Hz — must match ESP32 timer and dataset fs
WINDOW_SIZE     = 1024        # Samples per DSP window (~102ms at 10kHz)
HOP_SIZE        = 512         # 50% overlap between windows

# Butterworth Bandpass Filter
FILTER_LOW_HZ   = 100         # Hz — low cutoff (removes DC drift and very low rumble)
FILTER_HIGH_HZ  = 4000        # Hz — high cutoff (leak acoustic energy band for plastic/metal)
FILTER_ORDER    = 4

# Serial
SERIAL_PORT     = "COM3"      # Update to match your OS (e.g. /dev/ttyUSB0 on Linux)
BAUD_RATE       = 921600

# Inference
CONFIDENCE_THRESHOLD = 0.80   # Minimum confidence to trigger LEAK alert

# Paths
MODEL_PATH      = "models/random_forest_model.pkl"
SCALER_PATH     = "models/scaler.pkl"
FEATURES_PATH   = "data/features_balanced.csv"
DAY-BY-DAY SPRINT ROADMAP
📅 DAY 1 — Environment Setup & Smart Dataset Extraction
Objective: Python environment ready, Southampton dataset subset extracted, config.py defined.

Tasks:

 Create GitHub repository with the file structure above
 Install dependencies: numpy scipy scikit-learn pandas matplotlib pyserial fastapi uvicorn joblib h5py
 Download all three Southampton ZIP archives — do not extract manually
 Define config.py with all constants above
 Write and run scripts/01_smart_sampler.py:
Opens ZIPs in-memory using zipfile.ZipFile — no full extraction
Lists all .mat file paths, groups by subdirectory (each subdirectory = one condition class)
Performs stratified random sampling: selects 10 files per class
Extracts only the selected files to data/sampled/
Expected runtime: under 5 minutes on a standard laptop
End-of-Day Check: data/sampled/ contains a small, balanced set of .mat files with even class representation.

📅 DAY 2 — DSP Pipeline on Dataset
Objective: Run all 4 signal processing stages on the sampled files and produce features_balanced.csv.

Tasks:

 Write scripts/02_feature_extractor.py implementing the 4-stage pipeline:
Stage 1 — Pre-processing:

Load each .mat file using scipy.io.loadmat()
Extract hydrophone channel (primary) and accelerometer channel (secondary)
Apply scipy.signal.detrend() to remove DC offset
Assert that file fs matches config.FS
Stage 2 — Pipe Characterisation:

Load MDPE ring files from Pipe_material_characterisation.zip
Compute PSD using scipy.signal.welch()
Use PSD to confirm or adjust FILTER_LOW_HZ / FILTER_HIGH_HZ in config.py
Stage 3 — Signal Processing:

Design Butterworth bandpass filter: scipy.signal.butter(N, [low, high], btype='band', fs=FS, output='sos')
Apply with scipy.signal.sosfiltfilt() (zero-phase, no temporal distortion)
Apply Hann window to each WINDOW_SIZE frame
Compute FFT: np.fft.rfft()
Stage 4 — Feature Extraction:

Domain	Features Extracted
Time Domain	RMS, Peak Amplitude, Crest Factor, Kurtosis, Skewness, Zero-Crossing Rate
Frequency Domain	Spectral Centroid, Spectral Bandwidth, Spectral Rolloff, Top-5 FFT magnitude bins
Cross-Sensor	Pearson Correlation (hydrophone vs. accelerometer), Time Delay of Arrival (TDOA via cross-correlation)
 Run with concurrent.futures.ProcessPoolExecutor(max_workers=4) for speed
 Output: data/features_balanced.csv with label column leak (0 or 1)
 Open notebooks/pipeline_validation.ipynb and visually verify:
Raw vs. detrended signal
PSD before and after filtering
FFT showing frequency content difference between leak and no-leak conditions
End-of-Day Check: features_balanced.csv exists, classes are balanced, no NaN values.

📅 DAY 3 — Model Training & Validation
Objective: Trained, serialized random_forest_model.pkl with measurable classification accuracy.

Tasks:

 Write scripts/03_train_model.py:
Load features_balanced.csv
Fit StandardScaler on training set only → save scaler.pkl
Train RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42)
Evaluate with StratifiedKFold(n_splits=5) cross-validation
Print: accuracy, F1-score, confusion matrix
Save models/random_forest_model.pkl
 Check model.predict_proba() runtime: must be < 5ms per window on your laptop
 Plot feature importances — note top 10 features driving the decision
Important: The model trained here is a baseline trained on Southampton data (MDPE plastic pipes, lab conditions). It will likely need re-tuning once hardware data from our metal pipe rig is collected on Day 4. This is expected and normal.

End-of-Day Check: Model serialized, cross-validation F1 > 0.80 on Southampton data subset.

📅 DAY 4 — ESP32 Firmware
Objective: ESP32 streams clean, binary-framed dual-channel acoustic data to the laptop over USB serial.

Tasks:

 Write firmware/hydrosense_esp32/sampler.h:

Uses hw_timer_t hardware timer interrupt to trigger ADC reads at exactly config.FS Hz
Reads GPIO34 (hydrophone) and GPIO35 (vibration sensor) on each tick
Stores samples in a ping-pong double buffer to prevent read/write conflicts between ISR and main loop
 Write firmware/hydrosense_esp32/serial_framer.h:

Packs samples into binary frames: [0xAA][0xBB][int16 hydro][int16 vib][XOR checksum][0xFF]
Sync bytes 0xAA 0xBB allow the PC-side reader to re-lock framing after any interruption
XOR checksum covers both sample bytes
 Write firmware/hydrosense_esp32/hydrosense_esp32.ino:

Initialize both ADC pins
Start hardware timer at FS Hz
Main loop: when double-buffer is ready, call framer and transmit over Serial at 921,600 baud
 Hardware assembly on test rig:

Mount hydrophone in contact with metal pipe (water-side or pipe wall)
Mount accelerometer/vibration sensor on pipe exterior
Connect both sensors through op-amp preamp → ESP32 ADC pins
Verify signal levels stay within ESP32 ADC range (0–3.3V)
 Calibration test:

Open laptop serial monitor, confirm sync bytes are visible
Run normal flow: observe signal on both channels
Simulate leak (small valve, crack, or controlled orifice): confirm signal change is visible
Record 2–3 minutes of both conditions as .csv using a simple Python logger → save to data/recorded/
End-of-Day Check: ESP32 streams stable binary frames at 10 kHz. Both conditions produce visually distinct signal signatures.

📅 DAY 5 — Real-Time Edge Hub (Laptop Inference Engine)
Objective: Running Python script that reads the ESP32 stream, runs the full DSP + ML pipeline, and updates a shared result in real time.

Tasks:

 Write edge_hub/serial_reader.py (Thread 1):

Opens serial port from config.SERIAL_PORT at config.BAUD_RATE
Scans byte stream for 0xAA 0xBB sync bytes — re-locks automatically on desync
Validates XOR checksum on each frame; drops corrupted frames silently
Decodes int16 → float32 normalized samples
Pushes to collections.deque(maxlen=WINDOW_SIZE * 8) — circular, thread-safe buffer
 Write edge_hub/dsp_pipeline.py (Thread 2):

Waits until deque contains ≥ WINDOW_SIZE samples
Pulls a WINDOW_SIZE slice with HOP_SIZE overlap (50%)
Runs Stages 1–4 using identical parameters as training in config.py
Returns a np.array of shape (1, n_features) — exact same feature set as training
 Write edge_hub/inference_engine.py:

Loads model.pkl and scaler.pkl at startup using joblib.load()
Accepts feature vector from dsp_pipeline
Runs scaler.transform() → model.predict_proba()
Returns: {"leak_detected": bool, "confidence": float, "timestamp": str}
Writes result to result_store dict protected by threading.Lock()
 Re-tune model with hardware data:

Use the .csv recordings from Day 4 (data/recorded/)
Run same feature extractor (02_feature_extractor.py) on hardware recordings
Append to features_balanced.csv, retrain model
Verify inference accuracy improves on conditions matching the real test rig
End-of-Day Check: main.py (partially wired) prints live classification results to console. Leak simulation causes leak_detected: true reliably.

📅 DAY 6 — API Server & Dashboard Integration
Objective: Live dashboard in the browser shows real-time leak status fed directly from the ESP32.

Tasks:

 Write edge_hub/api_server.py (Thread 3):
FastAPI application with the following endpoints:
Endpoint	Method	Returns
/status	GET	Latest result_store JSON (for polling fallback)
/stream	GET	Server-Sent Events (SSE) — pushes every new inference result
/health	GET	{"serial_connected": bool, "model_loaded": bool}
Add CORS middleware permitting https://hydrosensejo.netlify.app

SSE format: data: {"leak_detected": true, "confidence": 0.91, "timestamp": "..."}\n\n

 Write edge_hub/main.py:

Instantiates and starts all 3 threads
Handles KeyboardInterrupt gracefully — closes serial port, stops threads cleanly
Prints color-coded status to console on each inference: 🔴 LEAK / 🟢 CLEAR
 Update Netlify frontend to consume the SSE stream:

Connect via EventSource('http://LAPTOP_IP:8000/stream')
Display leak/no-leak status with clear visual indicator (color change + label)
Display confidence score as a percentage gauge
Display scrolling live waveform (hydrophone channel, last 1 second of raw samples)
Display a timestamped event log of recent detections
 Full end-to-end test on local network: ESP32 → laptop → browser on a second device

End-of-Day Check: Dashboard updates live in browser. Leak simulation triggers a visible alert within 1 second.

📅 DAY 7 — Integration Testing & Demo Preparation
Objective: A reliable, rehearsed demo that works consistently under presentation conditions.

Tasks:

Morning — Testing:

 Run 60-minute continuous streaming test — check for serial desync or buffer overflow
 Run 20 controlled leak / no-leak transitions — record hit rate
 Adjust config.CONFIDENCE_THRESHOLD if needed based on observed distribution
 Verify dashboard refreshes within 1 second of physical event on a second device
Afternoon — Polish & Failsafe:

 Write startup.bat / startup.sh — single command to launch everything:
bash
python edge_hub/main.py --port COM3 --baud 921600
 Implement --demo-mode flag in main.py:
Replays a pre-recorded hardware session from data/recorded/
Simulates live stream timing at real fs
Use this if ESP32 or serial connection fails during the actual presentation
 Prepare a clean recording of a successful detection run as a backup video
 Rehearse the full demo sequence 3 times:
Start system, show CLEAR baseline with normal flow
Open leak valve / introduce crack
Dashboard transitions to LEAK alert with confidence score
Close leak, system returns to CLEAR
FILES TO WRITE (Priority Order)
#	File	Day	Lang	Description
1	config.py	1	Python	All shared constants — fs, filter bounds, paths, thresholds
2	scripts/01_smart_sampler.py	1	Python	Stratified ZIP sampling — no full extraction
3	scripts/02_feature_extractor.py	2	Python	4-stage DSP → features_balanced.csv
4	scripts/03_train_model.py	3	Python	RF training + evaluation → model.pkl, scaler.pkl
5	firmware/sampler.h	4	C++	Hardware timer ISR, dual-channel ADC, ping-pong buffer
6	firmware/serial_framer.h	4	C++	Binary frame packer with sync bytes and XOR checksum
7	firmware/hydrosense_esp32.ino	4	C++	Main sketch: ADC init, timer start, serial TX loop
8	edge_hub/serial_reader.py	5	Python	Thread 1: parse frames, decode samples, push to deque
9	edge_hub/dsp_pipeline.py	5	Python	Thread 2: live 4-stage DSP → feature vector per window
10	edge_hub/inference_engine.py	5	Python	Load model, transform, predict, update result_store
11	edge_hub/api_server.py	6	Python	Thread 3: FastAPI + SSE endpoint
12	edge_hub/main.py	6	Python	Orchestrator: wire threads, graceful shutdown, CLI args
13	frontend/stream_client.js	6	JavaScript	SSE consumer → update dashboard widgets
RISK REGISTER
Risk	Likelihood	Impact	Mitigation
Model trained on MDPE plastic data underperforms on metal pipe rig	High	High	Expected. Collect hardware recordings on Day 4 and retrain. Treat Southampton data as bootstrap only.
ESP32 ADC noise or signal saturation	Medium	High	Use GPIO34–39 (input-only, most linear). Add hardware RC low-pass filter before ADC pin. Verify voltage range with oscilloscope or multimeter before connecting.
Serial desync during live demo	Medium	High	Sync byte sequence 0xAA 0xBB + auto-relock loop in serial_reader.py. System recovers within one dropped frame.
Feature mismatch between training and inference	Medium	Critical	config.py is the single source of truth. Training and inference both import from it. Never hardcode filter or window values in two places.
Laptop firewall blocks browser SSE connection	Low	Medium	Test CORS and local firewall on Day 6. Use mobile hotspot to put both devices on same LAN if needed.
Hardware failure at presentation	Low	Critical	--demo-mode flag in main.py replays a pre-recorded session. Backup video of a clean run as final fallback.
WHAT THIS PROTOTYPE DEMONSTRATES
Capability	Status in Prototype
Dual-sensor acoustic acquisition	✅ Hydrophone + vibration sensor, both channels live
Real-time USB serial streaming	✅ Binary-framed, 10 kHz, reliable sync
4-stage DSP pipeline on laptop	✅ Detrend → Butterworth → FFT → Feature extraction
Binary ML classification	✅ Random Forest, leak vs. no-leak, confidence score
Live dashboard with visual alert	✅ SSE-fed, sub-second latency, browser-based
Use of reference dataset	✅ Southampton eprints 489055 for bootstrap training
Hardware-tuned model	✅ Retrained on Day 4/5 using own pipe recordings