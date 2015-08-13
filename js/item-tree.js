function ItemTree(data) {
    var self = this;
    self.levels = 0;

    function parse(parentId, data, levels) {
        var result = [];
        if (levels > self.levels) {
            self.levels = levels;
        }
        for(var i = 0; i < data.length; i++) {
            if (data[i].parentId == parentId) {
                data[i].items = parse(data[i].id, data, levels + 1);
                result.push(data[i]);
            }
        }
        return result;
    }

    self.rootItems = parse(null, data, 0);

    return self;
}