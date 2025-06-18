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
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual submission logic)
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
    
    // In a real implementation, you would send the data to a server
    console.log('Form submission:', { name, email, phone, service, message });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Style the message
    message.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' ? 
            'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(message, form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
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
