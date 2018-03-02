var oneQuote = /'/g;
var wordQuote = /\b"/g;
var doubleQuote = "\"";
var content = document.querySelector(".content");
var btnChange = document.querySelector(".change_text");

btnChange.onclick = function () {
  var text = document.querySelector(".text");
  var findText = text.innerText;
  var changedText = findText.replace(oneQuote, doubleQuote);
  changedText = changedText.replace(wordQuote, "'");
  var newText = document.createElement("div");
  newText.className = "new_text";
  newText.innerText = changedText;
  if (text.style.display == "") {
    text.style.display = "none";
    content.appendChild(newText);
  } else {
    text.style.display = "";
    textToRemove = document.querySelector(".new_text");
    textToRemove.remove();
  }
}

var btnForm = document.querySelector(".fill_form");

btnForm.onclick = function () {
  var fieldset = document.createElement("fieldset");
  var name = document.createElement("input");
  var email = document.createElement("input");
  var phone = document.createElement("input");
  var textArea = document.createElement("textarea");
  var button = document.createElement("button");

  fieldset.id = "form";

  content.appendChild(fieldset);
  fieldset.appendChild(name);
  fieldset.appendChild(phone);
  fieldset.appendChild(email);
  fieldset.appendChild(textArea);
  fieldset.appendChild(button);

  name.id = "name";
  name.placeholder = "Иван Иванов"
  email.id = "email";
  email.placeholder = "mail@yourmail.ru"
  phone.id = "phone";
  phone.placeholder = "+7(000)000-0000";

  button.innerText = "Отправить";
  button.id = "send";
  button.type = "submit";

  document.querySelector("#send").addEventListener("click", function() {
    var nameRegexp = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+$/i;
    var emailRegexp = /^\w+@\w+\.\w+|\w+\.\w+@\w+\.\w+|\w+-\w+@\w+\.\w+$/i;
    var phoneRegexp = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;

    if (!nameRegexp.test(name.value)) {
      name.classList.add("invalid");
    }
    if (!phoneRegexp.test(phone.value)) {
      phone.classList.add("invalid");
    }
    if (!emailRegexp.test(email.value)) {
      email.classList.add("invalid");
    }
  });

  document.location.href = "index.html#" + fieldset.id;
}
