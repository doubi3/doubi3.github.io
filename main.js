        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const menuToggleIcon = menuToggle.querySelector('i');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggleIcon.classList.toggle('fa-bars');
            menuToggleIcon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggleIcon.classList.add('fa-bars');
                menuToggleIcon.classList.remove('fa-times');
            });
        });
        
        // Smooth Scrolling for Anchor Links
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
        
        // Scroll Animation for Elements
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate stats counting
                    if (entry.target.classList.contains('stat-number')) {
                        animateCount(entry.target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.service-card, .step, .stat-item').forEach(el => {
            observer.observe(el);
        });
        
        // Animate stats counting
        function animateCount(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                
                // Format numbers with decimal if needed
                if (target % 1 !== 0) {
                    element.textContent = current.toFixed(1);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '0.8rem 0';
                header.style.boxShadow = 'none';
            }
        });
        
        // Add hover effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.03)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('visible')) {
                    card.style.transform = 'translateY(0) rotate(0)';
                } else {
                    card.style.transform = 'translateY(50px) rotate(3deg)';
                }
                card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            });
        });