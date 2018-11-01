"use strict";

var SVGCanvas = function() {
    this.square = this.drawSquareIntoSVG(20, 20, 100, 'red');
    document.getElementById("resultCanvas").innerHTML = this.square;
};

SVGCanvas.prototype.drawSquareIntoSVG = function (originX, originY, size, color) {
    return ('<rect   x="' + originX  + '"  y="' +  originY + '"  width="' + size + '"  height="' + size + '"  fill="' + color + '" opacity="0.7"' +  " />");
};

// calcule la valeur moyenne d'un carré de coté donné, au coordonnées meanSquareX, meanSquareY
SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    var pixel;
    var data;
    var rgba = { //on n'utilise pas le alpha
        red: 0,
        green: 0,
        blue: 0
    };
    for (var offset = 0; offset < PIXELSIZE * PIXELSIZE; offset++){ //incrément des 4 paramètres de imageData
        pixel       =  this.ctx.getImageData(offset + currentX, offset + currentY, 1, 1);  //************* REVOIR CE CODE ****************
        //datas sommes cumulées des couleurs du point currentX, currentY
        data        = pixel.data;
        rgba.red   += data[0]; /*somme couleur du pixel couleur rouge*/
        rgba.green += data[1]; /* somme couleur du pixel couleur rouge*/
        rgba.blue  += data[2]; /* somme couleur du pixel couleur rouge*/
    }
    //on calcule les moyennes
    rgba.red   /= Math.pow(PIXELSIZE, 2);
    rgba.green /= Math.pow(PIXELSIZE, 2);
    rgba.blue  /= Math.pow(PIXELSIZE, 2);
};
