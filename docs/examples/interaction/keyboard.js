/**
* @title Keyboard
* @description This interactive demonstrates how key board input can be used to add interactivity.
* @tags [input]
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 300;
interactive.border = true;
let buffer = '';
let keys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['fn', 'Control', 'Alt', 'Meta', ' ', 'Meta', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']];
let buttons = [];
let keycodes = { "0": { "Symbol": 0, "Shift": ")" }, "1": { "Symbol": 1, "Shift": "!" }, "2": { "Symbol": 2, "Shift": "@" }, "3": { "Symbol": 3, "Shift": "#" }, "4": { "Symbol": 4, "Shift": "$" }, "5": { "Symbol": 5, "Shift": "%" }, "6": { "Symbol": 6, "Shift": "^" }, "7": { "Symbol": 7, "Shift": "&" }, "8": { "Symbol": 8, "Shift": "*" }, "9": { "Symbol": 9, "Shift": "(" }, "a": { "Symbol": "a", "Shift": "A" }, "b": { "Symbol": "b", "Shift": "B" }, "c": { "Symbol": "c", "Shift": "C" }, "d": { "Symbol": "d", "Shift": "D" }, "e": { "Symbol": "e", "Shift": "E" }, "f": { "Symbol": "f", "Shift": "F" }, "g": { "Symbol": "g", "Shift": "G" }, "h": { "Symbol": "h", "Shift": "H" }, "i": { "Symbol": "i", "Shift": "I" }, "j": { "Symbol": "j", "Shift": "J" }, "k": { "Symbol": "k", "Shift": "K" }, "l": { "Symbol": "l", "Shift": "L" }, "m": { "Symbol": "m", "Shift": "M" }, "n": { "Symbol": "n", "Shift": "N" }, "o": { "Symbol": "o", "Shift": "O" }, "p": { "Symbol": "p", "Shift": "P" }, "q": { "Symbol": "q", "Shift": "Q" }, "r": { "Symbol": "r", "Shift": "R" }, "s": { "Symbol": "s", "Shift": "S" }, "t": { "Symbol": "t", "Shift": "T" }, "u": { "Symbol": "u", "Shift": "U" }, "v": { "Symbol": "v", "Shift": "V" }, "w": { "Symbol": "w", "Shift": "W" }, "x": { "Symbol": "x", "Shift": "X" }, "y": { "Symbol": "y", "Shift": "Y" }, "z": { "Symbol": "z", "Shift": "Z" }, "`": { "Symbol": "`", "Shift": "~" }, "-": { "Symbol": "-", "Shift": "_" }, "=": { "Symbol": "=", "Shift": "+" }, ";": { "Symbol": ";", "Shift": ":" }, "'": { "Symbol": "'", "Shift": "\"" }, "[": { "Symbol": "[", "Shift": "{" }, "]": { "Symbol": "]", "Shift": "}" }, "\\": { "Symbol": "\\", "Shift": "|" }, ",": { "Symbol": ",", "Shift": "<" }, ".": { "Symbol": ".", "Shift": ">" }, "/": { "Symbol": "/", "Shift": "?" }, "Backspace": { "Symbol": "⌫", "Shift": "" }, "tab": { "Symbol": "  ", "Shift": "" }, "CapsLock": { "Symbol": "⇪", "Shift": "" }, "Shift": { "Symbol": "⇧", "Shift": "" }, "Enter": { "Symbol": "⏎", "Shift": "" }, "Control": { "Symbol": "⌃", "Shift": "" }, "Alt": { "Symbol": "Alt", "Shift": "" }, "Meta": { "Symbol": "⌘", "Shift": "" }, "ArrowLeft": { "Symbol": "←", "Shift": "" }, "ArrowUp": { "Symbol": "↑", "Shift": "" }, "ArrowDown": { "Symbol": "↓", "Shift": "" }, "ArrowRight": { "Symbol": "→", "Shift": "" }, " ": { "Symbol": " ", "Shift": "" } };
let buttonMap = new Map();
let height = 32;
let margin = 8;
let capslock = interactive.button(0, 0, keycodes['CapsLock'].Symbol);
let shift = interactive.button(0, 0, keycodes['Shift'].Symbol);
for (let row = 0; row < keys.length; row++) {
    let x = 32;
    let prev;
    for (let i = 0; i < keys[row].length; i++) {
        let key = keys[row][i];
        let width = 32;
        let button;
        switch (key) {
            case 'CapsLock':
                button = capslock;
                width = 64;
                break;
            case 'Shift':
                if (shift.x === 0) {
                    button = shift;
                }
                else {
                    button = interactive.button(0, 0, keycodes[key] != undefined ? keycodes[key].Symbol : key);
                }
                width = 90;
                break;
            case 'tab':
                width = 50;
                button = interactive.button(0, 0, keycodes[key] != undefined ? keycodes[key].Symbol : key);
                break;
            case ' ':
                width = 176;
                button = interactive.button(0, 0, keycodes[key] != undefined ? keycodes[key].Symbol : key);
                break;
            case 'Meta':
                width = 50;
                button = interactive.button(0, 0, keycodes[key] != undefined ? keycodes[key].Symbol : key);
                break;
            default:
                button = interactive.button(0, 0, keycodes[key] != undefined ? keycodes[key].Symbol : key);
                if (keycodes[key] != undefined) {
                    if (keycodes[key].Shift != '') {
                        button.addDependency(shift, capslock);
                        button.update = () => {
                            if (shift.active || capslock.active) {
                                button.label.contents = keycodes[key].Shift;
                            }
                            else {
                                button.label.contents = keycodes[key].Symbol;
                            }
                        };
                    }
                }
        }
        button.x = x;
        button.y = 64 + row * (height + margin);
        if (button.box.width < width) {
            button.box.width = width;
        }
        let bbox = button.root.getBBox();
        x += bbox.width + margin;
        buttons.push(button);
        prev = button;
        buttonMap.set(key, button);
        if (key === "ArrowUp") {
            button.box.height = 16;
            button.label.root.style.display = 'none';
        }
        else if (key === "ArrowDown") {
            button.box.height = 16;
            button.x -= (32 + margin);
            button.y += 16;
            button.label.root.style.display = 'none';
            x -= bbox.width + margin;
        }
    }
    let right = prev.x;
    if (right < 630) {
        prev.box.width = 630 - right;
    }
}
// console.log(keycodes["0"], shift, capslock);
let active = [];
window.onkeydown = function (event) {
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.label.contents === event.key || (keycodes[event.key] != undefined && button.label.contents === keycodes[event.key].Symbol)) {
            button.box.style.fill = '#f8f8f8';
            button.label.style.fill = '#404040';
            button.active = true;
            active.push(button);
        }
    }
    buffer += `'${event.key}',`;
};
window.onkeyup = function (event) {
    let newActive = [];
    for (let button of active) {
        if (button.label.contents === event.key || (keycodes[event.key] != undefined && button.label.contents === keycodes[event.key].Symbol)) {
            button.box.style.fill = '';
            button.label.style.fill = '';
            button.active = false;
        }
        else {
            newActive.push(button);
        }
    }
    active = newActive;
};
let bbox = interactive.input.root.getBBox();
interactive.setViewBox(bbox.x - margin, bbox.y, bbox.width + 2 * margin, bbox.height);
//# sourceMappingURL=keyboard.js.map