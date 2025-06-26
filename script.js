<<<<<<< HEAD
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
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
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.card, .project-card, .timeline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

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

// Smooth fade-in animation for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Initialize page with hidden body to prevent flash
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
}); 
=======
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
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(5px)';
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

    // Form submission handling with enhanced UX
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span style="opacity: 0.7;">Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Sent!';
                submitBtn.style.background = '#34c759';
                submitBtn.style.transform = 'scale(1)';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Enhanced language toggle animation
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.style.opacity = '0';
        langToggle.style.transform = 'translateY(-15px) scale(0.9)';
        
        setTimeout(() => {
            langToggle.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            langToggle.style.opacity = '1';
            langToggle.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.3;
        const opacity = Math.max(0.3, 1 - scrolled / window.innerHeight);
        hero.style.transform = `translateY(${speed}px)`;
        hero.style.opacity = opacity;
    }
});

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Add mobile menu button
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.nav-container');
    if (!navbar) return;
    
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
        padding: 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
    `;
    
    mobileMenuBtn.addEventListener('mouseenter', () => {
        mobileMenuBtn.style.background = 'rgba(0, 0, 0, 0.05)';
        mobileMenuBtn.style.transform = 'scale(1.1)';
    });
    
    mobileMenuBtn.addEventListener('mouseleave', () => {
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.transform = 'scale(1)';
    });
    
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleScreenChange(e) {
        mobileMenuBtn.style.display = e.matches ? 'block' : 'none';
    }
    
    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navbar.appendChild(mobileMenuBtn);
});

// Language switcher function for onclick events
function switchLanguage(targetUrl) {
    const toggle = event.currentTarget;
    
    // Animate toggle button
    toggle.style.transform = 'scale(0.95)';
    toggle.style.filter = 'brightness(0.9)';
    
    setTimeout(() => {
        toggle.style.transform = 'scale(1)';
        toggle.style.filter = 'brightness(1)';
    }, 150);

    // Start page exit animation
    PageTransition.exitAnimation(() => {
        window.location.href = targetUrl;
    });
}

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// PDF Embed Functionality
const PDFEmbed = {
    init() {
        this.container = null;
        this.isVisible = true;
        this.createPDFEmbed();
        this.setupEventListeners();
    },

    createPDFEmbed() {
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'pdf-toggle-btn';
        toggleBtn.innerHTML = '📄 Course PDF';
        toggleBtn.setAttribute('data-action', 'toggle-pdf');
        document.body.appendChild(toggleBtn);

        // Create PDF container
        this.container = document.createElement('div');
        this.container.className = 'pdf-embed-container';
        this.container.innerHTML = `
            <div class="pdf-embed-header">
                <div class="pdf-embed-title">COMSW4111_003_2024_3.pdf</div>
                <div class="pdf-embed-controls">
                    <button class="pdf-embed-download" data-action="download-pdf">
                        <span>↓</span>下载
                    </button>
                    <button class="pdf-embed-close" data-action="close-pdf">×</button>
                </div>
            </div>
            <iframe class="pdf-embed-viewer" 
                    src="COMSW4111_003_2024_3.pdf#toolbar=0&navpanes=0&scrollbar=1" 
                    type="application/pdf">
                <p>您的浏览器不支持PDF预览。<a href="COMSW4111_003_2024_3.pdf" target="_blank">点击这里下载PDF</a></p>
            </iframe>
        `;
        document.body.appendChild(this.container);

        // Setup wheel scrolling for PDF
        this.setupPDFScrolling();
    },

    setupPDFScrolling() {
        const pdfViewer = this.container.querySelector('.pdf-embed-viewer');
        if (pdfViewer) {
            pdfViewer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const scrollAmount = e.deltaY > 0 ? 50 : -50;
                pdfViewer.scrollTop += scrollAmount;
            }, { passive: false });
        }
    },

    setupEventListeners() {
        // Toggle button click
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'toggle-pdf') {
                this.toggle();
            } else if (e.target.dataset.action === 'close-pdf') {
                this.hide();
            } else if (e.target.dataset.action === 'download-pdf' || e.target.closest('[data-action="download-pdf"]')) {
                this.downloadPDF();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });

        // Update toggle button text based on visibility
        this.updateToggleButton();
    },

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    },

    show() {
        if (this.container) {
            this.container.classList.remove('hidden');
            this.isVisible = true;
            this.updateToggleButton();
            this.updateMainContentLayout();
        }
    },

    hide() {
        if (this.container) {
            this.container.classList.add('hidden');
            this.isVisible = false;
            this.updateToggleButton();
            this.updateMainContentLayout();
        }
    },

    updateMainContentLayout() {
        const mainContent = document.querySelector('.main-content');
        
        if (mainContent) {
            // Remove all layout classes
            mainContent.classList.remove('with-pdf');
            
            // Add class if PDF is visible
            if (this.isVisible) {
                mainContent.classList.add('with-pdf');
            }
        }
    },

    updateToggleButton() {
        const toggleBtn = document.querySelector('.pdf-toggle-btn');
        if (toggleBtn) {
            toggleBtn.innerHTML = this.isVisible ? '📄 隐藏PDF' : '📄 显示PDF';
        }
    },

    downloadPDF() {
        const pdfUrl = 'COMSW4111_003_2024_3.pdf';
        const fileName = 'COMSW4111_003_2024_3.pdf';
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download feedback
        this.showDownloadFeedback();
    },

    showDownloadFeedback() {
        const downloadBtn = this.container.querySelector('.pdf-embed-download');
        if (downloadBtn) {
            const originalHTML = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<span>✓</span>已下载';
            downloadBtn.style.color = '#34c759';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.style.color = '';
            }, 2000);
        }
    },

    updateMainContentLayout() {
        const mainContent = document.querySelector('.main-content');
        const videoEmbed = document.querySelector('.video-embed-container');
        const isVideoVisible = videoEmbed && !videoEmbed.classList.contains('hidden');
        
        if (mainContent) {
            // Remove all layout classes
            mainContent.classList.remove('with-pdf', 'with-video', 'with-both');
            
            // Add appropriate class based on what's visible
            if (this.isVisible && isVideoVisible) {
                mainContent.classList.add('with-both');
            } else if (this.isVisible) {
                mainContent.classList.add('with-pdf');
            } else if (isVideoVisible) {
                mainContent.classList.add('with-video');
            }
        }
    }
};

// Initialize PDF embed and Video embed only on projects pages
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    if (currentPage === 'projects.html' || currentPage === 'projects-zh.html') {
        PDFEmbed.init();
        VideoEmbed.init();
    }
});

// Video Embed Functionality
const VideoEmbed = {
    init() {
        this.videoId = 'MEgXcAhMBZw'; // YouTube视频ID
        this.videoUrl = `https://www.youtube.com/watch?v=${this.videoId}`;
        // 使用nocookie域名并优化参数以避免播放限制
        this.embedUrl = `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}`;
        this.createVideoEmbed();
        this.setupEventListeners();
    },

    createVideoEmbed() {
        const container = document.getElementById('embedded-video-container');
        if (!container) {
            console.warn('Video container not found');
            return;
        }

        container.innerHTML = `
            <div class="video-controls">
                <div class="video-title">数学研究方法演示</div>
                <div class="video-actions">
                    <button class="video-btn" data-action="refresh-video">
                        <span>🔄</span>刷新
                    </button>
                    <button class="video-btn" data-action="fullscreen-video">
                        <span>⛶</span>全屏
                    </button>
                    <button class="video-btn" data-action="open-youtube">
                        <span>🔗</span>YouTube
                    </button>
                </div>
            </div>
            <iframe class="video-iframe" 
                    src="${this.embedUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    onload="this.style.opacity='1'"
                    onerror="VideoEmbed.handleVideoError()">
            </iframe>
            <div class="video-fallback" style="display: none;">
                <h4>视频加载遇到问题</h4>
                <p>如果视频无法正常播放，可能是由于网络限制或浏览器设置。</p>
                <a href="${this.videoUrl}" target="_blank" rel="noopener noreferrer">
                    在 YouTube 上观看 →
                </a>
            </div>
        `;

        // 检测视频加载状态
        this.checkVideoLoad();
    },

    checkVideoLoad() {
        const iframe = document.querySelector('.video-iframe');
        const fallback = document.querySelector('.video-fallback');
        
        if (iframe && fallback) {
            // 设置初始透明度
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 0.3s ease';
            
            // 5秒后检查是否加载成功
            setTimeout(() => {
                if (iframe.style.opacity !== '1') {
                    iframe.style.display = 'none';
                    fallback.style.display = 'block';
                }
            }, 5000);
        }
    },

    handleVideoError() {
        const iframe = document.querySelector('.video-iframe');
        const fallback = document.querySelector('.video-fallback');
        
        if (iframe && fallback) {
            iframe.style.display = 'none';
            fallback.style.display = 'block';
        }
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'fullscreen-video' || e.target.closest('[data-action="fullscreen-video"]')) {
                this.toggleFullscreen();
            } else if (e.target.dataset.action === 'refresh-video' || e.target.closest('[data-action="refresh-video"]')) {
                this.refreshVideo();
            } else if (e.target.dataset.action === 'open-youtube' || e.target.closest('[data-action="open-youtube"]')) {
                this.openInYouTube();
            }
        });
    },

    toggleFullscreen() {
        const iframe = document.querySelector('.video-iframe');
        if (iframe) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }
            
            this.showButtonFeedback('fullscreen-video', '✓ 全屏中');
        }
    },

    refreshVideo() {
        const iframe = document.querySelector('.video-iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = currentSrc;
            }, 100);
            
            this.showButtonFeedback('refresh-video', '✓ 已刷新');
        }
    },

    openInYouTube() {
        window.open(this.videoUrl, '_blank', 'noopener,noreferrer');
        this.showButtonFeedback('open-youtube', '✓ 已打开');
    },

    showButtonFeedback(action, message) {
        const button = document.querySelector(`[data-action="${action}"]`);
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = message;
            button.style.color = '#34c759';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.color = '';
            }, 2000);
        }
    }
};

>>>>>>> 20688d3 (第一次提交：上传我的网页)
