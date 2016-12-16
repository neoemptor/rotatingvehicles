// Author: Darren Bailey
// 18-06-13
// Email: darrensb@iinet.net.au
// Project: Displays Rotating carousel menu of vehicles.
// todo: border needs to be made so it overlays reflection instead of other way around.

var stage;
var queue;
var step = 2 * Math.PI / 300; // the last number controls the fineness of
// movement as opposed to jerky movement.
// ferrari	porche	jaguar	lamborghini
var h = 320;
var k = 130;
var r = 230;
var theta = 0;
var clockwise = 1;
var anticlockwise = 0;
var rotationDirection = clockwise;

// car reflections
var aferrarireflect;
var aporchereflect;
var ajaguarreflect;
var alamborghinireflect;

var aferrariglow;
var aporcheglow;
var ajaguarglow;
var alamborghiniglow;

// car images
var aferrari;
var aporche;
var ajaguar;
var alamborghini;
var bground;
var abadge;

var sizeStep = .0025; // controls the fineness of sizing cars.
var sizeMin = .2; // size minimum limit.
var sizeMax = 1; // size maximum limit.

var ferrariYposBefore = 28;
var ferrariYposAfter = 211;
var porcheYposBefore = 28;
var porcheYposAfter = 211;
var jaguarYposBefore = 28;
var jaguarYposAfter = 211;
var lamborghiniYposBefore = 28;
var lamborghiniYposAfter = 211;
var moveFlag = 1; // used when mouse is over car image.

var trackMouseDirection;

function init()
{
    stage = new createjs.Stage("myCanvas");

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
	var bounds = aferrari.getBounds();
	//aferrari.regX = bounds.width / 2;
	aferrari.regY = bounds.height;
	
	bounds = aferrarireflect.getBounds();
	//aferrarireflect.regX = bounds.width / 2;
	//aferrarireflect.regY = bounds.height / 2;
	
	bounds = aferrariglow.getBounds();
	//aferrariglow.regX = bounds.width;
	aferrariglow.regY = bounds.height;
	
	bounds = aporche.getBounds();
	aporche.regX = bounds.width / 2;
	aporche.regY = bounds.height / 2;
	
	bounds = aporchereflect.getBounds();
	aporchereflect.regX = bounds.width / 2;
	aporchereflect.regY = bounds.height / 2;
	
	bounds = aporcheglow.getBounds();
	aporcheglow.regX = bounds.width / 2;
	aporcheglow.regY = bounds.height / 2;

	bounds = ajaguar.getBounds();
	ajaguar.regX = bounds.width / 2;
	ajaguar.regY = bounds.height / 2;
	
	bounds = ajaguarreflect.getBounds();
	ajaguarreflect.regX = bounds.width / 2;
	ajaguarreflect.regY = bounds.height / 2;
	
	bounds = ajaguarglow.getBounds();
	ajaguarglow.regX = bounds.width / 2;
	ajaguarglow.regY = bounds.height / 2;

	bounds = alamborghini.getBounds();
	alamborghini.regX = bounds.width / 2;
	alamborghini.regY = bounds.height / 2;
	
	bounds = alamborghinireflect.getBounds();
	alamborghinireflect.regX = bounds.width / 2;
	alamborghinireflect.regY = bounds.height / 2;
	
	bounds = alamborghiniglow.getBounds();
	alamborghiniglow.regX = bounds.width / 2;
	alamborghiniglow.regY = bounds.height / 2;
} // end init

function tick(event)
{
    if (moveFlag == 1)
	{
        ferrariYposBefore = aferrari.y;
        // car positions
        aferrari.x = h + 1.15 * r * Math.cos(theta);
        aferrari.y = k - 0.4 * r * Math.sin(theta);
        aferrarireflect.x = aferrari.x;
        aferrarireflect.y = aferrari.y + 40;
		aferrariglow.x = aferrari.x;
		aferrariglow.y = aferrari.y - 58;
        ferrariYposAfter = aferrari.y;

        porcheYposBefore = aporche.y;
        //				 ^ this alters to make oval shape
        aporche.x = h + 1.15 * r * Math.cos(theta + 1.5);
        aporche.y = k - 0.4 * r * Math.sin(theta + 1.5);
        aporchereflect.x = aporche.x;
        aporchereflect.y = aporche.y + 40;
		aporcheglow.x = aporche.x;
		aporcheglow.y = aporche.y;
        porcheYposAfter = aporche.y;

        jaguarYposBefore = ajaguar.y;
        ajaguar.x = h + 1.15 * r * Math.cos(theta + 3);
        ajaguar.y = k - 0.4 * r * Math.sin(theta + 3);
        ajaguarreflect.x = ajaguar.x;
        ajaguarreflect.y = ajaguar.y + 40;
		ajaguarglow.x = ajaguar.x;
		ajaguarglow.y = ajaguar.y;
        jaguarYposAfter = ajaguar.y;

        lamborghiniYposBefore = alamborghini.y;
        alamborghini.x = h + 1.15 * r * Math.cos(theta + 4.5);
        alamborghini.y = k - 0.4 * r * Math.sin(theta + 4.5);
        alamborghinireflect.x = alamborghini.x;
        alamborghinireflect.y = alamborghini.y + 40;
		alamborghiniglow.x = alamborghini.x;
		alamborghiniglow.y = alamborghini.y;
		lamborghiniYposAfter = alamborghini.y;

        sizeCars();
    console.log("     ferrari X: " + aferrari.x + "ferrari Y:" + aferrari.y + "ferrariglow X" + aferrariglow.x + "     ferrariglow Y: " + aferrariglow.y );
    }
    // place cars and reflections on stage
    stage.addChild(aferrarireflect);
    stage.addChild(aporchereflect);
    stage.addChild(ajaguarreflect);
    stage.addChild(alamborghinireflect);

    stage.addChild(aferrari);
    stage.addChild(aporche);
    stage.addChild(ajaguar);
    stage.addChild(alamborghini);

    // check if animation can continue
    if (moveFlag == 1)
	{
		if(rotationDirection == clockwise)
		{
			theta += step;
			// check if you need to reset plotting of oval 
			if (theta >= 2 * Math.PI)
			{
				theta = 0;
			}
		} 
		else
		{
			theta -= step;
			if(theta <= 0)
			{
				theta = 2 * Math.PI - step;
			}
		}
    }
    stage.update();

//" porche scaleY:"+aporche.scaleY+" jaguar scaleY:"+ajaguar.scaleY+" lamborghini scaleY:"+alamborghini.scaleY);
} // end tick

