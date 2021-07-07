//Create variables here
var dog, happy, dogsprite;
var database;
var foodS, foodStock,foodObj;
var foodStock, lastFed;
var feed, add;
var fedTime;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg.png");
  happy = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock); 

  dogsprite = createSprite(750,250,25,25);
  dogsprite.addImage(dog)
  dogsprite.scale = 0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}
 

function draw() {  
background(46,139,87)

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + " PM",100,30);
}else if(lastFed==0){
  text("Last Feed: 12 AM",100,30);
}else{
  text("Last Feed: "+lastFed + " AM",100,30);
}


//new Food();

  drawSprites();
  //add styles here


}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dogsprite.addImage(happy);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
    Food:foodObj.getFoodStock(),
     FeedTime : hour()
  })
}


  
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}