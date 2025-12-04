// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initLoadingScreen();
    initNavigation();
    initCharts();
    initCalendar();
    initScrollAnimations();
    initBackToTop();
    initConfetti();
    
    // Add event listeners
    addEventListeners();
    
    // Log initialization
    console.log('🎓 EduTrack Pro Dashboard initialized successfully!');
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (mobileThemeToggle) {
            mobileThemeToggle.checked = savedTheme === 'dark';
        }
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (mobileThemeToggle) {
            mobileThemeToggle.checked = true;
        }
    }
    
    // Desktop theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Trigger confetti for theme change
            triggerConfetti();
            
            // Update mobile toggle if exists
            if (mobileThemeToggle) {
                mobileThemeToggle.checked = newTheme === 'dark';
            }
        });
    }
    
    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            triggerConfetti();
        });
    }
}

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// Navigation Functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            animateMenuIcon();
        });
    }
    
    // Mobile menu close
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            resetMenuIcon();
        });
    }
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            resetMenuIcon();
            
            // Update active state
            updateActiveNavLink(link.getAttribute('href'));
        });
    });
    
    // Desktop navigation active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            updateActiveNavLink(target);
            
            // Smooth scroll to section
            smoothScrollTo(target);
        });
    });
    
    // Animate hamburger menu icon
    function animateMenuIcon() {
        const lines = document.querySelectorAll('.menu-line');
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
    
    // Reset hamburger menu icon
    function resetMenuIcon() {
        const lines = document.querySelectorAll('.menu-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
    
    // Update active navigation link
    function updateActiveNavLink(target) {
        // Update desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === target) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === target) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize Charts
function initCharts() {
    // Hero Chart (Simplified Performance)
    const heroCtx = document.getElementById('heroChart').getContext('2d');
    const heroChart = new Chart(heroCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Performance Score',
                data: [75, 82, 78, 85, 88, 92],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                backgroundColor: 'rgba(109, 40, 217, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Poppins', sans-serif"
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif"
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
    
    // Grade Distribution Chart
    const gradeCtx = document.getElementById('gradeChart').getContext('2d');
    const gradeChart = new Chart(gradeCtx, {
        type: 'doughnut',
        data: {
            labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'E (50-59)', 'F (<50)'],
            datasets: [{
                data: [25, 35, 20, 10, 5, 5],
                backgroundColor: [
                    '#6d28d9',
                    '#8b5cf6',
                    '#a78bfa',
                    '#c4b5fd',
                    '#ddd6fe',
                    '#f5f3ff'
                ],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Poppins', sans-serif"
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif"
                    },
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Performance Trend Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
            datasets: [{
                label: 'GPA Trend',
                data: [7.8, 8.2, 8.5, 8.3, 8.7, 9.0],
                backgroundColor: 'rgba(109, 40, 217, 0.1)',
                borderColor: '#6d28d9',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#6d28d9',
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Poppins', sans-serif"
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif"
                    },
                    callbacks: {
                        label: function(context) {
                            return `GPA: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 7,
                    max: 10,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        },
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
    
    // Study Time Chart
    const studyCtx = document.getElementById('studyChart').getContext('2d');
    const studyChart = new Chart(studyCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [4, 6, 5, 7, 5, 8, 3],
                backgroundColor: [
                    'rgba(109, 40, 217, 0.8)',
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(109, 40, 217, 0.8)',
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(109, 40, 217, 0.8)',
                    'rgba(6, 182, 212, 0.8)',
                    'rgba(148, 163, 184, 0.8)'
                ],
                borderColor: [
                    '#6d28d9',
                    '#2563eb',
                    '#6d28d9',
                    '#2563eb',
                    '#6d28d9',
                    '#06b6d4',
                    '#94a3b8'
                ],
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Poppins', sans-serif"
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif"
                    },
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} hours`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        },
                        callback: function(value) {
                            return value + 'h';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
    
    // Chart button interactions
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons in this group
            const parent = this.parentElement;
            parent.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Store charts for potential updates
    window.eduTrackCharts = {
        heroChart,
        gradeChart,
        performanceChart,
        studyChart
    };
}

// Calendar Functionality
function initCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarNav = document.querySelectorAll('.calendar-nav');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // Initial render
    renderCalendar(currentMonth, currentYear);
    
    // Navigation
    calendarNav.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.querySelector('.fa-chevron-left')) {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
            } else {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
            }
            renderCalendar(currentMonth, currentYear);
            
            // Update header
            document.querySelector('.calendar-header h3').textContent = 
                new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        });
    });
    
    // Render calendar
    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = prevMonthLastDay - i;
            calendarDays.appendChild(day);
        }
        
        // Current month days
        const todayStr = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;
            
            // Check if today
            const currentStr = `${i}-${month}-${year}`;
            if (currentStr === todayStr) {
                day.classList.add('today');
            }
            
            // Add event indicator for some days
            if (i % 7 === 0 || i % 5 === 0) {
                day.classList.add('event');
            }
            
            calendarDays.appendChild(day);
        }
        
        // Next month days
        const totalCells = 42; // 6 weeks * 7 days
        const remainingCells = totalCells - (startingDay + daysInMonth);
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
        
        // Update current date display
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.querySelector('.date-day').textContent = dayNames[today.getDay()];
        document.querySelector('.date-number').textContent = today.getDate();
        document.querySelector('.date-month').textContent = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                if (entry.target.classList.contains('stats-grid')) {
                    const cards = entry.target.querySelectorAll('.stat-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('courses-grid')) {
                    const cards = entry.target.querySelectorAll('.course-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Confetti Effect
function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Confetti particle class
    class ConfettiParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.shape = Math.random() > 0.5 ? 'circle' : 'rectangle';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Reset if out of bounds
            if (this.y > canvas.height) {
                this.reset();
                this.y = -10;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            
            ctx.restore();
        }
    }
    
    // Create confetti particles
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
    
    // Animation loop
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of confettiParticles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animateConfetti);
    }
    
    // Start animation
    animateConfetti();
}

// Trigger confetti effect
function triggerConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    confettiCanvas.style.opacity = '1';
    
    setTimeout(() => {
        confettiCanvas.style.opacity = '0';
    }, 2000);
}

// Smooth scroll to section
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add event listeners
function addEventListeners() {
    // Button click animations
    document.querySelectorAll('.btn, .course-action').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Course card interactions
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stat card hover effects
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const bg = this.querySelector('.stat-card-bg');
            bg.style.opacity = '0.2';
        });
        
        card.addEventListener('mouseleave', function() {
            const bg = this.querySelector('.stat-card-bg');
            bg.style.opacity = '0.1';
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .course-action {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Performance simulation (for demo purposes)
function simulatePerformanceUpdates() {
    setInterval(() => {
        // Randomly update some stats
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length > 0) {
            const randomStat = Math.floor(Math.random() * statValues.length);
            const stat = statValues[randomStat];
            const currentValue = parseFloat(stat.textContent);
            
            // Small random change (±0.1)
            const change = (Math.random() * 0.2 - 0.1);
            const newValue = Math.max(0, Math.min(10, currentValue + change));
            
            // Animate the change
            animateValueChange(stat, currentValue, newValue, 1);
        }
    }, 10000); // Update every 10 seconds
}

// Animate value change
function animateValueChange(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = start + (end - start) * progress;
        element.textContent = currentValue.toFixed(1);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Start performance simulation
setTimeout(() => {
    simulatePerformanceUpdates();
}, 5000);