/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entities/Particle.ts":
/*!**********************************!*\
  !*** ./src/entities/Particle.ts ***!
  \**********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleMaxRadius [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleMoveRandomness [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particlePhases [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleRadiusGrowSpeed [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.particleRadiusGrowSpeed = exports.particleMoveRandomness = exports.particleMaxRadius = exports.particlePhases = void 0;
const array_1 = __webpack_require__(/*! ../utils/array */ "./src/utils/array.ts");
exports.particlePhases = ['grow', 'shrink'];
exports.particleMaxRadius = 5;
exports.particleMoveRandomness = 3;
exports.particleRadiusGrowSpeed = 0.3;
class Particle {
    constructor(x, y, radius, color, phase) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.phase = phase;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update(ctx) {
        this.lifeCycle();
        this.randomMove();
        this.draw(ctx);
    }
    lifeCycle() {
        if (this.phase === 'grow') {
            this.radius +=
                exports.particleRadiusGrowSpeed * array_1.randomIntFromRange(0, exports.particleMoveRandomness);
            if (this.radius > exports.particleMaxRadius) {
                this.phase = 'shrink';
            }
        }
        if (this.phase === 'shrink') {
            this.radius -= exports.particleRadiusGrowSpeed;
            if (this.radius < 0) {
                this.radius = 0;
                this.phase = 'grow';
                this.randomPosition();
            }
        }
    }
    randomMove() {
        this.x += array_1.randomIntFromRange(-exports.particleMoveRandomness, exports.particleMoveRandomness);
        this.y += array_1.randomIntFromRange(-exports.particleMoveRandomness, exports.particleMoveRandomness);
    }
    randomPosition() {
        this.x = array_1.randomIntFromRange(0, innerWidth);
        this.y = array_1.randomIntFromRange(0, innerHeight);
    }
}
exports.default = Particle;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/*! CommonJS bailout: this is used directly at 9:26-30 */
/*! CommonJS bailout: this is used directly at 14:20-24 */
/*! CommonJS bailout: this is used directly at 21:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const array_1 = __webpack_require__(/*! ./utils/array */ "./src/utils/array.ts");
const appLoop_1 = __importDefault(__webpack_require__(/*! ./utils/appLoop */ "./src/utils/appLoop.ts"));
const color_1 = __webpack_require__(/*! ./utils/color */ "./src/utils/color.ts");
const Particle_1 = __importStar(__webpack_require__(/*! ./entities/Particle */ "./src/entities/Particle.ts"));
const appWindow_1 = __webpack_require__(/*! ./utils/appWindow */ "./src/utils/appWindow.ts");
const getTextPrinter_1 = __importDefault(__webpack_require__(/*! ./utils/getTextPrinter */ "./src/utils/getTextPrinter.ts"));
const particleCount = (innerWidth * innerHeight) / 100;
const particles = [];
function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle_1.default(array_1.randomIntFromRange(0, innerWidth), array_1.randomIntFromRange(0, innerHeight), array_1.randomIntFromRange(0, Particle_1.particleMaxRadius % i), color_1.randomRgba(), Particle_1.particlePhases[array_1.randomIntFromRange(0, 1)]));
    }
}
function randomizeParticles() {
    particles.forEach((particle) => particle.randomPosition());
}
function logic({ currentFps }) {
    const context = appWindow_1.getDrawingContext();
    const mouse = appWindow_1.getMousePosition();
    const textPrinter = getTextPrinter_1.default(context);
    appWindow_1.clearDrawingArea();
    particles.forEach((object) => {
        object.update(context);
    });
    textPrinter({ text: `FPS: ${currentFps}`, position: { x: 0, y: 10 } });
    textPrinter({
        text: 'HTML CANVAS BOILERPLATE',
        color: color_1.randomRgba(),
        position: { x: mouse.x, y: mouse.y },
    });
}
createParticles();
appWindow_1.registerClickHandler(randomizeParticles);
const fps = 12;
appLoop_1.default({ fps, onFrame: logic });


