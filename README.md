<!-- README.md -->
# Payment Process Simulation

> **"Payments are always a round trip, never a one-way message."**

## 🎯 The Mission
The **Payment Process Simulation** is an interactive, educational environment built specifically for the **African Tech Academy (ATA)** engineering track. 

The core challenge for any new fintech engineer is the "Black Box" problem—understanding how a customer tap on a POS machine evolves into a global sequence of authorization, risk screening, and settlement. This simulation was created to provide a **holistic visual mental model** of the entire 13-step payment cycle before diving into the complex technical implementation of APIs, ISO 8583 standards, and ledger reconciliation and the technical tools

## 🧠 Why This Matters
For students of the ATA engineering track, this tool serves as a foundational pedagogical layer. It allows you to:
* **Visualize the Flow**: Watch data packets move in real-time, distinguishing between the **Forward Leg** (Request for Permission) and the **Return Leg** (The Answer Comes Back)..
* **Study System Failures**: Use the Chaos Engine to trigger real-world failures (e.g., fraud blocks, timeouts) to observe how systems short-circuit and reverse..
* **Understand the Architecture**: Click on any actor—from the Terminal to the Issuer—to access deep, context-aware engineering documentation tailored to the specific scenario being simulated..

---

## 🏗️ Architectural Deep Dive
The simulation models the 7 critical actors in the payment ecosystem as defined in the *Fintech Engineering Track* curriculum..

| Actor | Engineering Role | Key Focus |
| :--- | :--- | :--- |
| **👤 Customer** | Initiator | Payload construction and UI feedback.. |
| **📱 Terminal** | Data Capture | Point-to-Point Encryption (P2PE) and EMV security.. |
| **🛡️ Gateway** | Secure Courier | Tokenization and TLS transmission.. |
| **⚙️ Processor** | Decision Engine | ISO 8583 logic and Fraud/Risk ML models.. |
| **🏢 Acquirer** | Merchant's Bank | Settlement risk management and DDA handling.. |
| **🌐 Network** | The Rail | Global routing (BIN lookups) and interchange rules.. |
| **🏦 Issuer** | Customer's Bank | Ledger balance verification and definitive authorization |

---

## 🛠️ Engineering Tech Stack
This project is built as a pure, high-performance simulation engine:
* **Core**: Vanilla JavaScript (ES6+), HTML5, CSS3.
* **Visualization**: Custom SVG engine with Web Animations API for fluid packet movement.
* **Design System**: A Payaza-inspired light-theme interface designed for readability and professional aesthetics.
* **Educational Engine**: A custom-built, context-aware content router that adapts copy dynamically based on the transaction direction (Forward vs. Return).

---

## 🚀 Getting Started
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Select a scenario (e.g., *Blocked: Fraud Detected*) to observe how different ecosystem actors handle specific failure cases.

---

## 🎓 For the ATA Community
This project is dedicated to the engineers of **ATA Cohort 1** and all future cohorts. By mastering the payment lifecycle visually, you are better equipped to build the next generation of resilient, high-scale financial infrastructure for Africa.

**Built by Akinyeke Micheal**
*   *Student: ATA (African Tech Academy) Cohort 1 Engineering Track*
*   *Copyright © 2026. All rights reserved.*

> *Payments are complex, but they don't have to be opaque. Let's build.*