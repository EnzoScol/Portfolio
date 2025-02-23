// Création dynamique d'éléments flottants supplémentaires
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const elements = ['⚡', '💾', '⚔️', '🎮', '🔮', '⭐', '🌟', '💫'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'float-item';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        container.appendChild(element);
        
        // Suppression après l'animation
        setTimeout(() => {
            element.remove();
        }, 15000);
    }, 2000);
}

createFloatingElements();

// Effet de survol sur les éléments flottants
document.querySelectorAll('.float-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.5) rotate(45deg)';
        item.style.opacity = '1';
    });
    
    item.addEventListener('mouseout', () => {
        item.style.transform = '';
        item.style.opacity = '0.5';
    });
}); 