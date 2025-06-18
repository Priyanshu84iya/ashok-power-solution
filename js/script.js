// Enhanced JavaScript for Ashok Power Solution Website

// Variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeScrollIndicator();
    initializeContactAnimations();
    initializeParticleAnimation();
    initializeFormEnhancements();
});

// Slider Functions
function initializeSlider() {
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    }
}

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
    resetAutoSlide();
}

function currentSlideFunc(index) {
    currentSlide = index - 1;
    showSlide(currentSlide);
    resetAutoSlide();
}

function nextSlide() {
    changeSlide(1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
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
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add real-time validation
        addFormValidation(contactForm);
    }
}

function addFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    if (fieldName === 'email' && value) {
        if (!isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldName === 'phone' && value) {
        if (!isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 5px;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderBottomColor = '#dc3545';
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderBottomColor = '';
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        service: 'Service',
        message: 'Message'
    };
    return labels[fieldName] || fieldName;
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        service: formData.get('service'),
        message: formData.get('message').trim()
    };
    
    // Validate all fields
    let isValid = true;
    const requiredFields = ['name', 'email', 'phone', 'message'];
    
    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Simulate processing delay
    setTimeout(() => {
        if (isValid) {
            // Simulate successful submission
            showMessage('✅ Thank you for your message! We will contact you within 24 hours.', 'success');
            
            // Create email link for manual follow-up
            createEmailLink(data);
            
            // Reset form
            form.reset();
            
            // Store submission in localStorage for reference
            storeFormSubmission(data);
            
        } else {
            showMessage('❌ Please correct the errors below and try again.', 'error');
        }
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function createEmailLink(data) {
    const emailBody = `
Dear Ashok Power Solution,

I am interested in your services. Here are my details:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Required: ${data.service || 'Not specified'}

Message:
${data.message}

Please contact me at your earliest convenience.

Best regards,
${data.name}
    `.trim();
    
    const emailLink = `mailto:ashokpowersolution@gmail.com?subject=Service Inquiry from ${data.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Show option to open email client
    setTimeout(() => {
        if (confirm('Would you like to open your email client to send this message directly?')) {
            window.location.href = emailLink;
        }
    }, 2000);
}

function storeFormSubmission(data) {
    const timestamp = new Date().toISOString();
    const submission = { ...data, timestamp };
    
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(submission);
    
    // Keep only last 10 submissions
    if (submissions.length > 10) {
        submissions = submissions.slice(-10);
    }
    
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Allow various phone number formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone);
}

function showMessage(text, type) {
    const notification = document.getElementById('messageNotification');
    
    if (notification) {
        notification.innerHTML = text;
        notification.className = `message-notification ${type}`;
        notification.style.display = 'block';
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 8000);
        
        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Add scroll indicator functionality
function initializeScrollIndicator() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // Update scroll indicator on scroll
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    }, 10));
}

// Enhanced Contact Page Animations and Effects
function initializeContactAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay * 1000);
            }
        });
    }, observerOptions);
    
    // Observe all elements with wow-animation class
    document.querySelectorAll('.wow-animation').forEach(el => {
        observer.observe(el);
    });
}

function initializeParticleAnimation() {
    // Create floating particles effect
    const heroSection = document.querySelector('.contact-hero');
    if (heroSection) {
        for (let i = 0; i < 50; i++) {
            createParticle(heroSection);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

function initializeFormEnhancements() {
    // Enhanced form interactions
    const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');
    
    formInputs.forEach(input => {
        // Auto-resize textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', autoResize);
        }
        
        // Focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
    
    // Form submission with enhanced feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleEnhancedSubmission);
    }
}

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

function handleEnhancedSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <span class="btn-text">Sending...</span>
        <span class="btn-icon">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showEnhancedMessage('🎉 Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form state
        document.querySelectorAll('.floating-label').forEach(label => {
            label.classList.remove('focused');
        });
    }, 2000);
}

function showEnhancedMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.enhanced-form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `enhanced-form-message ${type}`;
    message.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="message-text">${text}</div>
        </div>
    `;
    
    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #EF4444, #DC2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4s forwards;
        max-width: 400px;
    `;
    
    document.body.appendChild(message);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature, .tech-item').forEach(el => {
        observer.observe(el);
    });
}

// Global functions (for onclick handlers in HTML)
window.changeSlide = changeSlide;
window.currentSlide = currentSlideFunc;

// Initialize animations when page loads
window.addEventListener('load', initializeAnimations);

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .message-icon {
        font-size: 1.2rem;
    }
    
    .message-text {
        flex: 1;
        font-weight: 500;
    }
    
    .floating-label.focused .form-underline {
        left: 0;
        width: 100%;
    }
`;
document.head.appendChild(style);
