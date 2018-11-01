"use strict";

const PIXELSIZE = 5; //pixellisation par carré de 5x5

var Canvas = function() {

    this.DOMcanvas = document.getElementById('canvas');
    this.ctx = this.DOMcanvas.getContext('2d');
//attente du chargement
    var image = new Image();
    //chargement de l'image dans le canvas
    this.imageLoad(image, this.ctx);
};

Canvas.prototype.imageLoad = function(image, ctx) {
    image.onload = function () {
        ctx.drawImage(image,0,0);
    };
    image.src = 'la-joconde.jpg';
};
