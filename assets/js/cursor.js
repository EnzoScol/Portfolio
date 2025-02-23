document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorCustomizer = document.getElementById('cursorCustomizer');
    const customizePanel = document.querySelector('.cursor-customizer-panel');
    let trailElements = [];

    // Forme initiale
    cursor.classList.add('circle');
    cursorFollower.classList.add('circle');

    // Définir les curseurs système pour chaque forme
    const systemCursors = {
        circle: 'default',
        square: 'crosshair',
        cross: 'cell',
        diamond: 'pointer',
        star: 'wait',
        text: 'text',
        move: 'move',
        grab: 'grab',
        help: 'help'
    };

    // Mouvement du curseur de base
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Toggle du panneau de personnalisation
    cursorCustomizer.addEventListener('click', (e) => {
        e.stopPropagation();
        customizePanel.classList.toggle('active');
    });

    // Fermer le panneau en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!customizePanel.contains(e.target) && e.target !== cursorCustomizer) {
            customizePanel.classList.remove('active');
        }
    });

    // Taille du curseur
    document.getElementById('cursorSize').addEventListener('input', (e) => {
        const size = e.target.value + 'px';
        cursor.style.width = size;
        cursor.style.height = size;
    });

    // Couleur du curseur
    document.getElementById('cursorColor').addEventListener('input', (e) => {
        const color = e.target.value;
        cursor.style.borderColor = color;
        cursorFollower.style.backgroundColor = color;
    });

    // Effets du curseur
    document.getElementById('cursorEffect').addEventListener('change', (e) => {
        // Nettoyer les effets précédents
        trailElements.forEach(el => el.remove());
        trailElements = [];
        
        switch(e.target.value) {
            case 'trail':
                cursor.style.transition = 'none';
                cursorFollower.style.transition = 'none';
                document.addEventListener('mousemove', createTrail);
                break;
            case 'glitch':
                cursor.style.transition = '0.1s';
                cursorFollower.style.transition = '0.1s';
                document.addEventListener('mousemove', createGlitch);
                break;
            case 'matrix':
                cursor.style.transition = '0.2s';
                cursorFollower.style.transition = '0.2s';
                document.addEventListener('mousemove', createMatrix);
                break;
            default:
                cursor.style.transition = '0.2s';
                cursorFollower.style.transition = '0.3s';
                document.removeEventListener('mousemove', createTrail);
                document.removeEventListener('mousemove', createGlitch);
                document.removeEventListener('mousemove', createMatrix);
        }
    });

    // Changement de forme du curseur
    document.getElementById('cursorShape').addEventListener('change', (e) => {
        const shape = e.target.value;
        
        // Changer le curseur système
        document.body.style.cursor = systemCursors[shape];
        
        // Supprimer toutes les classes de forme
        cursor.classList.remove('circle', 'square', 'cross', 'diamond', 'star');
        cursorFollower.classList.remove('circle', 'square', 'cross', 'diamond', 'star');
        
        // Ajouter la nouvelle classe de forme
        cursor.classList.add(shape);
        cursorFollower.classList.add(shape);
    });

    function createTrail(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.backgroundColor = cursor.style.borderColor || '#ff00ff';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    function createGlitch(e) {
        cursor.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        cursorFollower.style.transform = `translate(${Math.random() * 8 - 4}px, ${Math.random() * 8 - 4}px)`;
    }

    function createMatrix(e) {
        const matrix = document.createElement('div');
        matrix.className = 'cursor-matrix';
        matrix.style.left = e.clientX + 'px';
        matrix.style.top = e.clientY + 'px';
        matrix.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
        matrix.style.color = cursor.style.borderColor || '#ff00ff';
        document.body.appendChild(matrix);
        
        setTimeout(() => {
            matrix.remove();
        }, 1000);
    }
});

// Styles pour les effets
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.5;
        z-index: 9998;
        animation: trailFade 0.5s linear forwards;
    }

    .cursor-matrix {
        position: fixed;
        font-family: 'VT323', monospace;
        font-size: 20px;
        pointer-events: none;
        z-index: 9998;
        animation: matrixFade 1s linear forwards;
    }

    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0.2);
        }
    }

    @keyframes matrixFade {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style); 