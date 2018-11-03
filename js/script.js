"use strict";

   $(function () {
       var PIXELSIZE = 5; //pixellisation par carré de PxP
       // var CANVAS_WIDTH = 600;
       // var CANVAS_HEIGHT = 600;

       var canvas;
       var context;
       var image;
       window.addEventListener('load', init);

       function init() {
           image = document.getElementById('SourceImage');
           canvas = document.getElementById('Canvas');
           context = canvas.getContext('2d');
           drawImage(image);
       }

       function drawImage(image) {
           // Set the canvas the same width and height of the image
           canvas.width = image.width;
           canvas.height = image.height;
           context.drawImage(image, 0, 0);
           // Get the canvas image data
           var imageData = context.getImageData(0, 0, PIXELSIZE, PIXELSIZE);
           console.log(imageData);
       }
   });

