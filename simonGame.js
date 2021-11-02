let order = [];
let playOrder=[];
let flash;
let turn;
let good;
let compTurn;
let intervalid;
let strict = false;
let noise =true;
let on = false;
let win;

const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft= document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictBytton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');


strictBytton.addEventListener('click',(event)=>{
    if(strictBytton.checked==true){
        strict= true;
    }else{
        strict=false;
    }
});



onButton.addEventListener('click',(event)=>{
    if(onButton.checked==true){
        on=true;
        turnCounter.innerHTML="-"
    }else{
        on=false;
        turnCounter.innerHTML=""
        clearColor();
        clearInterval(intervalid);
    }
});


startButton.addEventListener('click',(event)=>{
    if(on || win){
        play();
    }
});

function init(){
    win =false;
    order =[];
    playOrder=[];
    flash=0;
    intervalid=0;
    turn=1;
    turnCounter.innerHTML=1;
    good=true;
}

function play(){
       init();
       for(var i=0;i<20;i++){
           order.push(Math.floor(Math.random()*4)+1);
       } 
       compTurn=true;
       intervalid = setInterval(gameTurn,800);


}

function gameTurn(){
    on =false;
    if(turn==flash){
        on=true;
        compTurn=false;
        clearColor();
    }

    if(compTurn){
        clearColor();
        setTimeout(()=>{
            if(order[flash]==1) one();
            if(order[flash]==2) two();
            if(order[flash]==3) three();
            if(order[flash]==4) four();
            flash++;
        },200);
    }
}


function one(){
    if(noise){
        var ausio = document.getElementById('clip1');
        ausio.play();
    }
    noise=true;
    topLeft.style.backgroundColor="lightgreen";
   
}
function two(){
    if(noise){
        var ausio = document.getElementById('clip2');
        ausio.play();
    }
    noise=true;
    topRight.style.backgroundColor="tomato";
   
}

function three(){
    if(noise){
        var ausio = document.getElementById('clip3');
        ausio.play();
    }
    noise=true;
    bottomLeft.style.backgroundColor="yellow";
   
}

function four(){
    if(noise){
        var ausio = document.getElementById('clip4');
        ausio.play();
    }
    noise=true;
    bottomRight.style.backgroundColor="lightskyblue";
   
}

function clearColor(){
    bottomLeft.style.backgroundColor="goldenrod";
    topRight.style.backgroundColor="darkred";
    bottomRight.style.backgroundColor="darkblue";
    topLeft.style.backgroundColor="darkgreen";   
}
function flashColor(){
    bottomLeft.style.backgroundColor="yellow";
    topRight.style.backgroundColor="tomato";
    bottomRight.style.backgroundColor="lightskyblue";
    topLeft.style.backgroundColor="lightgreen";   
}

topLeft.addEventListener('click',(event) =>{
    
    if(on){
        playOrder.push(1);
        check();
        one();
        if(!win){

            setTimeout(()=>{
               clearColor();     
            }, 300);

        }
    }
});
topRight.addEventListener('click',(event) =>{
    
    if(on){
        playOrder.push(2);
        check();
        two();
        if(!win){

            setTimeout(()=>{
               clearColor();     
            }, 300);

        }
    }
});
bottomLeft.addEventListener('click',(event) =>{
    
    if(on){
        playOrder.push(3);
        check();
        three();
        if(!win){

            setTimeout(()=>{
               clearColor();     
            }, 300);

        }
    }
});
bottomRight.addEventListener('click',(event) =>{
    
    if(on){
        playOrder.push(4);
        check();
        four();
        if(!win){

            setTimeout(()=>{
               clearColor();     
            }, 300);

        }
    }
});


function check(){
    if(playOrder[playOrder.length-1]!==order[playOrder.length-1]){
        good=false; 
    }
    if(playOrder.length==20&& good){
        winGame();
    }
    if(good==false){
        flashColor();
        turnCounter.innerHTML="no";
        setTimeout(()=>{
           turnCounter.innerHTML=turn;
           clearColor();
           if(strict){
               play();
           }else{
               compTurn=false;
               flash=0;
               playOrder=[];
               good=true;
               intervalid=setInterval(gameTurn,800);
           }         
        },800);
        noise=false;
    }

    if(turn==playOrder.length&&good&&!win){

        turn++;
        playOrder=[];
        compTurn=true;
        flash=0;
        turnCounter.innerHTML=turn;
        intervalid=setInterval(gameTurn,800);
    }
}


function winGame(){
    flashColor();
    turnCounter.innerHTML="WIN!"
    on=false;
    win=true;
    
}

