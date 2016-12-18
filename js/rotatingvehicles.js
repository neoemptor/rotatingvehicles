// Author: Darren Bailey
// Created: 18-06-13
// Email: darrensb@iinet.net.au
// Project: Displays Rotating carousel menu of vehicles.
// Comments: There are four cars: ferrari, porche, jaguar and lamborghini.
// ----------------------------------------------------------------------------------------------------------

// global constants

// Eliptical orbit calculation.
// Constants for calculating sine and cosine positions.

// x = h + a cos t
// y = k + b sin t

// t = theta is the parameter, which ranges from 0 to 2π radians. That is a variable which is initialised further down the page.

var elipseCentreX = 320; // h = Orginal horizontal x start position.
var elipseCentreY = 130; // k = Orginal vertical y start position.
var radius = 230; 		 // this is used in conjunction with scaleWidthBy(a) and scaleHeightBy(b)
var scaleWidthBy = 1.15; // a is the scaling of the radius along the x axis.
var scaleHeightBy = 0.4; // b is the scaling of the radius along the y axis.

var sizeStep = .0025; 	 // Controls the fineness of scaling cars as they move to the back of the carousel and then the front. 

// Car image rotation flags.
var clockwise = true;
var anticlockwise = false;
var rotationDirection = clockwise;
var offsetX = 31.1; // This is used for the positioning of the mouse hover image over the standard car image.
var offsetY = 76.3; // This is used for the positioning of the mouse hover image over the standard car image.

var sizeMin = .2; 	// size minimum limit 20%
var sizeMax = 1; 	// size maximum limit 100%
// ----------------------------------------------------------------------------------------------------------

// global variables
var stage;

// This is for the eliptical rotation animation calculation. It steps up or down depending on the rotation clockwise or anti.
// x = h + a cos t
// y = k + b sin t
// t = theta is the parameter, which ranges from 0 to 2π radians.
var theta = 0;

// The queue is a holding object which preloads images ready to be manipulated and displayed.
var queue;
var step = 2 * Math.PI / 300; // the last number controls the fineness of movement as opposed to jerky movement. This constant controls movement not size.

// car reflections objects
var aferrarireflect;
var aporchereflect;
var ajaguarreflect;
var alamborghinireflect;

// car mouse over glow objects
var aferrariglow;
var aporcheglow;
var ajaguarglow;
var alamborghiniglow;

// car objects which hold images
var aferrari;
var aporche;
var ajaguar;
var alamborghini;
var bground;
var abadge;

var moveFlag = true; // Used when mouse is over car image and the user moves the mouse in a direction.

var trackMouseDirection;

function init() {
	stage = new createjs.Stage("myCanvas");

	// Enable touch tablet feature.
	createjs.Touch.enable(stage);

	queue = new createjs.LoadQueue(false);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest([
		{
			id: "ferrari",
			src: "img/ferrari.png"
		},
		{
			id: "porche",
			src: "img/porche.png"
		},
		{
			id: "jaguar",
			src: "img/jaguar.png"
		},
		{
			id: "lamborghini",
			src: "img/lamborghini.png"
		},
		{
			id: "ferrarireflect",
			src: "img/ferrarireflect.png"
		},
		{
			id: "porchereflect",
			src: "img/porchereflect.png"
		},
		{
			id: "jaguarreflect",
			src: "img/jaguarreflect.png"
		},
		{
			id: "lamborghinireflect",
			src: "img/lamborghinireflect.png"
		},
		{
			id: "background",
			src: "img/carpanel.png"
		},
		{
			id: "badge",
			src: "img/badge.png"
		},
		{
			id: "ferrariglow",
			src: "img/ferrariglow.png"
		},
		{
			id: "porcheglow",
			src: "img/porcheglow.png"
		},
		{
			id: "jaguarglow",
			src: "img/jaguarglow.png"
		},
		{
			id: "lamborghiniglow",
			src: "img/lamborghiniglow.png"
		}]);
	stage.enableMouseOver();
} // end init

function tick(event) {
	if (moveFlag === true) {
		updateImagePositions(aferrari, aferrarireflect, aferrariglow);

		updateImagePositions(aporche, aporchereflect, aporcheglow);

		updateImagePositions(ajaguar, ajaguarreflect, ajaguarglow);

		updateImagePositions(alamborghini, alamborghinireflect, alamborghiniglow);

		resizeCars();
	}

	// Place cars and reflections on stage.
	placeCarsNReflectionsOnStage();

	// Check if animation can continue.
	checkAnimationContinue();
	stage.update();
} // end tick

function checkAnimationContinue() {
	if (moveFlag === true) {
		if (rotationDirection === clockwise) {
			theta += step;
			// Check if you need to reset the plotting of the eliptical path of image objects motion.
			if (theta >= 2 * Math.PI) {
				theta = 0;
			}
		}
		else { // rotate anticlockwise
			theta -= step;
			if (theta <= 0) {
				theta = 2 * Math.PI - step;
			}
		}
	}
} // end checkAnimationContinue

