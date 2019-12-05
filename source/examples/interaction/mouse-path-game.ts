/**
* @title Mouse Path Game
* @description Stay inside the bounds of the outlined circle with your cursor for as long as possible! When the timer hits 0 the game is over.
* @tags [games]
* @weight 1
*/
import {Interactive, getScriptName, Button} from '../../index.js';

var startTime;
let interval = 0;
let distance = 1;
let xDiff = distance;
let yDiff = distance;
let mX = 0;
let mY = 0;
let score = 250;

let interactive = new Interactive(getScriptName());
interactive.height = 736;
interactive.width = 736;
interactive.border = true;

interactive.root.addEventListener('mousemove', e => {
    mX = e.clientX - interactive.root.getBoundingClientRect().left;
    mY = e.clientY - interactive.root.getBoundingClientRect().top;
  });

let scoreLabel = interactive.text(10,25,"Time: ");
scoreLabel.root.setAttribute('font-weight','bold');
scoreLabel.root.setAttribute('font-size','20');
let pointsLabel = interactive.text(120,27,score.toString());
pointsLabel.root.setAttribute('font-size','20');
pointsLabel.root.setAttribute('font-weight','bold');
let gameOverText = interactive.text(interactive.width/2 - 180,interactive.height/2, "");
gameOverText.root.setAttribute('font-size','50');
gameOverText.root.setAttribute('font-weight','bold');
gameOverText.root.setAttribute('visibility','hidden');

let restartButton = interactive.button(interactive.width/2 - 50,interactive.height/2 + 50,"Start");
restartButton.onclick = function(event) {
    startGame();
};

let x = 300;
let y = 200;
let control = interactive.control(x,y);
control.onchange = function() {
    control.updateDependents();
}
control.root.setAttribute('visibility','hidden');

let radius = 40;
let circle;

let circles = [];
let d = 10;
let n = 25;

/**
 * starts the game
 */
function startGame(){
    startTime = new Date().getTime();
    score = 250;
    window.requestAnimationFrame(step);
    interval = startTimer(updateDiffs);
    restartButton.root.setAttribute('visibility','hidden');
    gameOverText.root.setAttribute('visibility','hidden');

    //reset circles
    while(circles.length > 0){
        circles[0].remove();
        circles.shift();
    }
    control.translate(300,200);
    circle = interactive.circle(300,200, radius);
    circle.fill = percentageToColor(0);

    circle.addDependency(control);
    circle.update = function() {
        circle.cx = control.x;
        circle.cy = control.y;
    }

    circles = [ circle ];
    for( let i = 1; i < n; i++) {
        let prev = circles[ circles.length - 1 ];
        let circle = interactive.circle(x,y, radius);
        circle.fill = percentageToColor((i+(n/360))*0.01);
        circle.update = function() {
            if( Math.hypot( circle.cy - prev.cy, circle.cx - prev.cx ) >= d-1) {
                let angle = Math.atan2( circle.cy - prev.cy, circle.cx - prev.cx );
                circle.cx = prev.cx + (d-.5)*Math.cos(angle);
                circle.cy = prev.cy + (d-.5)*Math.sin(angle);
            }
        }
        circle.addDependency(prev);
        circles.push(circle);
    }
}

/**
 * animation cycle
 */
var start = null;
function step(timestamp) {
    // initialize start time
    if (!start) start = timestamp;
    // set up the next animation frame
    movePath();
    let head = circles[circles.length-1];
    head.style.stroke = 'black'
    head.style.strokeWidth = '3';
    if(((head.cx + radius >= mX)&&(head.cy + radius >= mY))&&
    ((head.cx - radius <= mX)&&(head.cy - radius <= mY))){
        score++;
    }
    else{
        if(score > 1500){
            score -= 10;
        }
        else{
            score -= 5;
        }
    }
    pointsLabel.contents = score.toString();
    if(score > 0)
    {
        window.requestAnimationFrame(step);
    }
    else{
        score = 0;
        pointsLabel.contents = score.toString();
        var endTime = new Date().getTime();
        let diff = endTime-startTime
        clearInterval(interval);
        gameOverText.contents = 'You lasted '+diff/1000 + ' seconds!'
        gameOverText.x = interactive.width/2 - gameOverText.getBoundingBox().width/2;
        gameOverText.remove();
        interactive.appendChild(gameOverText);
        gameOverText.root.removeAttribute('visibility');
        restartButton.root.removeAttribute('visibility');
        restartButton.label.contents = 'Restart';
    }
}
/**
 * Makes the game harder as time goes on.
 */
function updateDiffs(){
    let m1 = getRandomInt(0,2);
    if(m1 == 0){
        xDiff *= -1;
    }
    else{
        yDiff *= -1;
    }
    if(circles.length > 5){
        let c = circles.pop();
        c.remove();
    }
    distance += 0.25;
    xDiff = Math.sign(xDiff)*distance;
    yDiff = Math.sign(yDiff)*distance;
}
/**
 * Moves the cursor path
 */
function movePath(){
    if((control.x >= interactive.width-50)||(control.x <= 0+50)||
        (control.y >= interactive.height - 50) || (control.y <= 0+50)){
        if(control.x >= interactive.width-50){
            xDiff *= -1;
        }
        else if(control.x <= 0+50){
            xDiff *= -1;
        }
        if(control.y >= interactive.height - 50){
            yDiff *= -1;
        }
        else if(control.y <= 0+50){
            yDiff *= -1;
        }
    }
    control.x += xDiff;
    control.y += yDiff;
    control.onchange();
}

 /**
  * Returns a random int beween min and max
  * The maximum is exclusive and the minimum is inclusive
  */
 function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
 * Calls fn every 2000 seconds and returns the id of the interval.
 * @param fn function to call every 2000 milliseconds
 */
function startTimer(fn: Function){
    return window.setInterval(fn, 2000);
}
/**
 * Takes in a percentage, and converts that to a color on the HSL scale
 * @param percentage percentage of the color scale you want
 * @param maxHue maximum hue value
 * @param minHue minimum hue value
 */
function percentageToColor(percentage, maxHue = 360, minHue = 0) {
    const hue = percentage * (maxHue - minHue) + minHue;
    return `hsl(${hue}, 100%, 50%)`;
  }