// js/actors.js
window.Actors = {
    "customer": {
        id: "customer", name: "Customer", icon: "👤", x: 50, y: 150,
        beginner: "The person buying goods or services.",
        intermediate: "The cardholder initiating the transaction via a UI.",
        engineering: "Client application (web/mobile) constructing the initial payment intent. Responsibilities: Client-side validation, capturing input securely, interacting with browser APIs like Apple Pay.",
        technologies: "Browser, Mobile OS, Web Crypto API",
        failures: "Browser timeout, network drop, user abort."
    },
    "merchant": {
        id: "merchant", name: "Merchant", icon: "🏪", x: 250, y: 150,
        beginner: "The business selling the product.",
        intermediate: "The entity receiving the payment, managing their own backend state.",
        engineering: "Merchant backend server generating client secrets, validating webhooks, and managing order state. Must never log plain PANs.",
        technologies: "Node.js, Go, PCI-compliant hosting",
        failures: "Invalid API keys, webhook handling failures, duplicate orders."
    },
    "gateway": {
        id: "gateway", name: "Payment Gateway", icon: "🛡️", x: 450, y: 150,
        beginner: "The digital cash register. It secures the card details.",
        intermediate: "A service that encrypts the data and forwards it to the processor.",
        engineering: "Provides APIs, Tokenization, and SDKs. Validates payload schemas, handles rate-limiting, and routes to appropriate processors based on BIN/currency.",
        technologies: "REST APIs, HSMs (Hardware Security Modules)",
        failures: "Gateway timeouts, API validation errors, invalid tokens."
    },
    "fraud_engine": {
        id: "fraud_engine", name: "Risk/Fraud Engine", icon: "👁️", x: 450, y: 50,
        beginner: "A robot that checks if the purchase looks suspicious.",
        intermediate: "An ML system evaluating transaction parameters against risk models.",
        engineering: "Evaluates velocity, IP reputation, device fingerprinting, and behavioral biometrics in < 50ms. Returns risk scores.",
        technologies: "Machine Learning, Redis, Graph Databases",
        failures: "False positives, model timeouts."
    },
    "processor": {
        id: "processor", name: "Payment Processor", icon: "⚙️", x: 650, y: 150,
        beginner: "The plumbing that connects the gateway to the global networks.",
        intermediate: "Formats gateway data into network-specific messages.",
        engineering: "Translates REST/JSON into ISO 8583. Manages connections to multiple Card Networks via leased lines. Handles stand-in processing (STIP).",
        technologies: "C++, Java, TCP/IP sockets",
        failures: "Format translation errors, connection drops to networks."
    },
    "network": {
        id: "network", name: "Card Network", icon: "🌐", x: 850, y: 150,
        beginner: "Giant networks like Visa or Mastercard connecting the world.",
        intermediate: "The switch routing messages between Acquirers and Issuers.",
        engineering: "Central switch evaluating BINs to route ISO 8583 messages to the correct issuing bank. Manages clearing and settlement batches.",
        technologies: "Mainframes, Custom routing hardware",
        failures: "Network switch outages, routing table errors."
    },
    "issuer": {
        id: "issuer", name: "Issuing Bank", icon: "🏦", x: 1050, y: 150,
        beginner: "The customer's bank. They hold the money and decide if it can be spent.",
        intermediate: "The bank verifying funds, PIN/CVV, and account status.",
        engineering: "Core banking system checking ledger balances, evaluating authorization rules, validating cryptograms (ARQC). Responsible for generating authorization codes.",
        technologies: "COBOL, DB2, Core Banking APIs",
        failures: "Insufficient funds (NSF), account frozen, system maintenance."
    },
    "acquirer": {
        id: "acquirer", name: "Acquiring Bank", icon: "🏢", x: 650, y: 250,
        beginner: "The merchant's bank. They collect the approved funds.",
        intermediate: "Financial institution holding the merchant's merchant account.",
        engineering: "Sponsors the merchant into the card networks. Receives settlement batches and wires funds to the merchant's DDA (Demand Deposit Account).",
        technologies: "Batch processing, ACH integration",
        failures: "Settlement delays, holdbacks."
    }
};
