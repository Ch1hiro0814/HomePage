
// ===== Navbar Injection (single source of truth for all pages) =====
function getNavbarConfig() {
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const isZh = currentPage.includes('-zh');

    const pages = {
        home: isZh ? 'index-zh.html' : 'index.html',
        projects: isZh ? 'projects-zh.html' : 'projects.html',
        contact: isZh ? 'contact-zh.html' : 'contact.html',
    };

    const active = {
        home: currentPage.startsWith('index'),
        projects: currentPage.startsWith('projects'),
        contact: currentPage.startsWith('contact'),
        resume: currentPage.startsWith('resume'),
    };

    const label = {
        home: isZh ? '首页' : 'Home',
        projects: isZh ? '项目' : 'Projects',
        resume: isZh ? '简历' : 'Resume',
        contact: isZh ? '联系' : 'Contact',
    };

    const oppositeLang = (() => {
        const map = {
            'index.html': 'index-zh.html', 'index-zh.html': 'index.html',
            'projects.html': 'projects-zh.html', 'projects-zh.html': 'projects.html',
            'contact.html': 'contact-zh.html', 'contact-zh.html': 'contact.html',
            'resume-en.html': 'resume-zh.html', 'resume-zh.html': 'resume-en.html',
            'thank-you.html': 'thank-you-zh.html', 'thank-you-zh.html': 'thank-you.html',
        };
        return map[currentPage] || (isZh ? 'index.html' : 'index-zh.html');
    })();

    return { pages, active, label, oppositeLang, isZh };
}

function loadNavbar() {
    const cfg = getNavbarConfig();
    const nav = document.getElementById('navbar');
    if (!nav) return;

    nav.className = 'navbar';
    nav.innerHTML =
        '<div class="nav-container">'
        + '<div class="nav-logo">'
        +   '<a href="' + cfg.pages.home + '">'
        +     '<img src="images/Chihiro.png" alt="Chihiro">'
        +   '</a>'
        + '</div>'
        + '<div class="nav-toggle" onclick="toggleMobileMenu()">'
        +   '<span class="bar"></span><span class="bar"></span><span class="bar"></span>'
        + '</div>'
        + '<ul class="nav-menu">'
        +   '<li><a href="' + cfg.pages.home + '"' + (cfg.active.home ? ' class="active"' : '') + '>' + cfg.label.home + '</a></li>'
        +   '<li><a href="' + cfg.pages.projects + '"' + (cfg.active.projects ? ' class="active"' : '') + '>' + cfg.label.projects + '</a></li>'
        +   '<li class="resume-dropdown">'
        +     '<span class="resume-btn">' + cfg.label.resume + '</span>'
        +     '<div class="resume-dropdown-content">'
        +       '<a href="resume-en.html" class="resume-option">Resume</a>'
        +       '<a href="resume-zh.html" class="resume-option">简历</a>'
        +     '</div>'
        +   '</li>'
        +   '<li><a href="' + cfg.pages.contact + '"' + (cfg.active.contact ? ' class="active"' : '') + '>' + cfg.label.contact + '</a></li>'
        +   '<li class="language-switcher">'
        +     '<div class="lang-toggle' + (cfg.isZh ? ' zh' : '') + '" onclick="switchLanguage(\'' + cfg.oppositeLang + '\')">'
        +       '<div class="lang-slider"></div>'
        +       '<div class="lang-labels">'
        +         '<span class="lang-label en">EN</span>'
        +         '<span class="lang-label zh">中</span>'
        +       '</div>'
        +     '</div>'
        +   '</li>'
        + '</ul>'
        + '</div>'
        + '<div class="nav-overlay" onclick="toggleMobileMenu()"></div>'
        + '<div class="resume-overlay" onclick="closeResumeMenu()"></div>';
}

// Page transition animation
const PageTransition = {
    init() {
        this.body = document.body;
        this.setupPageLoad();
    },

    setupPageLoad() {
        this.body.style.opacity = '0';
        this.body.style.transform = 'translateY(20px)';
        this.body.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            this.body.style.opacity = '1';
            this.body.style.transform = 'translateY(0)';
        }, 100);
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
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
    // Load shared navbar
    loadNavbar();

    // Initialize page transitions
    PageTransition.init();

    // Add staggered animation to elements
    const animateElements = document.querySelectorAll('.card, .project-card, .timeline-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ' + (index * 0.1) + 's';
        observer.observe(el);
    });

    // Form submission handling with FormSubmit
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Get form data
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('select[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            // Validate required fields
            if (!name || !email || !subject || !message) {
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);

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

            const fields = {
                'name': name, 'email': email, 'subject': subject, 'message': message,
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

            const iframe = document.createElement('iframe');
            iframe.name = 'submitFrame';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            tempForm.target = 'submitFrame';
            document.body.appendChild(tempForm);

            iframe.onload = function() {
                submitBtn.innerHTML = '✓ Message Sent Successfully!';
                submitBtn.style.background = '#34c759';
                submitBtn.style.transform = 'scale(1)';
                document.body.removeChild(tempForm);
                document.body.removeChild(iframe);
                setTimeout(() => {
                    const isChinesePage = window.location.pathname.includes('-zh');
                    const thankYouPage = isChinesePage ? 'thank-you-zh.html' : 'thank-you.html';
                    window.location.href = thankYouPage;
                }, 2000);
            };

            setTimeout(() => {
                if (submitBtn.innerHTML.includes('Sending...')) {
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

            tempForm.submit();
        });
    }
});

// Language switching function
function switchLanguage(targetUrl) {
    window.location.href = targetUrl;
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    if (!navToggle || !navMenu) return;

    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navOverlay) {
        navOverlay.classList.toggle('active');
    }

    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
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
                if (navOverlay) navOverlay.classList.remove('active');
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
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
