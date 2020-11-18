import { randomIntFromRange } from './utils/array';
import appLoop from './utils/appLoop';
import { randomRgba } from './utils/color';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const c = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('click', () => {
  randomizeParticles();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

const particleMaxRadius = 5;
const particleCount = (innerWidth * innerHeight) / 100;
const particleRadiusGrowSpeed = 0.3;
const particlePhases = ['grow', 'shrink'] as const;
const particles: Particle[] = [];

class Particle {
  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private color: string | CanvasGradient | CanvasPattern,
    private phase: 'grow' | 'shrink',
  ) {}

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.lifeCycle();
    this.draw();
  }

  lifeCycle() {
    if (this.phase === 'grow') {
      this.radius += particleRadiusGrowSpeed;

      if (this.radius > particleMaxRadius) {
        this.phase = 'shrink';
      }
    }

    if (this.phase === 'shrink') {
      this.radius -= particleRadiusGrowSpeed;

      if (this.radius < 0) {
        this.radius = 0;
        this.phase = 'grow';
        this.randomPosition();
      }
    }
  }

  randomPosition() {
    this.x = randomIntFromRange(0, innerWidth);
    this.y = randomIntFromRange(0, innerHeight);
  }
}

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        randomIntFromRange(0, innerWidth),
        randomIntFromRange(0, innerHeight),
        randomIntFromRange(0, particleMaxRadius % i),
        randomRgba(),
        particlePhases[randomIntFromRange(0, 1)],
      ),
    );
  }
}

function randomizeParticles() {
  particles.forEach((particle) => particle.randomPosition());
}

function logic({ currentFps }: { currentFps: number }) {
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((object) => {
    object.update();
  });

  c.fillStyle = 'black';
  c.fillText(`FPS: ${currentFps}`, 0, 10);
}

createParticles();

const fps = 24;

appLoop({ fps, onFrame: logic });
