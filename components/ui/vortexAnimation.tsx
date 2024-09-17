"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: any[]) => any;

const Vortex = React.memo((props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef(0);
  const particlePropsRef = useRef<Float32Array>(
    new Float32Array((props.particleCount || 700) * 9)
  );
  const centerRef = useRef<[number, number]>([0, 0]);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 3;
  const baseHue = props.baseHue || 220;
  const rangeHue = 20;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || "#000000";
  const noise3D = createNoise3D();

  const initParticle = useCallback(
    (i: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const x = Math.random() * canvas.width;
      const y = centerRef.current[1] + (Math.random() * 2 - 1) * rangeY;
      const vx = 0,
        vy = 0,
        life = 0;
      const ttl = baseTTL + Math.random() * rangeTTL;
      const speed = baseSpeed + Math.random() * rangeSpeed;
      const radius = baseRadius + Math.random() * rangeRadius;
      const hue = baseHue + Math.random() * rangeHue;

      particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    },
    [rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue]
  );

  const initParticles = useCallback(() => {
    tickRef.current = 0;
    particlePropsRef.current = new Float32Array(particleCount * particlePropCount);
    for (let i = 0; i < particlePropsRef.current.length; i += particlePropCount) {
      initParticle(i);
    }
  }, [initParticle, particleCount]);

  const resize = useCallback(
    (canvas: HTMLCanvasElement) => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];
    },
    []
  );

  const drawParticle = useCallback(
    (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue}, 30%, 80%, ${Math.abs(
        ((life + ttl / 2) % ttl) - ttl / 2
      ) / (ttl / 2)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    []
  );

  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const i2 = i + 1;
      const i3 = i + 2;
      const i4 = i + 3;
      const i5 = i + 4;
      const i6 = i + 5;
      const i7 = i + 6;
      const i8 = i + 7;
      const i9 = i + 8;

      const x = particlePropsRef.current[i];
      const y = particlePropsRef.current[i2];
      const n = noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * Math.PI * 2;
      const vx = (particlePropsRef.current[i3] + Math.cos(n)) / 2;
      const vy = (particlePropsRef.current[i4] + Math.sin(n)) / 2;
      let life = particlePropsRef.current[i5];
      const ttl = particlePropsRef.current[i6];
      const speed = particlePropsRef.current[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particlePropsRef.current[i8];
      const hue = particlePropsRef.current[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

      life++;

      particlePropsRef.current.set([x2, y2, vx, vy, life], i);

      if (x > canvas.width || x < 0 || y > canvas.height || y < 0 || life > ttl) {
        initParticle(i);
      }
    },
    [noise3D, drawParticle, initParticle]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsRef.current.length; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [updateParticle]
  );

  const renderGlow = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(250%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }, []);

  const renderToScreen = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }, []);

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      if (!isVisibleRef.current) return;

      tickRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawParticles(ctx);
      renderGlow(canvas, ctx);
      renderToScreen(canvas, ctx);

      animationRef.current = window.requestAnimationFrame(() => draw(canvas, ctx));
    },
    [backgroundColor, drawParticles, renderGlow, renderToScreen]
  );

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, [draw, initParticles, resize]);

  const handleVisibility = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisibleRef.current = true;
        if (animationRef.current === null) setup();
      } else {
        isVisibleRef.current = false;
        if (animationRef.current !== null) {
          window.cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    });
  }, [setup]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibility, {
      root: null,
      threshold: 0.15 // Trigger when at least 15% of the component is visible
    });
    
    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }
    
    return () => {
      if (container) observer.unobserve(container);
    };
  }, [handleVisibility]);

  useEffect(() => {
    const debouncedSetup = debounce(setup, 200);
    window.addEventListener("resize", debouncedSetup);
    return () => window.removeEventListener("resize", debouncedSetup);
  }, [setup]);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>

      <div className={cn("relative z-10", props.className)}>{props.children}</div>
    </div>
  );
});


Vortex.displayName = "Vortex";
export default Vortex;

function debounce(func: AnyFunction, wait: number) {
  let timeout: NodeJS.Timeout;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return (...args: any[]) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
