function Marquee(containerElement, contentElement, options){

	var thisMarquee = this;

	this.containerElement = containerElement;
	
	this.contentElement = contentElement;
	
	this.scrollRightElement =$(this.containerElement).find('.marquee-scroll.right')[0]
	this.scrollLeftElement =$(this.containerElement).find('.marquee-scroll.left')[0]

		
	this.options = options;
	
	this.items = $(contentElement).children();
	
	this.imagesLoaded = 0;
	
	this.currentSpeed = 0;
	
	this.targetSpeed = options.baseSpeed;
	
	this.scrollPosition = 0
	
	this.defaults = {
		
		spacing: 50,
		speed: 1,
		acceleration: .1,
		baseSpeed: 0
	}

	
	if(options)
	{
	
		this.options = options;
		
	}else{
	
		this.options = this.defaults;
		
	}
	
		
	$(this.scrollRightElement).hover(
	
		function()
			{
				thisMarquee.targetSpeed = thisMarquee.options.speed;
				console.log("scroll");
			},
			
			function()
			{
				thisMarquee.targetSpeed = thisMarquee.options.baseSpeed;
				console.log("scroll");
			}
	
	);
	
	
	
	$(this.scrollLeftElement).hover(
	
		function()
			{
				thisMarquee.targetSpeed = -1*(thisMarquee.options.speed);
				console.log("scroll");
			},
			
			function()
			{
				thisMarquee.targetSpeed = thisMarquee.options.baseSpeed;
				console.log("scroll");
			}
	
	);
	
	this.scrollMarquee = function()
		{
			requestAnimationFrame(thisMarquee.scrollMarquee);
			thisMarquee.currentSpeed = thisMarquee.lerp(thisMarquee.currentSpeed, thisMarquee.targetSpeed, thisMarquee.options.acceleration);
			thisMarquee.scrollPosition += thisMarquee.currentSpeed;
			
			var threshold
			
			if(thisMarquee.scrollPosition >= thisMarquee.resetThreshold)
				{
				    console.log(thisMarquee.scrollPosition + " " + thisMarquee.resetThreshold);
					thisMarquee.scrollPosition = thisMarquee.scrollPosition - thisMarquee.resetThreshold;
				
				}else if(thisMarquee.scrollPosition <= 0)
				{
					
					thisMarquee.scrollPosition = thisMarquee.resetThreshold - thisMarquee.scrollPosition;

					
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
	
	
	this.__defineGetter__("imageElements", function(){
		
		console.log($('#marquee-content img'));
		return $(contentElement).find('img');
		
	});
	
	this.__defineGetter__("resetThreshold", function(){
		
		return thisMarquee.totalContentWidth-(4*thisMarquee.items.length);
		
	});
	
	this.resize = function()
		{
		
			console.log("Resizing");

			

			for(var i = 0 ; i < this.items.length ; i ++)
				{
					if(i == 0)
						{
						
						 this.items[i].setAttribute('style', "margin-right: " + ((this.options.spacing/2)-4) + "px;");	
						 
						}else if(i == this.items.length -1)
						{
						
					     this.items[i].setAttribute('style', "margin-left: " + (this.options.spacing/2) + "px;"+
					    									 "margin-right: " + ((this.options.spacing)-4) + "px;");
					     
						}else{
						
						 this.items[i].setAttribute('style', "margin-left: " + (this.options.spacing/2) + "px;" +
												   "margin-right: " + ((this.options.spacing/2)-4) + "px;");		
					    }		
					    
				}
			
			
			
			for(var j = 0 ; j < this.repeatingSection.length ; j ++)
			{
				console.log(this.repeatingSection[j]);
				
				$(contentElement).append($(this.repeatingSection[j]).clone());
				
			}
			
			console.log(this.repeatedContentWidth);
			
			this.contentElement.setAttribute('style', "width:" + this.repeatedContentWidth + "px;");
			
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
						
					var itemChildren = $(this.items[i]).find('img');
					
					for(var j = 0 ; j < itemChildren.length ; j ++)
						{
							console.log(itemChildren[j]);
							$(itemChildren[j]).on("load",function(){
			    	
					    			console.log("Images total = " + thisMarquee.imageElements.length);
					    			console.log("Images loaded = " + thisMarquee.imagesLoaded);
					    			
					    			thisMarquee.imagesLoaded += 1;
					    			
					    			if(thisMarquee.imagesLoaded == thisMarquee.imageElements.length)
					    				{
						    			
						    				thisMarquee.resize();
						    			
										}
					    			
								});			   
						
									
						} 
						
				}
		
		};

   	this.bindLoadEvents();
	
	
}	
