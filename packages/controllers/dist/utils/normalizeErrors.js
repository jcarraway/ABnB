export var normalizeErrors = function (errors) {
    var errMap = {};
    // only displays the last error for now
    errors.forEach(function (err) {
        errMap[err.path] = err.message;
    });
    return errMap;
};
//# sourceMappingURL=normalizeErrors.js.map