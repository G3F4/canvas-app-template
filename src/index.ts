import { randomIntFromRange } from './utils';

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

class Particle {
  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private color: string | CanvasGradient | CanvasPattern,
  ) {}

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }

  randomPosition() {
    this.x = randomIntFromRange(0, innerWidth);
    this.y = randomIntFromRange(0, innerHeight);
  }
}

const particles: Particle[] = [];

function createParticles() {
  const particleCount = (innerWidth * innerHeight) / 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        randomIntFromRange(0, innerWidth),
        randomIntFromRange(0, innerHeight),
        randomIntFromRange(0, 5 % i),
        'red',
      ),
    );
  }
}

function randomizeParticles() {
  particles.forEach((particle) => particle.randomPosition());
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillText('CANVAS GAME BOILERPLATE', mouse.x, mouse.y);
  particles.forEach((object) => {
    object.update();
  });
}

createParticles();
animate();
