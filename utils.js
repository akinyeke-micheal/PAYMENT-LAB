// js/utils.js
const Utils = {
    $(selector) { return document.querySelector(selector); },
    $$(selector) { return document.querySelectorAll(selector); },
    
    createElement(tag, attributes = {}, children = []) {
        const el = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'className') el.className = value;
            else if (key === 'dataset') {
                for (const [dataKey, dataValue] of Object.entries(value)) el.dataset[dataKey] = dataValue;
            }
            else if (key === 'innerHTML') el.innerHTML = value;
            else if (key === 'textContent') el.textContent = value;
            else el.setAttribute(key, value);
        }
        children.forEach(child => {
            if (typeof child === 'string') el.appendChild(document.createTextNode(child));
            else el.appendChild(child);
        });
        return el;
    },

    createSVG(tag, attributes = {}) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'innerHTML') el.innerHTML = value;
            else if (key === 'textContent') el.textContent = value; // Added support for SVG text
            else el.setAttribute(key, value);
        }
        return el;
    },

    formatTime(date = new Date()) {
        return `[${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}]`;
    },

    logToTerminal(message, type = 'info') {
        const terminal = this.$('#terminal-output');
        if (!terminal) return;
        const entry = this.createElement('div', { className: `log-entry log-${type}` });
        
        const timeSpan = this.createElement('span', { className: 'log-time', textContent: this.formatTime() });
        const msgSpan = this.createElement('span', { innerHTML: message });
        
        entry.appendChild(timeSpan);
        entry.appendChild(msgSpan);
        
        terminal.appendChild(entry);
        terminal.scrollTop = terminal.scrollHeight;
    },

    clearTerminal() {
        const terminal = this.$('#terminal-output');
        if (terminal) terminal.innerHTML = '';
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};