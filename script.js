// Gestion améliorée du menu mobile
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Ajout de l'overlay pour le menu mobile
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
document.body.appendChild(menuOverlay);

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

burgerMenu.addEventListener('click', toggleMenu);

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu quand on clique en dehors
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !burgerMenu.contains(e.target)) {
        toggleMenu();
    }
});

// Fermer le menu en cliquant sur l'overlay
menuOverlay.addEventListener('click', toggleMenu);

// Ajuster la hauteur du menu en fonction de la hauteur de l'écran
function updateMenuHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateMenuHeight);
updateMenuHeight();

// Gestion du header au scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        // Scroll vers le bas
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        // Scroll vers le haut
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Ajout d'effets de particules
function initParticles() {
    const container = document.querySelector('.particles-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

// Effet de frappe au clavier
function initTypingEffect() {
    const elements = document.querySelectorAll('.typing-effect');
    elements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.style.animationDelay = `${i * 0.1}s`;
            span.className = 'typing-char';
            span.textContent = char;
            el.appendChild(span);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypingEffect();
});

// Modification des liens pour scroll vers Calendly au lieu d'ouvrir une modale
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Suppression du code de la modale 

// Création des éléments de curseur
const cursorLight = document.createElement('div');
const cursorDot = document.createElement('div');

cursorLight.classList.add('cursor-light');
cursorDot.classList.add('cursor-dot');

document.body.appendChild(cursorLight);
document.body.appendChild(cursorDot);

// Position précédente pour l'effet de traînée
let prevX = 0;
let prevY = 0;
let currentX = 0;
let currentY = 0;

// Animation fluide
function animate() {
    // Interpolation douce
    prevX += (currentX - prevX) * 0.15;
    prevY += (currentY - prevY) * 0.15;

    // Mise à jour de la position
    cursorLight.style.left = `${prevX}px`;
    cursorLight.style.top = `${prevY}px`;

    requestAnimationFrame(animate);
}

// Démarrage de l'animation
animate();

// Optimisation des performances
let rafId = null;
function optimizedMouseMove(e) {
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
        // Mise à jour de la position du point
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        // Mise à jour de la position cible pour l'effet lumineux
        currentX = e.clientX;
        currentY = e.clientY;

        rafId = null;
    });
}

// Initialisation des positions
document.addEventListener('mousemove', (e) => {
    if (!prevX && !prevY) {
        prevX = e.clientX;
        prevY = e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;
    }
    optimizedMouseMove(e);
});

// Gestion des cartes de projet
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Si la carte est déjà active, on la désactive
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            return;
        }

        // Désactive toutes les autres cartes
        projectCards.forEach(c => c.classList.remove('active'));
        
        // Active la carte cliquée
        card.classList.add('active');
    });
});

// Ferme la carte active si on clique en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-card')) {
        projectCards.forEach(card => card.classList.remove('active'));
    }
});

// Ajout de la détection mobile
function checkMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Vérification initiale et à chaque redimensionnement
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile); 