// Jharkhand Tourism Hub JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initImageLazyLoading();
    initSmoothScrolling();
    initActiveNavHighlight();
    initCardAnimations();
});

// Navigation functionality
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Add click listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            updateActiveNav(sectionId);
        });
    });
    
    // Add click listeners to footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            updateActiveNav(sectionId);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('svg');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('show');
        
        if (isOpen) {
            mobileMenu.classList.remove('show');
            mobileMenu.classList.add('hidden');
            menuIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            `;
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            menuIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            `;
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavButtons = mobileMenu.querySelectorAll('.nav-btn');
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            mobileMenu.classList.add('hidden');
            menuIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            `;
        });
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80; // Account for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation state
function updateActiveNav(activeSectionId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        const sectionId = button.getAttribute('data-section');
        if (sectionId === activeSectionId) {
            button.classList.add('active');
            button.classList.remove('text-gray-600');
            button.classList.add('bg-green-600', 'text-white');
        } else {
            button.classList.remove('active');
            button.classList.add('text-gray-600');
            button.classList.remove('bg-green-600', 'text-white');
        }
    });
}

// Initialize smooth scrolling for all internal links
function initSmoothScrolling() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Active navigation highlight based on scroll position
function initActiveNavHighlight() {
    const sections = ['destinations', 'travel-info', 'accommodations', 'culture'];
    
    window.addEventListener('scroll', debounce(function() {
        let current = '';
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    current = sectionId;
                }
            }
        });
        
        if (current) {
            updateActiveNav(current);
        }
    }, 100));
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation for cards
                const cards = entry.target.querySelectorAll('.destination-card, .travel-card, .accommodation-card, .culture-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
    
    // Initialize cards with hidden state
    const cards = document.querySelectorAll('.destination-card, .travel-card, .accommodation-card, .culture-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('image-placeholder');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.classList.add('image-placeholder');
            imageObserver.observe(img);
        });
    }
}

// Card hover animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.destination-card, .travel-card, .accommodation-card, .culture-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility function for debouncing scroll events
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

// Contact form functionality (if needed)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            showNotification('Thank you for your inquiry! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white max-w-sm`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <p class="mr-4">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Search functionality (if search feature is added)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 0) {
                performSearch(query);
            } else {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
            }
        }, 300));
    }
}

function performSearch(query) {
    const searchableContent = [
        { title: 'Netarhat', section: 'destinations', content: 'queen chotanagpur sunrise sunset hilltop' },
        { title: 'Patratu', section: 'destinations', content: 'valley dam boating landscapes' },
        { title: 'Betla National Park', section: 'destinations', content: 'wildlife tigers elephants safari palamu' },
        { title: 'Hundru Falls', section: 'destinations', content: 'waterfall 98 meter subarnarekha river swimming' },
        { title: 'Deoghar', section: 'destinations', content: 'sacred baidyanath temple jyotirlinga' },
        { title: 'Hotels', section: 'accommodations', content: 'stay accommodation lodging rooms' },
        { title: 'Transport', section: 'travel-info', content: 'train bus taxi car reach travel' },
        { title: 'Culture', section: 'culture', content: 'festivals sarhul karma tribal art cuisine' }
    ];
    
    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.includes(query)
    );
    
    const searchResults = document.getElementById('search-results');
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
            <div class="p-3 hover:bg-gray-100 cursor-pointer search-result" data-section="${result.section}">
                <h4 class="font-semibold text-gray-800">${result.title}</h4>
                <p class="text-sm text-gray-600">Click to view section</p>
            </div>
        `).join('');
        
        // Add click listeners to search results
        searchResults.querySelectorAll('.search-result').forEach(result => {
            result.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                scrollToSection(section);
                updateActiveNav(section);
                searchResults.classList.add('hidden');
                document.getElementById('search-input').value = '';
            });
        });
        
        searchResults.classList.remove('hidden');
    } else {
        searchResults.innerHTML = '<div class="p-3 text-gray-500">No results found</div>';
        searchResults.classList.remove('hidden');
    }
}

// Weather widget (placeholder for API integration)
function initWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    
    if (weatherWidget) {
        // Placeholder weather data
        const weatherData = {
            location: 'Ranchi, Jharkhand',
            temperature: '24°C',
            condition: 'Partly Cloudy',
            icon: '⛅'
        };
        
        weatherWidget.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${weatherData.icon}</span>
                <div>
                    <p class="font-semibold">${weatherData.location}</p>
                    <p class="text-sm">${weatherData.temperature} - ${weatherData.condition}</p>
                </div>
            </div>
        `;
    }
}

// Initialize additional features if elements exist
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initSearch();
    initWeatherWidget();
});

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }
}, 250));

// Handle back button navigation
window.addEventListener('popstate', function() {
    // Update navigation based on current hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        updateActiveNav(hash);
    }
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.loadTime > 2000) {
                console.warn('Slow loading detected:', entry.name);
            }
        }
    });
    observer.observe({ entryTypes: ['navigation', 'resource'] });
}

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}