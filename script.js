// Page transition animation
const PageTransition = {
    init() {
        this.body = document.body;
        this.setupPageLoad();
        this.setupLanguageToggle();
    },

    setupPageLoad() {
        // Set initial state
        this.body.style.opacity = '0';
        this.body.style.transform = 'translateY(20px)';
        this.body.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Smooth page entrance
        setTimeout(() => {
            this.body.style.opacity = '1';
            this.body.style.transform = 'translateY(0)';
        }, 100);
    },

    setupLanguageToggle() {
        // Language switching is handled by onclick events in HTML
        // This method is kept for potential future enhancements
    },

    handleLanguageSwitch(toggle) {
        // Animate toggle button
        toggle.style.transform = 'scale(0.95)';
        toggle.style.filter = 'brightness(0.9)';
        
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
            toggle.style.filter = 'brightness(1)';
        }, 150);

        // Get target page
        const targetPage = this.getTargetPage();
        
        // Start page exit animation
        this.exitAnimation(() => {
            window.location.href = targetPage;
        });
    },

    getTargetPage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const isEnglish = !currentPage.includes('-zh');
        
        const pageMap = {
            'index.html': 'index-zh.html',
            'about.html': 'about-zh.html',
            'research.html': 'research-zh.html',
            'projects.html': 'projects-zh.html',
            'experience.html': 'experience-zh.html',
            'contact.html': 'contact-zh.html'
        };
        
        const reversePageMap = {};
        Object.keys(pageMap).forEach(key => {
            reversePageMap[pageMap[key]] = key;
        });
        
        if (isEnglish) {
            return pageMap[currentPage] || 'index-zh.html';
        } else {
            return reversePageMap[currentPage] || 'index.html';
        }
    },

    exitAnimation(callback) {
        // Create overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        `;
        
        document.body.appendChild(overlay);
        
        // Animate page exit
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            this.body.style.opacity = '0.3';
            this.body.style.transform = 'translateY(-15px) scale(0.98)';
            this.body.style.filter = 'blur(2px)';
        });
        
        setTimeout(callback, 300);
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrolled = window.scrollY;
        if (scrolled > 50) {
            navbar.style.background = 'rgba(20, 20, 20, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(20, 20, 20, 0.9)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }
});

// Enhanced intersection observer for animations
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
            }, index * 100);
        }
    });
}, observerOptions);

// Force navbar to be fixed - emergency fix
function forceNavbarFixed() {
    const navbars = document.querySelectorAll('.navbar, nav, header');
    navbars.forEach(navbar => {
        if (navbar.classList.contains('navbar') || navbar.tagName.toLowerCase() === 'nav') {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.width = '100%';
            navbar.style.zIndex = '99999';
            navbar.style.transform = 'none';
            
            // 强制覆盖可能的CSS重置
            navbar.style.setProperty('position', 'fixed', 'important');
            navbar.style.setProperty('top', '0', 'important');
            navbar.style.setProperty('z-index', '99999', 'important');
            
            console.log('导航栏已强制设置为固定定位:', navbar);
        }
    });
}

// Initialize animations and page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transitions
    PageTransition.init();
    
    // 强制设置导航栏为固定定位
    forceNavbarFixed();
    
    // 每秒检查一次导航栏定位，确保它保持固定
    setInterval(forceNavbarFixed, 1000);
    
    // Add staggered animation to elements
    const animateElements = document.querySelectorAll('.card, .project-card, .timeline-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // You need to replace this with your actual EmailJS public key
    }

    // Form submission handling with FormSubmit (improved method)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Get form data
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('select[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                // Show shake animation for validation
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
                
                // Highlight empty fields
                [this.querySelector('input[name="name"]'), 
                 this.querySelector('input[name="email"]'), 
                 this.querySelector('select[name="subject"]'), 
                 this.querySelector('textarea[name="message"]')].forEach(field => {
                    if (!field.value) {
                        field.style.borderColor = '#ff3b30';
                        setTimeout(() => field.style.borderColor = '', 3000);
                    }
                });
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<span style="opacity: 0.7;">Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            // Create a temporary form with all data for submission
            const tempForm = document.createElement('form');
            tempForm.action = this.action;
            tempForm.method = 'POST';
            tempForm.style.display = 'none';
            
            // Add all form fields
            const fields = {
                'name': name,
                'email': email,
                'subject': subject,
                'message': message,
                '_subject': this.querySelector('input[name="_subject"]').value,
                '_captcha': 'false',
                '_template': 'table',
                '_autoresponse': this.querySelector('input[name="_autoresponse"]').value
            };
            
            Object.keys(fields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                tempForm.appendChild(input);
            });
            
            // Add target iframe for submission (prevents page navigation)
            const iframe = document.createElement('iframe');
            iframe.name = 'submitFrame';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            tempForm.target = 'submitFrame';
            document.body.appendChild(tempForm);
            
            // Handle iframe load event to detect completion
            iframe.onload = function() {
                // Success - show confirmation
                submitBtn.innerHTML = '✓ Message Sent Successfully!';
                submitBtn.style.background = '#34c759';
                submitBtn.style.transform = 'scale(1)';
                
                // Clean up
                document.body.removeChild(tempForm);
                document.body.removeChild(iframe);
                
                // Redirect to thank you page after showing success
                setTimeout(() => {
                    const isChinesePage = window.location.pathname.includes('-zh');
                    const thankYouPage = isChinesePage ? 'thank-you-zh.html' : 'thank-you.html';
                    window.location.href = thankYouPage;
                }, 2000);
            };
            
            // Handle potential errors
            setTimeout(() => {
                if (submitBtn.innerHTML.includes('Sending...')) {
                    // If still showing "Sending..." after 10 seconds, assume success
                    submitBtn.innerHTML = '✓ Message Sent!';
                    submitBtn.style.background = '#34c759';
                    submitBtn.style.transform = 'scale(1)';
                    
                    setTimeout(() => {
                        const isChinesePage = window.location.pathname.includes('-zh');
                        const thankYouPage = isChinesePage ? 'thank-you-zh.html' : 'thank-you.html';
                        window.location.href = thankYouPage;
                    }, 2000);
                }
            }, 10000);
            
            // Submit the form
            tempForm.submit();
        });
    }
});

// Language switching function
function switchLanguage(targetUrl) {
    const toggle = document.querySelector('.lang-toggle');
    if (toggle) {
        PageTransition.handleLanguageSwitch(toggle);
    }
    
    // Smooth transition to target language
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 300);
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navOverlay) {
        navOverlay.classList.toggle('active');
    }
    
    // Prevent body scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Additional mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const navOverlay = document.querySelector('.nav-overlay');
            
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        const navbar = document.querySelector('.navbar');
        
        if (navbar && !navbar.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
});
