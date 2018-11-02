window.onload = function() {
    var c=document.getElementById("canvas");
    var ctx=c.getCanvasCtx("2d");
    var image = new Image();
    image.src = 'la-joconde.jpg';
    ctx.drawImage(image,10,10);
};