function Dropdown(level, oContainer, selectCallback, filterCallback) {

    var _level = level,
        _selectCallback = selectCallback,
        _filterCallback = filterCallback,
        _oContainer = oContainer,
        _items = [],
        _oSelect,
        _filteredItems = [];

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

            _selectCallback(_level, item);

            if (!item) return;
            _filterCallback(_level, item.parentId);
        });
        _oSelect.disabled = true;
        _oContainer.appendChild(_oSelect);
    };

    var _clear = function () {
        // Note: clear all excluding 'Not Selected' and selected options
        var length = _oSelect.options.length;
        var selectedIndex = _oSelect.selectedIndex;

        for (var i = length; i >= 1; i--) {
            if (selectedIndex != i) {
                _oSelect.remove(i);
            }
        }
    };

    this.render = function (items) {
        _items = items;
        _oSelect = document.getElementById("dropdown-" + _level);
        _oSelect.disabled = false;
        _clear();

        if (_items.length > 0 && _oSelect.selectedIndex === 0) {
            for (var i = 0; i < _items.length; i++) {
                _oSelect.options.add(new Option(_items[i]['name'], _items[i]['id']));
            }
        }
    };

    this.filterItemsByParentId = function (itemId) {
        var filteredItem;

        for (var i = 0; i < _items.length; i++) {
            if (_items[i]['id'] === itemId) {
                filteredItem = _items[i];
            }
        }

        _filteredItems = [filteredItem];

        _oSelect = document.getElementById("dropdown-" + _level);
        _clear();

        for (var j = 0; j < _items.length; j++) {
            if (filteredItem == _items[j] && this.getSelectedItem() != _items[j] ) {
                _oSelect.options.add(new Option(_items[j]['name'], _items[j]['id']));
            }
        }

        _filterCallback(_level, filteredItem.parentId);
    };

    this.filter = function (items) {
        _oSelect = document.getElementById("dropdown-" + _level);
        _oSelect.disabled = false;
        _clear();

        for (var i = 0; i < items.length; i++) {
            if ((_filteredItems.length == 0 || _filteredItems.indexOf(items[i]) !== -1) && this.getSelectedItem() != items[i] ) {
                _oSelect.options.add(new Option(items[i]['name'], items[i]['id']));
            }
        }
    };

    this.getSelectedItem = function () {
        var itemId = _oSelect.options[_oSelect.selectedIndex].value;
        return _getItemById(itemId);
    };

    this.resetSelectedItem = function() {
        _oSelect.selectedIndex = 0;
    };

    _init();

    return this;
}