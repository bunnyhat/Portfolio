// ===========================================================================================================================
//                                                 JAVA SCRIPT FOR IMAGE SHOWCASE
// ===========================================================================================================================
$(function(){
   // See if this is a touch device
   if ('ontouchstart' in window)
   {
      // Set the correct body class
      $('body').removeClass('no-touch').addClass('touch');
     
      // Add the touch toggle to show text
      $('div.boxInner img').click(function(){
         $(this).closest('.boxInner').toggleClass('touchFocus');
      });
   }
});

$(function() {
  var offset = $(".main-menu").offset();
  var topPadding = 15;
    $(window).scroll(function() {
      if ($(window).scrollTop() > offset.top) {
          $(".main-menu").stop().animate({    
              marginTop: $(window).scrollTop() - offset.top + topPadding        
          });    
      } else {    
          $(".main-menu").stop().animate({           
              marginTop: 0           
          });
        }       
    });
});

function alienInvazion() {
	var ele = document.getElementById("toggleDustySpace");
	var text = document.getElementById("displayDustySpace");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Dusty Space";
	}
	else {
		ele.style.display = "block";
		text.innerHTML = "Dusty Space";
	}
}

function ffc() {
	var ele = document.getElementById("toggleFFC");
	var text = document.getElementById("displayFFC");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Fast Food Chain";
	}
	else {
		ele.style.display = "block";
		text.innerHTML = "Fast Food Chain";
	}
}

function lastManBattalion() {
	var ele = document.getElementById("toggleLMB");
	var text = document.getElementById("displayLMB");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Last Man Battalion";
	}
	else {
		ele.style.display = "block";
		text.innerHTML = "Last Man Battalion";
	}
}

function snakes() {
  var ele = document.getElementById("toggleSnake");
  var text = document.getElementById("displaySnake");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Snakes";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "Snakes";
  }
} 

function spaceEscape() {
  var ele = document.getElementById("toggleSpaceEscape");
  var text = document.getElementById("displaySpaceEscape");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Space Escape";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "Space Escape";
  }
}

function iDidNazi() {
  var ele = document.getElementById("toggleIDNTC");
  var text = document.getElementById("displayIDNTC");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "I Did Nazi That Zombie Coming";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "I Did Nazi That Zombie Coming";
  }
}

function tyrant() {
  var ele = document.getElementById("toggleTyrant");
  var text = document.getElementById("displayTryant");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Tyrant";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "Tyrant";
  }
}

function SMB3() {
  var ele = document.getElementById("toggleSMB3");
  var text = document.getElementById("displaySMB3");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "Super Mario Bros. 3";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "Super Mario Bros. 3";
  }
}



function models3D() {
  var ele = document.getElementById("toggleModels");
  var text = document.getElementById("displayModels");

  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "3D Models";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "3D Models";
  }
}