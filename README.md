# Agrimitra: Smart Agricultural Advisory and Monitoring System 🧑‍🌾

Agrimitra is a digital platform that combines AI-driven insights with IoT-powered monitoring to help farmers make smarter, sustainable decisions. Think of it as your friendly farm co-pilot! It continuously tracks soil health, weather conditions, and crop status, delivering real-time advisories and alerts for optimized irrigation, early pest and disease detection, and efficient resource usage. Always watching, always learning, and always ready with practical recommendations.

---

## Key Features

*   **Real-time Sensor Monitoring:** Keeps an eye on soil moisture, temperature, humidity, light, and local weather data.
*   **AI-powered Crop Health Analysis:** Predicts disease risks and provides actionable alerts to keep your crops happy.
*   **Optimized Irrigation:** Smart scheduling and control to ensure plants get just the right amount of water.
*   **Early Pest & Disease Detection:** Get prevention and treatment guidance before issues escalate.
*   **Automated Recommendations:** Resource-efficient farming made easy with intelligent suggestions.
*   **Urban Farming Support:** Special guidance for Aeroponic Towers, complete with crop-specific instructions.
*   **Garden Planning Tools:** Visual allocation and planting suggestions for your home garden.
*   **Robotic Planting Arm:** Automates seed placement and spacing for efficiency.
*   **System Status Dashboard:** End-to-end visibility of all devices and operations at a glance.

---

## System Architecture Overview

Agrimitra is built on two main pillars that work seamlessly together:

### 1. Web Application (Advisory, Planning, and Control)

This is the farmer's command center!
*   **Farmer-friendly interfaces** for crop selection, growth simulations, garden planning, and automation control.
*   **Educational modules** packed with lifecycle videos, disease risks, and solutions.
*   **Real-time dashboards** pulling live data from all your sensors and devices.

### 2. IoT & Automation Layer

The muscles and senses of Agrimitra!
*   **Sensor nodes** deployed in fields or aeroponic towers stream crucial data to the backend.
*   The **Robotic Planting Arm** executes precise planting operations based on optimized paths.
*   **Actuators** (like pumps and valves) respond to irrigation commands.

---

## Project Workflow

### Web Technologies (Website)

#### **New Farmers Section**
*   **Crop Selection:** Guided choices for soil or aeroponic setups.
*   **Disease Risk:** Forecasts and alerts to stay ahead of problems.
*   **Crop Simulation:** Visualize growth stages and project yield.

#### **Urban Farming Section (Aeroponic Tower)**
*   **Introduction:** Get started with aeroponics.
*   **How to Use:** Step-by-step guides.
*   **Crop Type:** Horizontal buttons for popular crops like:
    *   Tomato
    *   Brinjal
    *   Chili
    *   ...and more!
    *   For each crop: Detailed info, lifecycle video, common disease risks, and solutions.

#### **Gardening Section**
*   **Garden Planning:**
    *   Input garden dimensions (length × width).
    *   Specify % of area for each desired crop.
    *   Enter the number of crops to be planted.
*   **Crop Type:** Similar to urban farming, with buttons for:
    *   Tomato
    *   Brinjal
    *   Chili
    *   ...and more!
    *   For each crop: Info, lifecycle video, disease risks, and solutions.

#### **Automation Control Panel**
*   **Start/Stop Robotic Arm:** Direct control over planting operations.
*   **Irrigation Control:** Manage your watering schedules.

#### **System Status Dashboard**
*   Your central hub for monitoring all devices and operations.

### IoT & Automation

#### **Robotic Planting Arm**
*   **Create Hole:** Prepares the soil.
*   **Plant Seed:** Places the seed accurately.
*   **Cover Seed:** Cover the seed with the minimum required soil.
*   **Move Specified Distance:** Maintains optimal spacing.
*   **Repeat Cycle:** Efficiently covers your planting area.

---

## How It Works

