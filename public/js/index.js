$(document).ready(function(){
    $(window).bind('scroll', function() {
    var navHeight = $( window ).height() - 85;
          if ($(window).scrollTop() > navHeight) {
              $('.navbar').addClass('fixed-top');
              $(".navbar").css("color", "black");
          }
          else {
              $('.navbar').removeClass('fixed-top');
              $(".navbar").css("color", "black");
          }
     });
 });

// activate scrollspy on sections navigation
$('body').scrollspy({ 
target: '.navbar-nav',
offset: 0
});

// Smooth Scroll, pure Javascript, no library
initSmoothScrolling();

function initSmoothScrolling() {

var duration = 400;

var pageUrl = location.hash ?
 stripHash(location.href) :
 location.href;

delegatedLinkHijacking();
//directLinkHijacking();

function delegatedLinkHijacking() {
 document.body.addEventListener('click', onClick, false);

 function onClick(e) {
   if (!isInPageLink(e.target))
     return;

   e.stopPropagation();
   e.preventDefault();

   jump(e.target.hash, {
     duration: duration,
     callback: function() {
       setFocus(e.target.hash);
     }
   });
 }
}

function directLinkHijacking() {
 [].slice.call(document.querySelectorAll('a'))
   .filter(isInPageLink)
   .forEach(function(a) {
     a.addEventListener('click', onClick, false);
   });

 function onClick(e) {
   e.stopPropagation();
   e.preventDefault();

   jump(e.target.hash, {
     duration: duration,
   });
 }

}

function isInPageLink(n) {
 return n.tagName.toLowerCase() === 'a' &&
   n.hash.length > 0 &&
   stripHash(n.href) === pageUrl;
}

function stripHash(url) {
 return url.slice(0, url.lastIndexOf('#'));
}

function setFocus(hash) {
 var element = document.getElementById(hash.substring(1));

 if (element) {
   if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
     element.tabIndex = -1;
   }

   element.focus();
 }
}

}

function jump(target, options) {
var
 start = window.pageYOffset,
 opt = {
   duration: options.duration,
   offset: options.offset || 0,
   callback: options.callback,
   easing: options.easing || easeInOutQuad
 },
 distance = typeof target === 'string' ?
 opt.offset + document.querySelector(target).getBoundingClientRect().top :
 target,
 duration = typeof opt.duration === 'function' ?
 opt.duration(distance) :
 opt.duration,
 timeStart, timeElapsed;

requestAnimationFrame(function(time) {
 timeStart = time;
 loop(time);
});

function loop(time) {
 timeElapsed = time - timeStart;

 window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

 if (timeElapsed < duration)
   requestAnimationFrame(loop)
 else
   end();
}

function end() {
 window.scrollTo(0, start + distance);

 if (typeof opt.callback === 'function')
   opt.callback();
}

function easeInOutQuad(t, b, c, d) {
 t /= d / 2
 if (t < 1) return c / 2 * t * t + b
 t--
 return -c / 2 * (t * (t - 2) - 1) + b
}

}

const parallax = document.getElementById('parallax');
window.addEventListener("scroll",function(){
    let offset =window.pageYOffset;
    parallax.style.backgroundPositionY = offset+0.7+"px";
})

document.onreadystatechange = function() { 
  if (document.readyState !== "complete") { 
      document.querySelector("body").style.visibility = "hidden"; 
      document.querySelector("#loader").style.visibility = "visible"; 
  } else { 
      document.querySelector("#loader").style.display = "none"; 
      document.querySelector("body").style.visibility = "visible"; 
  } 
}; 
class Cube {
  constructor() {
    console.clear();

    this.scene;
    this.camera;
    this.renderer;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.container = document.getElementById("canvas");

    this.mainCube;
    this.cubes = [];
    this.cubeSize = 10;

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
    50,
    this.innerWidth / this.innerHeight,
    1,
    100);

    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.innerWidth, this.innerHeight);
    this.renderer.setClearColor('#000');
    this.renderer.clear();
    this.container.appendChild(this.renderer.domElement);

    this.resize();
    window.addEventListener("resize", this.resize.bind(this), false);

    this.createScene();
  }

  createScene() {
    this.mainCube = new THREE.Group();

    let cubeGeometry = new THREE.PlaneGeometry(
    this.cubeSize,
    this.cubeSize,
    1,
    1);

    let rectangleGeometry = new THREE.PlaneGeometry(
    this.cubeSize,
    this.cubeSize * 3,
    1,
    1);

    let material = new THREE.MeshBasicMaterial({
      color: '#fff',
      transparent: true });


    this.middleCube = new THREE.Mesh(cubeGeometry, material);
    this.cubes.push(this.middleCube);

    this.topCube = new THREE.Mesh(cubeGeometry, material);
    this.cubes.push(this.topCube);

    this.bottomCube = new THREE.Mesh(cubeGeometry, material);
    this.cubes.push(this.bottomCube);

    this.leftRectangle = new THREE.Mesh(rectangleGeometry, material);
    this.cubes.push(this.leftRectangle);

    this.rightRectangle = new THREE.Mesh(rectangleGeometry, material);
    this.cubes.push(this.rightRectangle);

    for (let cube of this.cubes) {
      this.mainCube.add(cube);
    }

    this.scene.add(this.mainCube);
    this.resetPositions();

    this.animate();
  }

  resetPositions() {
    this.topCube.position.y = this.cubeSize * 20;
    this.bottomCube.position.y = -this.cubeSize * 20;

    this.leftRectangle.position.x = -this.cubeSize * 20;
    this.rightRectangle.position.x = this.cubeSize * 20;

    this.mainCube.scale.set(1, 1, 1);
    this.mainCube.rotation.z = 0;

    this.animateCubes();
  }

  animateCubes() {
    TweenMax.to(this.topCube.position, 0.5, {
      y: this.cubeSize,
      ease: Power2.easeOut });


    TweenMax.to(this.bottomCube.position, 0.5, {
      y: -this.cubeSize,
      ease: Power2.easeOut });


    TweenMax.to(this.rightRectangle.position, 0.5, {
      x: this.cubeSize,
      delay: 0.5,
      ease: Power2.easeOut });


    TweenMax.to(this.leftRectangle.position, 0.5, {
      x: -this.cubeSize,
      delay: 0.5,
      ease: Power2.easeOut });


    TweenMax.to(this.mainCube.scale, 1, {
      x: 1 / 3,
      y: 1 / 3,
      z: 1 / 3,
      delay: 1,
      ease: Power2.easeInOut });


    TweenMax.to(this.mainCube.rotation, 1, {
      z: -Math.PI / 180 * 360 * 1.5,
      delay: 1,
      ease: Power2.easeInOut,
      onComplete: this.resetPositions.bind(this) });

  }

  animate() {
    this.render();
  }

  render() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.camera.aspect = this.innerWidth / this.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.innerWidth, this.innerHeight);
  }}


let experience = new Cube();