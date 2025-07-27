/**
 * AI Prompt Engineer Extension Website - Interactive JavaScript
 * Handles navigation, animations, demo functionality, and user interactions
 */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const heroSection = document.querySelector('.hero');
const platformCards = document.querySelectorAll('.platform-card');
const demoContainer = document.querySelector('.demo-container');
const codeBlocks = document.querySelectorAll('.code-block');
const copyButtons = document.querySelectorAll('.copy-btn');

// State Management
let isMenuOpen = false;
let currentDemoIndex = 0;
let animationFrame = null;

// Initialize website functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollProgressBar();
    initializeNavigation();
    initializeScrollEffects();
    initializePlatformShowcase();
    initializeDemoSection();
    initializeCopyFunctionality();
    initializeAnimations();
    initializeLazyLoading();
    initializePerformanceOptimizations();
});

/**
 * Scroll Progress Bar
 */
function initializeScrollProgressBar() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
        
        // Show/hide progress bar
        if (scrollTop > 100) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
        }
    }, 16));
}

/**
 * Performance Optimizations
 */
function initializePerformanceOptimizations() {
    // Add GPU acceleration to animated elements
    const gpuElements = document.querySelectorAll(`
        .platform-card,
        .feature-card,
        .demo-item,
        .floating-element,
        .btn
    `);
    
    gpuElements.forEach(el => {
        el.classList.add('gpu-accelerated');
    });
    
    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
    
    // Preload critical resources
    const preloadLinks = [
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', as: 'style' }
    ];
    
    preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = link.href;
        preloadLink.as = link.as;
        document.head.appendChild(preloadLink);
    });
}

/**
 * Navigation Functionality
 */
function initializeNavigation() {
    // Mobile menu toggle
    navToggle?.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navToggle.classList.toggle('active', isMenuOpen);
    navMenu.classList.toggle('active', isMenuOpen);
    document.body.classList.toggle('menu-open', isMenuOpen);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

/**
 * Scroll Effects - Enhanced with Minimalistic Animations
 */
function initializeScrollEffects() {
    // Navbar background on scroll with smooth transition
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.scrollY;
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));
    
    // Enhanced Intersection Observer for staggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation based on element type
                if (element.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(element);
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, index * 100);
                } else if (element.classList.contains('platform-detail')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('stat')) {
                    element.classList.add('fade-in');
                    // Trigger counter animation
                    animateCounter(element.querySelector('.stat-number'));
                } else {
                    element.classList.add('animate-in');
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(`
        .feature-card, 
        .platform-detail, 
        .demo-container, 
        .stat,
        .download-container,
        .step
    `);
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth reveal for hero elements
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroTitle) heroTitle.classList.add('fade-in');
        setTimeout(() => {
            if (heroDescription) heroDescription.classList.add('slide-in-left');
        }, 200);
        setTimeout(() => {
            if (heroStats) heroStats.classList.add('fade-in');
        }, 400);
        setTimeout(() => {
            if (heroButtons) heroButtons.classList.add('slide-in-right');
        }, 600);
    }, 500);
    
    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        if (heroVisual && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.3;
            heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        // Subtle floating elements movement
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

/**
 * Platform Showcase Functionality
 */
function initializePlatformShowcase() {
    platformCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.querySelector('.optimization-indicator').style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.querySelector('.optimization-indicator').style.transform = 'scale(1)';
        });
        
        // Staggered animation
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
        
        // Platform-specific color animation
        const platformName = card.classList[1]; // Gets platform class (e.g., 'perplexity')
        card.addEventListener('click', () => {
            showPlatformDemo(platformName);
        });
    });
    
    // Floating elements animation
    animateFloatingElements();
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const delay = parseFloat(element.style.getPropertyValue('--delay')) || 0;
        
        setTimeout(() => {
            element.style.animation = `float 6s ease-in-out infinite`;
            element.style.animationDelay = `${delay}s`;
        }, delay * 1000);
    });
}

/**
 * Demo Section Functionality - Enhanced
 */
