const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const client = require('@sendgrid/mail');
require('dotenv').config();

const generateform = (req, res, next) => {
    const user = req.userPDF;
    const order = req.orderPDF;
    
};
  