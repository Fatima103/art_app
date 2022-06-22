const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = '560';
canvas.width = window.innerWidth;

const btn = document.querySelector(".set-btn");
const downloadBtn = document.querySelector(".download-btn");

//ctx.fillStyle = 'black';
ctx.strokeStyle = '#fff';     // the original color of our shape
ctx.lineWidth = 2;
ctx.shadowOffsetY = 10;
ctx.shadowOffsetX = 10;
ctx.shadowBlur = 10;    // zichtbaarheid
ctx.shadowColor = 'blue';
let hun = 0;     // for the color so we can change them later

btn.addEventListener('click', function () {

    radios = document.querySelector(".radios").value ;
    inset = document.querySelector(".inset").value;
    n = document.querySelector(".n").value;

     
    // @radios min max
    if(radios > 30){
        radios = 30;   // in the value itself
        document.querySelector(".radios").value = "30"; // in the design
    }
    if(radios < 1){
        radios = 1;
        document.querySelector(".radios").value = "1";
    }

    // @inset min max
    if(inset > 12){
        inset = 12;
        document.querySelector(".inset").value = "12";
    }
    if(inset < 2){
        inset = 2;
        document.querySelector(".inset").value = "2";
    }


    // @n min max
    if(n > 50){
        n = 50;
        document.querySelector(".n").value = "50";
    }
    if(n < 1){
        n = 1;

        document.querySelector(".n").value = "1";
    }

    // x en y van de wijzer 
    function drowShape(x, y, radios, inset, n) {

        ctx.fillStyle = 'hsl(' + hun + ',100%,50%)';
    
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.moveTo(0, 0 - radios);   // the shape under the mouse
        // teken een line --> ga terug
        for (let i = 0; i < n; i++) {
            ctx.rotate(Math.PI / n);
    
            ctx.lineTo(0, 0 - (radios * inset));
    
            ctx.rotate(Math.PI / n);
    
            ctx.lineTo(0, 0 - radios);
    
        }
    
        ctx.restore();
    
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    
    }
    // first shape
    drowShape(120, 120, radios, inset, n);

    canvas.addEventListener('mousemove', function (e) {

        hun += 3;   // the change of color
        drowShape(e.x, e.y, radios, inset, n);


    })

})

// file douwloaden
downloadBtn.addEventListener('click', function(e) {
    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "canvas-image";
    createEl.click();
    createEl.remove();
  });
