"use strict";

//Le canvas qui contient l'image que l'on va pixeliser
var Canvas = function () {
    // this.canvas = document.getElementById('canvas');
    this.canvas = document.getElementById('canvas');
    // this.canvas = $('#canvas');
    this.image = new Image();
    this.image.src = $('#source-image').attr('src');
    this.ctx = this.canvas.getContext('2d');
    //réglage la taille des canvas selon l'image
    this.setCanvasWidth(this.image.width);
    this.setCanvasHeight(this.image.height);
    var self = this;
    this.image.onload = function () {
        self.ctx.drawImage(this.image, 0, 0);
    }.bind(self);
};

//affiche l'image dans le canvas
Canvas.prototype.drawTheImage = function () {
    this.ctx.drawImage(this.image, 0, 0);
};

//détermine la largeur de canvas en fonction de l'image
Canvas.prototype.setCanvasWidth = function (width) {
    $('#canvas').attr('width', width);
    $('#pixelized-canvas').attr('width', width);
    this.canvas.width = width;
};

//détermine la hauteur de canvas en fonction de l'image
Canvas.prototype.setCanvasHeight = function (height) {
    $('#canvas').attr('height', height);
    $('#pixelized-canvas').attr('height', height);
    this.canvas.height = height;
};

//Getter largeur canvas image de travail
Canvas.prototype.getCanvasWidth = function () {
    return this.canvas.width;
};

//Getter hauteur canvas image de travail
Canvas.prototype.getCanvasHeight = function () {
    return this.canvas.height;
};

//récupère les valeur du pixel aux coordonnées x,y
Canvas.prototype.getPixelData = function (x, y) {
    return this.ctx.getImageData(x, y, 1, 1)
};


