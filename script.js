// Spares & Brothers Interactive JavaScript
console.log("Spares & Brothers website loaded successfully!");

// Global variables
let currentSlide = 0;
let slides = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Initialize all interactive features
    initializeAccordions();
    initializeTabs();
    initializeModals();
    initializeLightbox();
    initializeSearch();
    initializeFormValidation();
    initializeDynamicContent();
    initializeImageGallery();
    initializeTestimonialsSlider();
    initializeProductFilters();
    initializeInquiryModal();
});

// ===== ACCORDIONS =====
function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// ===== TABS =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===== MODALS =====
function initializeModals() {
    // Modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close, .modal .btn-close');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// ===== LIGHTBOX GALLERY =====
function initializeLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img, .lightbox-trigger');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <img src="" alt="" id="lightbox-image">
                <div class="lightbox-caption" id="lightbox-caption"></div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&larr;</button>
                <button class="lightbox-next">&rarr;</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const images = Array.from(galleryImages);

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            showLightbox(this.src, this.alt);
        });
    });

    function showLightbox(src, alt) {
        document.getElementById('lightbox-image').src = src;
        document.getElementById('lightbox-caption').textContent = alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Navigation
    document.querySelector('.lightbox-prev').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const img = images[currentImageIndex];
        showLightbox(img.src, img.alt);
    });

    document.querySelector('.lightbox-next').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const img = images[currentImageIndex];
        showLightbox(img.src, img.alt);
    });

    // Close lightbox
    document.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    document.querySelector('.lightbox-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            const text = product.querySelector('.card-text').textContent.toLowerCase();

            if (title.includes(query) || text.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateContactForm()) {
                // Simulate form submission
                showFormSuccess('contactForm', 'Thank you for your message! We\'ll get back to you within 24 hours.');
                contactForm.reset();
            }
        });
    }

    // Review Form Validation
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateReviewForm()) {
                showFormSuccess('reviewForm', 'Thank you for your review! It will be published after moderation.');
                reviewForm.reset();
            }
        });
    }
}

function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Name validation
    if (name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearFieldError('name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('email');
    }

    // Subject validation
    if (subject.length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    } else {
        clearFieldError('subject');
    }

    // Message validation
    if (message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearFieldError('message');
    }

    return isValid;
}

function validateReviewForm() {
    const name = document.getElementById('reviewName').value.trim();
    const rating = document.getElementById('reviewRating').value;
    const message = document.getElementById('reviewMessage').value.trim();

    let isValid = true;

    if (name.length < 2) {
        showFieldError('reviewName', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearFieldError('reviewName');
    }

    if (!rating) {
        showFieldError('reviewRating', 'Please select a rating');
        isValid = false;
    } else {
        clearFieldError('reviewRating');
    }

    if (message.length < 10) {
        showFieldError('reviewMessage', 'Review must be at least 10 characters');
        isValid = false;
    } else {
        clearFieldError('reviewMessage');
    }

    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.field-error');

    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-danger mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    field.classList.add('is-invalid');
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.field-error');

    if (existingError) {
        existingError.remove();
    }

    field.classList.remove('is-invalid');
}

function showFormSuccess(formId, message) {
    const form = document.getElementById(formId);
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;

    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== DYNAMIC CONTENT =====
function initializeDynamicContent() {
    // Update live statistics
    updateLiveStats();

    // Real-time clock for business hours
    updateBusinessHours();

    // Set interval for live updates
    setInterval(updateLiveStats, 30000); // Update every 30 seconds
    setInterval(updateBusinessHours, 60000); // Update every minute
}

function updateLiveStats() {
    // Simulate live data updates
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 3); // Small random increase
        stat.textContent = newValue.toLocaleString();
    });
}

function updateBusinessHours() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const businessHours = {
        monday: { open: 8 * 60, close: 17 * 60 },
        tuesday: { open: 8 * 60, close: 17 * 60 },
        wednesday: { open: 8 * 60, close: 17 * 60 },
        thursday: { open: 8 * 60, close: 17 * 60 },
        friday: { open: 8 * 60, close: 17 * 60 },
        saturday: { open: 8 * 60, close: 14 * 60 },
        sunday: { open: 0, close: 0 }
    };

    const dayOfWeek = now.toLowerCase();
    const todayHours = businessHours[dayOfWeek];

    const statusElement = document.getElementById('business-status');
    if (statusElement) {
        if (todayHours.close === 0) {
            statusElement.innerHTML = '<i class="fas fa-times-circle text-danger me-1"></i>Closed Today';
            statusElement.className = 'business-status closed';
        } else if (currentTime >= todayHours.open && currentTime < todayHours.close) {
            statusElement.innerHTML = '<i class="fas fa-check-circle text-success me-1"></i>Open Now';
            statusElement.className = 'business-status open';
        } else {
            statusElement.innerHTML = '<i class="fas fa-clock text-warning me-1"></i>Closed Now';
            statusElement.className = 'business-status closed';
        }
    }
}

