
let blackjackgame={
     'YOU':{'scorespan':"#your-blackjack-result",'div':'#your-box','score':0},
     'DEALER':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','A','K','J','Q'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'K':10,'J':10,'Q':10},
    'wins':0,
    'loses':0,
    'draws':0,
}


const YOU=blackjackgame['YOU'];
const DEALER=blackjackgame['DEALER'];

//sounds
const hitSound=new Audio("blackjack_assets/sounds/swish.m4a");
const winSound=new Audio("blackjack_assets/sounds/cash.mp3");
const loseSound=new Audio("blackjack_assets/sounds/aww.mp3");



let hitMove=true;
let isDeal=false;

//HitButton
function blackjackHit(){
    if (hitMove){
    let card=randomcard();
    if(YOU['score']<=21){
    showcard(card,YOU);
    updateCard(card,YOU);

    
}
    hitSound.play();
    
    showScore(YOU);


    
}
}


//RandomCard Generation
function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}


//DisplaysTheCard
function showcard(card,activeplayer){
    let cardimage=document.createElement('img');
    cardimage.src='blackjack_assets/images/'+card+'.png';
    cardimage.width='100';
    cardimage.height='100';
    document.querySelector(activeplayer['div']).appendChild(cardimage);

}



//DealButton
function blackjackDeal(){
    if(isDeal){

    let noofyourCards=document.querySelector('#your-box').querySelectorAll('img');
    

    for(i=0;i<noofyourCards.length;i++){
        noofyourCards[i].remove();
    }



    let noofdealerCards=document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0;i<noofdealerCards.length;i++){
        noofdealerCards[i].remove();
    }

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').style.color="#ffffff";
    document.querySelector('#dealer-blackjack-result').style.color="#ffffff";

    
    document.querySelector('#black-jack-result').textContent="Lets's Play!!";
    document.querySelector('#black-jack-result').style.color="black";    
    hitMove=true;
    isDeal=false;

}
}




//UpdatesScoreofthePlayer
function updateCard(card,activeplayer){

    if(card=='A'){
        if(activeplayer['score']+blackjackgame['cardsMap'][card][1]<=21){
            activeplayer['score']+=blackjackgame['cardsMap'][card][1];            
        }
        else{
            activeplayer['score']+=blackjackgame['cardsMap'][card][0]; 
        }
    }
    else{
    activeplayer['score']+=blackjackgame['cardsMap'][card];
    }

    
}


//UpdatestheScoreontheGame
function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent="Bust!!";
        document.querySelector(activeplayer['scorespan']).style.color="red";
       
    }
    else{
    document.querySelector(activeplayer['scorespan']).textContent=activeplayer['score'];
    }
}




function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}


//StandButton
async function blackjackStand(YOU){
    hitMove=false;


    while (DEALER['score'] <16) {
    let card=randomcard();
    if(DEALER['score']<=21){
        showcard(card,DEALER);
        updateCard(card,DEALER);
    }
    

        hitSound.play();
       showScore(DEALER);
       await sleep(1000);
    
    }
    
    if(DEALER['score']>15){
        isDeal=true;
        let winner=computeWinner();
        showWinner(winner);

    }
    
}



//SetsTheWinner
function computeWinner(){
    let winner;
    
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21) ){
            blackjackgame['wins']+=1;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            blackjackgame['loses']+=1;
            winner=DEALER;
        }
        else if( YOU['score']==DEALER['score']) {
            blackjackgame['draws']+=1;
            winner="draw";
        }
    }
    else if(YOU['score']>21 &&(DEALER['score']<=21)){
        blackjackgame['loses']+=1
        winner=DEALER;
    }
    else if((YOU['score']="Bust!!" && (DEALER['score']="Bust!!")) || (YOU['score']==DEALER['score'])){
        blackjackgame['draws']+=1
        winner="draw";
    }


    document.querySelector('#wins').textContent=blackjackgame['wins'];
    document.querySelector('#loses').textContent=blackjackgame['loses'];
    document.querySelector('#draws').textContent=blackjackgame['draws'];
    return winner;


    
}


//SetstheColorandPlaystherespectiveSound
function showWinner(winner){
    let message,messagecolor;

    if(winner == YOU){
        message="You Won!!";
        messagecolor="green";
        winSound.play();
    }
    else if(winner==DEALER){
        message='You Lose!!';
        messagecolor="red";
        loseSound.play();
    }
    else{
        message='Draw Match!!';
        messagecolor='black';
    }
    document.querySelector('#black-jack-result').textContent= message;
    document.querySelector('#black-jack-result').style.color= messagecolor;
}



//GeneratesRandomColorfortheButtons
function changecolor(){
    copybuttons=[]
    allbuttons=document.querySelectorAll('button');

    randombutton(allbuttons);
}


function randombutton(allbuttons){
    

    let choices=['btn btn-primary','btn btn-success','btn btn-danger','btn btn-warning'];
    
     for (i=0;i<allbuttons.length;i++){
        let ran=Math.floor(Math.random()*4);
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList+=(choices[ran]);

    }
}