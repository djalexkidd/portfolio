const radio = document.getElementsByName('isgame')
const inputContainer = document.querySelector('.newgame')

for (var i = 0; i < radio.length; ++i) {
    radio[i].onclick = function() {
      if (this.value == "game") {
        inputContainer.style.display = "block"
      } else {
        inputContainer.style.display = "none"
      }
    }
}