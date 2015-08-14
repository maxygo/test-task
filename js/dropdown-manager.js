function DropdownManager(container, itemTree) {
    var self = this,
        dropdowns = [];

    function init() {
        for (var i = 0; i < itemTree.levels; i++) {
            var dropdown = new Dropdown(i, container, onItemSelect, filterCallback);
            dropdown.render(getItems(itemTree.rootItems, i));
            dropdowns.push(dropdown);
        }
    }

    init();

    function getItems(data, targetLevel, depth) {
        var currentLevel = depth ? depth : 0;

        if (currentLevel == targetLevel) {
            return data;
        }

        var result = [];
        for (var i = 0; i < data.length; i++) {
            result = result.concat(getItems(data[i].items, targetLevel, currentLevel + 1));
        }

        return result;
    }

    function onItemSelect(level, item) {
        if (!item) return;
        var items;
        var nextLevel = level + 1;
        for (var i = nextLevel; i < dropdowns.length; i++) {
            items = getItems(item.items, i, nextLevel);

            var selectedItem = dropdowns[i-1].getSelectedItem();
            if (selectedItem) {
                items = selectedItem.items;
            }
            var items1 = getItems(items, i, i);
            dropdowns[i].filter(((items1) ? items1 : []))
        }
    }

    function filterCallback(level, parentId) {
        if (level === 0) return;

        dropdowns[level - 1].filterItemsByParentId(parentId);
    }

    return this;
}
