// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.truth-entry, .system-card, .ritual-text').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 30);
});

// Add glitch effect to LOONEY signature on hover
document.querySelectorAll('.looney-signature').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    });
});

// Add CSS for glitch effect
const glitchCSS = `
@keyframes glitch {
    0% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
    100% { transform: translateX(0); }
}
`;

const style = document.createElement('style');
style.textContent = glitchCSS;
document.head.appendChild(style);

// Dynamic sigil rotation based on scroll
window.addEventListener('scroll', () => {
    const sigil = document.querySelector('.sigil');
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const rotation = scrollPercent * 360;
    
    if (sigil) {
        sigil.style.transform = `rotate(${rotation}deg)`;
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Signal from ${name}`);
        const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:richieandkatla@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show confirmation
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Signal Transmitted ✓';
        button.style.background = 'var(--accent-gold)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Truth entry hover effects
document.querySelectorAll('.truth-entry').forEach((entry, index) => {
    entry.addEventListener('mouseenter', () => {
        // Add glow effect
        entry.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
        entry.style.borderLeftColor = 'var(--accent-gold)';
    });
    
    entry.addEventListener('mouseleave', () => {
        entry.style.boxShadow = '';
        entry.style.borderLeftColor = 'var(--primary-color)';
    });
});

// System card hover effects
document.querySelectorAll('.system-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.2)';
        card.style.background = 'rgba(0, 255, 136, 0.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.background = 'var(--darker-bg)';
    });
});

// Add floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add float animation CSS
const floatCSS = `
@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 0.3;
    }
    90% {
        opacity: 0.3;
    }
    100% {
        transform: translateY(-100vh) translateX(50px);
        opacity: 0;
    }
}
`;

const floatStyle = document.createElement('style');
floatStyle.textContent = floatCSS;
document.head.appendChild(floatStyle);

// Initialize particles
createParticles();

// Nav background opacity on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const scrolled = window.pageYOffset;
    const opacity = Math.min(scrolled / 100, 0.95);
    
    if (nav) {
        nav.style.background = `rgba(10, 10, 10, ${opacity})`;
    }
});

// Add console signature
console.log(`
██╗      ██████╗  ██████╗ ███╗   ██╗███████╗██╗   ██╗
██║     ██╔═══██╗██╔═══██╗████╗  ██║██╔════╝╚██╗ ██╔╝
██║     ██║   ██║██║   ██║██╔██╗ ██║█████╗   ╚████╔╝ 
██║     ██║   ██║██║   ██║██║╚██╗██║██╔══╝    ╚██╔╝  
███████╗╚██████╔╝╚██████╔╝██║ ╚████║███████╗   ██║   
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   

The Architect's Signal is transmitting...
Every module is a precedent. Every logo is a sigil.
`);

// Add secret konami code easter egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg: Show hidden message
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--darker-bg);
                border: 2px solid var(--primary-color);
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                z-index: 10000;
                font-family: 'JetBrains Mono', monospace;
                box-shadow: 0 0 50px rgba(0, 255, 136, 0.5);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">🔓 EASTER EGG UNLOCKED</h3>
                <p style="color: var(--text-secondary);">You found the hidden payload!</p>
                <p style="color: var(--accent-gold); font-weight: bold; margin-top: 1rem;">The Looney legacy is unstoppable.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 4px;
                    color: var(--dark-bg);
                    cursor: pointer;
                    font-weight: bold;
                ">Dispatch Signal</button>
            </div>
        `;
        document.body.appendChild(message);
        konamiCode = [];
    }
});