1.  **Data Collection:** Sensors feed live data (e.g., soil moisture) to the backend via MQTT/HTTP, informing irrigation recommendations.
2.  **AI Analysis:** The AI module evaluates crop health and predicts disease risks by analyzing environmental patterns.
3.  **Dashboard Insights:** The web dashboard displays trends, alerts, and suggested actions (e.g., “Irrigate Zone 2 for 10 minutes”).
4.  **Automation in Action:** The Automation Control Panel can trigger irrigation or initiate the robotic arm for planting based on your plans.
5.  **Precise Planting:** The Robotic Planting Arm follows an optimized path to create holes, plant seeds, and maintain spacing.
6.  **Smart Layouts:** The Garden Planner takes your dimensions and crop percentages to create practical layouts and planting counts.

---

## Modules and Functionality

### New Farmers Section
*   **Guided Crop Selection:** Based on location, soil type, and setup (aeroponic vs. soil).
*   **Crop Growth Simulation:** Visualize growth stages and expected yield.
*   **Disease Risk Overview:** Preventive routines and treatment playbooks at your fingertips.

### Urban Farming (Aeroponic Tower)
*   **Step-by-step Guides:** Setup and operation manuals.
*   **Crop-specific Cards:** For tomatoes, brinjal, chili, etc.
    *   Each includes: info, lifecycle video, common diseases, detection signs, and solutions.

### Gardening Section
*   **Input-based Garden Planning:**
    *   Dimensions: length × width
    *   Percentage area per crop
    *   Number of crops to be planted
*   **Outputs:** Suggested layout, optimal spacing, seed counts, and care schedule.
*   **Crop-specific Guides:** Along with disease management tips.

### Automation Control Panel
*   **Robotic Arm Operations:** Start/Stop controls.
*   **Irrigation Controls:** Manual and automatic modes.
*   **System Status Dashboard:** Monitor sensor online/offline status, actuator states, battery levels, and active alerts.

### IoT & Robotic Planting
*   **Seed Planting Cycle:** Position → hole creation → seed drop → spacing move → repeat.
*   **Safety Features:** Interlocks and calibration routines for reliable operation.
*   **Telemetry:** For performance analytics and monitoring.

### Backend Algorithm (DAA Perspective)
*   **Design:** Grid-based path planning for planting; scheduling for irrigation tasks.
*   **Analysis:** Time and space complexity evaluations for movement and control loops.
*   **Optimization:** Minimizing travel distance, balancing workload, and reducing water usage for sustainability.

---

## Tech Stack (Indicative)

Here's a peek at the technologies powering Agrimitra:

*   **Frontend:** `React`, `Bootstrap`, `CSS` (for sleek UIs), video embedding for rich content.
*   **Backend:** `Node.js/Python`, `REST APIs`, `WebSockets` (for real-time updates).
*   **IoT:** `ESP8266`, various sensor suites (moisture, DHT, light), `MQTT/HTTP` for communication.
*   **Robotics:** Stepper/servo motors, kinematics control, path planning routines.
*   **Visualization:** Charts for sensor trends, interactive maps for layout planning, clear alert banners.

*Note: The exact stack can be adapted based on hackathon constraints and available hardware.*

---

## Getting Started

Ready to grow? Here's how to set up Agrimitra!

### Hardware Setup
1.  **Install Sensors:** Place them precisely in your soil beds or aeroponic towers.
2.  **Connect ESP32/Arduino:** Link them to your Wi-Fi and broker/server.
3.  **Wire Actuators:** Connect pumps and valves safely with relays, then test manual control.

### Software Setup
1.  **Configure Backend:** Set up environment variables (broker URL, DB credentials).
2.  **Run Backend Server:** Get it up and running; ensure devices can publish/subscribe to topics.
3.  **Launch Web App:** Sign in and select your farming mode (new farmer, urban, garden).