function handleMouse(event)
{
    switch (event.type)
	{
		case "mouseover":
			moveFlag = 0; // to pause animation
			trackMouseDirection = event.stageX;
			switch (event.target.name)
			{
				case "ferrari": // hilight ferrari
					stage.addChild(aferrariglow);
					break;
				case "porche": // hilight porche
					stage.addChild(aporcheglow);
					break;
				case "jaguar": // hilight jaguar
					stage.addChild(ajaguarglow);
					break;
				case "lamborghini": // hilight lamborghini
					stage.addChild(alamborghiniglow);
			}
			break;
		case "mouseout":
			moveFlag = 1; // resume animation
			switch(event.target.name)
			{
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
			if(trackMouseDirection < event.stageX)
			{
				rotationDirection = anticlockwise;
			}
			else if(trackMouseDirection > event.stageX)
			{
				rotationDirection = clockwise;
			}
			break;
		case "click":
			switch (event.target.name)
			{
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

function handleComplete(event)
{
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
	
    // used to reference objects in mouse handler
    aferrari.name = "ferrari";
    aporche.name = "porche";
    ajaguar.name = "jaguar";
    alamborghini.name = "lamborghini";
	
    // set initial sizes
    aferrari.scaleX = .75; //.75
    aferrari.scaleY = .75; //.75
    aporche.scaleX = .5
    aporche.scaleY = .5
    ajaguar.scaleX = .75; //.75
    ajaguar.scaleY = .75; //.75
    alamborghini.scaleX =  1
    alamborghini.scaleY =  1

    aferrarireflect.scaleX = .75; //.75
    aferrarireflect.scaleY = .75; //.75
    aporchereflect.scaleX = .5
    aporchereflect.scaleY = .5
    ajaguarreflect.scaleX = .75; //.75
    ajaguarreflect.scaleY = .75; //.75
    alamborghinireflect.scaleX =  1
    alamborghinireflect.scaleY =  1
	
	aferrariglow.scaleX = .75;
	aferrariglow.scaleY = .75;
	aporcheglow.scaleX = .5;
	aporcheglow.scaleY = .5;
	ajaguarglow.scaleX = .75;
	ajaguarglow.scaleY = .75;
	alamborghiniglow.scaleX = 1;
	alamborghiniglow.scaleY = 1;


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

    bground.scaleX = .6;
    bground.scaleY = .6;
    stage.addChild(bground);
    abadge.x = 220;
    abadge.y = 120;
    abadge.scaleX = .6;
    abadge.scaleY = .6;
    stage.addChild(abadge);
    createjs.Ticker.addEventListener("tick", tick);
} // end handleComplete

function sizeCars()
{
    // car sizing
    aferrari.scaleX = getSize(ferrariYposBefore, ferrariYposAfter, aferrari.scaleY);
    aferrari.scaleY = aferrari.scaleX;
    aferrarireflect.scaleX = aferrari.scaleX;
    aferrarireflect.scaleY = aferrari.scaleX;
    aferrariglow.scaleX = aferrari.scaleX;
    aferrariglow.scaleY = aferrari.scaleX;
	
    aporche.scaleX = getSize(porcheYposBefore, porcheYposAfter, aporche.scaleY);
    aporche.scaleY = aporche.scaleX;
    aporchereflect.scaleX = aporche.scaleX;
    aporchereflect.scaleY = aporche.scaleX;
    aporcheglow.scaleX = aporche.scaleX;
    aporcheglow.scaleY = aporche.scaleX;

    ajaguar.scaleX = getSize(jaguarYposBefore, jaguarYposAfter, ajaguar.scaleY);
    ajaguar.scaleY = ajaguar.scaleX;
    ajaguarreflect.scaleX = ajaguar.scaleX;
    ajaguarreflect.scaleY = ajaguar.scaleX;
    ajaguarglow.scaleX = ajaguar.scaleX;
    ajaguarglow.scaleY = ajaguar.scaleX;

    alamborghini.scaleX = getSize(lamborghiniYposBefore, lamborghiniYposAfter, alamborghini.scaleY);
    alamborghini.scaleY = alamborghini.scaleX;
    alamborghinireflect.scaleX = alamborghini.scaleX;
    alamborghinireflect.scaleY = alamborghini.scaleX;
    alamborghiniglow.scaleX = alamborghini.scaleX;
    alamborghiniglow.scaleY = alamborghini.scaleX;
} // end sizeCarsUp 

function getSize(posBefore, posAfter, thisSize)
{

    if (posBefore < posAfter && thisSize <= sizeMax)
	{
        thisSize += sizeStep;
    }
	else if (posBefore > posAfter && thisSize >= sizeMin)
	{
        thisSize -= sizeStep;
    }
    return thisSize;
}