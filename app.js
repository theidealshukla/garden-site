// Ensure scripts run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════
    // 1. Hero Parallax & Reveal
    // ═══════════════════════════════════════════════════
    const heroBg = document.querySelector('.hero-bg');
    const heroText = document.querySelector('.hero-text');

    if (heroBg && heroText) {
        const heroTl = gsap.timeline();
        heroTl.fromTo('.hero-bg',
            { scale: 1.1, filter: "blur(10px)" },
            { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" }
        )
        .fromTo('.hero-text > *',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            "-=1.2"
        );

        gsap.to('.hero-title-large', {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // ═══════════════════════════════════════════════════
    // 2. Staggered Card Reveals
    // ═══════════════════════════════════════════════════
    const useCaseCards = document.querySelectorAll('.use-case-card');
    if (useCaseCards.length > 0) {
        gsap.from(useCaseCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#use-cases",
                start: "top 80%",
            }
        });
    }

    // ═══════════════════════════════════════════════════
    // 3. Feature Cards Grid
    // ═══════════════════════════════════════════════════
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.from(featureCards, {
            scale: 0.95,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: "#features",
                start: "top 75%"
            }
        });
    }

    // ═══════════════════════════════════════════════════
    // 4. Parallax background for Benefits section
    // ═══════════════════════════════════════════════════
    const benefitsBg = document.querySelector('.benefits-bg');
    if (benefitsBg) {
        gsap.to('.benefits-bg', {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: "#benefits",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // ═══════════════════════════════════════════════════
    // 5. Testimonials Animated Carousel
    // ═══════════════════════════════════════════════════
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots   = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (slides.length > 0) {
        let activeIndex = 0;
        let autoRotateTimer = null;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'translate-x-[100px]', 'pointer-events-none');
                    slide.classList.add('opacity-100', 'translate-x-0');
                } else {
                    slide.classList.remove('opacity-100', 'translate-x-0');
                    slide.classList.add('opacity-0', 'translate-x-[100px]', 'pointer-events-none');
                }
            });
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-dark/20');
                    dot.classList.add('bg-dark');
                } else {
                    dot.classList.remove('bg-dark');
                    dot.classList.add('bg-dark/20');
                }
            });
            activeIndex = index;
        }

        function nextSlide() {
            showSlide((activeIndex + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((activeIndex - 1 + slides.length) % slides.length);
        }

        function startAutoRotate() {
            stopAutoRotate();
            autoRotateTimer = setInterval(nextSlide, 6000);
        }

        function stopAutoRotate() {
            if (autoRotateTimer) clearInterval(autoRotateTimer);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoRotate(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoRotate(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-dot'));
                showSlide(idx);
                startAutoRotate();
            });
        });

        // Start auto-rotate
        startAutoRotate();
    }
});
