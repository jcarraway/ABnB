var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
export var searchListingsQuery = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query SearchListingsQuery(\n    $input: SearchListingsInput\n    $offset: Int!\n    $limit: Int!\n  ) {\n    searchListings(input: $input, offset: $offset, limit: $limit) {\n      id\n      name\n      shortLink\n      latitude\n      longitude\n      description\n      category\n      price\n      beds\n      guests\n      pictureUrl\n      owner {\n        id\n        email\n      }\n    }\n  }\n"], ["\n  query SearchListingsQuery(\n    $input: SearchListingsInput\n    $offset: Int!\n    $limit: Int!\n  ) {\n    searchListings(input: $input, offset: $offset, limit: $limit) {\n      id\n      name\n      shortLink\n      latitude\n      longitude\n      description\n      category\n      price\n      beds\n      guests\n      pictureUrl\n      owner {\n        id\n        email\n      }\n    }\n  }\n"])));
var SearchListings = /** @class */ (function (_super) {
    __extends(SearchListings, _super);
    function SearchListings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchListings.prototype.render = function () {
        var _a = this.props, children = _a.children, variables = _a.variables;
        return (React.createElement(Query, { query: searchListingsQuery, variables: variables }, function (_a) {
            var data = _a.data, loading = _a.loading, fetchMore = _a.fetchMore;
            var listings = [];
            if (data && !loading && data.searchListings) {
                listings = data.searchListings;
            }
            var hasMoreListings = listings.length % variables.limit === 0;
            if (listings.length <= variables.offset) {
                hasMoreListings = false;
            }
            return children({
                listings: listings,
                loading: loading,
                hasMoreListings: hasMoreListings,
                loadMore: function () {
                    fetchMore({
                        variables: __assign({}, variables, { offset: listings.length }),
                        updateQuery: function (prev, _a) {
                            var fetchMoreResult = _a.fetchMoreResult;
                            if (!fetchMoreResult) {
                                return prev;
                            }
                            return __assign({}, prev, { searchListings: prev.searchListings.concat(fetchMoreResult.searchListings) });
                        },
                    });
                },
            });
        }));
    };
    return SearchListings;
}(React.PureComponent));
export { SearchListings };
var templateObject_1;
//# sourceMappingURL=index.js.map