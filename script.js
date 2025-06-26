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

// Initialize animations and page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transitions
    PageTransition.init();
    
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

    // Form submission handling with mailto (most reliable method)
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
            const newsletter = this.querySelector('input[name="newsletter"]').checked;
            
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
            submitBtn.innerHTML = '<span style="opacity: 0.7;">Opening Email Client...</span>';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            // Prepare email content
            const emailSubject = `Contact Form: ${subject}`;
            const emailBody = `Name: ${name}
Email: ${email}
Subject: ${subject}
Newsletter Subscription: ${newsletter ? 'Yes' : 'No'}

Message:
${message}

---
Sent from Portfolio Contact Form`;
            
            // Create mailto link
            const mailtoLink = `mailto:chihirowzk@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            try {
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success state
                setTimeout(() => {
                    submitBtn.innerHTML = '✓ Email Client Opened!';
                    submitBtn.style.background = '#34c759';
                    submitBtn.style.transform = 'scale(1)';
                    
                    // Redirect to thank you page after showing success
                    setTimeout(() => {
                        // Determine which thank you page to redirect to
                        const isChinesePage = window.location.pathname.includes('-zh');
                        const thankYouPage = isChinesePage ? 'thank-you-zh.html' : 'thank-you.html';
                        window.location.href = thankYouPage;
                    }, 2000);
                }, 1000);
                
            } catch (error) {
                console.error('Error opening email client:', error);
                submitBtn.innerHTML = 'Error - Please Email Directly';
                submitBtn.style.background = '#ff3b30';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    submitBtn.style.transform = '';
                }, 3000);
            }
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
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu button (for screens where nav-menu is hidden)
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.nav-container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #1d1d1f;
        cursor: pointer;
        padding: 5px;
    `;
    
    // Show mobile menu button on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleScreenChange(e) {
        if (e.matches) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
        }
    }
    
    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navbar.appendChild(mobileMenuBtn);
});
