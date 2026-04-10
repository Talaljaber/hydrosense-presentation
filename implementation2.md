# HydroSense Jordan — Multi-Page Visualization & Animation Specification

## 1. Objective

Create a **multi-page technical explainer interface** for **HydroSense Jordan**.

The interface is for a project presentation video. It should explain the project clearly from start to finish using **separate pages/scenes**, not one single screen.

The final interface must cover:
1. the **problem**
2. the **solution overview**
3. the **full system architecture**
4. the **end-to-end leak animation**
5. the **signal processing pipeline breakdown**
6. the **AI model decision logic**
7. the **final dashboard result / impact**

This is not a production app and not a generic dashboard. It is a **structured engineering explainer** designed for screen recording.

---

## 2. Project Context

HydroSense Jordan is a **multiplexed multi-sensor leak detection system** for **plastic water pipes**.

The system uses:
- **Hydrophones**
- **Vibration sensors**
- **Multiplexer**
- **ESP32**
- **Signal processing**
- **Binary AI classification model**

Its purpose is to determine:
- **Leak**
- **No Leak**

And then report:
- **Risk**
- **Impact**
- **Confidence**
- **Channel / approximate location**

The project is tailored to plastic-pipe environments rather than the usual metal-pipe assumptions.

---

## 3. General Interface Requirements

### 3.1 Structure
The interface must be built as **separate pages or views**.

Required pages:
1. **Problem Page**
2. **Solution Overview Page**
3. **System Architecture Page**
4. **Live Process Animation Page**
5. **Signal Processing Breakdown Page**
6. **AI Model Breakdown Page**
7. **Dashboard / Impact Page**

### 3.2 Style
The design should be:
- clean
- modern
- technical
- engineering-focused
- presentation-ready
- readable for screen recording
- visually consistent across all pages

### 3.3 Implementation
Preferred stack:
- **React**
- **SVG**
- **CSS animations or Framer Motion**

All visuals should be generated in code.

Do not depend on external image files in the first version.

### 3.4 Navigation
The interface should include clear navigation between pages, such as:
- top navigation tabs
- sidebar scene list
- next / previous buttons
- page indicator

The user should be able to move through the project in presentation order.

---

## 4. Page-by-Page Requirements

# Page 1 — Problem Visualization

## Goal
Explain why HydroSense Jordan is needed.

## Purpose
This page introduces:
- water loss problem
- hidden leaks in plastic pipes
- challenge of using traditional leak detection on plastic infrastructure
- importance of local low-cost monitoring

## What to show
- a visual of a water pipe or building water network
- normal water flow with hidden loss/leak potential
- plastic-pipe context
- water waste / scarcity message
- a simple visual indication that leaks are difficult to detect

## Suggested layout
Left:
- visual illustration of pipe/building/water flow

Right:
- 3 or 4 short problem cards or bullet-style points:
  - Hidden leaks
  - Plastic pipes reduce signal clarity
  - Water loss is costly
  - Existing solutions are not ideal

## Keep it simple
Do not overload this page with statistics unless styled minimally.
This page should be a visual introduction, not a dense report.

## Labels / text ideas
- Water Loss Problem
- Hidden Pipe Leaks
- Plastic Pipe Challenge
- Harder Than Metal-Pipe Detection
- Need for Low-Cost Monitoring

---

# Page 2 — Solution Overview

## Goal
Show the big idea of the project before technical detail.

## Purpose
This page should provide a simplified system flow.

## What to show
A clean, large, simplified flow:

**Pipe Leak → Hydrophone + Vibration Sensors → Multiplexer → AI Processing → ESP32 → Dashboard**

## Requirements
- big icons / blocks
- short labels
- left-to-right flow
- minimal text
- easy to understand in 5 seconds

## Optional short support text
- Multi-sensor monitoring
- Shared processing path
- Leak / No Leak classification
- Real-time dashboard update

## Design note
This page should be simpler than the full architecture page.

---

# Page 3 — Full System Architecture

## Goal
Show the complete HydroSense architecture in one technical diagram.

## Purpose
This is the main architecture map of the project.

## Required zones

### Left zone — Physical sensing environment
Show:
- horizontal plastic pipe
- water inside the pipe
- several sensing points
- hydrophones attached near the pipe
- vibration sensors attached near the pipe

### Middle-left zone — Aggregation
Show:
- signals leaving sensors
- multiplexer block
- optional channel labels CH1 / CH2 / CH3

### Middle zone — Processing
Show:
- Raw Signal
- Filtering / Denoising
- Feature Extraction

### Middle-right zone — AI
Show:
- AI Leak Classifier
- input from features
- output decision

### Right zone — Communication and output
Show:
- ESP32
- wireless link
- remote dashboard preview

## Requirements
- this page should feel like a complete system map
- all blocks should be visible at once
- use clear arrows and labels
- visually separate physical layer from digital layer

## Required labels
- Plastic Pipe
- Hydrophone
- Vibration Sensor
- Multiplexer
- Raw Signal
- Filtering / Denoising
- Feature Extraction
- AI Leak Classifier
- ESP32
- Remote Dashboard

---

# Page 4 — Live End-to-End Process Animation

## Goal
Animate the actual system behavior from normal operation to dashboard alert.

## Purpose
This is the most dynamic and important page.

## Sequence to animate

### Scene A — Normal state
- water flows normally
- sensors are idle
- dashboard shows normal status

### Scene B — Leak starts
- a small leak appears in the pipe
- water flow is disturbed near the leak
- leak point becomes visible

