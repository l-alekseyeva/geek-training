var mainDiv = document.querySelector(".cards");
function sendRequest() {
  var pokeRequest = new XMLHttpRequest();

  pokeRequest.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=151", true);
  pokeRequest.timeout = 15000;
  pokeRequest.ontimeout = function() {
    if (pokeRequest.readyState === XMLHttpRequest.DONE) {
      console.log("Time is out.");
    }
  }
  pokeRequest.send();
  pokeRequest.onreadystatechange = function() {
    if (pokeRequest.readyState === XMLHttpRequest.DONE) {
      if (pokeRequest.status === 200) {
        var pokeArray = (JSON.parse(pokeRequest.responseText)).results;
        for (var i = 0; i <= pokeArray.length-1; i++) {
          pokeCard(i, pokeArray[i].name);

        }
      }
    }
  }
}
window.onload = sendRequest();
