// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    
    Utils.logToTerminal("System Booting...", "info");
    Utils.logToTerminal("Loading Payment Network Topology...", "info");
    
    // 1. Apply saved theme
    const savedTheme = window.Storage ? window.Storage.getTheme() : 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 2. Initialize Engines
    if (typeof NetworkEngine !== 'undefined') {
        window.Network = new NetworkEngine();
        Utils.logToTerminal("Network initialized successfully.", "success");
    }

    if (typeof EducationEngine !== 'undefined') {
        window.EducationEngine = new EducationEngine();
        Utils.logToTerminal("Education module loaded.", "success");
    }

    if (typeof SimulationEngine !== 'undefined') {
        window.Simulation = new SimulationEngine();
        Utils.logToTerminal("Simulation engine ready.", "success");
    }

    // 3. Bind Global UI Controls
    const themeBtn = Utils.$('#btn-theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const nextTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            if(window.Storage) window.Storage.setTheme(nextTheme);
        });
    }

    const clearLogsBtn = Utils.$('#btn-clear-logs');
    if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', () => {
            Utils.clearTerminal();
            Utils.logToTerminal("Console cleared.", "info");
        });
    }

    // 4. Populate Selectors
    const scenarioSelect = Utils.$('#scenario-selector');
    if (scenarioSelect && window.Scenarios) {
        window.Scenarios.forEach(sc => {
            const opt = Utils.createElement('option', { value: sc.id, innerHTML: sc.name });
            scenarioSelect.appendChild(opt);
        });
    }

    Utils.logToTerminal("Payment Systems Academy ready. Awaiting simulation trigger.", "highlight");
});
