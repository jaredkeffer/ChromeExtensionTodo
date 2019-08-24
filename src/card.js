export default class Card {
    constructor(cardID, xPos, yPos) {
        this.cardID = cardID;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    create(event) {
        var container = document.querySelector("#container");
        var theFirstChild = container.firstChild;
        var newCard = document.createElement("div");
	    newCard.classList.add("card");
        var textCard = document.createElement("p");
        var newContent = document.createTextNode("");
        textCard.appendChild(newContent);
        newCard.appendChild(textCard);
        container.insertBefore(newCard, theFirstChild);
        newCard.classList.add('active');
        setTranslate(event.clientX - offset, event.clientY - offset, newCard);

        newCard.addEventListener("mousedown", dragStart, false);
        newCard.addEventListener("mousemove", drag, false);
        newCard.addEventListener("mouseleave", deactivate, false);
        newCard.addEventListener("mouseup", dragEnd, false);

        var snapping = false;
        var active = true;
	    var offset = 75;

        function dragStart(e) {	
            snapping = false;
            
            if (e.target === newCard) {
                var cardRect = newCard.getBoundingClientRect();
                let x = parseInt(cardRect.left);
                let y = parseInt(cardRect.top);
                var oldNode = getClosestNode(x, y);
                console.log(oldNode);
                oldNode.classList.add("activeNode");
                newCard.classList.remove('inactive');
                newCard.classList.add('active');
                newCard.classList.remove("cardTransition");
                active = true;
            }
        }
        function dragEnd(e) {
            snapping = true;
            newCard.classList.remove('active');
            newCard.classList.add('inactive');
            active = false;
            if (snapping) {
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
                if (getClosestActiveNode(xPos, yPos) != undefined) {	
                    var closestNode = getClosestActiveNode(xPos, yPos);
                    closestNode.classList.remove("activeNode");
                    var nodeRect = closestNode.getBoundingClientRect();
                    let x = parseInt(nodeRect.left);
                    let y = parseInt(nodeRect.top);
                    newCard.classList.add("cardTransition");
    
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
                // if (distance < minDist) {
                    distances.push(parseInt(distance));
                // }
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
                // if (distance < minDist) {
                    distances.push(parseInt(distance));
                // }
            });
        
            let closestNodeIndex = distances.indexOf(Math.min(...distances));
        
            return nodes[closestNodeIndex];
        }
    }
    
}


 