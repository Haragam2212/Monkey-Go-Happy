var bananaImage,obstacleImage,ground,obstacleGroup,score
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  //preloading the images and the animations
monkey=
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
foody=loadImage ("banana-1.png");
jungle=loadImage("jungle.jpg");
obstacle=loadImage("stone.png");
  
}
function setup() {
  createCanvas(400, 400);
  ground=createSprite(200,200,800,400);
  ground.addImage("ground",jungle);
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
   player=createSprite(70,350,20,30);
  player.scale=0.1;
  player.addAnimation("player",monkey);
  
  invisible_ground=createSprite(200,390,400,25);
  invisible_ground.visible=false;
  
  score=0;
  
}

function draw() {
if (gameState===PLAY){
    ground.velocityX=-3;
  ground.x=ground.width/2;
  if(keyDown("space")&&player.y>=365){
    player.velocityY=-15;
  } 
  if(foodGroup.isTouching(player)){
   foodGroup.destroyEach();
    score=score+2;
  }
  if (obstacleGroup.isTouching(player)){
  player.scale=0.1;    
  } 
  if (obstacleGroup.isTouching(player)){
  gameState=END;
      }  
  switch(score){
    case 10: player.scale=1.2;
             break;
    case 20: player.scale=1.4;
             break;
    case 30: player.scale=1.6;
             break;
    case 40: player.scale=1.8;
             break;
    case 50: player.scale=2;
             break;
             default:break;
  }        
}
if (gameState===END){  
  score=0;
  bananaGroup.setVelocityEach(0,0);
  obstacleGroup.setVelocityEach(0,0);
  player.velocityY=0;
  bananaGroup.setVelocityEach(-1);
  obstacleGroup.setVelocityEach(-1);
  if(keyDown("space")||mousePressedOver(restart)&&trex.y>=167){
    reset();
  }
} 
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score,300,100);
  drawSprites();
}
//function defination
function obstacles(){
if(World.frameCount%300===0) { 
  var stone=createSprite(400,340,20,30);
  stone.addAnimation("stonei",obstacle);
  stone.scale=0.15;
  stone.velocityX=-4;
  stone.lifetime=100;
  obstaclesGroup.add(stone);
}
}
//function defination
function food(){
if(World.frameCount%80===0) { 
  var banana=createSprite(400,150,20,30);
  banana.y=randomNumber(120,200);
  banana.setAnimation("Bananai",foody);
  banana.scale=0.05;
  banana.velocityX=-4;
  banana.lifetime=100;
  bananaGroup.add(banana);
}  
}
  //function defination
  function reset(){
score=0
gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  }  