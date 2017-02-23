'use strict';

const ui = xenon.ui;
const fs = xenon.fs;
const utils = require('xenpm-utils');

const config = require('./config');

module.exports = function() {
    return ui.prompt("Package to install:", "", 400, 150).then(function(name) {
        if (!name) {
            return;
        }

        return utils.install(name).then(function() {
            return config.addPackage(name);
        }).then(function() {
            return fs.isConfig();
        }).then(function(isConfig) {
            if (isConfig) {
                fs.reloadFileList();
            }
            return ui.prompt("Package installed successfully!", undefined, 300, 150);
        });
    }).catch(function(err) {
        return ui.prompt(""+err, undefined, 300, 150);
    });
};
