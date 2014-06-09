

var options = {
	
	spacing: 10,
	speed: 5,
	acceleration: .05,
	baseSpeed: .2
	
};

var marquees = new Array();


var marqueeElements = document.getElementsByClassName('marquee-container');

console.log(marqueeElements);

for(var j = 0 ; j < marqueeElements.length ; j ++)
{
	var content;

	for (var i = 0; i < marqueeElements[j].childNodes.length; i++) {
	    if (marqueeElements[j].childNodes[i].className == "marquee-content") 
		    {
		      content = marqueeElements[j].childNodes[i];
		      break;
		    }    
		}

    var newMarquee = new Marquee(marqueeElements[j], content, options);
    marquees.push(newMarquee);

}







	
	

