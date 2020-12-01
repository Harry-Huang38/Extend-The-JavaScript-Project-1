if (canvas != null) {
    window.onload = function () {
        context.drawImage(img, 0, 0, 750, 750);
        drawBoard();
        changeBG();
        bgFunction();

    }

    function drawBoard() {
        for (let i = 0; i < lineNum; i++) {
            //Vertical line
            context.beginPath();
            context.moveTo(radius + boxPx * i, radius);
            context.lineTo(radius + boxPx * i, 725);
            context.stroke();
            //Horizontal line
            context.beginPath();
            context.moveTo(radius, radius + boxPx * i);
            context.lineTo(725, radius + boxPx * i);
            context.stroke();
        };
    }

//new adding or change---------------------------------------------------------------------------------------------
    //x and y is the position for the chess. isBlack check whether is black or white
    var drawChess = function (x, y, isBlack) {
        context.beginPath();
        // ---from Canvas API----
        //void ctx.arc(x, y, radius, startAngle, endAngle);
        /*
        Parameters
        x
        The horizontal coordinate of the arc's center.
        y
            The vertical coordinate of the arc's center.
        radius
            The arc's radius. Must be positive.
        startAngle
            The angle at which the arc starts in radians, measured from the positive x-axis.
        endAngle
            The angle at which the arc ends in radians, measured from the positive x-axis.
         */
        context.arc(radius + x * boxPx, radius + y * boxPx, radius, 0, 2 * Math.PI);
        context.closePath();
        //CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        //The createRadialGradient() method is specified by six parameters, three defining the gradient's start circle, and three defining the end circle.
        var gradient = context.createRadialGradient(radius + x * boxPx, radius + y * boxPx, radius, radius + x * boxPx, radius + y * boxPx, 2);
        if (isBlack) {
            // ---from Canvas API----
            /*void gradient.addColorStop(offset, color);
            offset
                A number between 0 and 1, inclusive, 
                    representing the position of the color stop. 
                0 represents the start of the gradient and
                    1 represents the end; 
            color
                A CSS <color> value representing the color of the stop.
            */
            gradient.addColorStop(0, "#000000"); //Black
            gradient.addColorStop(1, "#A9A9A9"); //DarkGray
        } else {
            gradient.addColorStop(0, "#A9A9A9"); //DarkGray
            gradient.addColorStop(1, "#FFFFFF"); //White
        }
        context.fillStyle = gradient;
        context.fill();
    }
//new adding or change---------------------------------------------------------------------------------------------

    // black chess
    function drawB(x, y) {
        // black
        drawChess(x, y, true);
        array[x][y] = 1;
    }

    //  white chess
    function drawW(x, y) {
        // white
        drawChess(x, y, false);
        array[x][y] = 2;
    }

    // place the chess 
    function placeChess(x, y) {
        if (isBlack) {
            if (!chess_rec.includes(x + ':' + y)) {
                drawB(x, y);
                bl_stepCount++;
                h2.innerHTML = "White turn";
                if (isWin(x, y)) {
                    h2.innerHTML = "Black Win !!";
                    isOver = true;
                    return;
                }
                isBlack = false;
            }

        } else {
            if (!chess_rec.includes(x + ':' + y)) {
                drawW(x, y);
                wh_stepCount++;
                h2.innerHTML = "Black turn";
                if (isWin(x, y)) {
                    h2.innerHTML = "White Win !!";
                    isOver = true;
                    return;
                }
                isBlack = true;
            }
        }
        document.getElementById("black_step").innerHTML = bl_stepCount;
        document.getElementById("white_step").innerHTML = wh_stepCount;        
    }
    //place the chess on the correct position -------------------------------------------
    function play(event) {
        if (isOver) {
            alert("Winner Have Emerged, Please Restart Game!");
            return;
        }
        var index_X = event.offsetX,
            index_Y = event.offsetY;
        //get click event position screen
        var x = parseInt(index_X / boxPx),
            y = parseInt(index_Y / boxPx);
        placeChess(x, y);

        if (!chess_rec.includes(x + ':' + y)) {
            //record the position
            chess_rec.push(x + ':' + y)
        } else {
            alert("Here is Already Have Chess");
        }
        // console.log(x + ':' + y)
    }

    function isWin(x, y) {
        //vertically
        if (up_down(x, y) == 5) {
            return true;
        }
        //horizontally
        if (left_right(x, y) == 5) {
            return true;
        }
        //diagonally Upper left lower right
        if (up_left_low_right(x, y) == 5) {
            return true;
        }
        //diagonally Bottom left top right
        if (up_right_left_down(x, y) == 5) {
            return true;
        }
    }

    //check how many chess on the different position

    //check chess number vertically---------------------------------
    function up_down(x, y) { //black is 1----white is 2
        var currentChess = array[x][y];
        var sumOfChess = 1; // how many chess we have
        //upsite y--
        for (let i = y - 1; i >= 0; i--) {
            if (array[x][i] == currentChess) {
                sumOfChess = sumOfChess + 1;
            } else {
                break;
            }
        }
        //downsite y++
        for (let i = y + 1; i <= 14; i++) {
            if (array[x][i] == currentChess) {
                sumOfChess = sumOfChess + 1;
            } else {
                break;
            }
        }
        return sumOfChess;
    }

    //check chess number horizontally-------------------------------
    function left_right(x, y) { 
        var currentChess = array[x][y];
        var sumOfChess = 1; // how many chess we have
        //left x--
        for (let i = x - 1; i >= 0; i--) {
            if (array[i][y] == currentChess) {
                sumOfChess = sumOfChess + 1;
            } else {
                break;
            }
        }
        //right x++
        for (let i = x + 1; i <= 14; i++) {
            if (array[i][y] == currentChess) {
                sumOfChess = sumOfChess + 1;
            } else {
                break;
            }
        }
        return sumOfChess;
    }

    //check chess number diagonally Upper left lower right-------------
    function up_left_low_right(x, y) {
        var currentChess = array[x][y];
        var sumOfChess = 1;
        //Up_left x-- y--
        for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
            if (array[i][j] == currentChess) {
                sumOfChess = sumOfChess + 1
            } else {
                break;
            }
        }
        //low_right x++ y++
        for (let i = x + 1, j = y + 1; i <= 14 && j <= 14; i++, j++) {
            if (array[i][j] == currentChess) {
                sumOfChess = sumOfChess + 1
            } else {
                break;
            }
        }
        return sumOfChess;
    }

    //check chess number diagonally Upper left lower right -------------
    function up_right_left_down(x, y) {
        var currentChess = array[x][y];
        var sumOfChess = 1;
        //up_right x++ y--
        for (let i = x + 1, j = y - 1; i <= 14 && j >= 0; i++, j--) {
            if (array[i][j] == currentChess) {
                sumOfChess = sumOfChess + 1
            } else {
                break;
            }
        }
        //left_down x-- y++
        for (let i = x - 1, j = y + 1; i >= 0 && j <= 14; i--, j++) {
            if (array[i][j] == currentChess) {
                sumOfChess = sumOfChess + 1
            } else {
                break;
            }
        }
        return sumOfChess;
    }
    var array = new Array();
    for (let i = 0; i < 15; i++) {
        array[i] = new Array();
        for (let j = 0; j < 15; j++) {
            array[i][j] = 0;
        }
    }
} else {
    console.log("error");
}