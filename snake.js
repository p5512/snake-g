var content = document.getElementById('content'),
    startPage = document.getElementById('startPage'),
    speed = 200,
    snakeMove,
    scoreBox =document.getElementById('score'),
    lose =document.getElementById('loser'),
    loserScore = document.getElementById('loserScore'),
    close = document.getElementById('close'),
    startP = document.getElementById('startP'),
    startBtn = document.getElementById('startBtn'),
    startGameBool =true,
    startPaushBool =true;




(function init() {
    //map
    // console.log(this)
  this.mapW = parseInt(getComputedStyle(content).width);
  this.mapH = parseInt(getComputedStyle(content).height);
  this.mapDiv = content;
  //food
  this.foodW = 20;
  this.foodH = 20;
  this.foodX = 0;
  this.foodY = 0;

  //snake
  
  this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
  this.slen = this.snakeBody.length;

   //game
   this.direct = 'right';
   this.right = false;
   this.left = false;
   this.up = true;
   this.down = true;

   this.score = 0;
   bindEvent()

})()

 function bindEvent() {
     

     close.onclick = function() {
         lose.style.display = 'none';
     }
      startBtn.onclick = function() {
          console.log('ss')
       startAndPaush()  
      }
      startP.onclick = function() {
        startAndPaush() 
      }

 }

 function startAndPaush() {
    if(startPaushBool) {
        if(startGameBool){
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src','./img/pause.png');
        document.onkeydown = function(e) {
            var code =e.keyCode;
            setDerict(code)

        
             }
             snakeMove = setInterval(function() {
                move()
            },speed)

             startPaushBool = false
    }  else{
        startP.setAttribute('src','./img/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false
        };
        startPaushBool = true;
        

    }

 }


 function setDerict(code) {
     switch(code){
         case 37:
         if(this.direct = 'left'){
             this.left = false;
             this.right = false;
             this.up = true;
             this.down = true;
         }
         break;
         case 38:
         if(this.direct = 'up'){
             this.left = true;
             this.right = true;
             this.up = false;
             this.down = false;
         }
         break;
         case 39:
         if(this.direct = 'right'){
             this.left = false;
             this.right = false;
             this.up = true;
             this.down = true;
         }
         break;
         case 40:
         if(this.direct = 'down'){
             this.left = true;
             this.right = true;
             this.up = false;
             this.down = false;
         }
         break;
         default:
         break;


     }

 }

function startGame(){

    startPage.style.display = 'none';
    startP.style.display ='block';
    food()
    snake()

   

    // bindEvent()
}

function food() {
    var food = document.createElement('div');
    food.style.position = 'absolute';
    food.style.width = this.foodW +'px';
    food.style.height = this.foodH +'px';
    this.foodX = Math.floor(Math.random()*(this.mapW/this.foodW));
    this.foodY = Math.floor(Math.random()*(this.mapH/this.foodH));
    food.style.left = this.foodX *20 + 'px';
    food.style.top = this.foodY *20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class','food');

     
}

function snake() {
    for(var i = 0;i < this.slen; i++){
        var snake = document.createElement('div');
        snake.style.width = this.foodW +'px';
        snake.style.height = this.foodH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 +'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    switch(this.direct) { 
        case 'right':
        break;

        case 'left':
        snake.style.transform = 'rotate(180deg)'
        break;
        case 'up':
        snake.style.transform = 'rotate(270deg)'       
        break;
        case 'down':
        snake.style.transform = 'rotate(90deg)'    
        break;
        default:
        break;
    }
    }



}

function move() {
    for(var i=this.slen -1; i>0 ;i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];

    }

    switch(this.direct) { 
        case 'right':
        this.snakeBody[0][0] += 1 ;
        break;
        case 'left':
        this.snakeBody[0][0] -= 1;
        break;
        case 'up':
        this.snakeBody[0][1] -= 1;
        break;
        case 'down':
        this.snakeBody[0][1] += 1;
        break;
        default:
        break;
    }

    removeClass('snake');
    snake()
     if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
         var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
         var snakeEndY = this.snakeBody[this.snakeBody.length -1][1];
            switch(this.direct){
                case 'right':
                this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
                break;
                case 'left':
                this.snakeBody.push([snakeEndX + 1,snakeEndY,'body'])   
                break;
                case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
                break;
                case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY-1,'body'])
                break;
                default:
                break;
            }




        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food()
     }

       if(this.snakeBody[0][0]<0 || this.snakeBody[0][0]>this.mapW/20){
            relodGame()
       }
       if(this.snakeBody[0][1]<0||this.snakeBody[0][1]>this.mapH/20){
        relodGame()
       }
       var snakeHX = snakeBody[0][0];
       var snakeHY = snakeBody[0][1];
       for(var i =1; i<this.snakeBody.length;i++ ){
           if(snakeHX == this.snakeBody[i][0]&&snakeHY == this.snakeBody[i][1]){
            relodGame()
           }
       }



}


function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];

       this.direct = 'right';
       this.right = false;
       this.left = false;
       this.up = true;
       this.down = true;
       lose.style.display = 'block'
       loserScore.innerHTML = this.score;      
    
       this.score = 0;
       scoreBox.innerHTML = this.score;
       startGameBool =true,
       startPaushBool =true;
       startP.setAttribute('src','./img/start.png');


}

function removeClass(className){
    var ele =document.getElementsByClassName(className);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}




