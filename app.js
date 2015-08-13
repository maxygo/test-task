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
        _oSelect.addEventListener("change", function () {
            var itemId = this.options[this.selectedIndex].value;
            var item = _getItemById(itemId);
            _callback(_level, item);
        });
        _oContainer.appendChild(_oSelect);
    };

    var _clear = function () {
        // Note: clear all excluding 'Not Selected' option
        while (_oSelect.options.length > 1) {
            _oSelect.remove(1);
        }
    };

    Dropdown.prototype.render = function (items) {
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

    return Dropdown;
}();


var DataManager = {
    data: [],
    levelAmount: 0,
    init: function () {
    },

    getData: function () {
        var data = TestData();
        this.parse(data, 0, null);
    },

    parseFlat: function (parentId, data) {
        var result = [], children = {};
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var parentId = data[i].parentId;
            if (parentId) {
                var items = children[parentId] ? children[parentId] : children[parentId] = [];
                items.push(item)
            } else {
                result.push(item);
            }
        }

        for (var i = 0; i < result.length; i++) {
            result[i].items = children[result[i].id] || [];
        }

        return result;
    },

    parse: function(parentId, data) {
        var result = [];
        for(var i = 0; i < data.length; i++) {
            if (!parentId) {

            }
            if (data[i].parentId == parentId) {
                data[i].items = this.parse(data[i].id, data);
                result.push(data[i]);
            }
        }
        return result;
    }

};
var d = new Dropdown(0, document.querySelector('#app-content'), function (level, item) {console.log(level, item);});
d.render([{id:1, name: '1'}, {id:2, name: '2'}]);
d.render([{id:4, name: '4'}, {id:3, name: '3'}]);
console.log(d);