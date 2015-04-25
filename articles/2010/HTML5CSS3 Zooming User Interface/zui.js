// var box = document.createElement('div')
// box.style.border = '5px solid red'
// box.style.position = 'absolute'
// box.style.top = box.style.left = '10px'
// box.style.height = box.style.width = '10px'
// document.body.appendChild(box)

var tx=0,
	ty=0,
	sx=innerWidth/2,
	sy=innerHeight/2,
	mx=innerWidth/2,
	my=innerHeight/2;

var y0 = 0, x0 = 0, 
	x1 = innerWidth, y1 = innerHeight;


var tar;

document.onmousewheel=function(a){
	// console.log(a.wheelDelta, scale)
	// scale = Math.exp(Math.log(scale) + a.wheelDelta / 200)
	
	var s = Math.exp(a.wheelDelta / 500)
	
	x0 = (x0 - mx) * s + mx
	x1 = (x1 - mx) * s + mx

	y0 = (y0 - my) * s + my
	y1 = (y1 - my) * s + my

	// if(Math.min(x1 - x0, y1 - y0) < 20) history.go(-1);
	var scale = (y1-y0)/innerHeight;
	if(scale < 0.05) history.go(-1);

	showTransform();
	a.preventDefault()
};
window.onpopstate=function(a){
	loadPage(a.state.url)
};
function showTransform(){
	// box.style.left = (tx - innerWidth * scale / 2) + 'px'
	// box.style.top = (ty - innerHeight * scale / 2) + 'px'

	// box.style.width = innerWidth * scale + 'px'
	// box.style.height = innerHeight * scale + 'px'

	// box.style.left = x0 + 'px'
	// box.style.top = y0 + 'px'

	// box.style.width = (x1 - x0) + 'px'
	// box.style.height = (y1 - y0) + 'px'

	var s = (y1-y0)/innerHeight; // same as (x1-x0)/innerWidth

	document.body.style.webkitTransform="scale("+s+") translate("+x0/s+"px,"+y0/s+"px)";
	document.body.style.webkitTransformOrigin = "0 0";
	document.body.style.overflow = 'hidden'
	
	// document.body.style.webkitTransform="scale("+scale+") translate("+(innerWidth/2-tx)+"px,"+(innerHeight/2-ty)+"px)";
	// document.body.style.webkitTransformOrigin = mx + "px " + my + "px";

	// var a=document.elementFromPoint(innerWidth/2,innerHeight/2);
	// if(a.nodeName=="A"&&a.offsetWidth*scale>0.3*innerWidth&&a.offsetHeight*scale>0.3*innerHeight){
	// 	console.log("clicky");
	// 	loadPage(a.href);
	// 	history.pushState({url:a.href},a.href,a.href)
	// }

	if(tar && tar.nodeName == 'A' && 1/s < 0.05){
		console.log("clicky");
		loadPage(tar.href);
		history.pushState({url:tar.href},tar.href,tar.href)
	}

} 
function loadPage(a){
	var b=new XMLHttpRequest;
	b.open("get",a,true);
	document.body.innerHTML=''
	b.onload=function(){
		document.body.innerHTML=b.responseText;
		resetParameters()
		showTransform()
	};
	b.send(null);
	resetParameters()
	showTransform()
}
var dragging=false;
document.onmousemove=function(a){
	// a.pageX
	// a.pageY
	// console.log(a.pageX, a.pageY)
	mx = a.pageX
	my = a.pageY
	// tx = a.pageX
	// ty = a.pageY
	// showTransform()
	tar = a.target;

	if(dragging){
		var s = (y1-y0)/innerHeight;
		var dx = (sx-a.pageX),
			dy = (sy-a.pageY);

		x0-=dx;
		x1-= dx;
		y0-= dy;
		y1-=dy;
		sx=a.pageX;
		sy=a.pageY;
		showTransform();
		a.preventDefault();
		a.stopPropagation()
	}
}; 

function resetParameters(){
	tx=0;
	ty=0;
	sx=innerWidth/2;
	sy=innerHeight/2;
	y0 = 0, x0 = 0, 
	x1 = innerWidth;
	y1 = innerHeight;
}
document.onmousedown=function(a){
	dragging=true;
	sx=a.pageX;
	sy=a.pageY;
	a.preventDefault()
};
document.onclick=function(a){
	a.preventDefault()
};
document.onmouseup=function(a){
	dragging=false;
	a.preventDefault()
};