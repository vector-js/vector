/**
* @title Keyboard
* @description This interactive demonstrates how key board input can be used to add interactivity.
* @tags [input]
*/

import {Interactive, Button, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 300;
interactive.border = true;

let buffer = '';

let keys =  [['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
            ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
            ['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
            ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
            ['Control','Alt','Meta',' ','Meta','Alt','ArrowLeft','ArrowUp','ArrowDown','ArrowRight']];

let buttons : Button[] = [];

let height = 32;
let margin = 8;
for( let row = 0; row < keys.length; row++ ) {
  let x = 32;
  let prev:Button;
  for( let i = 0; i < keys[row].length; i++ ) {
    let key = keys[row][i];
    let text: string;
    let width: number = 32;
    switch(key) {
      case 'Backspace':
        text = '⌫';
        break;
      case 'Tan':
        width = 60;
        break;
      case 'CapsLock':
        text = '⇪';
        width = 64;
        break;
      case 'Shift':
        text = '⇧';
        width = 88;
        break;
      case ' ':
        width = 128;
        break;
      case 'ArrowLeft':
        text = '←';
        break;
      case 'ArrowUp':
        text = '↑';
        break;
      case 'ArrowDown':
        text = '↓';
        break;
      case 'ArrowRight':
        text = '→';
        break
      default:
        text = key;
    }
    let button = interactive.button(x, 64 + row*(height + margin), text);
    if(button.box.width < width) {
      button.box.width = width;
    }
    let bbox = button.root.getBBox();
    x += bbox.width + margin;
    buttons.push(button);
    prev = button;
  }
  let right = prev.x;
  if( right < 614 ) {
    prev.box.width = 650 - right;
  }
}

let active:Button[] = [];

window.onkeydown = function( event ) {
  for( let i = 0; i < buttons.length; i++ ) {
    let button = buttons[i];
    if( button.label.contents === event.key ){
      button.box.style.fill = '#f8f8f8';
      button.label.style.fill = '#404040';
      active.push(button);
    }
  }
  buffer += `'${event.key}',`;
}

window.onkeyup = function( event ) {
  let newActive:Button[] = [];
  for( let button of active ) {
    if( button.label.contents === event.key) {
      button.box.style.fill = '';
      button.label.style.fill = '';
    } else {
      newActive.push(button);
    }
  }
  active = newActive;
}

let bbox = interactive.input.root.getBBox();
interactive.setViewBox(bbox.x - margin, bbox.y, bbox.width + 2*margin, bbox.height);
