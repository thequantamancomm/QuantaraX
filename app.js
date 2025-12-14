// Global variables
// Removed particle variables

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    handleLoadingScreen();
    // initParticleBackground(); // Removed
    initSmoothScrolling();
    initScrollAnimations();
    initNavigation();
    initInteractiveElements();
    initContactHandling();
    
    // animateParticles(); // Removed
}

// Loading Screen Handler
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 1000);
    }, 2000); // You can adjust this timing
}

function triggerEntranceAnimations() {
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Start typing effect for hero subtitle
    initTypingEffect();
}

// Particle Background System - REMOVED
// function initParticleBackground() { ... }
// function animateParticles() { ... }

// Smooth Scrolling Navigation - Fixed version
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    // Note: The .cta-button in the hero is now a link, not a scroll trigger.
    // We only need to handle the nav links.
    
    // Function to scroll to target smoothly
    function scrollToTarget(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = 80; // Fixed navbar height
            const offsetTop = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = link.getAttribute('href');
            scrollToTarget(targetId);
            
            // Update active navigation
            updateActiveNav(link);
        });
    });
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.value-card, .platform-card, .leader-card, .initiative-card, .contact-card, .status-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(element);
    });
    
    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        scrollObserver.observe(title);
    });
    
    // Content text animation
    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(15px)';
        text.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        scrollObserver.observe(text);
    });
}

// Navigation Scroll Effects
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section based on scroll position
        updateActiveSection();
        
        // updateParticleBackground(currentScrollY); // Removed
        
        lastScrollY = currentScrollY;
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    let currentIndex = -1;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
            currentIndex = index;
        }
    });
    
    // Update navigation active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// function updateParticleBackground(scrollY) { ... } // Removed

// Interactive Elements
function initInteractiveElements() {
    initHoverEffects();
    initClickEffects();
    initCardAnimations();
}

function initHoverEffects() {
    // CTA Button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            createRippleEffect(ctaButton);
        });
    }
    
    // Card hover effects
    const cards = document.querySelectorAll('.value-card, .platform-card, .leader-card, .initiative-card, .contact-card, .status-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            createGlowEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Navigation link effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            createGlowEffect(this);
        });
    });
    
    // Contact links hover effects
    const contactLinks = document.querySelectorAll('.contact-card a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(159, 43, 255, 0.5)'; // Updated color
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width - size) / 2 + 'px';
    ripple.style.top = (rect.height - size) / 2 + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createGlowEffect(element) {
    const originalBoxShadow = element.style.boxShadow;
    element.style.boxShadow = '0 0 20px rgba(159, 43, 255, 0.4)'; // Updated color
    
    setTimeout(() => {
        element.style.boxShadow = originalBoxShadow;
    }, 300);
}

function initClickEffects() {
    // Platform cards click effect
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            showPlatformModal(cardTitle, this.querySelector('p').textContent);
        });
    });
    
    // Initiative cards click effect
    const initiativeCards = document.querySelectorAll('.initiative-card');
    initiativeCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            showInitiativeModal(cardTitle, this.querySelector('p').textContent);
        });
    });
}

function showPlatformModal(title, description) {
    showModal(title, description, 'Platform Feature');
}

function showInitiativeModal(title, description) {
    showModal(title, description, 'Future Initiative');
}

function showModal(title, description, type) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(44, 42, 63, 0.95); /* Updated color */
        border: 1px solid rgba(159, 43, 255, 0.3); /* Updated color */
        border-radius: 12px;
        padding: 32px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="color: rgba(159, 43, 255, 0.7); font-size: 14px; margin-bottom: 8px;">${type}</div>
        <h3 style="color: var(--color-primary-purple); margin-bottom: 16px; font-size: 24px;">${title}</h3>
        <p style="color: var(--color-light-text); line-height: 1.6; margin-bottom: 24px; opacity: 0.9;">${description}</p>
        <button class="close-modal" style="
            background: linear-gradient(45deg, var(--color-primary-purple), var(--color-primary-blue));
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            color: var(--color-light-text);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    const closeButton = modalContent.querySelector('.close-modal');
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(159, 43, 255, 0.3)'; // Updated color
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function initCardAnimations() {
    // Add staggered animation delays
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const initiativeCards = document.querySelectorAll('.initiative-card');
    initiativeCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Contact Handling
function initContactHandling() {
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                heroSubtitle.appendChild(cursor);
                
                setTimeout(() => {
                    cursor.remove();
                }, 3000);
            }
        };
        
        setTimeout(typeWriter, 1000); // Start after 1 second
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .modal-overlay {
        backdrop-filter: blur(10px);
    }
    
    .nav-link.active {
        color: var(--color-primary-purple) !important;
        background: rgba(var(--color-primary-purple-rgb), 0.1) !important;
    }
    
    .nav-link.active .binary-icon {
        background: rgba(var(--color-primary-purple-rgb), 0.3) !important;
    }
    
    /* Scroll indicator */
    .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary-purple), var(--color-primary-blue));
        z-index: 10001;
        transform-origin: left;
        transition: transform 0.3s ease;
        width: 100%;
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        indicator.style.transform = `scaleX(${Math.min(scrollPercent / 100, 1)})`;
    });
}

// Initialize scroll indicator
addScrollIndicator();

// Performance optimizations - REMOVED
// function optimizePerformance() { ... }

// Handle visibility change for performance - REMOVED
// document.addEventListener('visibilitychange', () => { ... });

// Initialize performance optimizations - REMOVED
// optimizePerformance();

// Cleanup on page unload - REMOVED
// window.addEventListener('beforeunload', () => { ... });

// Easter egg: Konami code - REMOVED
// let konamiCode = [];
// ...
// function activateQuantumMode() { ... }