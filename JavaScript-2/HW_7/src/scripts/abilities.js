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
