const colorPicker=document.getElementById("colorPicker");
const canvasColor=document.getElementById("canvasColor");
const canvas=document.getElementById("mycanvas");
const save =document.getElementById("savebtn");
const clear =document.getElementById("clearbtn");
const retrieve=document.getElementById("retrievebtn");
const fontsize=document.getElementById("fontsize");
const ctx = canvas.getContext('2d');

let isDrawing = false; 
let lastX = 0; 
let lastY = 0; 




function setCanvasBackgroundColor(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


setCanvasBackgroundColor(canvasColor.value);



colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle=e.target.value;
    ctx.fillStyle=e.target.value;

})

canvasColor.addEventListener('change', (e) => {
    setCanvasBackgroundColor(canvasColor.value);
});






canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX=e.offsetX;
    lastY=e.offsetY;
})
canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        lastX = e.offsetX; 
        lastY = e.offsetY;
    }
})




canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});


clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
fontsize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
    
});

save.addEventListener('click',()=>{
    localStorage.setItem('canvasContent',canvas.toDataURL());
    let link=document.createElement('a');
    link.download='my-canvas.png';
    link.href=canvas.toDataURL();
    link.click();

})

retrieve.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContent'); 
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            ctx.drawImage(img, 0, 0);
        };
    }
});