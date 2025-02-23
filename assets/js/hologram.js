// Initialisation des hologrammes
class Hologram {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(150, 150);
        this.container.appendChild(this.renderer.domElement);

        // Création de la géométrie de l'hologramme
        this.geometry = new THREE.IcosahedronGeometry(1, 0);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Ajout de lumières
        const light = new THREE.PointLight(0x00ff00, 1, 100);
        light.position.set(0, 0, 2);
        this.scene.add(light);

        this.scene.add(this.mesh);
        this.camera.position.z = 2.5;

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}

// Terminal interactif
class CyberTerminal {
    constructor() {
        this.terminal = document.querySelector('.terminal-container');
        this.output = document.querySelector('.terminal-output');
        this.input = document.querySelector('.terminal-input');
        this.commands = {
            'help': () => this.showHelp(),
            'clear': () => this.clear(),
            'matrix': () => this.toggleMatrix(),
            'projects': () => this.listProjects(),
            'about': () => this.showAbout(),
            'exit': () => this.hideTerminal()
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Ouvrir le terminal avec Ctrl + 1 (pavé numérique)
        document.addEventListener('keydown', (e) => {
            // e.code 'Numpad1' représente spécifiquement la touche 1 du pavé numérique
            if (e.ctrlKey && (e.code === 'Numpad1' || e.key === '1')) {
                e.preventDefault(); // Empêche le comportement par défaut
                this.toggleTerminal();
            }
        });

        // Gérer les commandes
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            }
        });

        // Contrôles du terminal
        document.querySelector('.terminal-controls .close').addEventListener('click', () => this.hideTerminal());
        document.querySelector('.terminal-controls .minimize').addEventListener('click', () => this.hideTerminal());
    }

    toggleTerminal() {
        this.terminal.classList.toggle('active');
        if (this.terminal.classList.contains('active')) {
            this.input.focus();
        }
    }

    hideTerminal() {
        this.terminal.classList.remove('active');
    }

    executeCommand() {
        const command = this.input.value.trim().toLowerCase();
        this.printOutput(`> ${command}`);
        
        if (this.commands[command]) {
            this.commands[command]();
        } else {
            this.printOutput('Commande non reconnue. Tapez "help" pour voir les commandes disponibles.');
        }

        this.input.value = '';
    }

    printOutput(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    showHelp() {
        const commands = [
            '[RACCOURCI] Ctrl + 1 (pavé numérique) pour ouvrir/fermer le terminal',
            'help    - Affiche cette aide',
            'clear   - Efface le terminal',
            'matrix  - Active/désactive l\'effet matrix',
            'projects- Liste les projets',
            'about   - À propos',
            'exit    - Ferme le terminal'
        ];
        commands.forEach(cmd => this.printOutput(cmd));
    }

    clear() {
        this.output.innerHTML = '';
    }

    toggleMatrix() {
        document.querySelector('.matrix-rain').classList.toggle('active');
        this.printOutput('Effet matrix ' + 
            (document.querySelector('.matrix-rain').classList.contains('active') ? 'activé' : 'désactivé'));
    }

    listProjects() {
        const projects = [
            'CYBERPUNK_PORTFOLIO.exe [ACTIF]',
            'BLANK_PROJECT_01.sys [EN DÉVELOPPEMENT]',
            'BLANK_PROJECT_02.sys [EN DÉVELOPPEMENT]'
        ];
        projects.forEach(project => this.printOutput(project));
    }

    showAbout() {
        this.printOutput('CYBERDECK_TERMINAL.exe v1.0');
        this.printOutput('Développé par Enzo Jobard');
        this.printOutput('Type: Système de commande cyberpunk');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Création des hologrammes
    new Hologram('hologram1');
    new Hologram('hologram2');

    // Initialisation du terminal
    new CyberTerminal();
}); 