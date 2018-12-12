"use strict";

var Canvas = function () {
    this.image = new Image();
    this.image.src = 'img/la-joconde_petite.jpg';

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    //régle la taille des canvas selon l'image
    this.setCanvasWidth(this.image.width);
    this.setCanvasHeight(this.image.height);

    this.drawTheImage();

    //on affiche les canvas
    $("canvas").toggle();
};

//affiche l'image dans le canvas
Canvas.prototype.drawTheImage = function() {
    this.context.drawImage(this.image, 0, 0);
};

//détermine la largeur de canvas en fonction de l'image
Canvas.prototype.setCanvasWidth = function (width) {
    $('#canvas').attr('width', width);
    $('#pixelizedCanvas').attr('width', width);
    this.canvas.width = width;
};

Canvas.prototype.getCanvasWidth = function () {
    return this.canvas.width;
};

//détermine la hauteur de canvas en fonction de l'image
Canvas.prototype.setCanvasHeight = function (height) {
    $('#canvas').attr('height',  height);
    $('#pixelizedCanvas').attr('height',  height);
    this.canvas.height = height;
};

Canvas.prototype.getCanvasHeight = function () {
    return this.canvas.height;
};

//récupère les valeur du pixel aux coordonnées x,y
Canvas.prototype.getPixelData = function (x, y) {
    return this.context.getImageData(x, y, 1, 1)
};


