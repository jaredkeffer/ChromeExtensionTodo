newNodeButton = document.getElementById("NewNode");
newNodeButton.addEventListener("mousedown", CreateCard);

var container = document.querySelector("#container");
var theFirstChild = container.firstChild;

var cards = [];

var snapping = false;

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
	var offset = 75;
	
	function dragStart(e) {	
		snapping = false;
		
		if (e.target === newCard) {
			var cardRect = newCard.getBoundingClientRect();
			var x = parseInt(cardRect.left);
			var y = parseInt(cardRect.top);
			var oldNode = getClosestNode(x, y);
			console.log(oldNode);
			oldNode.classList.add("activeNode");
			newCard.classList.remove('inactive');
			newCard.classList.add('active');
			active = true;
		}
	}
	function dragEnd(e) {
		snapping = true;
		newCard.classList.remove('active');
		newCard.classList.add('inactive');
		active = false;
		if (snapping) {
			console.log("bike");
			snap(newCard, e.clientX, e.clientY, snapping, e);
		}
	}
	function deactivate(e) {
		if (active) {
			snapping = true;
			newCard.classList.remove('active');
			newCard.classList.add('inactive');
			active = false;
			if (snapping) {
				snap(newCard, e.clientX, e.clientY, snapping, e);
			}
		}
	}
	function drag(e) {
		if (active) {
			e.preventDefault();
			snapping = false;
			setTranslate(e.clientX - offset, e.clientY - offset, newCard);
		}
	}
	function setTranslate(xPos, yPos, el) {
		el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
	}
	function snap(el, xPos, yPos, snapping, e) {
		if (snapping) {	
			var closestNode = getClosestActiveNode(xPos, yPos);
			closestNode.classList.remove("activeNode");
			var nodeRect = closestNode.getBoundingClientRect();
			var x = parseInt(nodeRect.left);
			var y = parseInt(nodeRect.top);

			setTranslate(x, y, el);
		}
	}
}

function getClosestNode(x, y) {
	let nodes = Array.from(document.querySelectorAll(".node"));
	let nodeCoords = nodes.map(link => {
		let rect = link.getBoundingClientRect();
	return [rect.x, rect.y];
	});

	let distances = [];

	nodeCoords.forEach(nodeSpot => {
		let distance = 0;
		distance = Math.hypot(nodeSpot[0]-parseInt(x), nodeSpot[1]-parseInt(y));
		distances.push(parseInt(distance));
	});

	let closestNodeIndex = distances.indexOf(Math.min(...distances));

	return nodes[closestNodeIndex];
}
function getClosestActiveNode(x, y) {
	let nodes = Array.from(document.querySelectorAll(".activeNode"));
	let nodeCoords = nodes.map(link => {
		let rect = link.getBoundingClientRect();
	return [rect.x, rect.y];
	});

	let distances = [];

	nodeCoords.forEach(nodeSpot => {
		let distance = 0;
		distance = Math.hypot(nodeSpot[0]-parseInt(x), nodeSpot[1]-parseInt(y));
		distances.push(parseInt(distance));
	});

	let closestNodeIndex = distances.indexOf(Math.min(...distances));

	return nodes[closestNodeIndex];
}