let canvas = document.getElementById("myCanvas");
context = canvas.getContext('2d');
var h2 = document.getElementsByClassName("h2")[0];

let img = new Image();
img.src = "image/bg.jpg";


let boxPx = 50;
let radius = 25;
let lineNum = 15;

let chess_rec = []; //record 
let isOver = false;
let isBlack = true;

//new adding or change--------------------------------
let wh_stepCount = 0;
let bl_stepCount = 0;
let select_count = 0;

    /*
    change the background image function
    */
let currImage = 0;
let imageArray = [  "image/Background1.jpg", 
                    "image/Background2.jpg", 
                    "image/Background3.jpg",
                    "image/Background4.jpg"];
function bgFunction(){
    myTime = setInterval(changeBG, 10000);
}

function changeBG(){
    if(currImage == imageArray.length - 1){
        currImage = 0;
    }
    else{
        currImage += 1;
    }
    document.body.style.backgroundImage = "url("+ imageArray[currImage] +")";
}

/* 
    change the chess Color function
*/
function myColor() {
    let mySelect = document.getElementById("colorSelect");
    let myValue = mySelect.selectedIndex;
    mySelect.options[myValue].value;

    if(wh_stepCount == 0 && bl_stepCount == 0){
        if (myValue == 0 && select_count == 0) {
            isBlack = true;
            select_count++;
            h2.innerHTML = "You Have Black Stone";
        }
        else if (myValue == 1 && select_count == 0)  {
            isBlack = false;
            select_count++;
            h2.innerHTML = "You Have White Stone";
        }
        else{
            alert("Already Select Color")
        }
    }
    else{
        alert("The Game Already Started!")
    }
}
//new adding or change--------------------------------