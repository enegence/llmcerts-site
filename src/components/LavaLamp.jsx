import { useEffect, useRef } from 'react';

const ACCENT = '#10B981';

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1,3),16),
    parseInt(hex.slice(3,5),16),
    parseInt(hex.slice(5,7),16),
  ];
}

export default function LavaLamp() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const [r,g,b] = hexToRgb(ACCENT);

    const N = 9;
    const blobs = Array.from({length: N}, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 500),
      r: 60 + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.6 - 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.005,
    }));

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach(blobObj => {
        blobObj.phase += blobObj.speed;
        blobObj.x += blobObj.vx + Math.sin(blobObj.phase * 0.7) * 0.3;
        blobObj.y += blobObj.vy + Math.cos(blobObj.phase * 0.5) * 0.2;

        if (blobObj.x < -blobObj.r) blobObj.x = canvas.width + blobObj.r;
        if (blobObj.x > canvas.width + blobObj.r) blobObj.x = -blobObj.r;
        if (blobObj.y < -blobObj.r) { blobObj.y = -blobObj.r; blobObj.vy = Math.abs(blobObj.vy) * 0.6; }
        if (blobObj.y > canvas.height + blobObj.r) { blobObj.y = canvas.height + blobObj.r; blobObj.vy = -Math.abs(blobObj.vy) * 0.6; }

        const midY = canvas.height / 2;
        blobObj.vy += (midY - blobObj.y) * 0.00005;
        blobObj.vy *= 0.998;
        blobObj.vx *= 0.999;

        const pulsedR = blobObj.r * (0.88 + 0.12 * Math.sin(blobObj.phase));
        const grad = ctx.createRadialGradient(blobObj.x, blobObj.y, 0, blobObj.x, blobObj.y, pulsedR);
        grad.addColorStop(0,   `rgba(${r},${g},${b},0.18)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.10)`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(blobObj.x, blobObj.y, pulsedR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0}}
    />
  );
}
