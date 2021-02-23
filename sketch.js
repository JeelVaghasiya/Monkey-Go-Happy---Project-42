var monkey , monkey_running, monkey_collided, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survival = 0;
var backGround, backGround2, backGroundImg;

var gameOver, gameOverImg;

var bananasGroup;
var obstaclesGroup;

var gameState = 1;
var PLAY = 1;
var END = 0;

function preload(){
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
  monkey_collided = loadAnimation("Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
  backGroundImg = loadImage("jungle.png");
  
  gameOverImg = loadImage("gameOver.png");
}



function setup() {
  createCanvas(650,500);
  
  backGround = createSprite(325,250,100,100);
  backGround.addImage(backGroundImg);
  backGround.velocityX = -2 ;
  
  backGround2 = createSprite(975,250,100,100);
  backGround2.addImage(backGroundImg);
  backGround2.velocityX = -2 ;
  
  monkey = createSprite(80,375,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(400,410,1100,10);
  ground.shapeColor = "white";
  ground.visible = false;
  ground.x = ground.width/2;
  
  gameOver = createSprite(325,250,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background(100);
  monkey.collide(ground);
  
  if(gameState === 1){
    //it creates infinite background
    if (backGround.x<-325){
       backGround.x = 973;
    }
    if (backGround2.x<-325){
      backGround2.x = 973;
    }

    if(keyDown("space")&&monkey.y > 349){
      monkey.velocityY = -20;
    }

    if(bananasGroup.isTouching(monkey)){
      bananasGroup.destroyEach();
      score = score + 2;
      //monkey.scale += +0.1
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    bananas();
    rock();

    if(obstaclesGroup.isTouching(monkey)){
      gameState = 0;
    }
    
    switch(score){
    case 10: monkey.scale = 0.12;
     break;
    case 20: monkey.scale = 0.14;
     break;
    case 30: monkey.scale = 0.16;
     break;
    case 40: monkey.scale = 0.18;
     break;
    default: break; 
    }
    
    survival=Math.ceil(frameCount/frameRate());
  }
  
  if(gameState === 0){
    backGround.velocityX = 0;
    backGround2.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
  
    monkey.changeAnimation("collided",monkey_collided);
    
    gameOver.visible = true;
  }
  
  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,400,40);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: "+survival,170,40);
  
}

function bananas(){
  if(frameCount%180===0){
    yb=Math.round(random(140,280));
    banana=createSprite(700,yb,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=350;
    
    bananasGroup.add(banana);
  }
}

function rock(){
  if(frameCount%300===0){
    obstacle=createSprite(700,375,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.18;
    obstacle.lifetime=350;
    obstaclesGroup.add(obstacle);
  }
}
