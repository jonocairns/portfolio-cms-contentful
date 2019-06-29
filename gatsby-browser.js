// custom typefaces
require('typeface-montserrat');
require('typeface-merriweather');
const objectFitImages = require('object-fit-images');

exports.onInitialClientRender = () => {
    objectFitImages();
};