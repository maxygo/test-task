function Dropdown(level, oContainer, callback) {

    var _level = level,
        _callback = callback,
        _oContainer = oContainer,
        _items = [],
        _oSelect;

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
        _oSelect.options.add(new Option("Not Selected", -1));
        _oSelect.addEventListener("change", function () {
            var itemId = this.options[this.selectedIndex].value;
            var item = _getItemById(itemId);
            _callback(_level, item);
        });
        _oSelect.disabled = true;
        _oContainer.appendChild(_oSelect);
    };

    var _clear = function () {
        // Note: clear all excluding 'Not Selected' option
        while (_oSelect.options.length > 1) {
            _oSelect.remove(1);
        }
    };

    this.render = function (items) {
        _items = items;
        _oSelect = document.getElementById("dropdown-" + _level);
        _oSelect.disabled = false;
        _clear();

        if (_items.length > 0) {
            for (var i = 0; i < _items.length; i++) {
                _oSelect.options.add( new Option(_items[i]['name'], _items[i]['id']) );
            }
        } else {
            _oSelect.disabled = true;
        }
    };

    _init();

    return this;
}
