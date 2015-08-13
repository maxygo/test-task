function DropdownManager(container, itemTree) {
    var self = this,
        dropdowns = [];

    function init() {
        for (var i = 0; i < itemTree.levels; i++) {
            dropdowns.push(new Dropdown(i, container, onItemSelect));
        }

        dropdowns[0].render(itemTree.rootItems);
    }

    init();

    function onItemSelect(level, item) {
        var nextLevel = level + 1;
        for (var i = nextLevel; i < dropdowns.length; i++) {
            dropdowns[i].render([])
        }
        if (nextLevel < dropdowns.length) {
            dropdowns[nextLevel].render(item.items);
        }
    }

    return this;
}
