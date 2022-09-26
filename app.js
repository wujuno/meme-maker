const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#color");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveBtn = document.querySelector("#save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";


let isPainting = false;
let isFilling = false;


function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
   
}
function startPainting(){
   isPainting = true;
}
function canclePainting(){
    isPainting = false;
}
function onLineWidthChange(event){
    ctx.lineWidth = (event.target.value);
}
function onLineColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle =event.target.value;

}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    lineColor.value = colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

}
function onEraserClick(){
    ctx.strokeStyle ="white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    const file =event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    };
}

function onDoubleClick(event){
    const text = textInput.value;
    if (text !=="") {
        ctx.save();
    ctx.lineWidth =1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave",canclePainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change",onLineWidthChange);
lineColor.addEventListener("change",onLineColorChange);

colorOption.forEach((color) =>color.addEventListener("click",onColorClick) );

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveClick);