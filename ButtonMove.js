var fieldW = 0;
var fieldH = 0;
var color = "";
var xLoc = 0;
var yLoc = 0;
var numBtns = 0;
var btnField;
var isPlaying = 0;

function startMove() {
	isPlaying = 1 - isPlaying;
	document.getElementById("mover").innerHTML = "Pause";
	if (isPlaying == 0) {
		document.getElementById("mover").innerHTML = "Move";
	}
}

function moveButton() {
	setInterval(function(){
		if (isPlaying == 1) {
			var btns = document.getElementsByClassName("fieldBtn");
			for (var i=0; i<btns.length; i++) {
				//Calc new x and y positions
				var dir = (btns[i].value - 0); //Forced into integer
				var pos = (btns[i].style.left).substring(0,(btns[i].style.left).length - 2) - 0;
				if (pos == 0 || pos == (fieldW - 30)) {
					dir *= -1;
				}
				//console.log(pos);
				btns[i].style.left = pos + dir + "px";
				btns[i].value = dir; //Store back into value
			}
		}
	},10);
}

function makeButton() {
	//Get size of button field
	if (fieldW == 0) {
		btnField = document.getElementById("field");
		fieldW = btnField.offsetWidth;
		fieldH = btnField.offsetHeight;
		console.log("Width is " + fieldW);
		console.log("Height is " + fieldH);
		moveButton();
	}
	//Generate Color and location
	color = document.getElementById("selector").value;
	xLoc = Math.floor((Math.random() * (fieldW - 30)));
	yLoc = Math.floor((Math.random() * (fieldH - 30)));
	console.log("(" + xLoc + "," + yLoc + ")");
	
	//Create the new object
	const newBtn = document.createElement('button');
	newBtn.classList.add("fieldBtn");
	newBtn.id = "but" + numBtns; //Add button in list
	newBtn.textContent = Math.floor(Math.random() * 100);
	newBtn.value = 2 * ((newBtn.textContent % 2) - 0.5);
	newBtn.onClick = "changeColor(" + this.id + ")";
	newBtn.style.backgroundColor = color;
	newBtn.style.left = xLoc + "px";
	newBtn.style.bottom = ((fieldH - 30) - yLoc) + "px";
	
	btnField.appendChild(newBtn);
	document.getElementById("but" + numBtns).setAttribute( "onClick", "javascript: changeColor(\"but" + numBtns + "\");" )
	numBtns += 1;
}

function changeColor(bId) {
	var btn = document.getElementById(bId);
	btn.style.backgroundColor = document.getElementById("selector").value;
	var sumObj = document.getElementById("sum");
	sumObj.innerHTML = (sumObj.innerHTML - 0) + (btn.innerHTML - 0);
}