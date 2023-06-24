document.addEventListener('DOMContentLoaded', function () {
    const sketchpad = document.getElementById('sketchpad');
    const clearButton = document.getElementById('clear');
    const penSizeInput = document.getElementById('pen-size');
    const colorPickerInput = document.getElementById('color-picker');
    const eraserToggle = document.getElementById('eraser-toggle');
  
    let penColor = colorPickerInput.value;
    let penSize = penSizeInput.value;
    let isEraserMode = false;
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    sketchpad.appendChild(canvas);
  
    resizeCanvas();
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    function resizeCanvas() {
      const sketchpadWidth = sketchpad.clientWidth;
      const sketchpadHeight = sketchpad.clientHeight;
  
      canvas.width = sketchpadWidth;
      canvas.height = sketchpadHeight;
    }
  
    function handleMouseDown(event) {
      isDrawing = true;
      lastX = event.offsetX;
      lastY = event.offsetY;
    }
  
    function handleMouseMove(event) {
      if (!isDrawing) return;
  
      const currentX = event.offsetX;
      const currentY = event.offsetY;
  
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(currentX, currentY);
      context.lineWidth = penSize;
      context.lineCap = 'round';
      context.strokeStyle = isEraserMode ? 'black' : penColor;
      context.stroke();
  
      lastX = currentX;
      lastY = currentY;
    }
  
    function handleMouseUp() {
      isDrawing = false;
    }
  
    function clearSketchpad() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function toggleEraserMode() {
      isEraserMode = !isEraserMode;
      eraserToggle.classList.toggle('active', isEraserMode);
    }
  
    sketchpad.addEventListener('mousedown', handleMouseDown);
    sketchpad.addEventListener('mousemove', handleMouseMove);
    sketchpad.addEventListener('mouseup', handleMouseUp);
    clearButton.addEventListener('click', clearSketchpad);
    penSizeInput.addEventListener('change', function () {
      penSize = this.value;
    });
    colorPickerInput.addEventListener('change', function () {
      penColor = this.value;
    });
    eraserToggle.addEventListener('click', toggleEraserMode);
  
    window.addEventListener('resize', resizeCanvas);
  });
  