newNodeButton = document.getElementById("NewNode");
newNodeButton.addEventListener("mousedown", CreateCard);

var container = document.querySelector("#container");
var theFirstChild = container.firstChild;

var cards = [];

function CreateCard(e) {
	var newCard = document.createElement("div");
	newCard.classList.add("card");

	newCard.addEventListener("mousedown", dragStart, false);
	newCard.addEventListener("mousemove", drag, false);
	newCard.addEventListener("mouseleave", deactivate, false);
	newCard.addEventListener("mouseup", dragEnd, false);
	
	
	var textCard = document.createElement("p");
	var newContent = document.createTextNode("");
	textCard.appendChild(newContent);
	newCard.appendChild(textCard);

	

	container.insertBefore(newCard, theFirstChild);
	newCard.classList.add('active');

	cards.unshift(newCard);

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
			newCard.classList.remove('inactive');
			newCard.classList.add('active');
			active = true;
		}
	}
	function dragEnd(e) {
		newCard.classList.remove('active');
		newCard.classList.add('inactive');
		initialX = currentX;
		initialY = currentY;
		active = false;
	}
	function drag(e) {
		if (active && document.hasFocus()) {
			// e.preventDefault();
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;
			offsetX = currentX;
			offsetY = currentY;
			setTranslate(currentX, currentY, newCard);
		}
	}
	function deactivate(e) {
		newCard.classList.remove('active');
		newCard.classList.add('inactive');
		active = false;
	}

	function setTranslate(xPos, yPos, el) {
		el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
	}
}