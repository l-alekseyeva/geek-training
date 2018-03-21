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
