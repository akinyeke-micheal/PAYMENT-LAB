// js/network.js
class NetworkEngine {
    constructor() {
        this.svg = Utils.$('#network-svg');
        this.nodesLayer = Utils.$('#nodes-layer');
        this.edgesLayer = Utils.$('#edges-layer');
        this.particlesLayer = Utils.$('#particles-layer');
        this.nodes = {};
        
        // Popup elements
        this.popup = Utils.$('#actor-popup');
        this.popupTitle = Utils.$('#popup-title');
        this.popupDesc = Utils.$('#popup-desc');
        Utils.$('#popup-close').addEventListener('click', () => this.popup.classList.add('hidden'));

        this.init();
    }

    init() {
        // Adjust the SVG viewBox dynamically based on our new wide layout
        this.svg.setAttribute('viewBox', '0 0 1150 250');
        this.drawNodes();
        this.drawEdges();
    }

    drawNodes() {
        if (!window.Actors) return;
        
        Object.values(window.Actors).forEach(actor => {
            const group = Utils.createSVG('g', {
                class: 'node-group',
                id: `node-${actor.id}`,
                transform: `translate(${actor.x}, ${actor.y})`
            });

            // INCREASED BOX SIZES: Width 135, Height 75
            const rect = Utils.createSVG('rect', {
                class: 'node-rect', width: '135', height: '75', x: '-67.5', y: '-37.5'
            });

            const icon = Utils.createSVG('text', {
                class: 'node-icon', x: '0', y: '-5', textContent: actor.icon
            });

            const text = Utils.createSVG('text', {
                class: 'node-text', x: '0', y: '20', textContent: actor.name
            });

            group.appendChild(rect);
            group.appendChild(icon);
            group.appendChild(text);
            
            group.addEventListener('click', () => {
                if (window.EducationEngine) window.EducationEngine.showActorDetails(actor.id);
                
                this.popupTitle.textContent = `${actor.icon} ${actor.name}`;
                this.popupDesc.textContent = "View System Overview panel for deep engineering context."; 
                this.popup.classList.remove('hidden');
            });

            this.nodesLayer.appendChild(group);
            this.nodes[actor.id] = { ...actor, element: group };
        });
    }

    drawEdges() {
        const baseOrder = ["customer", "terminal", "gateway", "processor", "acquirer", "network", "issuer"];
        for (let i = 0; i < baseOrder.length - 1; i++) {
            const startNode = this.nodes[baseOrder[i]];
            const endNode = this.nodes[baseOrder[i+1]];
            
            if (startNode && endNode) {
                const path = Utils.createSVG('path', {
                    class: 'edge-path',
                    id: `edge-${startNode.id}-${endNode.id}`,
                    d: `M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`
                });
                this.edgesLayer.appendChild(path);
            }
        }
    }

    setNodeState(nodeId, state) {
        const node = this.nodes[nodeId];
        if (!node) return;
        node.element.classList.remove('active', 'completed', 'failed');
        if (state !== 'idle') node.element.classList.add(state);
    }
}
