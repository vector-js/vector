/**
* @title Click Accuracy Game
* @description Mouse accuracy training game. Try to keep up with the circles by clicking on them when they appear and before they time out!
* @tags [games]
* @weight 2
*/
import { Interactive, getScriptName } from '../../index.js';
let radius = 50;
let spawnRate = 1000;
let outerScore = 0;
let innerScore = 0;
let strikes = 0;
let circleInterval = 0;
let circleIntervalCounter = 2;
let rampInterval = 0;
let gameDone = false;
let listIntervals = [];
let circleIntevals = [];
let hits = [];
let interactive = new Interactive(getScriptName());
interactive.height = 600;
interactive.border = true;
let background = interactive.rectangle(0, 0, interactive.width, interactive.height);
background.style.fill = '#c4c4c4';
let outerScoreLabel = interactive.text(10, 25, "Outer Rings: ");
outerScoreLabel.root.setAttribute('font-weight', 'bold');
outerScoreLabel.root.setAttribute('font-size', '20');
let outerPointsLabel = interactive.text(20 + outerScoreLabel.getBoundingBox().width, 25, outerScore.toString());
outerPointsLabel.root.setAttribute('font-size', '20');
outerPointsLabel.root.setAttribute('font-weight', 'bold');
let innerScoreLabel = interactive.text(20 + outerPointsLabel.getBoundingBox().x + outerPointsLabel.getBoundingBox().width, 25, "Bullseyes: ");
innerScoreLabel.root.setAttribute('font-weight', 'bold');
innerScoreLabel.root.setAttribute('font-size', '20');
let innerPointsLabel = interactive.text(20 + innerScoreLabel.getBoundingBox().x + innerScoreLabel.getBoundingBox().width, 25, innerScore.toString());
innerPointsLabel.root.setAttribute('font-size', '20');
innerPointsLabel.root.setAttribute('font-weight', 'bold');
let gameOverText = interactive.text(interactive.width / 2 - 140, interactive.height / 2, "Game Over");
gameOverText.root.setAttribute('font-size', '50');
gameOverText.root.setAttribute('font-weight', 'bold');
gameOverText.style.fill = 'black';
let strike3 = interactive.text(0, 35, "X");
strike3.x = interactive.width - strike3.getBoundingBox().width - 20;
let w = strike3.getBoundingBox().width;
strike3.root.setAttribute('font-weight', 'bold');
strike3.root.setAttribute('font-size', '40');
let strike2 = interactive.text(0, 35, "X");
strike2.x = interactive.width - w * 2 - 40;
strike2.root.setAttribute('font-weight', 'bold');
strike2.root.setAttribute('font-size', '40');
let strike1 = interactive.text(0, 35, "X");
strike1.x = interactive.width - w * 3 - 60;
strike1.root.setAttribute('font-weight', 'bold');
strike1.root.setAttribute('font-size', '40');
let restartButton = interactive.button(interactive.width / 2 - 50, interactive.height / 2 + 50, "Restart");
restartButton.onclick = function (event) {
    startGame();
};
startScreen();
/**
 * sets up the start screen
 */
