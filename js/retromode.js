const htmlnode = document.querySelector("main")
const navnode = document.querySelector("ul")
const footernode = document.querySelector("footer")
const projectnode = document.querySelectorAll(".projectname")

var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];

    if (key == requiredKey) {

      konamiCodePosition++;

      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
});

function activateCheats() {
    htmlnode.style.fontFamily = "vcr"
    navnode.style.fontFamily = "vcr"
    footernode.style.fontFamily = "vcr"

    for(let i = 0; i < projectnode.length; i++) {
      projectnode[i].style.fontSize = "28px"
    }
}