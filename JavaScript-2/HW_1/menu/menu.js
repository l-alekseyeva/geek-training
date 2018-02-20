function Container() {
  this.id = 'container';
  this.className = 'container';
  this.div = null;
}

Container.prototype.render = function () {
  var div = document.createElement('div');
  div.id = this.id;
  div.className = this.className;
  this.div = div;

  return div;
}

Container.prototype.remove = function remove() {
  if ( this.div != null ) {
    this.div.remove();
    this.div = null;
  }
}

function Menu(id, className, items) {
  Container.call(this);
  this.id = id;
  this.className = className;
  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
  var div = Container.prototype.render.call(this);
  var ul = document.createElement('ul');

  div.appendChild(ul);

  for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {
            ul.appendChild(this.items[i].render());
        }
  }
  // ul.onclick = function removeItem() {
  //     var removed = document.querySelector("ul");
  //     removed.remove("ul");
  // }
  return div;
}

function MenuItem(link, label) {
    Container.call(this);
    this.link = link;
    this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = this.link;
  a.textContent = this.label;
  li.appendChild(a);

  return li;
}

function SubMenu(id, className, label, menu) {
  Container.call(this);
  this.id = id;
  this.className = className;
  this.label = label;
  this.menu = menu;
}

SubMenu.prototype = Object.create(MenuItem.prototype);

SubMenu.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.textContent = this.label;
  var sm = this;
  a.onclick = function () {
    if (sm.menu.div.style.display == "") {
      sm.menu.div.style.display = "none";
    } else {
      sm.menu.div.style.display = "";
    }
  };
  li.appendChild(a);
  li.className = this.className;
  li.id = this.id;

  if (this.menu instanceof Menu) {
      li.appendChild(this.menu.render());
  }
  return li;
}

function AdvancedMenu(id, className, items) {
  Container.call(this);
  this.id = id;
  this.className = className;
  this.items = items;
}

AdvancedMenu.prototype = Object.create(Menu.prototype); 

AdvancedMenu.prototype.render = function () {
  var div = Container.prototype.render.call(this);
  var ul = document.createElement('ul');

  div.appendChild(ul);

  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
        ul.appendChild(this.items[i].render());
    }
  }
  return div;
}