### Scene C — Sensor pickup
- hydrophone detects acoustic activity
- vibration sensor detects vibration
- both sensors activate

### Scene D — Routing
- signal lines travel from sensors to multiplexer
- multiplexer selects/routes active channel

### Scene E — Processing
- signal enters the DSP pipeline
- raw waveform shown
- filtered waveform shown
- features extracted

### Scene F — Model decision
- features move into model
- model outputs:
  - Leak Detected

### Scene G — ESP32 communication
- decision moves to ESP32
- ESP32 transmits result wirelessly

### Scene H — Dashboard update
- dashboard changes from normal to alert
- risk, impact, and channel/location appear

## Requirements
- all blocks remain visible or mostly visible
- use highlight states for the active part of the flow
- keep animations readable and not too fast
- make the process understandable even without narration

---

# Page 5 — Signal Processing Breakdown

## Goal
Explain how raw sensor data becomes model-ready input.

## Purpose
This page should give a deeper look into the DSP pipeline.

## Required stages

### Stage 1 — Raw Signal
Show:
- noisy waveform
- label: Raw Signal

### Stage 2 — Filtering / Denoising
Show:
- cleaner waveform
- reduced background noise
- label: Filtering / Denoising

### Stage 3 — Feature Extraction
Show:
- waveform becomes spectrogram / MFCC / feature map
- label: Feature Extraction

## Optional support labels
- Removes noise
- Highlights useful leak patterns
- Converts signal to machine-readable features

## Visual requirement
This page should be more educational than architectural.

## Avoid
- equations
- very dense math
- academic clutter

---

# Page 6 — AI Model Breakdown

## Goal
Explain how the model makes the leak / no-leak decision.

## Purpose
This page should simplify the AI stage for viewers.

## What to show
A clear logic flow:

**Extracted Features → AI Leak Classifier → Leak / No Leak**

## Include
- input feature panel
- AI model block
- binary output
- confidence score or probability bar

## Optional text
- Binary classification
- Lightweight edge model
- Leak probability decision

## Style
- simple
- technical
- easy to explain in under 20 seconds

Do not use a complex research-style network diagram unless it still looks clean.

---

# Page 7 — Dashboard / Impact Visualization

## Goal
Show the final value of the system.

## Purpose
This page shows what the user/operator finally sees.

## Dashboard must display
- System Status
- Leak / No Leak
- Risk
- Impact
- Confidence
- Channel / approximate location

## Two states

### Normal state
- Status: Monitoring
- Leak: No
- Risk: Low
- Impact: None
- Channel: All Clear

### Alert state
- Status: Leak Detected
- Risk: Medium or High
- Impact: Moderate or Significant
- Confidence: e.g. 92%
- Channel: CH2
- Approximate Location: Pipe Segment B

## Design note
This page should feel polished and presentation-ready, with clear cards and strong contrast.

---

## 5. Animation and Motion Rules

### Preferred motion
- glow
- pulse
- path movement
- staged highlight
- waveform morphing
- wireless transmission effects
- dashboard card transitions

### Motion principles
- animate the active path
- keep inactive elements visible but subdued
- do not animate everything at once
- prioritize clarity over flashy effects

### Speed
- medium-slow
- easy to narrate over
- suitable for replay in a presentation

---

## 6. Color and State Logic

### Normal
- calm / neutral tones
- subtle glow
- dashboard in normal state

### Active sensing/processing
- brighter highlights
- visible moving signal lines
- pulsing active blocks

### Alert
- warning color accents
- red/orange emphasis for leak detection
- maintain readability

### Suggested semantics
- water = blue/cyan
- hydrophone signal = cool blue
- vibration signal = orange/amber/white
- DSP pipeline = cyan/teal
- alert = orange/red
- dashboard normal = green/neutral

---

## 7. Labels to Use Across the Interface

- Water Loss Problem
- Plastic Pipe Challenge
- HydroSense Solution
- Plastic Pipe
- Pipe Flow
- Leak Point
- Hydrophone
- Vibration Sensor
- Multiplexer
- Raw Signal
- Filtering / Denoising
- Feature Extraction
- AI Leak Classifier
- Leak / No Leak
- Confidence
- ESP32
- Remote Dashboard
- Risk
- Impact
- Channel / Location

---

## 8. Component Suggestions

Suggested React component structure:
- `ProblemPage`
- `SolutionOverviewPage`
- `ArchitecturePage`
- `ProcessAnimationPage`
- `DSPBreakdownPage`
- `ModelBreakdownPage`
- `DashboardImpactPage`
- `NavigationBar`
- `PipeSection`
- `SensorNode`
- `MultiplexerBlock`
- `DSPPipeline`
- `ModelBlock`
- `ESP32Block`
- `DashboardPanel`

---

## 9. What the Final Result Should Feel Like

The final result should feel like:
- a guided engineering presentation
- a polished capstone explainer
- a clear visualization of the HydroSense system
- something built specifically for a video walkthrough

It should not feel like:
- a generic app
- a generic dashboard
- a random animation demo
- a landing page

---

## 10. Small Implementation Prompt

Use this short prompt with this markdown file:

> Build the full multi-page HydroSense Jordan technical explainer described in the attached markdown spec. Implement it using React and SVG with separate pages for Problem, Solution Overview, Full Architecture, Live Process Animation, Signal Processing Breakdown, AI Model Breakdown, and Dashboard Impact. Generate all visuals in code, keep the design presentation-ready for screen recording, use smooth readable animations, and make the whole system easy to explain from problem to final alert.
