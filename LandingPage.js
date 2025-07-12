// Enhanced JavaScript with modern animations and interactions

// Loading Screen Management
const loadingScreen = document.getElementById('loadingScreen');

// Hide loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle with enhanced animations
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger animation
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}));

// Enhanced Carousel with smooth animations
class EnhancedCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.items = document.querySelectorAll('.item-card');
        this.currentIndex = 0;
        this.itemsToShow = this.getItemsToShow();
        this.itemWidth = this.items[0].offsetWidth + 24; // including gap
        this.isAnimating = false;
        
        this.init();
    }

    getItemsToShow() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-play carousel with pause on hover
        this.autoPlay();
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.autoPlay());

        // Touch/swipe support for mobile
        this.initTouchSupport();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.itemsToShow = this.getItemsToShow();
            this.itemWidth = this.items[0].offsetWidth + 24;
            this.updateCarousel();
        });

        // Add entrance animations to items
        this.animateItems();
    }

    initTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                isDragging = false;
            }
        });

        this.track.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const maxIndex = this.items.length - this.itemsToShow;
        this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const maxIndex = this.items.length - this.itemsToShow;
        this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.itemWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Add visual feedback to buttons
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.items.length - this.itemsToShow ? '0.5' : '1';
    }

    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    animateItems() {
        this.items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Smooth scrolling with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar with parallax effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
        navbar.style.transform = 'translateY(0)';
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Arrow Functionality
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const nextSection = document.querySelector('.platform-intro');
        if (nextSection) {
            const offsetTop = nextSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Enhanced Intersection Observer with staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-up');
            }, index * 100);
        }
    });
}, observerOptions);

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced carousel
    new EnhancedCarousel();
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .prop-card, .step, .item-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Enhanced button click handlers with ripple effect
    const startSwappingBtn = document.querySelector('.btn-primary');
    const browseItemsBtn = document.querySelector('.btn-secondary');
    const listItemBtn = document.querySelector('.btn-tertiary');

    startSwappingBtn.addEventListener('click', (e) => {
        createRippleEffect(e);
        setTimeout(() => {
            alert('Welcome to ReWear! Sign up feature coming soon.');
        }, 300);
    });

    browseItemsBtn.addEventListener('click', (e) => {
        createRippleEffect(e);
        setTimeout(() => {
            document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });

    listItemBtn.addEventListener('click', (e) => {
        createRippleEffect(e);
        setTimeout(() => {
            alert('List your items feature coming soon!');
        }, 300);
    });

    // CTA section buttons
    const ctaButtons = document.querySelectorAll('.cta-section .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            createRippleEffect(e);
            if (btn.textContent.includes('Join')) {
                setTimeout(() => {
                    alert('Welcome to ReWear! Sign up feature coming soon.');
                }, 300);
            } else {
                setTimeout(() => {
                    document.querySelector('#how-it-works').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    });

    // Enhanced item card interactions
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', (e) => {
            createRippleEffect(e, card);
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });

        // Keyboard navigation for accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Add pulse animation to primary CTA
    startSwappingBtn.classList.add('pulse');

    // Animate hero stats
    animateHeroStats();
});

// Animate hero stats with counting effect
function animateHeroStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const suffix = stat.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// Ripple effect function
function createRippleEffect(event, element = event.target) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced button interactions with better feedback
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 400);
        }
        
        if (heroButtons) {
            heroButtons.style.opacity = '0';
            heroButtons.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroButtons.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 600);
        }

        if (heroStats) {
            heroStats.style.opacity = '0';
            heroStats.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroStats.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }, 800);
        }
    }, 100);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Add smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Initialize sections with initial state
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Add focus styles for better accessibility
document.querySelectorAll('button, a, [tabindex]').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #667eea';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});