$(function(){
 	//load TweenMAx and setupElements
 	loadjsCssFile("http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js",  run.setupElements);
});

var time = 1;
var clickTag = "";

var run = {

	//LOAD IMAGES/SPRITESHEET
	loadSpriteSheet:function(){
		var loadedImages = 0;
		var imageArr = [
			'stamp',
			'spritesheet.png'
			
		];

		preloadImages();

		function preloadImages(){
			for(var i = 0; i<imageArr.length;i++){
				var tempImage = new Image();
				tempImage.src = imageArr[i];
				tempImage.onload = function (){
					trackProgress();
				}
			}
		}

		function trackProgress(){
			loadedImages++;
			if(loadedImages == imageArr.length){
				run.setupElements();
				//console.log('ELEMENTS SET AND LOADED');
			}
		}

	},

	//SETUP ELEMENTS
	setupElements:function(){
		$click = $('.click');//for ClickTag
		$text1 = $('.text1');
		$zucchini = $('.zucchini');
		$text2 = $('.text2');
		$text3 = $('.text3');
		$psst = $('.psst');
		$stamp = $('.stamp');
		$cta = $('.cta');
		$img1 = $('.img1');
		$packShot = $('.pack-shot');

		run.aniOne();//Start animation
	},
	//ANIMATION
	aniOne:function(){

		TweenMax.to($stamp, time - .5, {css:{'backgroundSize':'1890px 1428px'}, ease:Linear.easeOut});
		TweenMax.to($stamp, time - .7, {delay: time + .5, css:{'backgroundSize':'315px 239px'}, ease:Back.easeInOut});
		TweenMax.to($stamp, time - .9, {delay: time + .5, alpha:1, ease:Quad.easeOut, onComplete: run.aniTwo});

	},

	aniTwo:function(){

		TweenMax.to($img1, time - .5, {delay: time * 2, alpha:0, ease:Quad.easeOut});
		TweenMax.to($stamp, time - .5, {delay: time * 2, alpha:0, ease:Quad.easeOut, onComplete: run.aniThree});
	},

	aniThree:function(){

		TweenMax.to($text1, time - .5, {alpha: 1, ease:Linear.easeOut});
		TweenMax.to($zucchini, time - .7, {delay: time, scale:1.2, force3D:true, ease:Linear.easeOut, onComplete: function(){
			TweenMax.to($zucchini, time - .7, {scale:1, force3D:true, ease:Quad.easeOut});
		}});
		TweenMax.to($packShot, time - .5, {delay: time + 3, alpha: 1, ease:Linear.easeOut});
		TweenMax.to($text1, time - .5, {delay: time + 3, alpha: 0, ease:Linear.easeOut, onComplete: run.aniFour});
	},

	aniFour:function(){

		$('.container').addClass('endframe');
		TweenMax.to($stamp, time - .5, {css:{'backgroundSize':'408px 309px'}, ease:Linear.easeOut});
		TweenMax.to($text2, time - .5, {alpha: 1, ease:Linear.easeOut});
		TweenMax.to($stamp, time - .7, {delay: time - .5, css:{'backgroundSize':'136px 103px'}, ease:Back.easeInOut});
		TweenMax.to($stamp, time - .9, {delay: time - .5, alpha:1, ease:Quad.easeOut});
		TweenMax.to($psst, time - .5, {delay: time + .5, alpha: 1, ease:Linear.easeOut});
		TweenMax.to($text3, time - .5, {delay: time + 1, alpha: 1, ease:Linear.easeOut});
		TweenMax.to($cta, time - .5, {delay: time + 1.5, alpha: 1, ease:Linear.easeOut});
	}

};



//LOAD JAVASCRIPT/CSS
function loadjsCssFile(filename,func){//http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
	var filetype = filename.substring(filename.lastIndexOf('.')+1);
	if(filetype == 'js'){
		var fileref = document.createElement('script');
		fileref.setAttribute('src', filename);
	}
	else if(filetype == 'css'){
		var fileref = document.createElement('link');
		fileref.setAttribute('rel','stylesheet');
		fileref.setAttribute('href', filename);
	}
	if(typeof fileref!= 'undefined'){
		if(func){
			if(fileref.readyState){//IE
				fileref.onreadystatechange = function(){
					if(fileref.readyState == "loaded" || fileref.readyState == "complete"){
						fileref.onreadystatechange = null;
						//console.log("THIS WORKS " +func);
						func();
					}
				};
			}
			else{//other browsers
				fileref.onload = function (){
				//console.log("THIS WORKS " +func);
				func();
				}
			}
		}
		document.getElementsByTagName('head')[0].appendChild(fileref);
	}
	//console.log("FILE LOADED = "+filename+" FILE TYPE = "+filetype);
}