function placeCarsNReflectionsOnStage() {
	stage.addChild(aferrarireflect);
	stage.addChild(aporchereflect);
	stage.addChild(ajaguarreflect);
	stage.addChild(alamborghinireflect);

	stage.addChild(aferrari);
	stage.addChild(aporche);
	stage.addChild(ajaguar);
	stage.addChild(alamborghini);
} // end placeCarsNReflectionsOnStage

function updateImagePositions(theCar, theCarReflect, theCarGlow) {
	theCar.YposBefore = theCar.y;
	// car positions
	theCar.x = elipseCentreX + scaleWidthBy * radius * Math.cos(theta + theCar.offset);
	theCar.y = elipseCentreY - scaleHeightBy * radius * Math.sin(theta + theCar.offset);
	theCarReflect.x = theCar.x;
	theCarReflect.y = theCar.y + (theCar.getBounds().height * theCar.scaleY);
	theCarGlow.x = theCar.x - (offsetX * theCar.scaleX);
	theCarGlow.y = theCar.y - (offsetY * theCar.scaleY);
	theCar.YposAfter = theCar.y;
} // end updateImagePositions

function handleMouse(event) {
	switch (event.type) {
		case "mouseover":
			moveFlag = false; // to pause animation
			trackMouseDirection = event.stageX;
			switch (event.target.name) {
				case "ferrari": // highlight ferrari
					stage.addChild(aferrariglow);
					break;
				case "porche": // highlight porche
					stage.addChild(aporcheglow);
					break;
				case "jaguar": // highlight jaguar
					stage.addChild(ajaguarglow);
					break;
				case "lamborghini": // highlight lamborghini
					stage.addChild(alamborghiniglow);
			}
			break;
		case "mouseout":
			moveFlag = true; // resume animation
			switch (event.target.name) {
				case "ferrari":
					stage.removeChild(aferrariglow);
					break;
				case "porche":
					stage.removeChild(aporcheglow);
					break;
				case "jaguar":
					stage.removeChild(ajaguarglow);
					break;
				case "lamborghini":
					stage.removeChild(alamborghiniglow);
					break;
			}
			if (trackMouseDirection < event.stageX) { // If the user is moving the mouse to the left change rotation direction anticlockwise.
				rotationDirection = anticlockwise;
			}
			else if (trackMouseDirection > event.stageX) { // If the user is moving the mouse to the right change rotation direction clockwise.
				rotationDirection = clockwise;
			}
			break;
		case "click":	// Go to the page related to the image.
			switch (event.target.name) {
				case "ferrari":
					window.location.assign("ferrari.html");
					break;
				case "porche":
					window.location.assign("porche.html");
					break;
				case "jaguar":
					window.location.assign("jaguar.html");
					break;
				case "lamborghini":
					window.location.assign("lamborghini.html");
			}
	}
} // end handleMouse

function handleComplete(event) {
	// create images
	createImages();

	// initialise mouseover cursors
	initMouseoverCursors();

	// set initial defaults for image objects
	// ---------------------------------------------------------------------------------------------------------------------------------------
	// used to reference objects in mouse handler
	aferrari.name = "ferrari";
	aporche.name = "porche";
	ajaguar.name = "jaguar";
	alamborghini.name = "lamborghini";

	// initialise car scales
	initCarScales();

	// These are the offset starting positions for each car image. The Ferrari is the original calculated position by which all other cars are offset from.
	// Therefore the offset for the Ferrari is 0.
	initOffsetPositions();

	// Initialise vertical before and after positions for saving state when position transformed.
	initBeforeAfterPositions();

	// Add event listeners.
	addEventListeners();

	// Initialise and place the background. These are considered constants.
	var staticItemScale = .6; // 60%

	bground.scaleX = staticItemScale;
	bground.scaleY = staticItemScale;
	stage.addChild(bground);

	// Initialise the badge which is placed on top of the background but behind the cars. These are considered constants.
	abadge.x = 220;
	abadge.y = 120;
	abadge.scaleX = staticItemScale;
	abadge.scaleY = staticItemScale;
	stage.addChild(abadge);

	// Add the tick function to the timer.
	createjs.Ticker.addEventListener("tick", tick);
} // end handleComplete

function initOffsetPositions() {
	// Treat these as constants.
	// These are the positions the cars will be placed around the eliptical path which they will then move along the eliptical path.
	aferrari.offset = 0;
	aporche.offset = 1.5;
	ajaguar.offset = 3;
	alamborghini.offset = 4.5;

} // end initOffsetPositions

