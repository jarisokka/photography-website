"use client";
import { createNoise3D } from "simplex-noise";

// Create the noise function
const noise3D = createNoise3D();
const particlePropCount = 9;
const noiseSteps = 3;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;

let canvas: OffscreenCanvas;
let ctx: OffscreenCanvasRenderingContext2D;
let particleProps: Float32Array;
let tick = 0;
let particleCount: number;
let rangeY: number;
let baseTTL: number;
let rangeTTL: number;
let baseSpeed: number;
let rangeSpeed: number;
let baseRadius: number;
let rangeRadius: number;
let baseHue: number;
let rangeHue: number;

self.onmessage = (e: MessageEvent) => {
  if (e.data.canvas) {
    // Initialize OffscreenCanvas and properties
    canvas = e.data.canvas;
    ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

    // Assign particle properties from the main thread
    particleCount = e.data.particleCount;
    rangeY = e.data.rangeY;
    baseTTL = e.data.baseTTL;
    rangeTTL = e.data.rangeTTL;
    baseSpeed = e.data.baseSpeed;
    rangeSpeed = e.data.rangeSpeed;
    baseRadius = e.data.baseRadius;
    rangeRadius = e.data.rangeRadius;
    baseHue = e.data.baseHue;
    rangeHue = e.data.rangeHue;

    particleProps = new Float32Array(particleCount * particlePropCount);
    initParticles();

    // Start the animation loop
    draw();
  } else if (e.data.action === "resize") {
    // Handle canvas resize event
    canvas.width = e.data.width;
    canvas.height = e.data.height;
  }
};

function initParticles() {
  for (let i = 0; i < particleProps.length; i += particlePropCount) {
    initParticle(i);
  }
}

function initParticle(i: number) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = 0,
    vy = 0,
    life = 0;
  const ttl = baseTTL + Math.random() * rangeTTL;
  const speed = baseSpeed + Math.random() * rangeSpeed;
  const radius = baseRadius + Math.random() * rangeRadius;
  const hue = baseHue + Math.random() * rangeHue;

  particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticle(
  x: number,
  y: number,
  x2: number,
  y2: number,
  life: number,
  ttl: number,
  radius: number,
  hue: number
) {
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
  ctx.restore();
}

function updateParticle(i: number) {
  const i2 = i + 1;
  const i3 = i + 2;
  const i4 = i + 3;
  const i5 = i + 4;
  const i6 = i + 5;
  const i7 = i + 6;
  const i8 = i + 7;
  const i9 = i + 8;

  const x = particleProps[i];
  const y = particleProps[i2];
  const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;
  const vx = (particleProps[i3] + Math.cos(n)) / 2;
  const vy = (particleProps[i4] + Math.sin(n)) / 2;
  let life = particleProps[i5];
  const ttl = particleProps[i6];
  const speed = particleProps[i7];
  const x2 = x + vx * speed;
  const y2 = y + vy * speed;
  const radius = particleProps[i8];
  const hue = particleProps[i9];

  drawParticle(x, y, x2, y2, life, ttl, radius, hue);

  life++;

  particleProps.set([x2, y2, vx, vy, life], i);

  if (x > canvas.width || x < 0 || y > canvas.height || y < 0 || life > ttl) {
    initParticle(i);
  }
}

function draw() {
  tick++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleProps.length; i += particlePropCount) {
    updateParticle(i);
  }

  requestAnimationFrame(draw);
}
