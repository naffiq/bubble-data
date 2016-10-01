var BubbleEngine = require('./js/bubble-engine');

// require('./scss/fonts.scss');
require('./scss/main.scss');
var countries = require('./data/countries.json');

new BubbleEngine({
  data: countries,
  color1 : "#FFC51B",
  color2 : "#FF4817",
  background: "#FABE05",
});


// alert('hekk')
