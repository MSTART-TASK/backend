'use strict';
const { configSequelize } = require("./src/Model");
const { Start } = require("./src/server");
const port = process.env.PORT || 4000

require('dotenv').config

configSequelize.sync({ alter: true }).then(() => {
     Start(port)
}).catch(err => {
     console.log(err.message);
})

