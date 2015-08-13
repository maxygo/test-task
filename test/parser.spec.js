/**
 * Created by maximg on 13/08/2015.
 */
describe("Parser", function () {

    function i(parentId, id, name, items) {
        return {
            parentId: parentId,
            id: id,
            name: name,
            items: items || []
        };
    }

    it("parse empty array of items", function () {
        var result = new ItemTree([]);

        expect(result.rootItems).toEqual([]);
        expect(result.levels).toEqual(0);
    });

    it("parse array with one item", function () {
        var result = new ItemTree([{id: 1, name: "first", parentId: null}]);

        expect(result.rootItems).toEqual([i(null, 1, "first")]);
        expect(result.levels).toEqual(1);
    });

    it("parse array with two items", function () {
        var result = new ItemTree([{id: 1, name: "first"}, {id: 2, name: "second"}]);

        expect(result.rootItems).toEqual([{id: 1, name: "first", items: []}, {id: 2, name: "second", items: []}]);
        expect(result.levels).toEqual(1);
    });

    it("parse one root with one child", function () {
        var result = new ItemTree([{id: 1, name: "root", parentId: null}, {id: 2, name: "child", parentId: 1}]);

        expect(result.rootItems).toEqual([{id: 1, name: "root", parentId: null, items: [{id: 2, name: "child", parentId: 1, items: []}]}]);
        expect(result.levels).toEqual(2);
    });

    it("parse three level hierarchy", function () {
        var result = new ItemTree([
            {id: 1, name: "first", parentId: null},
            {id: 2, name: "second", parentId: 1},
            {id: 3, name: "third", parentId: 2}
        ]);

        expect(result.rootItems).toEqual([
            i(null, 1, "first",
                [i(1, 2, "second",
                    [i(2, 3, "third")])])
        ]);
        expect(result.levels).toEqual(3);
    })
});