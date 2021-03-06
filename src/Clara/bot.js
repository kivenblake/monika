/**
  * @file the main file the makes everything work
  * @author Capuccino
  * @author Ovyerus
  * @author FiniteReality
  * @copyright Copyright (c) 2017 Capuccino, Ovyerus and the repository contributors.
  * @license MIT
  */

// Imports
const Clara = require(`${__dirname}/lib/Clara`);
const config = require(`${__dirname}/config.json`);

// Globals
global.mainDir = __dirname;
global.utils = require(`${__dirname}/lib/modules/utils`);
global.logger = require(`${__dirname}/lib/modules/Logger`);
global.Promise = require('bluebird');
global.got = require('got');

//bot stuff
const bot = new Clara(config, {
    seedVoiceConnections: true,
    maxShards: config.maxShards || 1,
    latencyThreshold: 420000000,
    defaultImageFormat: 'webp',
    defaultImageSize: 512,
    disableEvents: {
        TYPING_START: true
    }
});

bot.commandsDir = `${__dirname}/cmd`;
bot.unloadedPath = `${__dirname}/data/unloadedCommands.json`;

//Promise configuration
Promise.config({
    warnings: {wForgottenReturn: config.promiseWarnings || false},
    longStackTraces: config.promiseWarnings || false
});

require(`${__dirname}/lib/events`)(bot);
bot.connect();

exports.bot = bot;