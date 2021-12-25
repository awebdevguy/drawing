const canvas = document.getElementById('canvas');
const decreaseBtn = document.getElementById('decrease');
const sizeInput = document.getElementById('size');
const increaseBtn = document.getElementById('increase');
const colorBtn = document.getElementById('color');
const clearBtn = document.getElementById('clear');
const context = canvas.getContext('2d');
const dpi = window.devicePixelRatio;

let size = 10;
colorBtn.value = '#000'
let color = colorBtn.value;
let isPressed = false;
let x;
let y;

sizeInput.value = size;
sizeInput.select();

fix_dpi();

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
  size = 10;
  sizeInput.value = size;
  color = '#000';
  colorBtn.value = color;
  context.clearRect(0, 0 , canvas.width, canvas.height);
}

canvas.addEventListener('touchstart', (e) => {
  startHandler(e);
}, false);

canvas.addEventListener('touchmove', (e) => {
  moveHandler(e);
}, false);

canvas.addEventListener('touchend', (e) => {
  endHandler(e);
}, false);

canvas.addEventListener('mousedown', startHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', endHandler);

let rect = canvas.getBoundingClientRect();
function startHandler(e) {
  e.preventDefault();
  rect = canvas.getBoundingClientRect();
  isPressed = true;

  if(e.type === 'touchstart') {
    x = (e.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (e.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  }

  if(e.type === 'mousedown') {
    x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  }
}

function moveHandler(e) {
  e.preventDefault();
  rect = canvas.getBoundingClientRect();

  if(isPressed) {

    if(e.type === 'touchmove') {
      const x2 = (e.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width;
      const y2 = (e.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  
      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);
  
      x = x2;
      y = y2;
    }

    if(e.type === 'mousemove') {
      const x2 = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
      const y2 = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  
      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);
  
      x = x2;
      y = y2;
    }
  }
}

function endHandler(e) {
  e.preventDefault();
  isPressed = false;
  x = undefined;
  y = undefined;
}

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
  context.lineWidth = size;
  context.stroke();
}

// fix canvas blur
function fix_dpi() {
  //get CSS height
  //the + prefix casts it to an integer
  //the slice method gets rid of "px"
  let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  //scale the canvas
  canvas.setAttribute('height', style_height * dpi);
  canvas.setAttribute('width', style_width * dpi);
}