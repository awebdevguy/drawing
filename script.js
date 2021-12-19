const canvas = document.getElementById('canvas');
const decreaseBtn = document.getElementById('decrease');
const sizeInput = document.getElementById('size');
const increaseBtn = document.getElementById('increase');
const colorBtn = document.getElementById('color');
const clearBtn = document.getElementById('clear');
const context = canvas.getContext('2d');

let size = 20;
let color = 'black';
let isPressed = false;
let x;
let y;

sizeInput.value = size;
sizeInput.select();

decreaseBtn.addEventListener('click', clickDecreaseHandler);
sizeInput.addEventListener('change', changeSizeHandler);
increaseBtn.addEventListener('click', clickIncreaseHandler);
colorBtn.addEventListener('input', () => color = colorBtn.value);
clearBtn.addEventListener('click', clickClearHandler);

function clickDecreaseHandler() {
  size--;
  size < 1 ? size = 1 : size;
  sizeInput.value = size;
}

function changeSizeHandler(e) {
  e.preventDefault();
  const value = e.target.value
  size = value > 99 ? 99 : value;
}

function clickIncreaseHandler() {
  size++;
  size > 99 ? size = 99 : size;
  sizeInput.value = size;
}

function clickClearHandler() {
  size = 20;
  sizeInput.value = size;
  color = 'black';
  colorBtn.value = color;
  context.clearRect(0, 0 , canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startHandler);

// if('ontouchmove' in window) {
//   canvas.addEventListener('touchmove', function() {
//     let touchHandler = function() {
//       moveHandler();
//       this.removeEventListener(touchHandler);
//     }
//     this.addEventListener(touchHandler, canvas);
//   });
// }

canvas.addEventListener('mouseup', () => {
  isPressed = false;
  x = undefined;
  y = undefined;

  console.log(x, y);
});

canvas.addEventListener('mousemove', moveHandler);
// (e) => {
//   if(isPressed) {
//     const x2 = e.offsetX;
//     const y2 = e.offsetY;

//     drawCircle(x2, y2);
//     drawLine(x, y, x2, y2);

//     x = x2;
//     y = y2;

//     console.log(x, y);
//   }
// });

// canvas.addEventListener('touchstart', (e) => {
//   e.preventDefault();
//   isPressed = true;
//   x = e.offsetX;
//   y = e.offsetY;
// });

canvas.ontouchstart = startHandler;
canvas.ontouchmove = moveHandler;

function moveHandler(e) {
  if(isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;

    console.log(x, y);
  }
}

function startHandler(e) {
  // e.preventDefault();
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  console.log(x, y);
}

// canvas.addEventListener('touchend', (e) => {
//   e.preventDefault();
//   isPressed = false;
//   x = undefined;
//   y = undefined;
// });

// canvas.addEventListener('touchmove', (e) => {
//   e.preventDefault();
//   if(isPressed) {
//     const x2 = e.offsetX;
//     const y2 = e.offsetY;

//     drawCircle(x2, y2);
//     drawLine(x, y, x2, y2);

//     x = x2;
//     y = y2;
//   }
// });

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, size, 0 , Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.lineWidth = size * 2;
  context.stroke();
}