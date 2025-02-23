// Effet de glitch sur le texte
function createGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    function glitch() {
        const cycles = 3;
        let counter = 0;

        const interval = setInterval(() => {
            element.textContent = element.textContent
                .split('')
                .map((char, index) => {
                    if (Math.random() < 0.1) {
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    }
                    return char;
                })
                .join('');

            counter++;
            if (counter >= cycles) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 100);
    }

    // Déclencher l'effet périodiquement
    setInterval(glitch, 5000);
}

// Appliquer l'effet à tous les éléments avec la classe glitch-text
document.querySelectorAll('.glitch-text').forEach(createGlitchEffect);

// Effet de transition entre les pages
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        document.body.style.animation = 'glitchOut 0.5s forwards';
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

// Animation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.animation = 'glitchIn 0.5s forwards';
}); 