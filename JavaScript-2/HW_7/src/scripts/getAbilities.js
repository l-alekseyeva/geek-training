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
