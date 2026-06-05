// TYPEWRITER EFFECT
const textToType = "I solve problems and build digital experiences.";
const speed = 60; // Typing speed in milliseconds
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        document.getElementById("typewriter").innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Start typing effect when page loads
window.onload = typeWriter;

// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- GRID PARALLAX & ELECTRON CANVAS LOGIC ---
const bgGrid = document.querySelector('.bg-grid');
const canvas = document.getElementById('electron-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let scrollSpeedY = 0;
let lastScrollTop = 0;

// Mouse interaction object
let mouse = {
    x: null,
    y: null,
    radius: 120 // Distance at which the cursor interacts with particles
};

// Track mouse position
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Prevent particles from getting stuck to the edge when mouse leaves
window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// Resize canvas to fill window
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Create the electrons (particles)
const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000); 
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5, // Wiggle speed X
        vy: (Math.random() - 0.5) * 1.5, // Wiggle speed Y
        baseX: 0,
        baseY: 0
    });
}

// Track scrolling to push the electrons and move the grid
window.addEventListener('scroll', () => {
    let st = window.pageYOffset;
    
    // Parallax the grid background
    bgGrid.style.transform = `translateY(-${st * 0.2}px)`;

    // Calculate scroll speed to affect the electrons
    scrollSpeedY = (st - lastScrollTop) * 0.5;
    lastScrollTop = st;
});

// Animate the electrons
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Add friction so the scroll effect fades out
    scrollSpeedY *= 0.9;

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Move particles naturally + add scroll reaction
        p.x += p.vx;
        p.y += p.vy - scrollSpeedY; 

        // Wrap around screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse collision & repulsion logic
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.hypot(dx, dy);

            // If particle is near the mouse
            if (distance < mouse.radius) {
                // Draw a connection line to the cursor
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                // Glow gets stronger the closer it is to the mouse (max alpha 0.5)
                ctx.strokeStyle = `rgba(138, 226, 52, ${(1 - distance / mouse.radius) * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Repel the particle away from the mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const pushSpeed = 3; // How strongly the mouse pushes them

                p.x -= forceDirectionX * force * pushSpeed;
                p.y -= forceDirectionY * force * pushSpeed;
            }
        }

        // Draw the electron dot (Reduced alpha from 0.8 to 0.25)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 226, 52, 0.25)';
        ctx.fill();

        // Check distance to other electrons to draw connecting lines between them
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            
            // If they are close, draw a line!
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                // Reduced line alpha (multiplied by 0.25 max)
                ctx.strokeStyle = `rgba(138, 226, 52, ${(1 - dist / 130) * 0.25})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// Start animation
animate();