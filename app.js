function Dropdown(level, containerSelector, callback) {
    this.level = level;
    this._init(containerSelector);
    this.callback = callback;
}


Dropdown.prototype._init = function (containerSelector) {
    this.items = [];

    this.container = document.querySelector(containerSelector);

    this.select = document.createElement("select");
    this.select.id = "dropdown-" + this.level;
};

Dropdown.prototype.render = function (items) {
    var self = this;
    this.clear();
    this.items = items;

    for (var i = 0; i < items.length; i++) {
        this.select.options.add( new Option(items[i]['id'], items[i]['name']) );
    }

    var frag = document.createDocumentFragment();
    this.select.addEventListener("change", function () {
        var value = this.options[this.selectedIndex].value;
        self.callback(self.level, value);
    });
    frag.appendChild(this.select);
    this.container.appendChild(frag);
};

Dropdown.prototype.clear = function () {
    this.items = [];

    //for (var i = 0; i < this.select.options.length; i++) {
    //    this.select.options[i] = null;
    //}
};