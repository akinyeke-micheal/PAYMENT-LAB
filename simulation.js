// js/simulation.js
class SimulationEngine {
    constructor() {
        this.isPlaying = false;
        this.currentStepIndex = -1;
        this.currentScenario = null;
        this.timer = null;
        this.isFailedPath = false;
        
        this.speedControl = Utils.$('#sim-speed');
        this.bindControls();
    }

    bindControls() {
        Utils.$('#btn-play').addEventListener('click', () => this.play());
        Utils.$('#btn-pause').addEventListener('click', () => this.pause());
        Utils.$('#btn-reset').addEventListener('click', () => this.reset());
        Utils.$('#btn-step-forward').addEventListener('click', () => this.stepForward());
        
        this.speedControl.addEventListener('input', (e) => {
            Utils.$('#speed-display').innerText = e.target.value + 'x';
        });
    }

    loadScenario() {
        const scenarioId = Utils.$('#scenario-selector').value;
        this.currentScenario = window.Scenarios.find(s => s.id === scenarioId);
        this.isFailedPath = false;
        Utils.logToTerminal(`Loaded Flow: ${this.currentScenario.name}`, 'highlight');
    }

    play() {
        if (this.currentStepIndex === -1) {
            this.reset();
            this.loadScenario();
        }
        this.isPlaying = true;
        Utils.$('#btn-play').classList.add('hidden');
        Utils.$('#btn-pause').classList.remove('hidden');
        this.executeNextStep();
    }

    pause() {
        this.isPlaying = false;
        clearTimeout(this.timer);
        Utils.$('#btn-pause').classList.add('hidden');
        Utils.$('#btn-play').classList.remove('hidden');
    }

    reset() {
        this.pause();
        this.currentStepIndex = -1;
        this.currentScenario = null;
        this.isFailedPath = false;
        Utils.$('#particles-layer').innerHTML = ''; 
        Utils.$('#actor-popup').classList.add('hidden');
        
        if (window.Network && window.Actors) {
            Object.keys(window.Actors).forEach(id => window.Network.setNodeState(id, 'idle'));
        }
        Utils.logToTerminal("System reset.", "info");
    }

    stepForward() {
        this.pause();
        if (this.currentStepIndex === -1) this.loadScenario();
        this.executeNextStep();
    }

    animateParticle(startId, endId, duration, isError = false) {
        const start = window.Actors[startId];
        const end = window.Actors[endId];
        if (!start || !end) return;

        const particle = Utils.createSVG('circle', {
            class: 'particle', r: '6', cx: start.x, cy: start.y
        });
        
        if (isError) particle.style.fill = 'var(--danger)';
        Utils.$('#particles-layer').appendChild(particle);

        const animation = particle.animate([
            { cx: start.x, cy: start.y },
            { cx: end.x, cy: end.y }
        ], { duration: duration, easing: 'ease-in-out', fill: 'forwards' });

        animation.onfinish = () => particle.remove();
    }

  executeNextStep() {
        const path = this.currentScenario.path;
        const issuerIndex = path.indexOf("issuer");

        if (this.currentStepIndex >= path.length - 1) {
            Utils.logToTerminal(this.isFailedPath ? "Cycle complete: Failure notified." : "Cycle complete: Success confirmed.", this.isFailedPath ? "error" : "success");
            this.pause();
            return;
        }

        if (this.currentStepIndex >= 0) {
            const prevNode = path[this.currentStepIndex];
            if (this.currentScenario.failureNode !== prevNode) {
                window.Network.setNodeState(prevNode, 'completed');
            }
        }

        this.currentStepIndex++;
        const currentNodeId = path[this.currentStepIndex];
        const nextNodeId = path[this.currentStepIndex + 1];
        const actor = window.Actors[currentNodeId];
        
        // STRICT DIRECTIONAL LOGIC
        // Forward leg is index <= issuerIndex. Return leg is index > issuerIndex.
        const isForward = this.currentStepIndex <= issuerIndex;
        const scenarioData = actor.scenarios[this.currentScenario.id] || actor.scenarios["standard_purchase"];
        
        // Handle Failures or Normal Processing
        if (this.currentScenario.failureNode === currentNodeId && isForward) {
            window.Network.setNodeState(currentNodeId, 'failed');
            this.isFailedPath = true;
            Utils.logToTerminal(`[CRITICAL] ${actor.name}: ${this.currentScenario.failureReason}`, 'error');
        } else {
            window.Network.setNodeState(currentNodeId, 'active');
            
            // Log ONLY the message relevant to the current direction
            const message = isForward ? scenarioData.forward : scenarioData.return;
            const label = isForward ? "[FORWARD LEG: Permission Request]" : "[RETURN LEG: Authorization Response]";
            
            Utils.logToTerminal(`<strong>${label} ${actor.name}:</strong> ${message}`, 'info');
        }

        // Update Education Panel dynamically based on direction
        if (window.EducationEngine) {
            window.EducationEngine.showActorDetails(currentNodeId, isForward);
        }

        const speedMultiplier = parseFloat(this.speedControl.value) || 1;
        const delay = 2000 / speedMultiplier;

        if (nextNodeId) this.animateParticle(currentNodeId, nextNodeId, delay, this.isFailedPath);
        if (this.isPlaying) this.timer = setTimeout(() => this.executeNextStep(), delay);
    }
}