### First Use
1.  **Create Farm Profile:** Enter your location, crop type, and setup details.
2.  **Calibrate & Verify:** Calibrate sensors and check live data on the dashboard.
3.  **Plan Your Garden:** Use the Garden Planning tool to generate a layout.
4.  **Test Robotic Arm:** Start a small test cycle for the Robotic Arm.
5.  **Enable Auto-Irrigation:** Turn on recommendations and review alerts.

---

## 🚶 Example User Flows

Agrimitra makes farming intuitive for everyone!

### New Farmer
*   Picks “Soil Farming” → selects Tomato → views lifecycle video → enables disease alerts → follows irrigation guidance.

### Urban Farmer (Aeroponic Tower)
*   Opens “How to Use” → chooses Brinjal → watches setup video → starts nutrient cycle timer → checks tower health status.

### Gardener
*   Enters 10m × 5m dimensions → allocates 40% Tomato, 30% Chili, 30% Brinjal → gets layout and seed counts → starts planting.

### Automation
*   From the Control Panel → Starts Robotic Arm → system plants seeds at 30cm spacing → auto-stops at boundary → status shown live.

### Alerts and Recommendations
*   **Irrigation:** “Soil moisture low in Bed 3—run 8 min irrigation.”
*   **Disease Risk:** “High blight risk for Tomato due to humidity spike—apply preventive spray.”
*   **Nutrients (Aeroponic):** “EC drifting low—adjust nutrient mix.”
*   **System Health:** “Sensor Node 2 offline—check power.”

*Each alert includes clear reasoning and a suggested action to keep things practical and transparent!*

---

## Safety and Reliability

We've built Agrimitra with robustness in mind:

*   **Hardware Interlocks:** To prevent issues like overwatering and motor jams.
*   **Watchdog Timers:** Plus, fallback manual controls for peace of mind.
*   **Data Validation:** Anomaly detection on sensor readings to catch anything unusual.
*   **Versioned Configurations:** For consistent and repeatable deployments.

---

## Hackathon Deliverables (IEEE Innoquest)

For the IEEE Innoquest hackathon, we plan to deliver:

*   **Demo-ready Web Interface** featuring:
    *   New Farmers, Urban Farming, and Gardening modules.
    *   Crop info, lifecycle videos, disease risks, and solutions.
    *   Garden Planner inputs and visual outputs.
    *   Automation Control Panel (start/stop robotic arm, irrigation, status dashboard).
*   **IoT Demo:**
    *   Live sensor feed (mock or real data).
    *   Robotic Arm (executing a planting cycle or mock demo).
*   **Algorithm Report (DAA):**
    *   Problem formulation and design choices.
    *   Complexity analysis.
    *   Optimization results and trade-offs.
*   **Pitch Assets:**
    *   Presentation.
    *   Estimated impact metrics (water saved, time saved, yield improvement).

---

## Impact

Agrimitra aims to cultivate a more sustainable future:

*   **Water Savings:** Through precise, optimized irrigation.
*   **Reduced Crop Loss:** Thanks to early disease detection and prevention.
*   **Accessibility:** Making smart farming easier for new farmers and urban growers.
*   **Time-efficient Planting:** Revolutionizing with robotic automation.
*   **Scalable, Data-driven Agriculture:** For a truly sustainable food system.

---

## Future Roadmap

We're always looking ahead! Our plans include:

*   More crop models and local-language support.
*   AI powered chatbot for expert consultation.
*   Advanced disease detection using image analysis.
*   Predictive yield forecasting for better planning.
*   A mobile app with offline capabilities.
*   Integration with weather APIs for hyperlocal advisories.
*   A robotic vehicle with an integrated arm for seeding, watering and harvesting the crop

---

## Team and Acknowledgments

Built with curiosity, coffee, and a passion for sustainable agriculture. Big thanks to the IEEE Innoquest community, mentors, and fellow teams for the inspiration and feedback!

If you’d like to contribute, showcase, or integrate Agrimitra, we’re happy to collaborate!


