// js/storage.js
class StorageEngine {
    constructor() {
        this.storeKey = 'psa_progress';
        this.state = this.loadState();
    }

    loadState() {
        try {
            const data = localStorage.getItem(this.storeKey);
            return data ? JSON.parse(data) : this.getDefaultState();
        } catch (e) {
            console.error('Failed to load local storage', e);
            return this.getDefaultState();
        }
    }

    getDefaultState() {
        return {
            actorsDiscovered: [],
            scenariosCompleted: [],
            failuresStudied: [],
            quizScores: {},
            theme: 'dark'
        };
    }

    saveState() {
        try {
            localStorage.setItem(this.storeKey, JSON.stringify(this.state));
            this.updateProgressUI();
        } catch (e) {
            console.error('Failed to save to local storage', e);
        }
    }

    markActorDiscovered(actorId) {
        if (!this.state.actorsDiscovered.includes(actorId)) {
            this.state.actorsDiscovered.push(actorId);
            this.saveState();
        }
    }

    markScenarioCompleted(scenarioId) {
        if (!this.state.scenariosCompleted.includes(scenarioId)) {
            this.state.scenariosCompleted.push(scenarioId);
            this.saveState();
        }
    }

    saveQuizScore(quizId, score) {
        this.state.quizScores[quizId] = score;
        this.saveState();
    }

    getTheme() {
        return this.state.theme || 'dark';
    }

    setTheme(theme) {
        this.state.theme = theme;
        this.saveState();
    }

    calculateProgress() {
        // Simple metric based on actors and scenarios total count. (Assumes totals exist in window logic later)
        const totalActors = window.Actors ? Object.keys(window.Actors).length : 15;
        const totalScenarios = window.Scenarios ? window.Scenarios.length : 10;
        
        const aCount = Math.min(this.state.actorsDiscovered.length, totalActors);
        const sCount = Math.min(this.state.scenariosCompleted.length, totalScenarios);
        
        const perc = ((aCount + sCount) / (totalActors + totalScenarios)) * 100;
        return Math.floor(perc || 0);
    }

    updateProgressUI() {
        const perc = this.calculateProgress();
        const fill = Utils.$('#progress-fill');
        const text = Utils.$('#progress-text');
        if(fill) fill.style.width = `${perc}%`;
        if(text) text.innerText = `${perc}% Mastered`;
    }
}
window.Storage = new StorageEngine();
