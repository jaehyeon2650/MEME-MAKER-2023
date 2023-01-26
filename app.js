const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const boldselect = document.querySelector("#bold-selector");
const colorselect = document.querySelector("#color-selector");
const colorbox = Array.from(document.querySelectorAll(".color-select-box"));
const modebtn = document.querySelector("#modebtn");
const destroybtn = document.querySelector("#destroybtn");
const erasebtn = document.querySelector("#erasebtn");
const image = document.querySelector("#image-file");
const downloadbtn = document.querySelector("#save");
const textinput = document.querySelector("#text");
const textbold = document.querySelector(".text-info__bold");
const fontfamily = document.querySelector(".font-family");
const fontsize = document.querySelector(".font-size");

let fontchange = false;
function selectbold(event) {
    fontchange = true;

}
function selectfontfamily(event) {
    fontchange = true;
}
function selectfontsize(event) {
    fontchange = true;
}
textbold.addEventListener("change", selectbold);
fontfamily.addEventListener("change", selectfontfamily);
fontsize.addEventListener("change", selectfontsize);


canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = boldselect.value;
ctx.lineCap = "round";
let painting = false;
let filling = false;

function tomovefunction(event) {
    if (painting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
};
function mousedownfunction(event) {
    painting = true;
}
function mouseupfunction() {
    painting = false;
    ctx.beginPath();
}
function boldchange(event) {
    ctx.lineWidth = event.target.value;
}
function colorchange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function changecolorbox(event) {
    const clickedcolor = event.target.dataset.color;
    ctx.strokeStyle = clickedcolor;
    ctx.fillStyle = clickedcolor;
    colorselect.value = clickedcolor;
}
function modechange(event) {
    if (filling) {
        filling = false;
        modebtn.innerText = "Fill";
    }
    else {
        filling = true;
        modebtn.innerText = "Draw";
    }
}
function fillchange() {
    if (filling) {
        ctx.fillRect(0, 0, 800, 800);
    }
}
function destroy() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
}
function erase() {
    filling = false;
    modebtn.innerText = "Fill";
    ctx.strokeStyle = "white";
}

function loadimage(event) {
    ctx.drawImage(event.target, 0, 0, 800, 800);
    image.value = null;
}
function imageload(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.addEventListener("load", loadimage);
}
function showtext(event) {
    const text = textinput.value;
    if (text !== "") {
        if (fontchange) {
            ctx.save()
            ctx.lineWidth = 1;
            console.log(`${textbold.value} ${fontfamily.value} ${fontsize.value}px`);
            ctx.font = `${textbold.value} ${fontsize.value}px ${fontfamily.value}`;
            ctx.strokeText(text, event.offsetX, event.offsetY);
            ctx.restore();
            painting = false;
        }
        else {
            ctx.save()
            ctx.lineWidth = 1;
            ctx.font = "10px sans-serif";
            ctx.strokeText(text, event.offsetX, event.offsetY);
            ctx.restore();
            painting = false;
        }
    }
}
function downloadimage(event) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myimage.png";
    a.click();
}
canvas.addEventListener("mousemove", tomovefunction);
canvas.addEventListener("mousedown", mousedownfunction);
canvas.addEventListener("mouseup", mouseupfunction);
canvas.addEventListener("mouseleave", mouseupfunction);
canvas.addEventListener("click", fillchange);
canvas.addEventListener("dblclick", showtext);
boldselect.addEventListener("change", boldchange);
colorselect.addEventListener("change", colorchange);
colorbox.forEach(color => color.addEventListener("click", changecolorbox));
modebtn.addEventListener("click", modechange);
destroybtn.addEventListener("click", destroy);
erasebtn.addEventListener("click", erase);
image.addEventListener("change", imageload);
downloadbtn.addEventListener("click", downloadimage);



