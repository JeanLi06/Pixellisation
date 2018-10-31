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

// Canvas.prototype.pixelize = function(taillePixel) {
//     //on récupère les valeurs de pixels et on fait la moyenne
//     var squareToMeanR = 0; //valeurs de pixels rouges
//     var squareToMeanG = 0; //valeurs de pixels verts
//     var squareToMeanB = 0; //valeurs de pixels bleus
//
//     //on va parcourir l'image de carré en carré et stocker les valleurs moyennes
//     var imageData;
//     for (var x = 0; x < 500; x += taillePixel){
//         for (var y = 0; y < 500; y += taillePixel) {
//          true ;//....
//
//         }
//     }
// };

// calcule la valeur moyenne d'un carré de coté donné, au coordonnées meanSquareX, meanSquareY
Canvas.prototype.meanSquare = function (currentX, currentY) {
    // var squareToMean = {red: 0, green: 0, blue: 0};//va contenir les valeurs moyennes du carré donné
    //datas du point x,y
    var pixel;
    var data;
    var rgba = { //on n'utilise pas le alpha
            red: 0,
            green: 0,
            blue: 0
    };
    for (var i = 0; i < PIXELSIZE * PIXELSIZE; i++){ //incrément des 4 paramètres de imageData
            pixel       =  this.ctx.getImageData(i + currentX, i + currentY, 1, 1);  //************* REVOIR CE CODE ****************
            data        = pixel.data;
        // alert(data);
        rgba.red   += data[0]; /*somme couleur du pixel couleur rouge*/
        rgba.green += data[1]; /* somme couleur du pixel couleur rouge*/
        rgba.blue  += data[2]; /* somme couleur du pixel couleur rouge*/
    }
        //on calcule les moyennes
    rgba.red   /= Math.pow(PIXELSIZE, 2);
    rgba.green /= Math.pow(PIXELSIZE, 2);
    rgba.blue  /= Math.pow(PIXELSIZE, 2);
    };
    // return squareToMean;
