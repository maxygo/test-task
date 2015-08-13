var Dropdown = function() {
    var _level,
        _callback,
        _oContainer,
        _items,
        _oSelect;

    function Dropdown(level, oContainer, callback) {
        _level = level;
        _oContainer = oContainer;
        _callback = callback;
        _items = [];

        _init();
        //Dropdown.prototype.render([]);
    }

    var _getItemById = function (itemId) {
        for (var i = 0; i < _items.length; i++) {
            if (_items[i]['id'] == itemId) {
                return _items[i];
            }
        }
    };

    var _init = function () {
        _oSelect = document.createElement("select");
        _oSelect.id = "dropdown-" + _level;
        _oSelect.options.add( new Option("Not Selected", -1) );
    };

    Dropdown.prototype.clear = function () {
        _items = [];
        _oSelect.disabled = false;

        for (var i = 1; i <= _oSelect.options.length; i++) {
            _oSelect.options[i] = null;
        }
    };

    Dropdown.prototype.render = function (items) {
        this.clear();
        _items = items;

        if (_items.length > 0) {
            for (var i = 0; i < _items.length; i++) {
                _oSelect.options.add( new Option(_items[i]['name'], _items[i]['id']) );
            }
        } else {
            _oSelect.disabled = true;
        }

        var frag = document.createDocumentFragment();

        _oSelect.addEventListener("change", function () {
            var itemId = this.options[this.selectedIndex].value;
            var item = _getItemById(itemId);
            _callback(_level, item);
        });
        frag.appendChild(_oSelect);
        _oContainer.appendChild(frag);
    };

    return Dropdown;
}();

var d = new Dropdown(0, document.querySelector('#app-content'), function (level, item) {console.log(level, item);});
d.render([{id:1, name: 'sdfsdfsdf'}, {id:2, name: 'fsdfsdfsdfsdfsdf'}]);
console.log(d);