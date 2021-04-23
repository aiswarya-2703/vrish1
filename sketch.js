var ball;
var database
var ballpos
function setup(){
    createCanvas(500,500);
    // variable to represent your original database in firebase
    database = firebase.database()
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //refer the location so that comp can read from, that position(car-->position)
    var ballposition=database.ref("car/position")
    //keeping the loaction on
    ballposition.on("value",readPosition,showErr)
    //database.ref("car/position").on("value",readPosition,showErr)
}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x1,y1){
    database.ref("car/position").set({
        x:ballpos.x+x1 ,
        y:ballpos.y+y1
    })
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}
function readPosition(data){
    //val()--->retrieve value after reading is done and convert to readable form
    ballpos=data.val();
    //assigning x and y values from database to the ball sprite in the game
    ball.x=ballpos.x
    ball.y=ballpos.y
}
function showErr(){
    console.log("error")
}
