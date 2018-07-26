"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const from_schema_1 = require("@gql2ts/from-schema");
const generateSchema_1 = require("./../utils/generateSchema");
const typescriptTypes = from_schema_1.generateNamespace('GQL', generateSchema_1.genSchema());
fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), typescriptTypes, err => {
    console.error(err);
});
//# sourceMappingURL=createTypes.js.map