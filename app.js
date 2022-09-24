const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#color");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
canvas.width = 800;
canvas.height = 800;


let isPainting = false;


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
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave",canclePainting);

lineWidth.addEventListener("change",onLineWidthChange);
lineColor.addEventListener("change",onLineColorChange);

colorOption.forEach((color) =>color.addEventListener("click",onColorClick) );