/***/ }),

/***/ "./src/utils/appLoop.ts":
/*!******************************!*\
  !*** ./src/utils/appLoop.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed, loop;
function appLoop({ fps, onFrame, }) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    loop = createLoop(onFrame);
    loop(startTime);
}
exports.default = appLoop;
function createLoop(logic) {
    return (loopTime) => {
        requestAnimationFrame(loop);
        now = loopTime;
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            const sinceStart = now - startTime;
            const currentFps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
            logic({ currentFps });
        }
    };
}


/***/ }),

/***/ "./src/utils/appWindow.ts":
/*!********************************!*\
  !*** ./src/utils/appWindow.ts ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clearDrawingArea [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDrawingContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMousePosition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerClickHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDrawingContext = exports.clearDrawingArea = exports.getMousePosition = exports.registerClickHandler = void 0;
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
function registerClickHandler(handler) {
    addEventListener('click', handler);
}
exports.registerClickHandler = registerClickHandler;
function getMousePosition() {
    return mouse;
}
exports.getMousePosition = getMousePosition;
function clearDrawingArea() {
    const c = getDrawingContext();
    c.clearRect(0, 0, canvas.width, canvas.height);
}
exports.clearDrawingArea = clearDrawingArea;
function getDrawingContext() {
    const context = canvas.getContext('2d');
    if (context) {
        return context;
    }
    throw new Error('Unable to get canvas drawing 2d context');
}
exports.getDrawingContext = getDrawingContext;


/***/ }),

/***/ "./src/utils/array.ts":
/*!****************************!*\
  !*** ./src/utils/array.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export randomIntFromRange [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomIntFromRange = void 0;
function randomIntFromRange(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomIntFromRange = randomIntFromRange;


/***/ }),

/***/ "./src/utils/color.ts":
/*!****************************!*\
  !*** ./src/utils/color.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export randomRgba [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomRgba = void 0;
function zeroTo256() {
    return Math.round(Math.random() * 255);
}
function zeroTo1() {
    return Math.random().toFixed(1);
}
function randomRgba() {
    return `rgba(${zeroTo256()},${zeroTo256()},${zeroTo256()},${zeroTo1()})`;
}
exports.randomRgba = randomRgba;


/***/ }),

