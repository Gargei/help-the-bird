var sky, skyImg;
var plank, plankImg, plankGroup;
var bird, birdImg;
var net, netImg, netGroup; 
var invisible,invisibleGroup; 
var gameState="PLAY";
var PLAY=1;
var END =0;


function preload(){
 skyImg=loadImage("skybg.png");
 plankImg=loadImage("plank.png");
 birdImg=loadImage("bird-flying.png");
 netImg=loadImage("net.png");

 netGroup=new Group();
 plankGroup=new Group();
 invisibleGroup=new Group(); 
}

function setup(){
  createCanvas(600,600);
 sky=createSprite(300, 300, 4000, 4000);
 sky.addImage("skyImg",skyImg);
 sky.velocityY=2;
 
 bird=createSprite(300, 300, 20, 20);
 bird.addImage("birdImg",birdImg);
 bird.scale=0.09;
 sky.scale= 3;

}

function draw(){
   background("blue");
  
  if(gameState==="PLAY"){
    
  if(sky.y>400){
    sky.y=300;
  }
  
  if(keyDown("left_arrow")){
   bird.x=bird.x-3; 
  }
  
  
  if(keyDown("right_arrow")){
   bird.x=bird.x+3; 
  } 
  
  if(keyDown("space")){
   bird.velocityY=-5;  
  }
  bird.velocityY=bird.velocityY+0.8; 
  
  if(netGroup.isTouching(bird)){
    bird.velocityY=0;
  }
  
  if(invisibleGroup.isTouching(bird) || bird.y>600){
    bird.destroy();
    gameState="END";
  }
  spawnPlank();
  
  drawSprites();
  }
  else if(gameState==="END"){
    stroke("Yellow");
    fill("Yellow");
    textSize(30);
    text("Game Over",250,250);
    
  }
}
  
 function spawnPlank(){
   if(frameCount % 240===0){
     plank=createSprite(200,-50);
     plank.addImage("plankImg",plankImg);
     
     plank.x=Math.round(random(120,400));
     plank.velocityY=2;
     plank.lifetime=800;
     plankGroup.add(plank);
     
     net=createSprite(200,10);
     net.addImage("netImg",netImg);
     net.x=door.x;
     net.velocityY=2;
     net.lifetime=800;
     netGroup.add(net);
     bird.depth=plank.depth;
     bird.depth+=1;

     invisible=createSprite(200,15);
     invisible.width=net.width;
     invisible.height=2;
     invisible.x=plank.x;
     invisible.velocityY=2;
     invisibleGroup.add(invisible);
    }
   
 }