function startScreen() {
    gameOverText.contents = "Click Accuracy";
    gameOverText.x = interactive.width / 2 - gameOverText.getBoundingBox().width / 2;
    restartButton.label.contents = "Start";
    gameOverText.root.removeAttribute('visibility');
    restartButton.root.removeAttribute('visibility');
}
function startGame() {
    spawnRate = 1000;
    radius = 50;
    innerScore = 0;
    outerScore = 0;
    strikes = 0;
    strike1.style.fill = 'black';
    strike2.style.fill = 'black';
    strike3.style.fill = 'black';
    while (hits.length != 0) {
        let c = hits.shift();
        c.root.remove();
    }
    circleInterval = setIntervalAndStart(createCircle, spawnRate);
    circleIntevals.push(circleInterval);
    gameOverText.root.setAttribute('visibility', 'hidden');
    restartButton.root.setAttribute('visibility', 'hidden');
    outerPointsLabel.contents = outerScore.toString();
    innerPointsLabel.contents = innerScore.toString();
    rampInterval = setIntervalAndStart(function () {
        console.log("adding interval " + spawnRate * (circleIntervalCounter));
        circleIntevals.push(setIntervalAndStart(createCircle, spawnRate * (++circleIntervalCounter)));
    }, 10300);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function createCircle() {
    gameDone = false;
    let x = getRandomInt(radius, interactive.width - radius);
    let y = getRandomInt(radius, interactive.height - radius);
    let oc = interactive.circle(x, y, radius * 3);
    let c = interactive.circle(x, y, radius);
    let ic = interactive.circle(x, y, radius / 3);
    oc.classList.add("circle");
    c.classList.add("circle");
    ic.classList.add("circle");
    c.style.fill = 'red';
    ic.style.fill = 'white';
    oc.style.fill = 'yellow';
    oc.style.fillOpacity = '0.3';
    let timer = setIntervalAndStart(function () {
        if (!gameDone) {
            oc.r -= 1;
            if (c.r == oc.r) {
                c.root.remove();
                ic.root.remove();
                oc.root.remove();
                strike();
            }
        }
    }, 25);
    listIntervals.push(timer);
    c.root.onclick = function (event) {
        clearInterval(timer);
        outerScore++;
        outerPointsLabel.contents = outerScore.toString();
        c.root.remove();
        ic.root.remove();
        oc.root.remove();
        c.classList.add('hit');
        hits.push(c);
        updateRates();
    };
    ic.root.onclick = function (event) {
        clearInterval(timer);
        innerScore++;
        innerPointsLabel.contents = innerScore.toString();
        c.root.remove();
        ic.root.remove();
        oc.root.remove();
        ic.classList.add('hit');
        hits.push(ic);
        updateRates();
    };
}
function gameOver() {
    console.log(hits);
    gameDone = true;
    gameOverText.contents = 'Game Over';
    gameOverText.root.removeAttribute('visibility');
    gameOverText.x = interactive.width / 2 - gameOverText.getBoundingBox().width / 2;
    restartButton.label.contents = "Restart";
    restartButton.root.removeAttribute('visibility');
    let circles = interactive.root.getElementsByClassName('circle');
    while (circles.length != 0) {
        circles[0].remove();
    }
    while (listIntervals.length != 0) {
        clearInterval(listIntervals[0]);
        listIntervals.shift();
    }
    while (circleIntevals.length != 0) {
        clearInterval(circleIntevals[0]);
        circleIntevals.shift();
    }
    clearInterval(rampInterval);
    hits.forEach(element => {
        interactive.appendChild(element);
    });
    interactive.root.getElementById(gameOverText.id).remove();
    interactive.appendChild(gameOverText);
    interactive.root.getElementById(outerScoreLabel.id).remove();
    interactive.appendChild(outerScoreLabel);
    interactive.root.getElementById(outerPointsLabel.id).remove();
    interactive.appendChild(outerPointsLabel);
    interactive.root.getElementById(innerPointsLabel.id).remove();
    interactive.appendChild(innerPointsLabel);
}
function strike() {
    if (strikes == 0) {
        strike1.style.fill = 'red';
    }
    else if (strikes == 1) {
        strike2.style.fill = 'red';
    }
    else if (strikes == 2) {
        strike3.style.fill = 'red';
    }
    if (strikes == 2) {
        gameOver();
    }
    strikes++;
}
function updateRates() {
    if ((outerScore + innerScore) % 5 == 0 && spawnRate > 500) {
        //spawnRate -= 500;
    }
    if ((innerScore) % 10 == 0 && radius > 10) {
        radius -= 5;
    }
}
function setIntervalAndStart(fn, tm) {
    return window.setInterval(fn, tm);
}
//# sourceMappingURL=click-accuracy-game.js.map