var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
export var findOneListingQuery = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query FindOneListingQuery($id: String!) {\n    findOneListing(id: $id) {\n      id\n      name\n      shortLink\n      latitude\n      longitude\n      description\n      category\n      price\n      beds\n      guests\n      pictureUrl\n      owner {\n        id\n        email\n      }\n    }\n  }\n"], ["\n  query FindOneListingQuery($id: String!) {\n    findOneListing(id: $id) {\n      id\n      name\n      shortLink\n      latitude\n      longitude\n      description\n      category\n      price\n      beds\n      guests\n      pictureUrl\n      owner {\n        id\n        email\n      }\n    }\n  }\n"])));
var FindOneListing = /** @class */ (function (_super) {
    __extends(FindOneListing, _super);
    function FindOneListing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindOneListing.prototype.render = function () {
        var _a = this.props, children = _a.children, listingId = _a.listingId;
        return (React.createElement(Query, { query: findOneListingQuery, variables: { id: listingId } }, function (_a) {
            var data = _a.data, loading = _a.loading;
            var listing = null;
            if (data && !loading && data.findOneListing) {
                listing = data.findOneListing;
            }
            return children({
                listing: listing,
                loading: loading,
            });
        }));
    };
    return FindOneListing;
}(React.PureComponent));
export { FindOneListing };
var templateObject_1;
//# sourceMappingURL=index.js.map