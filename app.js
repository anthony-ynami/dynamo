
var express = require('express');
var handlebars = require('express-handlebars');
const path = require('path');
var MusixmatchApi = require('../../build/javascript-client/src/index')
var defaultClient = MusixmatchApi.ApiClient.instance;
var key = defaultClient.authentications['key'];


key.apiKey = "c8b3b1c0f05958773f39d19134e7a7d8"; // {String} 
var opts = {
    format: "json", // {String} output format: json, jsonp, xml.
};
trackId= 15445219; // {number}
(new MusixmatchApi.TrackApi()).trackGetGet(trackId, opts, (error, data, response) => {
    if (error) {
        console.error(error);
    } else if(response.text) {
        data = JSON.parse(response.text);
        console.log('Returned data:\n%s' ,JSON.stringify(data,null,2));
    }
    else {
        throw new Error('bad response')   
    }
} );