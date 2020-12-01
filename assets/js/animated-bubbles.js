  // requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
			|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
			|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/* -------------------------------------------- Bubble Animations */

// Source: http://tympanus.net/codrops/2014/09/23/animated-background-headers/

(function() {

	var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

	// Main
	initHeader();

	function initHeader() {

		largeHeader = $('#animated-banner');

		width = window.innerWidth;
		height = largeHeader.outerHeight();
		target = {x: 0, y: height};
      
	    if(largeHeader.length > 0){
          largeHeader.append('<canvas id="bubbles" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%;" width="1348" height="214"></canvas>');
        
          canvas = document.getElementById('bubbles');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');

          // create particles
          circles = [];
          for(var x = 0; x < width * 0.05; x++) {
              var c = new Circle();
              circles.push(c);
          }
          addListeners();
		animate();
        }
	}

	// Event handling
	function addListeners() {
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function scrollCheck() {
		if(document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if(animateHeader) {
			ctx.clearRect(0,0,width,height);
			for(var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	// Canvas manipulation
	function Circle() {
		var _this = this;

		// constructor
		(function() {
			_this.pos = {};
			init();
		})();

		function init() {
			_this.pos.x = Math.random()*width;
			_this.pos.y = height+Math.random()*100;
			_this.alpha = 0.1+Math.random()*0.3;
			_this.scale = 0.2+Math.random()*0.3;
			_this.velocity = Math.random();
		}

		this.draw = function() {
			if(_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
			//ctx.fillStyle = 'rgba(0, 168, 235,'+ _this.alpha+')';
			ctx.fillStyle = 'rgba(71, 199, 238,'+ _this.alpha+')';
			ctx.fill();
		};
	}

})();