// Starfield canvas — subtle twinkle, no external deps
        const canvas = document.getElementById('stars');
        const ctx = canvas.getContext('2d');
        let stars = [];
        let w, h;

        function resize(){
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const count = Math.floor((w * h) / 9000);
            stars = Array.from({length: count}, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.1 + 0.2,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.015 + 0.005
            }));
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function draw(t){
            ctx.clearRect(0, 0, w, h);
            for(const s of stars){
            const twinkle = reduceMotion ? 0.7 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(238,241,247,${0.15 + twinkle * 0.55})`;
            ctx.fill();
            }
            if(!reduceMotion) requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(draw);
        if(reduceMotion) draw(0);