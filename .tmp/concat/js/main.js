

var options = {
	
	spacing: 75,
	itemWidth: 200,
	speed: 5,
	acceleration: .05,
	
};

var marquee = new Marquee(document.getElementById('marquee-container'), document.getElementById('marquee-content'), options);

console.log(marquee);
console.log(marquee.containerWidth);


function Marquee(containerElement, contentElement, options){

	var thisMarquee = this;

	this.containerElement = containerElement;
	
	this.contentElement = contentElement;
	
	this.options = options;
	
	this.items = $(contentElement).children();
	
	this.currentSpeed = 0;
	
	this.targetSpeed = 0;
	
	this.scrollPosition = 0
	
	this.defaults = {
		
		spacing: 50,
		itemWidth: 100,
		speed: 1,
		acceleration: .1
	}

	
	if(options)
	{
	
		this.options = options;
		
	}else{
	
		this.options = this.defaults;
		
	}
	
		
	$(this.contentElement).hover(
	
		function()
			{
				thisMarquee.targetSpeed = thisMarquee.options.speed;
				console.log("scroll");
			},
			
			function()
			{
				thisMarquee.targetSpeed = 0;
				console.log("scroll");
			}
	
	)
	
	this.scrollMarquee = function()
		{
			requestAnimationFrame(thisMarquee.scrollMarquee);
			thisMarquee.currentSpeed = thisMarquee.lerp(thisMarquee.currentSpeed, thisMarquee.targetSpeed, thisMarquee.options.acceleration);
			thisMarquee.scrollPosition += thisMarquee.currentSpeed;
			
			if(thisMarquee.scrollPosition >= thisMarquee.totalContentWidth)
				{
				
					thisMarquee.scrollPosition = thisMarquee.scrollPosition - thisMarquee.totalContentWidth;
				
				}
				
			$(thisMarquee.contentElement).css({"-webkit-transform":"translate3d(-"+ thisMarquee.scrollPosition +"px,0,0)"});
				
		}
	
	this.lerp = function(start, end, percent)
		{
		
		
			return (start + percent*(end-start));
		
		}
	
	
	this.__defineGetter__("containerWidth", function(){
		
		return $(this.containerElement).width();
		
	});
	
	this.__defineGetter__("contentWidth", function(){
		
		var contentWidth = 0;
		for(var i = 0 ; i < this.items.length ; i ++)
			{
				contentWidth += $(this.items[i]).width();
			}
		return contentWidth;	
		
	});
	
	this.__defineGetter__("totalContentWidth", function(){
		
		var contentWidth = 0;
		for(var i = 0 ; i < this.items.length ; i ++)
			{
				contentWidth += $(this.items[i]).width();
				contentWidth += this.options.spacing;
			}
		return contentWidth;	
		
	});
	
	this.__defineGetter__("repeatedContentWidth", function(){
		
		var contentWidth = 0;
		
			
		for(var i = 0 ; i < this.repeatingSection.length ; i ++)
			{
				contentWidth += $(this.items[i]).outerWidth(true);
			}
			
		contentWidth += this.totalContentWidth;
		
		return contentWidth;	
		
	});
	
	this.__defineGetter__("repeatingSection", function(){
		
		var repeatingSection = new Array();
		var size = 0; 
		
		for(var i = 0 ; i < this.items.length ; i ++)
			{
				 size += $(this.items[i]).outerWidth(true);
				
				 /*
console.log("SIZE " + size);
				 console.log("CONTAINER WIDTH " + $(this.containerElement).width());
*/
				
				 repeatingSection.push(this.items[i]);
				
				 if(size > $(this.containerElement).width())
				 	{
				 	 break;
					}
			}
			
		return repeatingSection;	
		
	});
	
	this.resize = function()
		{
		
			console.log(this);
			this.contentElement.setAttribute('style', "width:" + this.repeatedContentWidth + "px;");

			

			for(var i = 0 ; i < this.items.length ; i ++)
				{
					if(i == 0)
						{
						
						 this.items[i].setAttribute('style', "margin-right: " + (this.options.spacing/2) + "px;");	
						 
						}else if(i == this.items.length -1)
						{
						
					     this.items[i].setAttribute('style', "margin-left: " + (this.options.spacing/2) + "px;"+
					    									 "margin-right: " + (this.options.spacing) + "px;");
					     
						}else{
						
						 this.items[i].setAttribute('style', "margin-left: " + (this.options.spacing/2) + "px;" +
												   "margin-right: " + (this.options.spacing/2) + "px;");		
					    }		
					    
				}
			
			
			
			for(var j = 0 ; j < this.repeatingSection.length ; j ++)
			{
				console.log(this.repeatingSection[j]);
				
				$(contentElement).append($(this.repeatingSection[j]).clone());
				
			}
			
			this.scrollMarquee();

			
		};
		
		
	this.bindLoadEvents = function()
		{
		
		    		    
		    for(var i = 0 ; i < this.items.length ; i ++)
		    	{
	/*
		    
			    	$(contentChildren[i]).bind("DOMSubtreeModified",function(){
			    	
			    			thisMarquee.update();
			    							  
						});			   
						
*/
						
					var itemChildren = $(this.items[i]).children();
					
					for(var j = 0 ; j < itemChildren.length ; j ++)
						{
							console.log(itemChildren[j]);
							$(itemChildren[j]).on("load",function(){
			    	
					    			console.log("Image loaded");
								});			   
						
									
						} 
						
				}
		
		};

   	this.bindLoadEvents();
	
	
}	


	
	

