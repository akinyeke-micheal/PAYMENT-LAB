// js/glossary.js
window.Glossary = {
    "Authorization": {
        beginner: "Checking if a user has enough money and blocking those funds so they can be captured later.",
        engineering: "A message (e.g., ISO 8583 0100) sent to the issuer requesting a hold on funds. Returns an auth code if successful."
    },
    "Settlement": {
        beginner: "The actual movement of money between bank accounts, usually happening a day or two later.",
        engineering: "The batch process where acquirers and issuers exchange funds via the central clearing network, reconciling holds vs captures."
    },
    "Issuer": {
        beginner: "The bank that gave the customer their debit or credit card.",
        engineering: "The financial institution managing the cardholder's account, responsible for approving authorizations and assuming credit risk."
    },
    "Acquirer": {
        beginner: "The merchant's bank that collects the money from the issuer.",
        engineering: "The acquiring institution that processes transactions on behalf of the merchant and deposits funds into the merchant's account."
    },
    "Payment Gateway": {
        beginner: "The digital cash register. It securely takes your card details on a website.",
        engineering: "The frontend service that encrypts sensitive card data, tokenizes it, and routes the transaction to the appropriate processor."
    },
    "Processor": {
        beginner: "The engine that connects the gateway to the massive card networks (like Visa/Mastercard).",
        engineering: "The technical entity routing transactions, performing BIN lookups, formatting messages into network-specific protocols, and managing acquirer integrations."
    },
    "PCI DSS": {
        beginner: "A set of strict security rules that companies must follow to handle credit card info.",
        engineering: "Payment Card Industry Data Security Standard. Defines requirements for encryption, network segmentation, access control, and auditing."
    },
    "ISO 8583": {
        beginner: "The standard language that banks and networks use to talk to each other.",
        engineering: "An international standard for financial transaction card originated interchange messaging. Uses bitmaps to indicate data element presence."
    },
    "Tokenization": {
        beginner: "Replacing your real card number with a fake, temporary number for safety.",
        engineering: "Swapping Primary Account Numbers (PANs) with a non-sensitive equivalent (token) that has no extrinsic or exploitable meaning or value."
    },
    "3D Secure": {
        beginner: "An extra security step, like getting a text message code from your bank when buying online.",
        engineering: "An XML-based protocol (now EMV 3DS) adding an authentication step for online payments. Shifts fraud liability from merchant to issuer."
    },
    "Idempotency": {
        beginner: "Making sure that if you accidentally double-click 'Buy', you only get charged once.",
        engineering: "An API design principle where multiple identical requests produce the same outcome as a single request, preventing duplicate transactions during network retries."
    }
};