// ===== IMAGE GALLERY =====
function initializeImageGallery() {
    const galleryContainers = document.querySelectorAll('.image-gallery');

    galleryContainers.forEach(container => {
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            img.classList.add('gallery-item', 'lightbox-trigger');
        });
    });
}

// ===== TESTIMONIALS SLIDER =====
function initializeTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);

    // Add navigation buttons if needed
    const testimonialContainer = testimonials[0].parentNode;
    const navButtons = document.createElement('div');
    navButtons.className = 'testimonial-nav mt-3 text-center';
    navButtons.innerHTML = `
        <button class="btn btn-sm btn-outline-danger me-2" id="prev-testimonial">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" id="next-testimonial">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    testimonialContainer.appendChild(navButtons);

    document.getElementById('prev-testimonial').addEventListener('click', prevTestimonial);
    document.getElementById('next-testimonial').addEventListener('click', nextTestimonial);

    showTestimonial(currentTestimonial);
}

// ===== PRODUCT FILTERS =====
function initializeProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    if (!categoryFilter || !brandFilter || !priceFilter) return;

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedBrand = brandFilter.value;
        const selectedPrice = priceFilter.value;

        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const category = product.getAttribute('data-category');
            const brand = product.getAttribute('data-brand');
            const price = parseInt(product.getAttribute('data-price'));

            let showProduct = true;

            // Category filter
            if (selectedCategory && category !== selectedCategory) {
                showProduct = false;
            }

            // Brand filter
            if (selectedBrand && brand !== selectedBrand) {
                showProduct = false;
            }

            // Price filter
            if (selectedPrice) {
                const [min, max] = selectedPrice.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                if (price < min || (max && price > max)) {
                    showProduct = false;
                }
            }

            product.style.display = showProduct ? 'block' : 'none';
        });
    }

    categoryFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    clearFiltersBtn.addEventListener('click', function() {
        categoryFilter.value = '';
        brandFilter.value = '';
        priceFilter.value = '';
        applyFilters();
    });
}

// ===== INQUIRY MODAL =====
function initializeInquiryModal() {
    const inquireButtons = document.querySelectorAll('.product-card .btn-danger');
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryForm = document.getElementById('inquiryForm');
    const submitInquiryBtn = document.getElementById('submitInquiry');
    const productNameInput = document.getElementById('productName');

    if (!inquireButtons.length || !inquiryModal) return;

    // Open modal when inquire button is clicked
    inquireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;

            // Set product name in modal
            productNameInput.value = productName;

            // Show modal
            inquiryModal.classList.add('show');
            inquiryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Handle form submission
    submitInquiryBtn.addEventListener('click', function() {
        if (validateInquiryForm()) {
            // Simulate form submission
            showFormSuccess('inquiryForm', 'Thank you for your inquiry! We\'ll get back to you within 24 hours.');

            // Close modal
            inquiryModal.classList.remove('show');
            inquiryModal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Reset form
            inquiryForm.reset();
        }
    });

    // Close modal when clicking outside or close button
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('btn-close')) {
            inquiryModal.classList.remove('show');
            inquiryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function validateInquiryForm() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    let isValid = true;

    // Name validation
    if (name.length < 2) {
        showFieldError('customerName', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearFieldError('customerName');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('customerEmail', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('customerEmail');
    }

    // Phone validation
    if (phone.length < 10) {
        showFieldError('customerPhone', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearFieldError('customerPhone');
    }

    return isValid;
}

// ===== UTILITY FUNCTIONS =====
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

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== GOOGLE MAPS ENHANCEMENT =====
function initializeGoogleMap() {
    // Enhanced map functionality can be added here
    // For now, the embedded iframe provides basic functionality
    console.log("Google Maps initialized");
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', initializeGoogleMap);

// ===== ANALYTICS AND TRACKING =====
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// Track form submissions
document.addEventListener('submit', function(e) {
    trackEvent('form_submit', {
        form: e.target.id || 'unknown',
        timestamp: new Date().toISOString()
    });
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Add keyboard navigation for accordions
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('accordion-header')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Add ARIA labels where needed
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', 'Image');
    });
}

initializeAccessibility();

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        });
    }
}

monitorPerformance();
