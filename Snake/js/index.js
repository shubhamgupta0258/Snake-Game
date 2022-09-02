//Game Constnts and variables
let inputDir = {x :0, y :0};
const foodsound  =  new Audio('food.mp3');
const gameover = new Audio('gameover.mp3');
const movesound = new Audio('moov.mp3');
const musicSound = new Audio('background.mp3');
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//Game Functions
function main(ctime){
    musicSound.play();
    window.requestAnimationFrame(main); 
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true ;
        }
        //if you bump into the wall 
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    }
}

function gameEngine(){
    // Part 1 : Updating the snake array
    if(isCollide(snakeArr)){
        gameover.play();
        inputDir = {x :0, y :0};
        alert("Game over .Press any key to play again ");
        snakeArr= [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //If youhave eaten the food , incremnet the score and regenertae the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x == food.x){
        foodsound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("Hiscore", JSON.stringify(hiscoreval));
            HiscoreBox.innerHTML = "Hiscore: " + hiscoreval ;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    //Moving the snake 
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2 :  Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index ===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the Food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Main logic starts here
let Hiscore = localStorage.getItem("Hiscore");
if(Hiscore ===null){
    hiscoreval=0;
    localStorage.setItem("Hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(Hiscore);
    HiscoreBox.innerHTML = "Hi Score : 0" + Hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
 inputDir = {x: 0, y: 1} //start the game 
 movesound.play();
 switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x = 0;
        inputDir.y = -1;
        break;

    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = 1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

    case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
 }
 });