/*
This code is largely based on the example provided at
https://github.com/aatif-naziri/Bouncing-Ball/blob/master/bouncingball-code
*/
	
	//Initial x and y positions of rectangle
	var rectX = rectY = 0;
	//Width & Height of bounding rectangle
    var rectWd = rectHt = 400;
	//Initial x and y co-ordinates for the center of the ball 
    var ballX = ballY = 5;
	//Radius of the ball
    var ballRad = 15;
    //Horizontal velocity
	//Generate a horizontal velocity between -20 and 20
	var ballDisX = Math.floor(Math.random() * 41) - 20;
	//Vertical velocity
	//Generate a vertical velocity between -20 and 20
	var ballDisY = Math.floor(Math.random() * 41) - 20;
	
	var rightBoundary = rectWd + rectX - ballRad;  
    var leftBoundary = rectX + ballRad; 
    var bottomBoundary = rectHt + rectY - ballRad; 
    var topBoundary = rectY + ballRad;  

    var canvas, platform, ctx, context;
	
	function init() {
		canvas = document.getElementById("canvas");
      	ctx = canvas.getContext("2d");
	  	canvas.width = canvas.height = 400;
      	moveBall();
      	setInterval(moveBall, 40);
		
	  	platform = document.getElementById("rigid_body");
	  	context = platform.getContext("2d");
	  	platform.width = 400;
	  	platform.height = 60;
	  
	  	context.font = "1.25em Monospace";
	  	//Font colour
	  	context.strokeStyle = "#000";
	  	context.lineWidth = 0.1;
	  	//Create the 'platform' with text describing what type of body
	  	context.beginPath();
	  	context.fillStyle = "#CCC";
	  	context.rect(0, 0, 400, 60);
	  	context.fill();
	  	context.stroke();
	  	//Fill in the text   
	  	context.fillStyle = "#000";
	  	context.fillText("Rigid Body", platform.width/3, platform.height/2);
		/*Generate random values within specified form range for velocity x and velocity y on initial page load
			and let users control those values from there on in. 
			Alternatively, they could just continue to use randomly generated velocity values by clicking 
			the "View Changes" button without supplying any input themselves.*/
		document.getElementById("velX").value = Number(ballDisX);
		document.getElementById("velY").value = Number(ballDisY);
   }
   
   function moveBall() {
	   //Clear the canvas
	   ctx.clearRect(rectX, rectY, rectWd, rectHt);
	   //Calculates the x and y position of the ball
	   setPosition();
	   ctx.beginPath();
	   //Ball will be blue
       ctx.fillStyle = "#0000FF";
       ctx.arc(ballX, ballY, ballRad, 0, Math.PI*2, true);
       //Draw the ball
	   ctx.fill();
	   //Draws the outline of bounding rectangle
       //ctx.strokeRect(rectX, rectY, rectWd, rectHt);
  }
  
  function setPosition() {
	   var ballNewX = ballX + ballDisX;
       var ballNewY = ballY + ballDisY;
	  
	   //Check if x position goes past the right boundary
       if (ballNewX > rightBoundary) {
		   //Set the new x position of ball to the right boundary of rectangle
           ballNewX = rightBoundary;
		   //Reverse the horizontal the velocity of the ball
           ballDisX = -ballDisX; 
       }
	  
	   //Check if x position goes past the left boundary.
       if (ballNewX < leftBoundary) {
		   //Set the new x position to the left boundary of rectangle
           ballNewX = leftBoundary;
		   //Reverse the horizontal velocity
           ballDisX = -ballDisX;
       }
	  
	   //Check if y position exceeds the bottom boundary.
       if (ballNewY > bottomBoundary) {
		   //Set the new y position to the bottom boundary 
           ballNewY = bottomBoundary;
		   //Reduce the vertical velocity
           ballDisY = -ballDisY;
       }
	  
	   //Check if y position exceeds the top boundary
       if (ballNewY < topBoundary) {
		   //Set the new y position to the top boundary
           ballNewY = topBoundary;
		   //Reduce the vertical velocity
           ballDisY = -ballDisY;
       }
	  
	   //Set the x and y positions of the ball to their new calculated positions
       ballX = ballNewX;
       ballY = ballNewY;
  }

  function change() {
	   //Changes the horizontal and vertical velocity as per user input on the form
	   ballDisX = Number(bouncingBallForm.velX.value);
       ballDisY = Number(bouncingBallForm.velY.value);
       return false;
  }