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
/*! export particlePhases [provided] [no usage info] [missing usage info prevents renaming] */
/*! export particleRadiusGrowSpeed [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.particleRadiusGrowSpeed = exports.particleMaxRadius = exports.particlePhases = void 0;
const array_1 = __webpack_require__(/*! ../utils/array */ "./src/utils/array.ts");
exports.particlePhases = ['grow', 'shrink'];
exports.particleMaxRadius = 5;
exports.particleRadiusGrowSpeed = 0.3;
class Particle {
    constructor(x, y, radius, color, phase) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.phase = phase;
    }
    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update(c) {
        this.lifeCycle();
        this.draw(c);
    }
    lifeCycle() {
        if (this.phase === 'grow') {
            this.radius += exports.particleRadiusGrowSpeed;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9lbnRpdGllcy9QYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcHBMb29wLnRzIiwid2VicGFjazovL2NhbnZhcy1nYW1lLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcnJheS50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9jb2xvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS8uL3NyYy91dGlscy9nZXRUZXh0UHJpbnRlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYW52YXMtZ2FtZS10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsK0JBQStCLEdBQUcseUJBQXlCLEdBQUcsc0JBQXNCO0FBQ3BGLGdCQUFnQixtQkFBTyxDQUFDLDRDQUFnQjtBQUN4QyxzQkFBc0I7QUFDdEIseUJBQXlCO0FBQ3pCLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NGO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdCQUFnQixtQkFBTyxDQUFDLDJDQUFlO0FBQ3ZDLGtDQUFrQyxtQkFBTyxDQUFDLCtDQUFpQjtBQUMzRCxnQkFBZ0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUN2QyxnQ0FBZ0MsbUJBQU8sQ0FBQyx1REFBcUI7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsbURBQW1CO0FBQy9DLHlDQUF5QyxtQkFBTyxDQUFDLDZEQUF3QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUIsZUFBZSxXQUFXLGNBQWMsY0FBYyxFQUFFO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7OztBQzFENUI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Q7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCx5QkFBeUIsR0FBRyx3QkFBd0IsR0FBRyx3QkFBd0IsR0FBRyw0QkFBNEI7QUFDOUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q1o7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjs7Ozs7Ozs7Ozs7Ozs7OztBQ05iO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxVQUFVO0FBQzFFO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkw7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Q7QUFDQTtBQUNBLGVBQWUsa0NBQWtDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7OztVQ1RmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wYXJ0aWNsZVJhZGl1c0dyb3dTcGVlZCA9IGV4cG9ydHMucGFydGljbGVNYXhSYWRpdXMgPSBleHBvcnRzLnBhcnRpY2xlUGhhc2VzID0gdm9pZCAwO1xuY29uc3QgYXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcnJheVwiKTtcbmV4cG9ydHMucGFydGljbGVQaGFzZXMgPSBbJ2dyb3cnLCAnc2hyaW5rJ107XG5leHBvcnRzLnBhcnRpY2xlTWF4UmFkaXVzID0gNTtcbmV4cG9ydHMucGFydGljbGVSYWRpdXNHcm93U3BlZWQgPSAwLjM7XG5jbGFzcyBQYXJ0aWNsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzLCBjb2xvciwgcGhhc2UpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5waGFzZSA9IHBoYXNlO1xuICAgIH1cbiAgICBkcmF3KGMpIHtcbiAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgYy5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjLmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGMuZmlsbCgpO1xuICAgICAgICBjLmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICB1cGRhdGUoYykge1xuICAgICAgICB0aGlzLmxpZmVDeWNsZSgpO1xuICAgICAgICB0aGlzLmRyYXcoYyk7XG4gICAgfVxuICAgIGxpZmVDeWNsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGhhc2UgPT09ICdncm93Jykge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgKz0gZXhwb3J0cy5wYXJ0aWNsZVJhZGl1c0dyb3dTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnJhZGl1cyA+IGV4cG9ydHMucGFydGljbGVNYXhSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXNlID0gJ3Nocmluayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGhhc2UgPT09ICdzaHJpbmsnKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyAtPSBleHBvcnRzLnBhcnRpY2xlUmFkaXVzR3Jvd1NwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaXVzIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXNlID0gJ2dyb3cnO1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByYW5kb21Qb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy54ID0gYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgaW5uZXJXaWR0aCk7XG4gICAgICAgIHRoaXMueSA9IGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIGlubmVySGVpZ2h0KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQYXJ0aWNsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcnJheV8xID0gcmVxdWlyZShcIi4vdXRpbHMvYXJyYXlcIik7XG5jb25zdCBhcHBMb29wXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvYXBwTG9vcFwiKSk7XG5jb25zdCBjb2xvcl8xID0gcmVxdWlyZShcIi4vdXRpbHMvY29sb3JcIik7XG5jb25zdCBQYXJ0aWNsZV8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL2VudGl0aWVzL1BhcnRpY2xlXCIpKTtcbmNvbnN0IGFwcFdpbmRvd18xID0gcmVxdWlyZShcIi4vdXRpbHMvYXBwV2luZG93XCIpO1xuY29uc3QgZ2V0VGV4dFByaW50ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9nZXRUZXh0UHJpbnRlclwiKSk7XG5jb25zdCBwYXJ0aWNsZUNvdW50ID0gKGlubmVyV2lkdGggKiBpbm5lckhlaWdodCkgLyAxMDA7XG5jb25zdCBwYXJ0aWNsZXMgPSBbXTtcbmZ1bmN0aW9uIGNyZWF0ZVBhcnRpY2xlcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgICAgICBwYXJ0aWNsZXMucHVzaChuZXcgUGFydGljbGVfMS5kZWZhdWx0KGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIGlubmVyV2lkdGgpLCBhcnJheV8xLnJhbmRvbUludEZyb21SYW5nZSgwLCBpbm5lckhlaWdodCksIGFycmF5XzEucmFuZG9tSW50RnJvbVJhbmdlKDAsIFBhcnRpY2xlXzEucGFydGljbGVNYXhSYWRpdXMgJSBpKSwgY29sb3JfMS5yYW5kb21SZ2JhKCksIFBhcnRpY2xlXzEucGFydGljbGVQaGFzZXNbYXJyYXlfMS5yYW5kb21JbnRGcm9tUmFuZ2UoMCwgMSldKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmFuZG9taXplUGFydGljbGVzKCkge1xuICAgIHBhcnRpY2xlcy5mb3JFYWNoKChwYXJ0aWNsZSkgPT4gcGFydGljbGUucmFuZG9tUG9zaXRpb24oKSk7XG59XG5mdW5jdGlvbiBsb2dpYyh7IGN1cnJlbnRGcHMgfSkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBhcHBXaW5kb3dfMS5nZXREcmF3aW5nQ29udGV4dCgpO1xuICAgIGNvbnN0IG1vdXNlID0gYXBwV2luZG93XzEuZ2V0TW91c2VQb3NpdGlvbigpO1xuICAgIGNvbnN0IHRleHRQcmludGVyID0gZ2V0VGV4dFByaW50ZXJfMS5kZWZhdWx0KGNvbnRleHQpO1xuICAgIGFwcFdpbmRvd18xLmNsZWFyRHJhd2luZ0FyZWEoKTtcbiAgICBwYXJ0aWNsZXMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdC51cGRhdGUoY29udGV4dCk7XG4gICAgfSk7XG4gICAgdGV4dFByaW50ZXIoeyB0ZXh0OiBgRlBTOiAke2N1cnJlbnRGcHN9YCwgcG9zaXRpb246IHsgeDogMCwgeTogMTAgfSB9KTtcbiAgICB0ZXh0UHJpbnRlcih7XG4gICAgICAgIHRleHQ6ICdIVE1MIENBTlZBUyBCT0lMRVJQTEFURScsXG4gICAgICAgIGNvbG9yOiBjb2xvcl8xLnJhbmRvbVJnYmEoKSxcbiAgICAgICAgcG9zaXRpb246IHsgeDogbW91c2UueCwgeTogbW91c2UueSB9LFxuICAgIH0pO1xufVxuY3JlYXRlUGFydGljbGVzKCk7XG5hcHBXaW5kb3dfMS5yZWdpc3RlckNsaWNrSGFuZGxlcihyYW5kb21pemVQYXJ0aWNsZXMpO1xuY29uc3QgZnBzID0gMTI7XG5hcHBMb29wXzEuZGVmYXVsdCh7IGZwcywgb25GcmFtZTogbG9naWMgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBmcmFtZUNvdW50ID0gMDtcbmxldCBmcHNJbnRlcnZhbCwgc3RhcnRUaW1lLCBub3csIHRoZW4sIGVsYXBzZWQsIGxvb3A7XG5mdW5jdGlvbiBhcHBMb29wKHsgZnBzLCBvbkZyYW1lLCB9KSB7XG4gICAgZnBzSW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgIHRoZW4gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgc3RhcnRUaW1lID0gdGhlbjtcbiAgICBsb29wID0gY3JlYXRlTG9vcChvbkZyYW1lKTtcbiAgICBsb29wKHN0YXJ0VGltZSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhcHBMb29wO1xuZnVuY3Rpb24gY3JlYXRlTG9vcChsb2dpYykge1xuICAgIHJldHVybiAobG9vcFRpbWUpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBub3cgPSBsb29wVGltZTtcbiAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoZW47XG4gICAgICAgIGlmIChlbGFwc2VkID4gZnBzSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIGZwc0ludGVydmFsKTtcbiAgICAgICAgICAgIGNvbnN0IHNpbmNlU3RhcnQgPSBub3cgLSBzdGFydFRpbWU7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RnBzID0gTWF0aC5yb3VuZCgoMTAwMCAvIChzaW5jZVN0YXJ0IC8gKytmcmFtZUNvdW50KSkgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgbG9naWMoeyBjdXJyZW50RnBzIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGV4cG9ydHMuY2xlYXJEcmF3aW5nQXJlYSA9IGV4cG9ydHMuZ2V0TW91c2VQb3NpdGlvbiA9IGV4cG9ydHMucmVnaXN0ZXJDbGlja0hhbmRsZXIgPSB2b2lkIDA7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbmNhbnZhcy53aWR0aCA9IGlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gaW5uZXJIZWlnaHQ7XG5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgY2FudmFzLndpZHRoID0gaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW5uZXJIZWlnaHQ7XG59KTtcbmNvbnN0IG1vdXNlID0ge1xuICAgIHg6IGlubmVyV2lkdGggLyAyLFxuICAgIHk6IGlubmVySGVpZ2h0IC8gMixcbn07XG5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICBtb3VzZS54ID0gZXZlbnQuY2xpZW50WDtcbiAgICBtb3VzZS55ID0gZXZlbnQuY2xpZW50WTtcbn0pO1xuZnVuY3Rpb24gcmVnaXN0ZXJDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gcmVnaXN0ZXJDbGlja0hhbmRsZXI7XG5mdW5jdGlvbiBnZXRNb3VzZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiBtb3VzZTtcbn1cbmV4cG9ydHMuZ2V0TW91c2VQb3NpdGlvbiA9IGdldE1vdXNlUG9zaXRpb247XG5mdW5jdGlvbiBjbGVhckRyYXdpbmdBcmVhKCkge1xuICAgIGNvbnN0IGMgPSBnZXREcmF3aW5nQ29udGV4dCgpO1xuICAgIGMuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5leHBvcnRzLmNsZWFyRHJhd2luZ0FyZWEgPSBjbGVhckRyYXdpbmdBcmVhO1xuZnVuY3Rpb24gZ2V0RHJhd2luZ0NvbnRleHQoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgY2FudmFzIGRyYXdpbmcgMmQgY29udGV4dCcpO1xufVxuZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGdldERyYXdpbmdDb250ZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJhbmRvbUludEZyb21SYW5nZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIHJhbmRvbUludEZyb21SYW5nZShtaW4gPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgbWF4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn1cbmV4cG9ydHMucmFuZG9tSW50RnJvbVJhbmdlID0gcmFuZG9tSW50RnJvbVJhbmdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJhbmRvbVJnYmEgPSB2b2lkIDA7XG5mdW5jdGlvbiB6ZXJvVG8yNTYoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG59XG5mdW5jdGlvbiB6ZXJvVG8xKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvRml4ZWQoMSk7XG59XG5mdW5jdGlvbiByYW5kb21SZ2JhKCkge1xuICAgIHJldHVybiBgcmdiYSgke3plcm9UbzI1NigpfSwke3plcm9UbzI1NigpfSwke3plcm9UbzI1NigpfSwke3plcm9UbzEoKX0pYDtcbn1cbmV4cG9ydHMucmFuZG9tUmdiYSA9IHJhbmRvbVJnYmE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldFRleHRQcmludGVyKGN0eCkge1xuICAgIHJldHVybiAocHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgeyB0ZXh0LCBjb2xvciA9ICdibGFjaycsIHBvc2l0aW9uIH0gPSBwcm9wcztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGdldFRleHRQcmludGVyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=