"use strict";

const PIXELSIZE = 10; //pixellisation par carré de PxP
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

var Canvas = function() {

    this.DOMcanvas = document.getElementById('canvas');
    this.ctx = this.DOMcanvas.getContext('2d');
    this.imageLoad(this.ctx);
};

Canvas.prototype.imageLoad = function(ctx) {

    var image = new Image();
    // console.log(ctx);

    //attente du chargement
    //chargement de l'image dans le canvas
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    };
    image.src = 'la-joconde.jpg';
};

Canvas.prototype.getCanvasCtx = function () {
    return this.ctx;
};