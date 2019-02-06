// happy cows
// Aaron Li, Joyce Liao
// SoftDev2 pd8
// K03 -- They lock us in the tower whenever we get caught
// 2019-02-04

// variables
var canvas = document.getElementById("playground"); // canvas element
var radius = 0; // current radius
var requestID = 0; // request id
var max = (canvas.width - 10) / 2; // max radius
var growing = true; // growing or shrinking

var stop = document.getElementById("stop"); // stop button
var animate = document.getElementById("circle"); // animation button
var dvd = document.getElementById("dvd");

var ctx = canvas.getContext("2d"); // set the context

// halts animation
var halt = function(e) {
	console.log(requestID);
	window.cancelAnimationFrame(requestID);
};

// animate
var draw = function(e) {
	// this is like clearing before drawing,
	// we want to stop any other animations before
	// starting another (prevent speeding up)
	halt();

	// request a new animation
	requestID = window.requestAnimationFrame(draw);
	// clear rect first
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// drawing the new circle
	ctx.beginPath();
	ctx.fillStyle = "#00FFFF";
	ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fill();

	// if growing, increment radius and vice versa
	if (growing) radius += 1;
	else {
		radius -= 1;
	}

	// facilitate growing/shrinking behavior upon
	// reaching max radius or 0
	if (radius >= max) {
		growing = false;
	}
	if (radius == 0) {
		growing = true;
	}
};

var dvder = function(e) {
	window.cancelAnimationFrame(requestID);

	var rectW = 100;
	var rectH = 50;

	var rectX = Math.floor(Math.random() * (canvas.width - rectW));
	var rectY = Math.floor(Math.random() * (canvas.width - rectH));

	var xVel = 1;
	var yVel = 1;

	var logo = new Image();
	logo.src = "logo_dvd.jpg";

	var dvdLogo = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		requestID = window.requestAnimationFrame(dvdLogo);
		console.log(logo.src);
		ctx.drawImage(logo, rectX, rectY, rectW, rectH);

		console.log("xvel: " + xVel);
		console.log("yvel: " + yVel);
		console.log(rectX);
		console.log(rectY);
		if (rectX >= canvas.width) {
			xVel = -1;
		} else if (rectY <= 0) {
			yVel = -1;
		} else if (rectY >= canvas.height) {
			yVel = 1;
		} else if (rectX <= 0) {
			xVel = 1;
		}

		rectX += xVel;
		rectY += yVel;
	};

	dvdLogo();


};

// var dvder = function(e) {
// 	dvdSetup();
//
// 	window.requestAnimationFrame(dvder);
// 	ctx.drawImage()
// };

// button event listeners
stop.addEventListener("click", halt);
animate.addEventListener("click", draw);
dvd.addEventListener("click", dvder);
