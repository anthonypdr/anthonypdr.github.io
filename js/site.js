var i = 0;
var h1 = document.getElementById("header-title");
var txt = "I'm a Designer/Developer";
var speed = 50;


function typeWriter() {
  if (i < txt.length) {
    h1.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}