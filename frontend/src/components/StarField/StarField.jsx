import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition.js';
import './StarField.css';

const StarField = ({ 
  density = 250, 
  showShootingStars = true,
  // 🆕 PARÁMETROS DE VELOCIDAD (ajustables)
  movementSpeed = 0.0001,    // Más bajo = más lento (rango: 0.01 a 0.1)
  parallaxStrength = 0.5,   // Más bajo = menos movimiento (rango: 5 a 50)
  mouseSensitivity = 0.01,  // Más bajo = menos sensible (rango: 0.1 a 1.0)
}) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);
  const mouse = useMousePosition();
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createStars();
    };

    const createStars = () => {
      const stars = [];
      for (let i = 0; i < density; i++) {
        const layer = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          baseBrightness: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          depth: layer,
          color: Math.random() > 0.9 ? 'blue' : Math.random() > 0.8 ? 'warm' : 'white'
        });
      }
      starsRef.current = stars;
    };

    const drawStar = (star) => {
      // 🆕 VELOCIDAD REDUCIDA
      const parallaxFactor = star.depth * parallaxStrength;
      const offsetX = currentOffset.current.x * parallaxFactor * 0.1;
      const offsetY = currentOffset.current.y * parallaxFactor * 0.1;

      const x = star.x + offsetX;
      const y = star.y + offsetY;

      const wrappedX = ((x % width) + width) % width;
      const wrappedY = ((y % height) + height) % height;

      const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinkleOffset);
      const brightness = star.baseBrightness + twinkle * 0.3;
      const alpha = Math.max(0.1, Math.min(1, brightness));

      let r, g, b;
      if (star.color === 'blue') {
        r = 200; g = 220; b = 255;
      } else if (star.color === 'warm') {
        r = 255; g = 240; b = 200;
      } else {
        r = 255; g = 255; b = 255;
      }

      ctx.beginPath();
      ctx.arc(wrappedX, wrappedY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();

      if (star.size > 1.5) {
        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`;
        ctx.fill();
      }
    };

    const drawShootingStar = () => {
      if (!showShootingStars) return;
      if (Math.random() > 0.003) return; // 🆕 Menos frecuentes

      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const length = 80;
      const angle = Math.PI / 4;

      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      // 🆕 SENSIBILIDAD REDUCIDA
      targetOffset.current.x = (mouse.x - width / 2) * mouseSensitivity;
      targetOffset.current.y = (mouse.y - height / 2) * mouseSensitivity;

      // 🆕 MOVIMIENTO MÁS SUAVE
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * movementSpeed;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * movementSpeed;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      starsRef.current.forEach(drawStar);
      drawShootingStar();

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density, showShootingStars, movementSpeed, parallaxStrength, mouseSensitivity, mouse.x, mouse.y]);

  return (
    <canvas
      ref={canvasRef}
      className="star-field-canvas"
      aria-hidden="true"
    />
  );
};

export default StarField;
