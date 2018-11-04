"use strict";

var SVGCanvas = function(canvas) {//besoin de canvas pour accéder au contexte 2D
    // Composition de la classe Canvas
    this.canvas = canvas;
    this.context = this.canvas.context;
    console.log(this.canvas.getPixelData(1,1));//test

    var color;

    // init du SVG aux dimensions de l'image
    this.draw = SVG('resultCanvas').size(880,586);

    //on balaye tout le canvas, avec un pas de largeur PIXELSIZE
    for (var x = 0; x < this.canvas.getCanvasWidth(); x = x + PIXELSIZE) {
        for (var y = 0; y < this.canvas.getCanvasHeight(); y = y + PIXELSIZE) {
            color = this.meanColorOfSquare(x,y);
            // console.log(color);
            this.rect = this.draw.rect(x, y).attr({ fill: color }); //test
        }
    }
};

// retourne la valeur moyenne d'un carré de coté donné, aux coordonnées meanSquareX, meanSquareY
SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    this.PIXELSQUARE = PIXELSIZE * PIXELSIZE;
    var pixel;
    var data;
    this.rgba = { //on n'utilise pas le alpha
        red: 0,
        green: 0,
        blue: 0
    };

    for (var offset = 0; offset < PIXELSIZE * PIXELSIZE; offset++){ //incrément des 4 paramètres de imageData
        pixel       =  this.canvas.getPixelData(offset + currentX, offset + currentY, 1, 1);

        //datas sommes cumulées des couleurs du point currentX, currentY
        data        = pixel.data;
        this.rgba.red   += data[0]; /*somme couleur du pixel couleur rouge*/
        this.rgba.green += data[1]; /* somme couleur du pixel couleur rouge*/
        this.rgba.blue  += data[2]; /* somme couleur du pixel couleur rouge*/
    }
    //on calcule les moyennes
    this.rgba.red   /= this.PIXELSQUARE;
    this.rgba.green /= this.PIXELSQUARE;
    this.rgba.blue  /= this.PIXELSQUARE;

    this.rgba.red = parseInt(this.rgba.red);
    this.rgba.green = parseInt(this.rgba.green);
    this.rgba.blue = parseInt(this.rgba.blue);

    return (this.convertRgbToHex( this.rgba.red, this.rgba.green, this.rgba.blue));
};

SVGCanvas.prototype.convertRgbToHex = function(r, g, b){
    this.rHex = r.toString(16);
    this.gHex = g.toString(16);
    this.bHex = b.toString(16);

    if (r <= 15) {
        this.rHex = '0'+ this.rHex; //ajout d'un zero en début de chaine, si <=15

    }if (g <= 15) {
        this.gHex = '0'+ this.gHex; //ajout d'un zero en début de chaine, si <=15

    }if (b <= 15) {
        this.bHex = '0'+ this.bHex; //ajout d'un zero en début de chaine, si <=15
    }
    return   '#' + this.rHex + this.gHex + this.bHex;
};