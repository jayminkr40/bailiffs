// Main JavaScript file for Bailiff Advice UK website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set current date for legal pages
    const currentDateElements = document.querySelectorAll('#current-date');
    if (currentDateElements.length > 0) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        currentDateElements.forEach(el => {
            el.textContent = formattedDate;
        });
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Contact Form Handling
    const homeContactForm = document.getElementById('homeContactForm');
    const contactPageForm = document.getElementById('contactPageForm');
    
    // Handle homepage contact form
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'form-message');
        });
    }
    
    // Handle contact page form
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'contact-page-form-message');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Don't intercept if it's a different page link
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form validation and submission function
    function handleFormSubmit(form, messageElementId) {
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            showFormMessage(messageElementId, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show sending message
        showFormMessage(messageElementId, 'Sending your message...', 'info');
        
        // Simulate sending to email (in a real implementation, you would use a server-side script)
        // For demo purposes, we'll simulate a successful submission
        setTimeout(() => {
            // In a real implementation, you would send the data to your server
            // which would then forward it to anskr1901@gmail.com
            // Example using EmailJS or a backend service would go here
            
            // For demo: Log data to console and show success message
            console.log('Form submission data:', data);
            console.log('In a real implementation, this would be sent to: anskr1901@gmail.com');
            
            // Show success message
            showFormMessage(messageElementId, 'Thank you! Your message has been sent. We will get back to you as soon as possible.', 'success');
            
            // Reset form
            form.reset();
            
            // In a real implementation, you would actually send the email
            // Example using a service like EmailJS:
            // emailjs.sendForm('service_xtxfhdf', 'template_ykyoirb', form, '_CQQuQnfynDUBwW1p')
            //   .then(() => {
            //     showFormMessage(messageElementId, 'Thank you! Your message has been sent.', 'success');
            //     form.reset();
            //   }, (error) => {
            //     showFormMessage(messageElementId, 'Sorry, there was an error sending your message. Please try again.', 'error');
            //     console.error('EmailJS error:', error);
            //   });
        }, 1500);
    }
    
    // Function to show form messages
    function showFormMessage(elementId, message, type) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = type + '-message';
            messageElement.style.display = 'block';
            
            // Scroll to message
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 5 seconds for success, longer for error
            const hideTime = type === 'success' ? 5000 : 10000;
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, hideTime);
        }
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
