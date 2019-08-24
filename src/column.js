export default class Column {
    constructor(columnID, xPos, yPos) {
        this.columnID = columnID;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    create() {
        var columnContainer = document.getElementById("ColumnContainer");
        var theFirstChild = columnContainer.firstChild;
        var newColumn = document.createElement("div");
        var newNode = document.createElement("div");
        var cardPos = document.createTextNode(".");
        newNode.classList.add("activeNode");
        newNode.classList.add("node");
        newNode.appendChild(cardPos);
        newColumn.appendChild(newNode);
        columnContainer.insertBefore(newColumn, theFirstChild);
    }
}