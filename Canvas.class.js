"use strict";

const PIXELSIZE = 10; //pixellisation par carré de 5x5
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

var Canvas = function() {

    this.DOMcanvas = document.getElementById('canvas');
    this.ctx = this.DOMcanvas.getContext('2d');

   this.imageLoad(this.ctx);
};

Canvas.prototype.imageLoad = function(ctx) {
    var image = new Image();

    //attente du chargement
    //chargement de l'image dans le canvas
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    };
    image.src = 'la-joconde.jpg';
};
