"use strict";

var SVGCanvas = function(canvas) {//besoin de canvas pour accéder au contexte 2D
    this.PIXELSIZE = 5; //pixellisation par carré de PxP

    // Composition de la classe Canvas
    this.canvas = canvas;
    this.context = this.canvas.context;

    console.log(this.canvas.getPixelData(1,1));//test
   // init du SVG
    this.draw = SVG('resultCanvas').size(880,586);

    //on balaye tout le canvas, avec un pas de largeur PIXELSIZE
    for (var x = 0; x < this.canvas.getCanvasWidth(); x = x + this.PIXELSIZE) {
        for (var y = 0; y < this.canvas.getCanvasHeight(); y = y + this.PIXELSIZE) {
            this.rect = this.draw.rect(x, y).attr({ fill: '#f06' }); //test
        }
    }
 };

SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    var pixel;
    var data;
    var rgba = { //on n'utilise pas le alpha
        red: 0,
        green: 0,
        blue: 0
    };
    for (var offset = 0; offset < this.PIXELSIZE * this.PIXELSIZE; offset++){ //incrément des 4 paramètres de imageData
        pixel       =  this.ctx.getImageData(offset + currentX, offset + currentY, 1, 1);

        //datas sommes cumulées des couleurs du point currentX, currentY
        data        = pixel.data;
        rgba.red   += data[0]; /*somme couleur du pixel couleur rouge*/
        rgba.green += data[1]; /* somme couleur du pixel couleur rouge*/
        rgba.blue  += data[2]; /* somme couleur du pixel couleur rouge*/
    }
// calcule la valeur moyenne d'un carré de coté donné, aux coordonnées meanSquareX, meanSquareY
    console.log(rgba.blue);

    //on calcule les moyennes
    rgba.red   /= Math.pow(this.PIXELSIZE, 2);
    rgba.green /= Math.pow(this.PIXELSIZE, 2);
    rgba.blue  /= Math.pow(this.PIXELSIZE, 2);
};
