import { randomIntFromRange } from './utils/array';
import appLoop from './utils/appLoop';
import { randomRgba } from './utils/color';
import Particle, {
  particleMaxRadius,
  particlePhases,
} from './entities/Particle';
import {
  clearDrawingArea,
  getDrawingContext,
  getMousePosition,
  registerClickHandler,
} from './utils/appWindow';
import getTextPrinter from './utils/getTextPrinter';

const particleCount = (innerWidth * innerHeight) / 100;
const particles: Particle[] = [];

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
  const context = getDrawingContext();
  const mouse = getMousePosition();
  const textPrinter = getTextPrinter(context);

  clearDrawingArea();

  particles.forEach((object) => {
    object.update(context);
  });

  textPrinter({ text: `FPS: ${currentFps}`, position: { x: 0, y: 10 } });
  textPrinter({
    text: 'HTML CANVAS BOILERPLATE',
    color: randomRgba(),
    position: { x: mouse.x, y: mouse.y },
  });
}

createParticles();

registerClickHandler(randomizeParticles);

const fps = 12;

appLoop({ fps, onFrame: logic });
