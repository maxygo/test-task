/**
 * Created by maximg on 13/08/2015.
 */
describe("Parser", function () {
    it("parse empty array of items", function () {
        var result = DataManager.parse(null, []);

        expect(result).toEqual([]);
    });

    it("parse array with one item", function () {
        var result = DataManager.parse(null, [{id: 1, name: "first"}]);

        expect(result).toEqual([{id: 1, name: "first", items: []}]);
    });

    it("parse array with one item", function () {
        var result = DataManager.parse(null, [{id: 1, name: "first"}, {id: 2, name: "second"}]);

        expect(result).toEqual([{id: 1, name: "first", items: []}, {id: 2, name: "second", items: []}]);
    });

    it("parse one root with one child", function () {
        var result = DataManager.parse(null, [{id: 1, name: "root", parentId: null}, {id: 2, name: "child", parentId: 1}]);

        expect(result).toEqual([{id: 1, name: "root", parentId: null, items: [{id: 2, name: "child", parentId: 1, items: []}]}]);
    });

    it()
});