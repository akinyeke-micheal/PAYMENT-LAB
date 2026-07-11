// js/education.js
class EducationEngine {
    constructor() {
        this.panelTitle = Utils.$('#panel-title');
        this.panelContent = Utils.$('#panel-content');
        this.currentMode = 'engineering'; // Defaulting to engineering for your deep-dive focus
        this.currentActorId = null;
        this.bindEvents();
    }

    bindEvents() {
        const modeBtns = Utils.$$('.mode-btn');
        modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                modeBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                if (this.currentActorId) {
                    // Re-render when mode changes
                    this.showActorDetails(this.currentActorId, true); 
                }
            });
        });
    }

    /**
     * @param {string} actorId - The ID of the actor to display
     * @param {boolean} isForward - Whether the transaction is moving Forward or Backward
     */
    showActorDetails(actorId, isForward = true) {
        this.currentActorId = actorId;
        const actor = window.Actors[actorId];
        if (!actor) return;

        // Get the scenario data from the active scenario dropdown
        const scenarioSelector = Utils.$('#scenario-selector');
        const activeScenarioId = scenarioSelector ? scenarioSelector.value : "standard_purchase";
        const scenarioData = actor.scenarios[activeScenarioId] || actor.scenarios["standard_purchase"];

        this.panelTitle.innerHTML = (actor.icon || '') + ' ' + (actor.name || 'Unknown');
        
        let contentHtml = '';

        if (this.currentMode === 'beginner' || this.currentMode === 'intermediate') {
            // Simplified educational view
            contentHtml = `
                <h3>What happens here?</h3>
                <p><strong>${isForward ? "Forward Journey" : "Return Journey"}:</strong> ${isForward ? scenarioData.forward : scenarioData.return}</p>
            `;
        } else if (this.currentMode === 'engineering') {
            // Deep technical engineering view
            const techTags = actor.technologies 
                ? actor.technologies.split(', ').join('</span><span class="tag">') 
                : 'N/A';
                
            contentHtml = `
                <h3>System Logic (Context-Aware)</h3>
                <div style="background: rgba(58, 45, 125, 0.05); padding: 12px; border-left: 4px solid var(--primary); margin-bottom: 16px; border-radius: 4px;">
                    <p style="margin-bottom: 8px; color: var(--primary); font-weight: bold; font-size: 0.85rem;">
                        ${isForward ? "[FORWARD LEG: Permission Request]" : "[RETURN LEG: Authorization Response]"}
                    </p>
                    <p style="font-size: 0.95rem;">${isForward ? scenarioData.forward : scenarioData.return}</p>
                </div>
                
                <h3>Essential Engineering Stack</h3>
                <p style="line-height: 2;"><span class="tag">${techTags}</span></p>
            `;
        }

        this.panelContent.innerHTML = contentHtml;
    }
}
