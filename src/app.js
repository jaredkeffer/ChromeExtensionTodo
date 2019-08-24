import Card from './card.js';
import Column from './column.js';

let column = new Column();
let card = new Card();

let newColumnButton = document.getElementById("NewColumn");
newColumnButton.addEventListener("mousedown", column.create);

let newCardButton = document.getElementById("NewCard");
newCardButton.addEventListener("mousedown", card.create);

