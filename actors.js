// js/actors.js
window.Actors = {
    "customer": {
        id: "customer", name: "Customer", icon: "👤", x: 90, y: 125,
        technologies: "React.js, React Native, Swift, Kotlin, Web Crypto API, Redux, Apple Pay SDK, Google Pay API, OAuth 2.0",
        scenarios: {
            "standard_purchase": {
                forward: "The human initiates the transaction.. The client UI constructs the checkout intent and encrypts the payload for transit.",
                return: "The cycle closes at Step 13.. The UI receives a '200 OK' and renders the success screen and digital receipt."
            },
            "declined_nsf": {
                forward: "The user attempts a purchase, unaware of their low balance. The client app fires the checkout request.",
                return: "The UI receives an error payload. The app maps the Issuer's NSF code to a user-friendly 'Insufficient Funds' modal."
            },
            "fraud_block": {
                forward: "The user attempts checkout. Device fingerprinting data is collected and sent alongside the payload.",
                return: "The cycle short-circuits. The UI receives a 403 Forbidden or Fraud Block error and prompts the user to contact support."
            },
            "timeout_gateway": {
                forward: "The user clicks 'Pay'. The client app begins polling for a response.",
                return: "After 30 seconds, the client API request times out. The app renders a 'Network Error - Please Try Again' state."
            }
        }
    },
    "terminal": {
        id: "terminal", name: "Terminal", icon: "📱", x: 250, y: 125,
        technologies: "EMV Chip Firmware, Point-to-Point Encryption (P2PE), NFC/RFID Scanners, C++, WebAssembly, Hosted Fields",
        scenarios: {
            "standard_purchase": {
                forward: "The merchant's side of the handshake instantly encrypts the raw card data (P2PE).. It passes a secure parcel forward.",
                return: "Receives the final 'Approve' authorization code and triggers the physical or digital receipt generation.."
            },
            "declined_nsf": {
                forward: "Captures and encrypts the card data exactly as it would for a successful transaction. It cannot know the balance.",
                return: "Receives the Issuer's decline code. Commands the POS hardware to display 'DECLINED' and beep."
            },
            "fraud_block": {
                forward: "Passes the encrypted token and merchant metadata forward.",
                return: "Receives an immediate reversal from the Processor. Displays 'TRANSACTION CANCELLED' to the cashier."
            },
            "timeout_gateway": {
                forward: "Attempts to open a socket connection to the Gateway.",
                return: "Connection fails. Hardware logs a local timeout error and displays 'SYSTEM OFFLINE' to the user."
            }
        }
    },
    "gateway": {
        id: "gateway", name: "Gateway", icon: "🛡️", x: 410, y: 125,
        technologies: "Node.js, Go, NGINX, TLS 1.3, PCI-DSS Level 1 Vaults, HashiCorp Vault, Redis (Rate Limiting), REST/GraphQL APIs",
        scenarios: {
            "standard_purchase": {
                forward: "The secure courier transmits the data.. It tokenizes the PAN and forwards the payload over a mutual TLS connection.",
                return: "Receives the '00' success code from the Processor and formats it into standard JSON for the Terminal."
            },
            "declined_nsf": {
                forward: "Tokenizes and routes the request normally. It does not perform fund checks..",
                return: "Receives a '51' (Insufficient Funds) code from the Processor and passes it back down the chain."
            },
            "fraud_block": {
                forward: "Passes the payload to the Processor.",
                return: "Receives an instant '59' (Suspected Fraud) code back from the Processor. Halts the connection."
            },
            "timeout_gateway": {
                forward: "Attempts to transmit to the upstream Processor but fails to resolve the DNS or establish a handshake.",
                return: "Generates a 504 Gateway Timeout error internally and returns it to the Terminal immediately."
            }
        }
    },
    "processor": {
        id: "processor", name: "Processor", icon: "⚙️", x: 570, y: 125,
        technologies: "C++, Java Spring Boot, Apache Kafka, Machine Learning Pipelines (Python), ISO 8583 Translators, PostgreSQL",
        scenarios: {
            "standard_purchase": {
                forward: "The decision engine screens for fraud and translates the JSON payload into an ISO 8583 message..",
                return: "Receives the Issuer's approval, logs the transaction for the end-of-day batch settlement, and alerts the Gateway."
            },
            "declined_nsf": {
                forward: "Clears risk checks and routes the ISO 8583 message to the Acquirer.",
                return: "Logs the Issuer's decline. It does not prepare settlement instructions because no funds will move."
            },
            "fraud_block": {
                forward: "The ML risk models detect high velocity or IP anomalies. The engine short-circuits the flow here before reaching the bank..",
                return: "Aborts the transaction. Generates a decline message internally and routes it backward immediately."
            },
            "timeout_gateway": {
                forward: "The Processor is unreachable. No logic is executed.",
                return: "No logic is executed."
            }
        }
    },
    "acquirer": {
        id: "acquirer", name: "Acquirer", icon: "🏢", x: 730, y: 125,
        technologies: "IBM Mainframes, COBOL, DB2, Batch Clearing Systems, ACH Integrations, Core Banking Ledger APIs",
        scenarios: {
            "standard_purchase": {
                forward: "The merchant's bank formally submits the transaction to the shared Card Network..",
                return: "Receives approval. Absorbs the settlement risk by committing to credit the merchant's account later.."
            },
            "declined_nsf": {
                forward: "Submits the transaction to the Network normally.",
                return: "Receives the decline. No settlement liability is created. Passes the message back to the Processor."
            },
            "fraud_block": {
                forward: "The transaction never reaches the Acquirer due to the Processor's short-circuit..",
                return: "Not involved."
            },
            "timeout_gateway": {
                forward: "Not involved.",
                return: "Not involved."
            }
        }
    },
    "network": {
        id: "network", name: "Network (Rail)", icon: "🌐", x: 890, y: 125,
        technologies: "VisaNet/Mastercard Global Switches, High-Availability Fiber Networks, Distributed Routing Tables, Hardware Security Modules (HSMs)",
        scenarios: {
            "standard_purchase": {
                forward: "The shared rail analyzes the Bank Identification Number (BIN) to physically route the message globally..",
                return: "Carries the Issuer's decision back and calculates the interchange fee to be deducted during settlement.."
            },
            "declined_nsf": {
                forward: "Routes the request to the correct Issuer based on the BIN.",
                return: "Carries the 'Decline' message back to the Acquirer. No interchange fee is processed."
            },
            "fraud_block": {
                forward: "Not involved. The transaction was stopped before reaching the rail.",
                return: "Not involved."
            },
            "timeout_gateway": {
                forward: "Not involved.",
                return: "Not involved."
            }
        }
    },
    "issuer": {
        id: "issuer", name: "Issuer", icon: "🏦", x: 1050, y: 125,
        technologies: "Core Banking Systems (Temenos/Finacle), Oracle RAC, HSMs for PIN Cryptography, Ledger Databases, Fraud Detection APIs",
        scenarios: {
            "standard_purchase": {
                forward: "The customer's bank evaluates the authorization request. It is the only actor with the authority to approve..",
                return: "Places a hold on the ledger funds, generates an Authorization Code, and sends the definitive 'Yes' back down the chain.."
            },
            "declined_nsf": {
                forward: "Evaluates the request against the core banking ledger and discovers the account balance is lower than the requested amount.",
                return: "Generates an 'Insufficient Funds' code. No hold is placed. Sends the definitive 'No' backward."
            },
            "fraud_block": {
                forward: "Not involved.",
                return: "Not involved."
            },
            "timeout_gateway": {
                forward: "Not involved.",
                return: "Not involved."
            }
        }
    }
};