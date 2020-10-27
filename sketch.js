//Creating sprite using sprite sheets for animation

const PLATFORM_SIZE = 64;
const NUM_ROWS = 10;
const NUM_COLUMNS = 10;
const boyOffset = 17;
const canvasH = NUM_ROWS * PLATFORM_SIZE;
const canvasW = NUM_ROWS * PLATFORM_SIZE;
let platform, platformAnim; 
let platformLandscape = Array.from({ length: NUM_COLUMNS });
let platformGroup;
let jumping = false;
let BG_COLOR = (211, 211, 211);
let boyAnim;
let boy;
let boyStillSprite;
let boyStill;
let landscape;
let yokai;
let yokai1X = 550;
let yokai1Y = 100;
let yokai2X = 500;
let yokai2Y = 250;
let c = 0;


function preload() {
  const platformSprite = loadSpriteSheet("Sprites/Platform.png" , 64, 64, 1);
  const boySprite = loadSpriteSheet("Sprites/Hero.png", 30, 30, 3);
  boyStillSprite = loadSpriteSheet("Sprites/Hero.png", 30, 30, 1);
 
  platformAnim = loadAnimation(platformSprite);
  boyAnim = loadAnimation(boySprite);
  boyStill = loadAnimation(boyStillSprite);
  
  boy = createSprite(PLATFORM_SIZE, 5 * PLATFORM_SIZE + boyOffset, PLATFORM_SIZE, PLATFORM_SIZE);
  boy.moveSpeed = 2;
  
  const yokai1SpriteSheet = loadSpriteSheet("Sprites/Monster1.png", 55, 55, 4);
  yokai1 = loadAnimation(yokai1SpriteSheet);
  yokai1.moveSpeed = 1;

  const yokai2SpriteSheet = loadSpriteSheet("Sprites/Monster2.png", 80, 80, 4);
  yokai2 = loadAnimation(yokai2SpriteSheet);
  yokai2.moveSpeed = 1;
  
}

function setup() {
  createCanvas(canvasW, canvasH);
  platformGroup = new Group();
  platformLandscape.forEach((platform, i) => {
    platform = createSprite((i * PLATFORM_SIZE) + PLATFORM_SIZE/2,  6 * PLATFORM_SIZE, 64, 64);
    platform.addAnimation('platform', platformAnim);
    platformGroup.add(platform);
  });

  platformGroup.remove[2];

  boy.addAnimation("move", boyAnim);
  boy.addAnimation("still", boyStill);
  
  
}

function draw() {  
  background(BG_COLOR);
  update(boy);
  drawSprites();
  animation(yokai1, yokai1X, yokai1Y, 55);
  animation(yokai2, yokai2X, yokai2Y, 80);
  gravity();
  checkGround();
  //touchYokai();
 
} 

function update(object) {
  if (keyCode === 38 || keyDown("left") || keyDown("right")) {
    if (keyCode === 38) {
      jump();
      
    }
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }

  drawObject(object);
}

function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("move");
  } else {
    object.changeImage("still");
  }
  boy.limitSpeed(boy.moveSpeed);
  drawSprite(object);
}

function jump(){
  jumping = true;
  boy.velocity.y = -2;
  setTimeout(resetJump, 500);
}

function resetJump(){
  boy.velocity.y = .5;
  jumping = false;
}

function gravity(){
  if(!jumping){
   boy.velocity.y = 1;
  }
}

function checkGround(){
  if(boy.collide(platformGroup)){
    boy.velocity.y = 0;
  }
}

/*function touchYokai(){
  if(boy.position.x== yokai1X & boy.position.y == yokai1Y){
    BG_COLOR = (139, 0, 0);
  }
  else if(boy.position.x == yokai2X & boy.position.y == yokai2Y){
    BG_COLOR = (139, 0, 0);
  }
  else{

  }
}
*/


  
  
 




// Draw the ground tiles
  //for (var x = 0; x < 840; x += 70) {
    //tile_sprite_sheet.drawFrame('snow.png', x, 350);
  //}

  // Draw the sign tiles
  //tile_sprite_sheet.drawFrame('signExit.png', 770, 280);
  //tile_sprite_sheet.drawFrame('signRight.png', 0, 280);


  //draw some more stuff
  //tile_sprite_sheet.drawFrame('boxCoin.png', 70, 70);
  //tile_sprite_sheet.drawFrame('boxCoinAlt.png', 140, 70);