function initializeDemoSection() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoItems = document.querySelectorAll('.demo-item');
    const pauseBtn = document.querySelector('.pause-btn');
    const playBtn = document.querySelector('.play-btn');
    const progressFill = document.querySelector('.progress-fill');
    
    let isPlaying = true;
    let progressInterval;
    let demoInterval;
    
    // Platform switching
    demoButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchDemoplatform(index);
            resetProgress();
        });
    });
    
    // Control buttons
    pauseBtn?.addEventListener('click', () => {
        pauseDemoCycle();
        isPlaying = false;
        pauseBtn.classList.add('hidden');
        playBtn.classList.remove('hidden');
    });
    
    playBtn?.addEventListener('click', () => {
        startDemoCycle();
        isPlaying = true;
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    });
    
    // Auto-cycle demo platforms
    startDemoCycle();
    
    // Pause on hover
    demoContainer?.addEventListener('mouseenter', () => {
        if (isPlaying) {
            pauseDemoCycle();
        }
    });
    
    demoContainer?.addEventListener('mouseleave', () => {
        if (isPlaying) {
            startDemoCycle();
        }
    });
    
    function switchDemoplatform(index) {
        // Update active button
        demoButtons.forEach((btn, i) => {
            btn.classList.remove('active');
            if (i === index) {
                btn.classList.add('active');
                // Add visual feedback
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        });
        
        // Update active content with smooth transition
        demoItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'grid';
                setTimeout(() => {
                    item.classList.add('active');
                    // Trigger typing animation
                    const typingElements = item.querySelectorAll('.typing-effect');
                    typingElements.forEach(el => {
                        el.style.animation = 'none';
                        setTimeout(() => {
                            el.style.animation = '';
                        }, 10);
                    });
                }, 10);
            } else {
                item.classList.remove('active');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
        
        currentDemoIndex = index;
    }
    
    function startDemoCycle() {
        if (demoButtons.length === 0) return;
        
        startProgress();
        
        demoInterval = setInterval(() => {
            currentDemoIndex = (currentDemoIndex + 1) % demoButtons.length;
            switchDemoplatform(currentDemoIndex);
            resetProgress();
            startProgress();
        }, 5000); // Increased to 5 seconds for better UX
    }
    
    function pauseDemoCycle() {
        if (demoInterval) {
            clearInterval(demoInterval);
            demoInterval = null;
        }
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
    
    function startProgress() {
        if (!progressFill) return;
        
        let progress = 0;
        const increment = 100 / (5000 / 50); // 5 seconds, update every 50ms
        
        progressInterval = setInterval(() => {
            progress += increment;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 50);
    }
    
    function resetProgress() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
}

function showPlatformDemo(platformName) {
    const demoSection = document.querySelector('#demo');
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    // Find the corresponding demo button
    demoButtons.forEach((btn, index) => {
        if (btn.dataset.platform === platformName) {
            switchDemoplatform(index);
            
            // Scroll to demo section
            demoSection?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

/**
 * Copy Functionality - Enhanced
 */
function initializeCopyFunctionality() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const outputContent = button.closest('.demo-output').querySelector('.output-content');
            const text = outputContent?.textContent.trim() || '';
            
            if (!text) return;
            
            try {
                await navigator.clipboard.writeText(text);
                showCopySuccess(button);
                
                // Track copy action
                trackUserInteraction('copy_prompt', button);
            } catch (err) {
                console.warn('Clipboard API failed, trying fallback');
                try {
                    fallbackCopy(text);
                    showCopySuccess(button);
                } catch (fallbackErr) {
                    console.error('Copy failed:', fallbackErr);
                    showCopyError(button);
                }
            }
        });
        
        // Add tooltip functionality
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('copied')) {
                button.title = 'Copy prompt to clipboard';
            }
        });
    });
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    textArea.remove();
    
    if (!successful) {
        throw new Error('Fallback copy failed');
    }
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    const originalTitle = button.title;
    
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
    `;
    button.classList.add('copied');
    button.title = 'Copied!';
    
    // Add success animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }, 100);
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
        button.title = originalTitle;
    }, 2000);
}

function showCopyError(button) {
    const originalHTML = button.innerHTML;
    
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
    `;
    button.style.color = '#ef4444';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

/**
 * Advanced Animations - Enhanced and Minimalistic
 */
function initializeAnimations() {
    // Initialize all animations
    initializeCounterAnimations();
    initializeFloatingElements();
    initializeMicroInteractions();
    
    // Performance optimization: reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2) {
        document.documentElement.style.setProperty('--transition-fast', '0.1s');
        document.documentElement.style.setProperty('--transition-normal', '0.2s');
        document.documentElement.style.setProperty('--transition-slow', '0.3s');
    }
}

function initializeCounterAnimations() {
    // Enhanced counter animation with easing
    function animateCounter(element) {
        if (!element || element.dataset.animated) return;
        
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        const duration = 2000;
        const startTime = performance.now();
        
        element.dataset.animated = 'true';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easeOutCubic for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeProgress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Expose for use in scroll effects
    window.animateCounter = animateCounter;
}

function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const delay = parseFloat(element.style.getPropertyValue('--delay')) || 0;
        const duration = 6 + (index % 3); // Vary duration slightly
        
        setTimeout(() => {
            element.style.animation = `float ${duration}s ease-in-out infinite`;
            element.style.animationDelay = `${delay}s`;
            
            // Add random slight rotation
            const rotation = (Math.random() - 0.5) * 10;
            element.style.setProperty('--rotation', `${rotation}deg`);
        }, delay * 1000);
    });
}

function initializeMicroInteractions() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn, .demo-btn, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            if (!button.classList.contains('no-hover')) {
                button.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.style.transform = '';
        });
        
        button.addEventListener('mousedown', (e) => {
            button.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', (e) => {
            button.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Enhanced card interactions
    const cards = document.querySelectorAll('.feature-card, .platform-card, .platform-detail');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            
            // Add subtle glow effect
            const glowIntensity = card.dataset.glow || '0.1';
            card.style.boxShadow = `0 10px 30px rgba(99, 102, 241, ${glowIntensity})`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Smooth focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Enhanced easing functions
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutElastic(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

/**
 * Lazy Loading
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Utility Functions
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Performance Monitoring
 */
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    totalTime: perfData.loadEventEnd - perfData.fetchStart
                });
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

/**
 * Error Handling
 */
window.addEventListener('error', (e) => {
    console.error('Website Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

/**
 * Accessibility Enhancements
 */
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Focus management for keyboard navigation
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

/**
 * Analytics and Tracking (Privacy-Friendly)
 */
function trackUserInteraction(action, element) {
    // Privacy-friendly analytics - only track general usage patterns
    if ('localStorage' in window) {
        const interactions = JSON.parse(localStorage.getItem('ai-prompt-interactions') || '{}');
        interactions[action] = (interactions[action] || 0) + 1;
        localStorage.setItem('ai-prompt-interactions', JSON.stringify(interactions));
    }
}

// Track important interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackUserInteraction('download_click', e.target);
    } else if (e.target.matches('.platform-card')) {
        trackUserInteraction('platform_click', e.target);
    } else if (e.target.matches('.demo-btn')) {
        trackUserInteraction('demo_switch', e.target);
    }
});
