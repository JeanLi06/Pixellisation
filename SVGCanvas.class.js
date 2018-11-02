"use strict";

var SVGCanvas = function(canvas) {//besoin de canvas pour accéder au contexte 2D

    // this.ctx = canvas.ctx;
    this.ctx = canvas.getCanvasCtx();
    //tableau qui va contenir tous les carrés du SVG
    this.contentSVGs=[];
    //on balaye tout le canvas, avec un pas de largeur PIXELSIZE
    for (let x = 0; x < CANVAS_WIDTH; x = x + PIXELSIZE) {
        for (let y = 0; y < CANVAS_HEIGHT; y = y + PIXELSIZE) {
            this.square = this.drawSquareIntoSVG(x, y, PIXELSIZE, 'green');
            this.contentSVGs.push(this.square);
        }
    }
    // on pousse les carrés dans le svg
    document.getElementById("resultCanvas").innerHTML = this.contentSVGs;
 };

SVGCanvas.prototype.drawSquareIntoSVG = function (originX, originY, size, color) {
    return ('<rect   x="' + originX  + '"  y="' +  originY + '"  width="' + size + '"  height="' + size + '"  fill="' + color + '" opacity="0.7"' +  " />");
};

// calcule la valeur moyenne d'un carré de coté donné, aux coordonnées meanSquareX, meanSquareY
SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    var pixel;
    var data;
    var rgba = { //on n'utilise pas le alpha
        red: 0,
        green: 0,
        blue: 0
    };
    for (var offset = 0; offset < PIXELSIZE * PIXELSIZE; offset++){ //incrément des 4 paramètres de imageData
        pixel       =  this.ctx.getImageData(offset + currentX, offset + currentY, 1, 1);

        //datas sommes cumulées des couleurs du point currentX, currentY
        data        = pixel.data;
        rgba.red   += data[0]; /*somme couleur du pixel couleur rouge*/
        rgba.green += data[1]; /* somme couleur du pixel couleur rouge*/
        rgba.blue  += data[2]; /* somme couleur du pixel couleur rouge*/
    }
    console.log(rgba);

    //on calcule les moyennes
    rgba.red   /= Math.pow(PIXELSIZE, 2);
    rgba.green /= Math.pow(PIXELSIZE, 2);
    rgba.blue  /= Math.pow(PIXELSIZE, 2);
};