function createImages() {
	bground = new createjs.Bitmap(queue.getResult("background"));
	abadge = new createjs.Bitmap(queue.getResult("badge"));

	aferrarireflect = new createjs.Bitmap(queue.getResult("ferrarireflect"));
	aporchereflect = new createjs.Bitmap(queue.getResult("porchereflect"));
	ajaguarreflect = new createjs.Bitmap(queue.getResult("jaguarreflect"));
	alamborghinireflect = new createjs.Bitmap(queue.getResult("lamborghinireflect"));

	aferrari = new createjs.Bitmap(queue.getResult("ferrari"));
	aporche = new createjs.Bitmap(queue.getResult("porche"));
	ajaguar = new createjs.Bitmap(queue.getResult("jaguar"));
	alamborghini = new createjs.Bitmap(queue.getResult("lamborghini"));

	aferrariglow = new createjs.Bitmap(queue.getResult("ferrariglow"));
	aporcheglow = new createjs.Bitmap(queue.getResult("porcheglow"));
	ajaguarglow = new createjs.Bitmap(queue.getResult("jaguarglow"));
	alamborghiniglow = new createjs.Bitmap(queue.getResult("lamborghiniglow"));
} // createImages

function initBeforeAfterPositions() {
	var startX = 28;
	var startY = 211;

	aferrari.YposBefore = startX;
	aferrari.YposAfter = startY;
	aporche.YposBefore = startX;
	aporche.YposAfter = startY;
	ajaguar.YposBefore = startX;
	ajaguar.YposAfter = startY;
	alamborghini.YposBefore = startX;
	alamborghini.YposAfter = startY;
} // initBeforeAfterPositions

function initMouseoverCursors() {
	var theCursor = "pointer";

	aferrariglow.cursor = theCursor;
	aporcheglow.cursor = theCursor;
	ajaguarglow.cursor = theCursor;
	alamborghiniglow.cursor = theCursor;

	aferrari.cursor = theCursor;
	aporche.cursor = theCursor;
	ajaguar.cursor = theCursor;
	alamborghini.cursor = theCursor;
} // initMouseoverCursors

function initCarScales() {
	var scaleLamborghini = 1;
	var scaleFerrari = .75;
	var scaleJaguar = scaleFerrari;
	var scalePorche = .5;


	aferrari.scaleX = scaleFerrari;
	aferrari.scaleY = scaleFerrari;
	aporche.scaleX = scalePorche;
	aporche.scaleY = scalePorche;
	ajaguar.scaleX = scaleJaguar;
	ajaguar.scaleY = scaleJaguar;
	alamborghini.scaleX = scaleLamborghini;
	alamborghini.scaleY = scaleLamborghini;

	aferrarireflect.scaleX = scaleFerrari;
	aferrarireflect.scaleY = scaleFerrari;
	aporchereflect.scaleX = scalePorche;
	aporchereflect.scaleY = scalePorche;
	ajaguarreflect.scaleX = scaleJaguar;
	ajaguarreflect.scaleY = scaleJaguar;
	alamborghinireflect.scaleX = scaleLamborghini;
	alamborghinireflect.scaleY = scaleLamborghini;

	aferrariglow.scaleX = scaleFerrari;
	aferrariglow.scaleY = scaleFerrari;
	aporcheglow.scaleX = scalePorche;
	aporcheglow.scaleY = scalePorche;
	ajaguarglow.scaleX = scaleJaguar;
	ajaguarglow.scaleY = scaleJaguar;
	alamborghiniglow.scaleX = scaleLamborghini;
	alamborghiniglow.scaleY = scaleLamborghini;
} // end initCarScales

function addEventListeners() {
	aferrari.addEventListener("click", handleMouse);
	aporche.addEventListener("click", handleMouse);
	ajaguar.addEventListener("click", handleMouse);
	alamborghini.addEventListener("click", handleMouse);

	aferrari.addEventListener("mouseover", handleMouse);
	aporche.addEventListener("mouseover", handleMouse);
	ajaguar.addEventListener("mouseover", handleMouse);
	alamborghini.addEventListener("mouseover", handleMouse);

	aferrari.addEventListener("mouseout", handleMouse);
	aporche.addEventListener("mouseout", handleMouse);
	ajaguar.addEventListener("mouseout", handleMouse);
	alamborghini.addEventListener("mouseout", handleMouse);
} // end addEventListeners

function resizeCars() {
	// car sizing
	setCarSize(aferrari, aferrarireflect, aferrariglow);
	setCarSize(aporche, aporchereflect, aporcheglow);
	setCarSize(ajaguar, ajaguarreflect, ajaguarglow);
	setCarSize(alamborghini, alamborghinireflect, alamborghiniglow);
} // end resizeCars

function setCarSize(aCar, aCarReflect, aCarGlow) {
	if (aCar.YposBefore < aCar.YposAfter && aCar.scaleY <= sizeMax) {
		aCar.scaleY += sizeStep;
		aCar.scaleX += sizeStep;
	}
	else if (aCar.YposBefore > aCar.YposAfter && aCar.scaleY >= sizeMin) {
		aCar.scaleY -= sizeStep;
		aCar.scaleX -= sizeStep;
	}
	aCarReflect.scaleX = aCar.scaleX;
	aCarReflect.scaleY = aCar.scaleX;
	aCarGlow.scaleX = aCar.scaleX;
	aCarGlow.scaleY = aCar.scaleX;
} // end setCarSize
