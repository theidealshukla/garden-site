// Ensure scripts run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════
    // 1. Text Splitting Advanced Animations
    // ═══════════════════════════════════════════════════
    const splitTexts = document.querySelectorAll('.split-text');
    if (typeof SplitType !== 'undefined' && splitTexts.length > 0) {
        splitTexts.forEach(text => {
            const type = new SplitType(text, { types: 'lines, words, chars' });
            gsap.from(type.chars, {
                opacity: 0,
                y: 20,
                rotationX: -90,
                stagger: 0.02,
                duration: 1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════
    // 2. Hero Component Sequence
    // ═══════════════════════════════════════════════════
    const heroBg = document.querySelector('.hero-bg');
    const heroText = document.querySelector('.hero-text');

    if (heroBg && heroText) {
        const heroTl = gsap.timeline();
        heroTl.fromTo('.hero-bg',
            { scale: 1.15, filter: "blur(15px)" },
            { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }
        )
        .fromTo('.hero-text > p, .hero-text > button',
            { y: 30, opacity: 0, filter: "blur(5px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "power2.out" },
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
    const parallaxImages = document.querySelectorAll('.parallax-img');
    if (parallaxImages.length > 0 && typeof simpleParallax !== 'undefined') {
        new simpleParallax(parallaxImages, {
            scale: 1.3,
            delay: 0.6,
            transition: 'cubic-bezier(0,0,0,1)'
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

    // ═══════════════════════════════════════════════════
    // 6. Interactive 3D Environment (Three.js)
    // ═══════════════════════════════════════════════════
    const canvas = document.getElementById('hero-3d-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        // Setup Camera & Renderer
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 40;

        // Abstract organic floating elements setup
        // Uses simple plane geometry scaled to look like small leaves/spores
        const particleGeo = new THREE.PlaneGeometry(1, 1);
        const mat1 = new THREE.MeshBasicMaterial({ color: 0xC4F532, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
        const mat2 = new THREE.MeshBasicMaterial({ color: 0x166534, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
        const mat3 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 0.15 });

        const materials = [mat1, mat2, mat3];
        const elements = [];
        
        // Create 120 elements
        for (let i = 0; i < 120; i++) {
            const mat = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(particleGeo, mat);
            
            // Random distribution within a contained box
            mesh.position.set(
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 40 - 10
            );

            // Random rotation
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            // Scale to look organic (oblong shapes)
            const scaleBase = Math.random() * 0.8 + 0.3;
            mesh.scale.set(scaleBase, scaleBase * (Math.random() * 1.5 + 1), scaleBase);

            // Assign unique motion speeds to userData for the animation loop
            mesh.userData = {
                rSpeedX: (Math.random() - 0.5) * 0.02,
                rSpeedY: (Math.random() - 0.5) * 0.02,
                rSpeedZ: (Math.random() - 0.5) * 0.02,
                mSpeedY: Math.random() * 0.04 + 0.01 + (scaleBase * 0.02), // Larger ones fall slightly faster
                mSpeedX: (Math.random() - 0.5) * 0.02,
                originX: mesh.position.x
            };

            scene.add(mesh);
            elements.push(mesh);
        }

        // Mouse interactivity tracking
        let targetX = 0;
        let targetY = 0;
        
        window.addEventListener('mousemove', (event) => {
            // Normalize coordinates from -1 to 1
            targetX = (event.clientX / window.innerWidth) * 2 - 1;
            targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            elements.forEach(el => {
                // Natural tumbling
                el.rotation.x += el.userData.rSpeedX;
                el.rotation.y += el.userData.rSpeedY;
                el.rotation.z += el.userData.rSpeedZ;
                
                // Drift physics (falling with slight ambient sway)
                el.position.y -= el.userData.mSpeedY;
                el.position.x = el.userData.originX + Math.sin(time + el.userData.originX) * 2;

                // Infinite wrapping
                if (el.position.y < -50) {
                    el.position.y = 50;
                    el.position.x = el.userData.originX;
                }
            });

            // Smooth parallax camera tracking towards mouse cursor & scroll depth
            // Lightweight easing calculation
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            camera.position.x += (targetX * 8 - camera.position.x) * 0.03;
            camera.position.y += (targetY * 5 - (scrollY * 0.02) - camera.position.y) * 0.03;
            camera.position.z = 40 + (scrollY * 0.01);
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }
        
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});
