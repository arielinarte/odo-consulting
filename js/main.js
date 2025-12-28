document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('is-active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('is-active');
                }
            }
        });
    });

    // Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Testimonials Carousel
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        const totalSlides = cards.length;

        function updateSlider() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Advance index
            currentIndex = (currentIndex + 1) % totalSlides;
        }

        // Run auto-scroll every 1.5 seconds
        setInterval(updateSlider, 1500);
    }

    // Hero Carousel
    const heroTrack = document.querySelector('.hero-carousel .carousel-track');
    const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (heroTrack && heroSlides.length > 0) {
        let heroIndex = 0;
        const totalHeroSlides = heroSlides.length;
        let slideInterval;

        function updateHeroSlider() {
            heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
        }

        function nextSlide() {
            heroIndex = (heroIndex + 1) % totalHeroSlides;
            updateHeroSlider();
        }

        function prevSlide() {
            heroIndex = (heroIndex - 1 + totalHeroSlides) % totalHeroSlides;
            updateHeroSlider();
        }

        function resetTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 1600);
        }

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }

        // Start Auto Slide
        slideInterval = setInterval(nextSlide, 1600);
    }
});
