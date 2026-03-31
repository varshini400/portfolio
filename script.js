// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
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

// ============================================
// Mobile Menu Toggle
// ============================================
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navContainer = navbar.querySelector('.container');
    
    // Create hamburger menu button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    
    navContainer.appendChild(hamburger);
    
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Show/hide hamburger on resize
    const toggleHamburger = () => {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.classList.remove('active');
        }
    };
    
    window.addEventListener('resize', toggleHamburger);
    toggleHamburger();
};

// ============================================
// Scroll Animation - Reveal Elements on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and about content
const observeElements = () => {
    document.querySelectorAll('.project-card, .about-content').forEach(el => {
        observer.observe(el);
    });
};

// ============================================
// Contact Form Handling
// ============================================
const handleContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || form.querySelector('input[type="text"]').value,
            email: formData.get('email') || form.querySelector('input[type="email"]').value,
            message: formData.get('message') || form.querySelector('textarea').value
        };
        
        // Validate form
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill out all fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Optional: Send to a backend service (uncomment if you have a backend)
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         showNotification('Message sent successfully!', 'success');
        //         form.reset();
        //     }
        // } catch (error) {
        //     showNotification('Error sending message. Please try again.', 'error');
        // }
    });
};

// ============================================
// Email Validation
// ============================================
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ============================================
// Notification System
// ============================================
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background-color: #10b981;' : ''}
        ${type === 'error' ? 'background-color: #ef4444;' : ''}
        ${type === 'info' ? 'background-color: #3b82f6;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ============================================
// Navbar Background Change on Scroll
// ============================================
const handleNavbarBackground = () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
};

// ============================================
// Typing Effect for Hero Text (Optional)
// ============================================
const createTypingEffect = () => {
    const heroP = document.querySelector('.hero-content p');
    if (!heroP) return;
    
    const text = heroP.textContent;
    heroP.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            heroP.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    
    type();
};

// ============================================
// Counter Animation for Stats (Optional)
// ============================================
const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 10);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// ============================================
// Dark Mode Toggle (Optional Feature)
// ============================================
const initDarkMode = () => {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;
    
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggle.textContent = '☀️';
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkMode);
        toggle.textContent = darkMode ? '☀️' : '🌙';
    });
};

// ============================================
// Scroll to Top Button
// ============================================
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.textContent = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #6366f1;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#4f46e5';
        button.style.transform = 'scale(1.1)';
    `
