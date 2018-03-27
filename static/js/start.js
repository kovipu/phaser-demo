// Create a new Phaser game object with a single state that has 3 functions
let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'area', {
  preload: preload,
  create: create,
  update: update
});
let helloText;
let filter;
let music;

// Called first
function preload() {
  game.load.audio('server', 'media/server.ogg');
}

// Called after preload
function create() {

  //sound definitions
  music = game.add.audio('server');
  music.loop = true;
  music.play();

  //filter definitions
  let fragmentSrc = [

    "precision mediump float;",

    "uniform vec2      resolution;",
    "uniform float     time;",

    "#define PI 90",

    "void main( void ) {",

    "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.0;",

    "float sx = 0.5 + 0.5 * sin( 100.0 * p.x - 1. * pow(time, 0.5)*5.) * sin( 5.0 * p.x - 1. * pow(time, 0.9)*5.);",

    "float dy = 1.0/ ( 1000. * abs(p.y - sx));",

    "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

    "gl_FragColor = vec4( (p.x + 0.3) * dy, 0.3 * dy, dy, 1.1 );",

    "}"];

  filter = new Phaser.Filter(game, null, fragmentSrc);
  filter.setResolution(window.innerWidth, window.innerHeight);

  //adding sprite
  let sprite = game.add.sprite();
  sprite.width = window.innerWidth;
  sprite.height = window.innerHeight;
  sprite.filters = [filter];

  // Create some text in the middle of the game area
  helloText = game.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Morjentes kurssi!', {
    font: "bold 32px Arial",
    fill: "#ff0044"
  });
  helloText.stroke = '#000000';
  helloText.strokeThickness = 2;
  helloText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
}

// Called once every frame, ideally 60 times per second
function update() {
  filter.update();

  helloText.x -= 5;

  if (helloText.x < -helloText.width) {
    helloText.x = game.world.width;
  }
}