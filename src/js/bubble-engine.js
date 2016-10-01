var Matter = require('matter-js');

var BubbleEngine = function(options) {
  var wWidth = window.innerWidth;
  var wHeight = window.innerHeight;

  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.getElementById('data-map'),
      engine: engine,
      options: {
        width: wWidth,
        height: wHeight,
      }
  });

  // create two boxes and a ground
  var boxA = Bodies.circle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
};

module.exports = BubbleEngine;
