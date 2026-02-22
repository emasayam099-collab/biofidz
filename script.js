// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Custom Magnetic Cursor Logic
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    // Smooth delay for outline
    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Interactions
document.querySelectorAll('button, a, .glass').forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.width = '70px';
        outline.style.height = '70px';
        outline.style.background = 'rgba(139, 92, 246, 0.1)';
        outline.style.border = '1px solid #8B5CF6';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.background = 'transparent';
        outline.style.border = '1px solid rgba(255,255,255,0.5)';
    });
});

// 3. Three.js Hero Background (Neural Network)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero-canvas').appendChild(renderer.domElement);

// Points Geometry
const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 2000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(1500), THREE.MathUtils.randFloatSpread(1500), THREE.MathUtils.randFloatSpread(1500));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0x8B5CF6, size: 1.5, transparent: true, opacity: 0.6 });
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 500;

function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0005;
    points.rotation.x += 0.0002;
    renderer.render(scene, camera);
}
animate();

// 4. Staggered Reveal on Scroll
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100); // Stagger effect
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Responsive Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});