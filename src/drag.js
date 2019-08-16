newNodeButton = document.getElementById("NewNode");
newNodeButton.addEventListener("mousedown", CreateCard);

var nodes = [];
// var newCard;
var container = document.querySelector("#container");
var theFirstChild = container.firstChild;





// class Card {
// 	constructor(xPos, yPos, active) {
// 		this.xPos = xPos;
// 		this.yPos = yPos;
// 		this.active;
// 	}
	
// }

// function insertAfter(el, referenceNode) {
// 	referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
// }

function CreateCard(e) {
	var newCard = document.createElement("div");
	newCard.classList.add("card");

	newCard.addEventListener("mousedown", dragStart, false);
	newCard.addEventListener("mousemove", drag, false);
	newCard.addEventListener("mouseleave", deactivate, false);
	newCard.addEventListener("mouseup", dragEnd, false);
	
	
	var textCard = document.createElement("p");
	var newContent = document.createTextNode("card");
	textCard.appendChild(newContent);
	newCard.appendChild(textCard);

	

	container.insertBefore(newCard, theFirstChild);
	newCard.classList.add('active');

	// initialX = e.clientX - offsetX;
	// initialY = e.clientY - offsetY;

	var active = true;
	var currentX = 0;
	var currentY = 0;
	var offsetX = 0;
	var offsetY = 0;
	var initialX = e.clientX - offsetX;;
	var initialY = e.clientY - offsetY;;
	


	function dragStart(e) {	
		initialX = e.clientX - offsetX;
		initialY = e.clientY - offsetY;
		if (e.target === newCard) {
			e.preventDefault();
			newCard.classList.add('active');
			active = true;
			console.log("bike");
		}
	}
	function dragEnd(e) {
		newCard.classList.remove('active');
		initialX = currentX;
		initialY = currentY;
		active = false;
		// console.log(initialX);
	}
	function drag(e) {
		if (active) {
			// e.preventDefault();
			// currentX = e.clientX;
			// currentY = e.clientY;
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;
			offsetX = currentX;
			offsetY = currentY;
			console.log(offsetX);
			// console.log(initialX);
			console.log("bikeybikebike");
			setTranslate(currentX, currentY, newCard);
		}
	}
	function deactivate(e) {
		newCard.classList.remove('active');
		active = false;
	}

	function setTranslate(xPos, yPos, el) {
		el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
		// el.style.top = yPos + "px;"
		// el.style.left = xPos + "px;"
	}
}