/***/ "./src/utils/getTextPrinter.ts":
/*!*************************************!*\
  !*** ./src/utils/getTextPrinter.ts ***!
  \*************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getTextPrinter(ctx) {
    return (props) => {
        const { text, color = 'black', position } = props;
        ctx.fillStyle = color;
        ctx.fillText(text, position.x, position.y);
    };
}
exports.default = getTextPrinter;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9lbnRpdGllcy9QYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcHBMb29wLnRzIiwid2VicGFjazovL2NhbnZhcy1nYW1lLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcnJheS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9jb2xvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9nZXRUZXh0UHJpbnRlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELCtCQUErQixHQUFHLDhCQUE4QixHQUFHLHlCQUF5QixHQUFHLHNCQUFzQjtBQUNySCxnQkFBZ0IsbUJBQU8sQ0FBQyw0Q0FBZ0I7QUFDeEMsc0JBQXNCO0FBQ3RCLHlCQUF5QjtBQUN6Qiw4QkFBOEI7QUFDOUIsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REY7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlDQUF5Qyw2QkFBNkI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0JBQWdCLG1CQUFPLENBQUMsMkNBQWU7QUFDdkMsa0NBQWtDLG1CQUFPLENBQUMsK0NBQWlCO0FBQzNELGdCQUFnQixtQkFBTyxDQUFDLDJDQUFlO0FBQ3ZDLGdDQUFnQyxtQkFBTyxDQUFDLHVEQUFxQjtBQUM3RCxvQkFBb0IsbUJBQU8sQ0FBQyxtREFBbUI7QUFDL0MseUNBQXlDLG1CQUFPLENBQUMsNkRBQXdCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlCQUFpQixlQUFlLFdBQVcsY0FBYyxjQUFjLEVBQUU7QUFDekU7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUQ1QjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHlCQUF5QixHQUFHLHdCQUF3QixHQUFHLHdCQUF3QixHQUFHLDRCQUE0QjtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDWjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVksR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLFVBQVU7QUFDMUU7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaTDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0EsZUFBZSxrQ0FBa0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7O1VDVGY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkID0gZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzID0gZXhwb3J0cy5wYXJ0aWNsZU1heFJhZGl1cyA9IGV4cG9ydHMucGFydGljbGVQaGFzZXMgPSB2b2lkIDA7XG5jb25zdCBhcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FycmF5XCIpO1xuZXhwb3J0cy5wYXJ0aWNsZVBoYXNlcyA9IFsnZ3JvdycsICdzaHJpbmsnXTtcbmV4cG9ydHMucGFydGljbGVNYXhSYWRpdXMgPSA1O1xuZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzID0gMztcbmV4cG9ydHMucGFydGljbGVSYWRpdXNHcm93U3BlZWQgPSAwLjM7XG5jbGFzcyBQYXJ0aWNsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzLCBjb2xvciwgcGhhc2UpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5waGFzZSA9IHBoYXNlO1xuICAgIH1cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICB1cGRhdGUoY3R4KSB7XG4gICAgICAgIHRoaXMubGlmZUN5Y2xlKCk7XG4gICAgICAgIHRoaXMucmFuZG9tTW92ZSgpO1xuICAgICAgICB0aGlzLmRyYXcoY3R4KTtcbiAgICB9XG4gICAgbGlmZUN5Y2xlKCkge1xuICAgICAgICBpZiAodGhpcy5waGFzZSA9PT0gJ2dyb3cnKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyArPVxuICAgICAgICAgICAgICAgIGV4cG9ydHMucGFydGljbGVSYWRpdXNHcm93U3BlZWQgKiBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBleHBvcnRzLnBhcnRpY2xlTW92ZVJhbmRvbW5lc3MpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaXVzID4gZXhwb3J0cy5wYXJ0aWNsZU1heFJhZGl1cykge1xuICAgICAgICAgICAgICAgIHRoaXMucGhhc2UgPSAnc2hyaW5rJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5waGFzZSA9PT0gJ3NocmluaycpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzIC09IGV4cG9ydHMucGFydGljbGVSYWRpdXNHcm93U3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5yYWRpdXMgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucGhhc2UgPSAnZ3Jvdyc7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb21Qb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJhbmRvbU1vdmUoKSB7XG4gICAgICAgIHRoaXMueCArPSBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgtZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzLCBleHBvcnRzLnBhcnRpY2xlTW92ZVJhbmRvbW5lc3MpO1xuICAgICAgICB0aGlzLnkgKz0gYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoLWV4cG9ydHMucGFydGljbGVNb3ZlUmFuZG9tbmVzcywgZXhwb3J0cy5wYXJ0aWNsZU1vdmVSYW5kb21uZXNzKTtcbiAgICB9XG4gICAgcmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMueCA9IGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIGlubmVyV2lkdGgpO1xuICAgICAgICB0aGlzLnkgPSBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBpbm5lckhlaWdodCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUGFydGljbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXJyYXlfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2FycmF5XCIpO1xuY29uc3QgYXBwTG9vcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL2FwcExvb3BcIikpO1xuY29uc3QgY29sb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2NvbG9yXCIpO1xuY29uc3QgUGFydGljbGVfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9lbnRpdGllcy9QYXJ0aWNsZVwiKSk7XG5jb25zdCBhcHBXaW5kb3dfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2FwcFdpbmRvd1wiKTtcbmNvbnN0IGdldFRleHRQcmludGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvZ2V0VGV4dFByaW50ZXJcIikpO1xuY29uc3QgcGFydGljbGVDb3VudCA9IChpbm5lcldpZHRoICogaW5uZXJIZWlnaHQpIC8gMTAwO1xuY29uc3QgcGFydGljbGVzID0gW107XG5mdW5jdGlvbiBjcmVhdGVQYXJ0aWNsZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgcGFydGljbGVzLnB1c2gobmV3IFBhcnRpY2xlXzEuZGVmYXVsdChhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBpbm5lcldpZHRoKSwgYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgaW5uZXJIZWlnaHQpLCBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBQYXJ0aWNsZV8xLnBhcnRpY2xlTWF4UmFkaXVzICUgaSksIGNvbG9yXzEucmFuZG9tUmdiYSgpLCBQYXJ0aWNsZV8xLnBhcnRpY2xlUGhhc2VzW2FycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIDEpXSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJhbmRvbWl6ZVBhcnRpY2xlcygpIHtcbiAgICBwYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUpID0+IHBhcnRpY2xlLnJhbmRvbVBvc2l0aW9uKCkpO1xufVxuZnVuY3Rpb24gbG9naWMoeyBjdXJyZW50RnBzIH0pIHtcbiAgICBjb25zdCBjb250ZXh0ID0gYXBwV2luZG93XzEuZ2V0RHJhd2luZ0NvbnRleHQoKTtcbiAgICBjb25zdCBtb3VzZSA9IGFwcFdpbmRvd18xLmdldE1vdXNlUG9zaXRpb24oKTtcbiAgICBjb25zdCB0ZXh0UHJpbnRlciA9IGdldFRleHRQcmludGVyXzEuZGVmYXVsdChjb250ZXh0KTtcbiAgICBhcHBXaW5kb3dfMS5jbGVhckRyYXdpbmdBcmVhKCk7XG4gICAgcGFydGljbGVzLmZvckVhY2goKG9iamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QudXBkYXRlKGNvbnRleHQpO1xuICAgIH0pO1xuICAgIHRleHRQcmludGVyKHsgdGV4dDogYEZQUzogJHtjdXJyZW50RnBzfWAsIHBvc2l0aW9uOiB7IHg6IDAsIHk6IDEwIH0gfSk7XG4gICAgdGV4dFByaW50ZXIoe1xuICAgICAgICB0ZXh0OiAnSFRNTCBDQU5WQVMgQk9JTEVSUExBVEUnLFxuICAgICAgICBjb2xvcjogY29sb3JfMS5yYW5kb21SZ2JhKCksXG4gICAgICAgIHBvc2l0aW9uOiB7IHg6IG1vdXNlLngsIHk6IG1vdXNlLnkgfSxcbiAgICB9KTtcbn1cbmNyZWF0ZVBhcnRpY2xlcygpO1xuYXBwV2luZG93XzEucmVnaXN0ZXJDbGlja0hhbmRsZXIocmFuZG9taXplUGFydGljbGVzKTtcbmNvbnN0IGZwcyA9IDEyO1xuYXBwTG9vcF8xLmRlZmF1bHQoeyBmcHMsIG9uRnJhbWU6IGxvZ2ljIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5sZXQgZnJhbWVDb3VudCA9IDA7XG5sZXQgZnBzSW50ZXJ2YWwsIHN0YXJ0VGltZSwgbm93LCB0aGVuLCBlbGFwc2VkLCBsb29wO1xuZnVuY3Rpb24gYXBwTG9vcCh7IGZwcywgb25GcmFtZSwgfSkge1xuICAgIGZwc0ludGVydmFsID0gMTAwMCAvIGZwcztcbiAgICB0aGVuID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0YXJ0VGltZSA9IHRoZW47XG4gICAgbG9vcCA9IGNyZWF0ZUxvb3Aob25GcmFtZSk7XG4gICAgbG9vcChzdGFydFRpbWUpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gYXBwTG9vcDtcbmZ1bmN0aW9uIGNyZWF0ZUxvb3AobG9naWMpIHtcbiAgICByZXR1cm4gKGxvb3BUaW1lKSA9PiB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgbm93ID0gbG9vcFRpbWU7XG4gICAgICAgIGVsYXBzZWQgPSBub3cgLSB0aGVuO1xuICAgICAgICBpZiAoZWxhcHNlZCA+IGZwc0ludGVydmFsKSB7XG4gICAgICAgICAgICB0aGVuID0gbm93IC0gKGVsYXBzZWQgJSBmcHNJbnRlcnZhbCk7XG4gICAgICAgICAgICBjb25zdCBzaW5jZVN0YXJ0ID0gbm93IC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEZwcyA9IE1hdGgucm91bmQoKDEwMDAgLyAoc2luY2VTdGFydCAvICsrZnJhbWVDb3VudCkpICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgIGxvZ2ljKHsgY3VycmVudEZwcyB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RHJhd2luZ0NvbnRleHQgPSBleHBvcnRzLmNsZWFyRHJhd2luZ0FyZWEgPSBleHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBleHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gdm9pZCAwO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5jYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGNhbnZhcy53aWR0aCA9IGlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xufSk7XG5jb25zdCBtb3VzZSA9IHtcbiAgICB4OiBpbm5lcldpZHRoIC8gMixcbiAgICB5OiBpbm5lckhlaWdodCAvIDIsXG59O1xuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgbW91c2UueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgbW91c2UueSA9IGV2ZW50LmNsaWVudFk7XG59KTtcbmZ1bmN0aW9uIHJlZ2lzdGVyQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZWdpc3RlckNsaWNrSGFuZGxlciA9IHJlZ2lzdGVyQ2xpY2tIYW5kbGVyO1xuZnVuY3Rpb24gZ2V0TW91c2VQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbW91c2U7XG59XG5leHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uO1xuZnVuY3Rpb24gY2xlYXJEcmF3aW5nQXJlYSgpIHtcbiAgICBjb25zdCBjID0gZ2V0RHJhd2luZ0NvbnRleHQoKTtcbiAgICBjLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuZXhwb3J0cy5jbGVhckRyYXdpbmdBcmVhID0gY2xlYXJEcmF3aW5nQXJlYTtcbmZ1bmN0aW9uIGdldERyYXdpbmdDb250ZXh0KCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IGNhbnZhcyBkcmF3aW5nIDJkIGNvbnRleHQnKTtcbn1cbmV4cG9ydHMuZ2V0RHJhd2luZ0NvbnRleHQgPSBnZXREcmF3aW5nQ29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5kb21JbnRGcm9tUmFuZ2UgPSB2b2lkIDA7XG5mdW5jdGlvbiByYW5kb21JbnRGcm9tUmFuZ2UobWluID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsIG1heCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5leHBvcnRzLnJhbmRvbUludEZyb21SYW5nZSA9IHJhbmRvbUludEZyb21SYW5nZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5kb21SZ2JhID0gdm9pZCAwO1xuZnVuY3Rpb24gemVyb1RvMjU2KCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xufVxuZnVuY3Rpb24gemVyb1RvMSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b0ZpeGVkKDEpO1xufVxuZnVuY3Rpb24gcmFuZG9tUmdiYSgpIHtcbiAgICByZXR1cm4gYHJnYmEoJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8xKCl9KWA7XG59XG5leHBvcnRzLnJhbmRvbVJnYmEgPSByYW5kb21SZ2JhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBnZXRUZXh0UHJpbnRlcihjdHgpIHtcbiAgICByZXR1cm4gKHByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGV4dCwgY29sb3IgPSAnYmxhY2snLCBwb3NpdGlvbiB9ID0gcHJvcHM7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRUZXh0UHJpbnRlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9