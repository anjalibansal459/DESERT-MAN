var background1,background1Image;
var heroo,herooImage;
var dinooo,dinoooImage;
var death;
  var score;
  var survivaltime;
var arrow,arrowImage;
var coin,coinImage;
var invisibleground;
var laser,laserImage;
var cactus,cactusImage;
var checkpointSound;
var dieSound;
var laserno;
var jumpSound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var dyinghero,dyingheroImage;
function preload(){
  background1Image=loadImage("background_desert.png");
  herooImage=loadImage("heroo.png");
  dinoooImage=loadImage("dinooo.png");
  arrowImage=loadImage("ya.png");
  coinImage=loadImage("coin.png");
  laserImage=loadImage("redarrow.png");
  cactusImage=loadImage("cactus.png");
  checkpointSound=loadSound("checkPoint.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  dyingheroImage=loadImage("dying hero.png");
}

function setup() {
  createCanvas(600, 400);
  background1=createSprite(600,0,600,600);
  background1.addImage("background",background1Image)
  background1.velocityX=-5;
  background1.scale=2;
  
  heroo=createSprite(100,330,20,20);
  heroo.addImage("hero",herooImage);
  heroo.scale=0.4;
  score=0;
  death=0;
  survivaltime=60;
  laserno=5;
  invisibleground=createSprite(300,390,600,5)
  invisibleground.visible=false;
  coinsGroup=createGroup();
  cactusGroup=createGroup();
  dinosGroup=createGroup();
  laserGroup=createGroup();
  arrowGroup=createGroup();
}

function spawnDinos(){
if(frameCount%250===0){
  dinooo=createSprite(600,350,20,20);
  dinooo.addImage(dinoooImage);
  dinooo.scale=0.4;
  dinooo.velocityX=-3;
  dinosGroup.add(dinooo);
  
  
}
}
function spawnDirections(){
  if(frameCount%300===0){
  var arrow=createSprite(400,300,20,20);
  arrow.addImage(arrowImage);
  arrow.velocityX=-2;
    arrow.scale=0.2;
    arrow.y=200;
    arrowGroup.add(arrow);
}
}
function spawnCoins(){
  if(frameCount%150===0){
   var coin=createSprite(500,350,20,20);
    coin.addImage(coinImage);
    coin.velocityX=-2;
    coin.scale=0.1;
    coin.y=Math.round(random(200,380));
    coinsGroup.add(coin);
  }
 
}
function spawnCactus(){
   if(frameCount%300===0){
   var cactus=createSprite(500,370,20,20);
   cactus.addImage(cactusImage);
   cactus.velocityX=-2;
   cactus.scale=0.2;
     cactusGroup.add(cactus);
 }
 }
function spawnlaser(){
    laser=createSprite(110,300,10,10);
    laser.addImage(laserImage);
    laser.scale=0.1;
    laser.velocityX=2;
  laserGroup.add(laser);
}

function draw() {
  background(220);
  drawSprites();
  textSize(20)
  fill("black");
  text("score : "+score,100,50);
  text("death :"+death,100,100);
   survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time :"+survivalTime,250,50);
  text("laserno:"+laserno,250,100);
  if(background1.x<0){
    background1.x=background1.width/2;
  }
  
  spawnDirections();
  spawnDinos();
  spawnCoins();
  spawnCactus();
  
  if(keyDown("space")){
    heroo.velocityY=-8;
  }
  heroo.velocityY=heroo.velocityY+0.8;
  heroo.collide(invisibleground )
  if(keyDown("s")){
    laserno=laserno-1;
   spawnlaser();
     }
  if(heroo.isTouching(coinsGroup)){
    checkpointSound.play();
    coinsGroup.destroyEach();
    score=score+1;
  }
  if(heroo.isTouching(dinosGroup)){
    dieSound.play();
    dinosGroup.destroyEach();
    death=death+1;
  }
  if(heroo.isTouching(cactusGroup)){
    dieSound.play();
    cactusGroup.destroyEach();
    death=death+1;
  }
 if(laserGroup.isTouching(dinosGroup)){
   jumpSound.play();
   dinosGroup.destroyEach();
   laserGroup.destroyEach();
   
 }
  if(death===6){
    gameState=END;
  }
  if(gameState === END){
    text("gameOverr!!!",200,200);
    heroo.addImage(dyingheroImage);
    coinsGroup.setVelocityXEach(0);
    dinosGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0)
    laserGroup.setVelocityXEach(0);
    arrowGroup.setVelocityXEach(0);
     background1.velocityX=0;
    coinsGroup.setLifetimeEach(-1)
     dinosGroup.setLifetimeEach(-1);
     cactusGroup.setLifetimeEach(-1);
     arrowGroup.setLifetimeEach(-1);
     laserGroup.setLifetimeEach(-1);
  
  
  }
 
 
 if(score===10){
    text("You Won!!!",200,200);
    coinsGroup.setVelocityXEach(0);
    dinosGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0)
    laserGroup.setVelocityXEach(0);
    arrowGroup.setVelocityXEach(0);
     background1.velocityX=0;
    coinsGroup.setLifetimeEach(-1)
     dinosGroup.setLifetimeEach(-1);
     cactusGroup.setLifetimeEach(-1);
     arrowGroup.setLifetimeEach(-1);
     laserGroup.setLifetimeEach(-1);
 }
  
}

