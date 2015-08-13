function Dropdown(level, containerSelector) {
    this.level = level;
    this._init(containerSelector);
}


Dropdown.prototype._init = function (containerSelector) {
    this.items = [];

    this.container = document.querySelector(containerSelector);

    this.select = document.createElement("select");
    this.select.id = "dropdown-" + this.level;
};

Dropdown.prototype.render = function (items) {
    this.items = items;

    for (var i = 0; i < items.length; i++) {
        this.select.options.add( new Option(items[i]['id'], items[i]['name']) );
    }

    var frag = document.createDocumentFragment();
    this.container.appendChild(frag);
};

Dropdown.prototype.clear = function () {
    this.items = [];
    //this.select.innerHTML = ""; //need to check
};