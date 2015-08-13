/**
 * Created by maximg on 13/08/2015.
 */
describe("Parser", function () {

    function i(id, name) {
        return {
            id: id,
            name: name,
            items: []
        };
    }

    it("parse empty array of items", function () {
        var result = new ItemTree([]);

        expect(result.rootItems).toEqual([]);
        expect(result.levels).toEqual(0);
    });

    it("parse array with one item", function () {
        var result = new ItemTree([{id: 1, name: "first"}]);

        expect(result.rootItems).toEqual([i(1, "first", 1)]);
        expect(result.levels).toEqual(1);
    });

    it("parse array with two items", function () {
        var result = new ItemTree([{id: 1, name: "first"}, {id: 2, name: "second"}]);

        expect(result.rootItems).toEqual([{id: 1, name: "first", items: []}, {id: 2, name: "second", items: []}]);
    });

    it("parse one root with one child", function () {
        var result = new ItemTree([{id: 1, name: "root", parentId: null}, {id: 2, name: "child", parentId: 1}]);

        expect(result.rootItems).toEqual([{id: 1, name: "root", parentId: null, items: [{id: 2, name: "child", parentId: 1, items: []}]}]);
    });
});