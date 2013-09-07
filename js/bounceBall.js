//This controls vertical jump
	var e = 0.6;
	
    var canvas, platform, ctx, context;
    var width, height;
    var ball;
	var clickCounter = 0;
            
    function init() {
	   	initStage();
   		setInterval(draw, 20);          
  	}
    
    var initStage = function() {        
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
		canvas.width = canvas.height = 400;
        width = canvas.width;
        height = canvas.height;
		
		platform = document.getElementById("platform");
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
		
        ball = new Ball();
    }
            
    function draw() {    
     	canvas.width = canvas.width;
        ball.update(); 
    }
            
    function degToRad(deg) {
		 return (Math.PI / 180) * deg;
    }
            
    function Ball() {
         var initHeight = height / 2;
		 //This where the ball drops from (top left)
         this.x = 0;
         this.y = 0;
         //velocity x
		 this.vx = 10;
		 //velocity y
         this.vy = 5;
         this.ax = 0;
         this.ay = 1;
		 
         this.radius = 15;
         this.lineWidth = 5;
                
         this.update = function() {
			 this.updatePhysics();
             this.redraw();
         }
                
         this.updatePhysics = function() {
			 this.x += this.vx;
             this.vx += this.ax;
                    
             this.y += this.vy;
             this.vy += this.ay;
                    
             if(this.x - this.radius < 0 || this.x + this.radius > width) {
				 if(this.x - this.radius < 0) {
					 this.x = this.radius;
                  }
				  else {
					  this.x = width - this.radius;
                  }
                  	this.vx *= -1 * e;
				}
             else if(this.y - this.radius < 0 || this.y + this.radius > height) {
				 if(this.y - this.radius < 0) {
					 this.y = this.radius;
                 }
                 else {
					this.y = height - this.radius;
                 }
                        
                 this.vy *= -1 * e;
                 e = e - (e* (initHeight / this.y ) / 10);
             }
        }
                
        this.redraw = function() {
			  ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
			  //Ball will be blue
			  ctx.fillStyle = "#0000FF";
			  ctx.fill();
			  ctx.strokeStyle = ctx.fillStyle;
              ctx.stroke();
			  ctx.closePath();
              ctx.lineWidth = this.lineWidth;
			  
			  //This restarts the entire animation when the ball reaches the horizontal limit of the canvas
			  //Y-value needs to be at least 5 so ball does not interfere with coordinates
			  if(this.vx <= 0 && this.y > 5) {
				  //reload the page at the end of each animation
				  //window.location.reload(false);
			  }
			  
        }
	}
	
		
	
	function restart() {
		ctx.clearRect(0, 0, width, height);
		initStage();
		clickCounter++;
		ball[clickCounter] = new Ball();
		//alert("Ball" + clickCounter + " was created");
		//alert("Ball" + clickCounter + " has a vx of " + ball[clickCounter].vx + " and a vy of " + ball[clickCounter].vy);
		
		ball[clickCounter].x += ball[clickCounter].vx;
		ball[clickCounter].vx += ball[clickCounter].ax;
		ball[clickCounter].y += ball[clickCounter].vy;
		ball[clickCounter].vy += ball[clickCounter].ay;
	}
