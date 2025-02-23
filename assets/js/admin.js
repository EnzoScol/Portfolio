class AdminPanel {
    constructor() {
        this.createPanel();
        this.errorMessages = [
            'MEMORY_ALLOCATION_ERROR',
            'SYSTEM_FAILURE_DETECTED',
            'NEURAL_NETWORK_BREACH',
            'SECURITY_PROTOCOL_VIOLATED',
            'DATA_CORRUPTION_WARNING',
            'MATRIX_OVERFLOW',
            'QUANTUM_INSTABILITY',
            'CYBERNETIC_MALFUNCTION'
        ];
        
        this.infoMessages = [
            'Scanning neural pathways...',
            'Quantum encryption enabled',
            'Memory fragments detected',
            'System optimization in progress',
            'Cybernetic enhancement loaded',
            'Neural interface synchronized',
            'Virtual reality stabilized',
            'Holographic projection active',
            'Artificial consciousness online'
        ];

        // Démarrer les événements aléatoires
        this.startRandomEvents();
    }

    startRandomEvents() {
        // Événements d'erreur toutes les 3 secondes (40% de chance)
        setInterval(() => {
            if (Math.random() < 0.4) {
                this.createError();
            }
        }, 3000);

        // Événements d'info toutes les 4 secondes (30% de chance)
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createInfoPopup();
            }
        }, 4000);

        // Matrix glitch toutes les 5 secondes (25% de chance)
        setInterval(() => {
            if (Math.random() < 0.25) {
                this.createMatrixGlitch();
            }
        }, 5000);

        // Chaos mode toutes les 15 secondes (15% de chance)
        setInterval(() => {
            if (Math.random() < 0.15) {
                this.createMultipleErrors();
            }
        }, 15000);
    }

    createPanel() {
        // Bouton toggle
        const toggle = document.createElement('button');
        toggle.className = 'admin-toggle';
        toggle.textContent = '⚡';
        document.body.appendChild(toggle);

        // Panel
        const panel = document.createElement('div');
        panel.className = 'admin-panel';
        panel.innerHTML = `
            <h3>ADMIN CONTROL PANEL</h3>
            <button onclick="adminPanel.createError()">TRIGGER ERROR</button>
            <button onclick="adminPanel.createInfoPopup()">TRIGGER INFO</button>
            <button onclick="adminPanel.createMultipleErrors()">CHAOS MODE</button>
            <button onclick="adminPanel.createMatrixGlitch()">MATRIX GLITCH</button>
        `;
        document.body.appendChild(panel);

        // Toggle functionality
        toggle.addEventListener('click', () => {
            panel.classList.toggle('visible');
        });
    }

    createError() {
        const error = document.createElement('div');
        error.className = 'error-text';
        error.textContent = this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)];
        
        error.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        error.style.top = Math.random() * (window.innerHeight - 50) + 'px';
        
        document.body.appendChild(error);
        
        setTimeout(() => {
            error.remove();
        }, 3000);
    }

    createInfoPopup() {
        const popup = document.createElement('div');
        popup.className = 'info-popup';
        popup.textContent = this.infoMessages[Math.floor(Math.random() * this.infoMessages.length)];
        
        const side = Math.floor(Math.random() * 4);
        switch(side) {
            case 0:
                popup.style.top = '20px';
                popup.style.left = Math.random() * (window.innerWidth - 300) + 'px';
                break;
            case 1:
                popup.style.right = '20px';
                popup.style.top = Math.random() * (window.innerHeight - 100) + 'px';
                break;
            case 2:
                popup.style.bottom = '20px';
                popup.style.left = Math.random() * (window.innerWidth - 300) + 'px';
                break;
            case 3:
                popup.style.left = '20px';
                popup.style.top = Math.random() * (window.innerHeight - 100) + 'px';
                break;
        }
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.style.animation = 'popupDisappear 0.3s ease forwards';
            setTimeout(() => popup.remove(), 300);
        }, 4000);
    }

    createMultipleErrors() {
        let count = 0;
        const interval = setInterval(() => {
            this.createError();
            count++;
            if (count >= 10) clearInterval(interval);
        }, 200);
    }

    createMatrixGlitch() {
        const glitch = document.createElement('div');
        glitch.style.position = 'fixed';
        glitch.style.top = '0';
        glitch.style.left = '0';
        glitch.style.width = '100%';
        glitch.style.height = '100%';
        glitch.style.background = 'rgba(0, 255, 0, 0.1)';
        glitch.style.zIndex = '9998';
        glitch.style.animation = 'matrixGlitch 0.5s ease-out forwards';
        
        document.body.appendChild(glitch);
        
        setTimeout(() => glitch.remove(), 500);
    }
}

// Initialisation
const adminPanel = new AdminPanel();

// Ajout des styles pour l'animation Matrix
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrixDrop {
        0% {
            transform: translateY(-100%);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(matrixStyle); 