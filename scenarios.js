// js/scenarios.js
window.Scenarios = [
    {
        id: "standard_purchase",
        name: "Standard Purchase (Approved)",
        path: ["customer", "terminal", "gateway", "processor", "acquirer", "network", "issuer", "network", "acquirer", "processor", "gateway", "terminal", "customer"],
        failureNode: null,
        description: "A complete 13-step round-trip payment authorization cycle."
    },
    {
        id: "declined_nsf",
        name: "Declined: Insufficient Funds (Issuer)",
        path: ["customer", "terminal", "gateway", "processor", "acquirer", "network", "issuer", "network", "acquirer", "processor", "gateway", "terminal", "customer"],
        failureNode: "issuer",
        failureReason: "Insufficient Funds (NSF)",
        description: "The request reaches the Issuer, but is declined due to lack of funds. The decline message is routed back."
    },
    {
        id: "fraud_block",
        name: "Blocked: Fraud Detected (Processor)",
        // Short-circuits at the processor! Never reaches the acquirer or network.
        path: ["customer", "terminal", "gateway", "processor", "gateway", "terminal", "customer"],
        failureNode: "processor",
        failureReason: "High-Risk Velocity Flag",
        description: "The Processor's risk engine halts the transaction before it reaches the banking rail."
    },
    {
        id: "timeout_gateway",
        name: "Failed: Gateway Timeout",
        // Short-circuits at the gateway!
        path: ["customer", "terminal", "gateway", "terminal", "customer"],
        failureNode: "gateway",
        failureReason: "Upstream API Timeout",
        description: "The Gateway fails to reach the Processor and returns an error immediately."
    }
];

window.Failures = {
    "none": { name: "No Failure (Happy Path)" }
};