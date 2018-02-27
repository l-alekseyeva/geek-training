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

function pokeCard(item, pokeName) {
  var div = document.createElement("div");
  div.className = "cards__poke_card";
  div.id = pokeName;
  var img = document.createElement("img");
  img.id = "Pokemon_" + pokeName;
  var h3 = document.createElement("h3");

  h3.innerText = pokeName;
  img.src = "images/" + (item+1) + ".png";

  mainDiv.appendChild(div);
  div.appendChild(img);
  div.appendChild(h3);

  getAbilities(item+1, pokeName);
}


function getAbilities(pokeNumber, pokeName) {
  var pokeAbilities = new XMLHttpRequest();

  pokeAbilities.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokeNumber +"/", true);

  pokeAbilities.timeout = 100000;
  pokeAbilities.ontimeout = function() {
    if (pokeAbilities.readyState === XMLHttpRequest.DONE) {
      console.log("Time is out for Abilities");
    }
  }

  pokeAbilities.send();

  pokeAbilities.onreadystatechange = function() {
    if (pokeAbilities.readyState === XMLHttpRequest.DONE) {
      if (pokeAbilities.status === 200) {
        var pokeArray = (JSON.parse(pokeAbilities.responseText));

        abilities (pokeName, pokeArray.height, pokeArray.weight);
      }
    }
  }
}

function abilities (pokeName, height, weight) {
  var  card = document.querySelector("#" + pokeName);
  var img = document.querySelector("#Pokemon_" + pokeName);
  var p = document.createElement("p");
  card.onclick = function () {
    if (img.style.display === "") {
      img.style.display = "none";
      p.innerText = "height: " + height + "; " + "weight: " + weight;
      card.appendChild(p);
    } else {
      img.style.display = "";
      card.lastChild.remove();
    }
  }
}

window.onload = sendRequest();
