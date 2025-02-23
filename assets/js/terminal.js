const terminal = document.querySelector('.terminal-content');
const messages = [
    'Scanning system...',
    'Loading project database...',
    'Initializing interface...',
    'Access granted...',
    'Welcome to the project viewer...',
    'Ready for interaction...'
];

let messageIndex = 0;

function typeMessage() {
    if (messageIndex < messages.length) {
        const line = document.createElement('div');
        line.className = 'line';
        line.textContent = messages[messageIndex];
        terminal.appendChild(line);
        messageIndex++;
        
        setTimeout(typeMessage, 1000);
    }
}

typeMessage();

// Effet de glitch aléatoire
setInterval(() => {
    const elements = document.querySelectorAll('.glitch-text');
    elements.forEach(element => {
        element.style.textShadow = `
            ${Math.random() * 10}px ${Math.random() * 10}px var(--glitch-color1),
            ${-Math.random() * 10}px ${-Math.random() * 10}px var(--glitch-color2)
        `;
        setTimeout(() => {
            element.style.textShadow = '';
        }, 100);
    });
}, 2000);

class TerminalConsole {
    constructor() {
        this.createTerminal();
        this.messages = {
            system: [
                'System initialization...',
                'Memory check complete',
                'Neural network online',
                'Quantum processor active',
                'Cyberdeck systems nominal',
                'Scanning for threats...',
                'Firewall engaged'
            ],
            warning: [
                'WARNING: Unauthorized access detected',
                'WARNING: Memory corruption at sector 7G',
                'WARNING: Neural interface unstable',
                'WARNING: Quantum fluctuation detected'
            ],
            error: [
                'ERROR: System breach detected',
                'ERROR: Neural overload imminent',
                'ERROR: Critical system failure',
                'ERROR: Memory corruption detected'
            ],
            success: [
                'Connection established',
                'Security protocols updated',
                'System optimization complete',
                'Neural backup successful'
            ]
        };
        
        this.startRandomMessages();
    }

    createTerminal() {
        const terminal = document.createElement('div');
        terminal.className = 'terminal-console';
        terminal.innerHTML = `
            <div class="terminal-header">
                <span class="terminal-title">SYSTEM_CONSOLE.exe</span>
                <div class="terminal-controls">
                    <span class="minimize">_</span>
                    <span class="maximize">□</span>
                    <span class="close">×</span>
                </div>
            </div>
            <div class="terminal-output"></div>
        `;
        document.body.appendChild(terminal);
        this.output = terminal.querySelector('.terminal-output');
    }

    addLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;

        // Limiter le nombre de lignes
        if (this.output.children.length > 30) {
            this.output.removeChild(this.output.children[0]);
        }
    }

    startRandomMessages() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% de chance d'afficher un message
                const types = ['system', 'warning', 'error', 'success'];
                const type = types[Math.floor(Math.random() * types.length)];
                const messages = this.messages[type];
                const message = messages[Math.floor(Math.random() * messages.length)];
                this.addLine(message, type);

                // Effet visuel aléatoire
                if (Math.random() < 0.3) {
                    this.triggerVisualEffect();
                }
            }
        }, 2000);
    }

    triggerVisualEffect() {
        const effects = [
            () => adminPanel.effects.glitchScreen(),
            () => adminPanel.effects.scanline(),
            () => adminPanel.createMatrixGlitch(),
            () => this.createDataBurst()
        ];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    }

    createDataBurst() {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
            opacity: 0;
            z-index: 9999;
            animation: dataBurst 0.5s ease-out forwards;
        `;
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 500);
    }
}

// Initialisation
const terminalConsole = new TerminalConsole();

// Style pour l'animation du data burst
const style = document.createElement('style');
style.textContent = `
    @keyframes dataBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style); 