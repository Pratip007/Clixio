// Website loaded message
console.log('Clixio Dental Marketing Website loaded successfully!');

// DOM Elements
const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
const header = document.querySelector('header');

// Mobile Menu Toggle with Enhanced Animation
if (mobileMenuBtn && mobileMenu) {
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Open menu
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            
            // Animate menu opening
            requestAnimationFrame(() => {
                mobileMenu.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                mobileMenu.style.opacity = '1';
            });
            
            // Animate hamburger to X
            animateHamburgerToX();
            
            // Prevent body scroll on mobile
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            mobileMenu.style.transition = 'max-height 0.3s ease-in, opacity 0.3s ease-in';
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            
            // Animate X back to hamburger
            animateXToHamburger();
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    function animateHamburgerToX() {
        const line1 = document.getElementById('menu-line-1');
        const line2 = document.getElementById('menu-line-2');
        const line3 = document.getElementById('menu-line-3');
        
        if (line1 && line2 && line3) {
            line1.style.transform = 'rotate(45deg) translateY(6px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translateY(-6px)';
        }
    }

    function animateXToHamburger() {
        const line1 = document.getElementById('menu-line-1');
        const line2 = document.getElementById('menu-line-2');
        const line3 = document.getElementById('menu-line-3');
        
        if (line1 && line2 && line3) {
            line1.style.transform = 'rotate(0deg) translateY(0px)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0deg) translateY(0px)';
        }
    }

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            // Close mobile menu on desktop
            toggleMobileMenu();
        }
    });
}

// Header Scroll Effect with Mobile Optimization
function handleScroll() {
    if (header) {
        const scrollY = window.scrollY;
        const isMobile = window.innerWidth < 768;
        
        if (scrollY > (isMobile ? 50 : 100)) {
            header.classList.remove('bg-white/95');
            header.classList.add('bg-white/98', 'shadow-lg');
        } else {
            header.classList.remove('bg-white/98', 'shadow-lg');
            header.classList.add('bg-white/95');
        }
    }
}

// Throttled scroll handler for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
});

// Smooth Scrolling for Navigation Links with Mobile Optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header?.offsetHeight || (window.innerWidth < 768 ? 64 : 80);
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Touch-friendly interactions
function addTouchSupport() {
    // Add touch feedback to buttons
    document.querySelectorAll('button, .btn, .clickable').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Prevent iOS zoom on form inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                this.style.fontSize = '16px';
            }
        });
    });
}

// Initialize touch support
addTouchSupport();

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            if (target === 450) {
                element.textContent = '450%';
            } else if (target === 500) {
                element.textContent = '500+';
            } else if (target === 350) {
                element.textContent = '350%';
            } else if (target === 98) {
                element.textContent = '98%';
            } else {
                element.textContent = Math.floor(target);
            }
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for Animations with Mobile Optimization
const observerOptions = {
    threshold: window.innerWidth < 768 ? 0.05 : 0.1,
    rootMargin: window.innerWidth < 768 ? '0px 0px -25px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes
            entry.target.classList.add('animate-fade-in-up');
            
            // Animate stat counters when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (target && !entry.target.classList.contains('animated')) {
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                }
            }

            // Animate testimonial results
            if (entry.target.querySelector('.testimonial-results')) {
                const resultNumbers = entry.target.querySelectorAll('.text-lg.font-bold');
                resultNumbers.forEach(numberEl => {
                    if (!numberEl.classList.contains('animated')) {
                        const text = numberEl.textContent;
                        const target = parseInt(text.replace(/[^\d]/g, '')) || 0;
                        if (target > 0) {
                            animateCounter(numberEl, target, 1500);
                            numberEl.classList.add('animated');
                        }
                    }
                });
            }
        }
    });
}, observerOptions);

// Enhanced Button Interactions with Mobile Support
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Skip ripple effect on mobile for better performance
        if (window.innerWidth >= 768) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Disable animations on mobile for better performance
        document.querySelectorAll('.animate-float, .float-image').forEach(el => {
            el.style.animation = 'none';
        });
        
        // Reduce parallax effects on mobile
        document.querySelectorAll('.parallax-bg').forEach(el => {
            el.style.backgroundAttachment = 'scroll';
        });
        
        // Add mobile-specific classes
        document.body.classList.add('mobile-device');
    }
}

// Initialize mobile optimizations
initMobileOptimizations();

// Re-run on orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(initMobileOptimizations, 100);
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
    }
    
    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .mobile-device .hover-lift:hover,
        .mobile-device .service-card:hover,
        .mobile-device .testimonial-card:hover {
            transform: none !important;
        }
        
        .mobile-device .animate-bounce,
        .mobile-device .animate-pulse {
            animation: none !important;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Service Card Interactions
document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-3"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Service Button Click Tracking
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Learn More')) {
        btn.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.bg-white');
            const serviceName = serviceCard?.querySelector('h3')?.textContent || 'Service';
            console.log(`Service clicked: ${serviceName}`);
            
            // Show interest notification
            showNotification(`Interested in ${serviceName}? Let's discuss your needs!`, 'info');
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = header?.offsetHeight || 80;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// CTA Button Enhancements
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Get Free') || btn.textContent.includes('Schedule')) {
        btn.addEventListener('click', () => {
            showNotification('Thank you for your interest! We\'ll contact you within 24 hours.', 'success');
        });
    }
});

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('#services .bg-white');
    serviceCards.forEach(card => observer.observe(card));
    
    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('#testimonials .bg-white');
    testimonialCards.forEach(card => observer.observe(card));
    
    // Add scroll animations to other elements
    const elementsToAnimate = [
        'h1', 'h2', 'h3', '.text-lg', '.grid'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('observed')) {
                observer.observe(el);
                el.classList.add('observed');
            }
        });
    });
});

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Website loaded in ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
        console.warn('Website loading time is above 3 seconds');
    }
});

// Add loading state for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Get Free') || this.textContent.includes('Schedule')) {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const rate = scrolled * -0.3;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

console.log('Enhanced Clixio features loaded with Tailwind CSS!');
