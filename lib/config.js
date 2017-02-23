'use strict';

const configfs = xenon.configFs;

const JSON5 = require('json5');

module.exports.addPackage = function(name) {
    return configfs.readFile("/user.json").then(function(userConfig) {
        var json = JSON5.parse(userConfig);
        if (!json.packages) {
            json.packages = [];
        }
        json.packages.push(name);
        return configfs.writeFile("/user.json", JSON5.stringify(json, null, 4));
    });
};
