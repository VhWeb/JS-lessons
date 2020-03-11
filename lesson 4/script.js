'use strict'
class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = `${bg}`;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv(text) {
        let div = document.createElement('div');
        div.style.cssText = `height: ${this.height}px; width:${this.width}px; background:${this.bg}; font-size:${this.fontSize}em; text-align:${this.textAlign};`;
        div.textContent = text;
        document.body.appendChild(div);
    }
}
let div = document.getElementsByTagName('div');