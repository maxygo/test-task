function Dropdown(level, containerSelector, callback) {
    this.level = level;
    this.callback = callback;
    this._init(containerSelector);

    this.getItemById = function (itemId) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i]['id'] === itemId) {
                return this.items[i];
            }
        }
    };
}


Dropdown.prototype._init = function (containerSelector) {
    this.items = [];
    this.container = document.querySelector(containerSelector);

    this.select = document.createElement("select");
    this.select.id = "dropdown-" + this.level;
    this.select.options.add( new Option(-1, "Not Selected") );
};

Dropdown.prototype.render = function (items) {
    var self = this;
    this.clear();
    this.items = items;

    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            this.select.options.add( new Option(items[i]['id'], items[i]['name']) );
        }
    } else {
        this.select.disabled = true;
    }

    var frag = document.createDocumentFragment();

    this.select.addEventListener("change", function () {
        var itemId = this.options[this.selectedIndex].value;
        var item = self.getItemById(itemId);
        self.callback(self.level, item);
    });
    frag.appendChild(this.select);
    this.container.appendChild(frag);
};

Dropdown.prototype.clear = function () {
    this.items = [];
    this.select.disabled = false;

    for (var i = 1; i <= this.select.options.length; i++) {
        this.select.options[i] = null;
    }
};