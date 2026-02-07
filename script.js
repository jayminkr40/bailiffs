// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Contact Form Submission with Web3Forms
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalButtonText = submitButton.innerHTML;
            const resultDiv = document.getElementById('result');
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                
                // Replace with your actual Web3Forms access key
                // You need to sign up at https://web3forms.com to get your access key
                formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="form-result success">
                            <i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
                            We will contact you within 24 hours.
                        </div>
                    `;
                    resultDiv.style.display = 'block';
                    contactForm.reset();
                    
                    // Scroll to result
                    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="form-result error">
                        <i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message.
                        Please try again or call us directly at 0800 123 4567.
                    </div>
                `;
                resultDiv.style.display = 'block';
                console.error('Form submission error:', error);
            } finally {
                // Restore button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Hide result after 10 seconds
                setTimeout(() => {
                    resultDiv.style.display = 'none';
                }, 10000);
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}
