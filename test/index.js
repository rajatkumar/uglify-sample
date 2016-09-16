var transform = require('../index.js');
var assert = require('assert');

var sampleCodex = require('./sampleCodex')


transform(sampleCodex, {mangle:true}, function(err){
    if(err){
        console.log("error", err);
    }
    assert.equal(sampleCodex.registry['helloWorld.js'].source.indexOf("\n"),-1)
    console.log("If you see this, the run was successfull, you can verify the transformation:");
    console.log(sampleCodex.registry['helloWorld.js'].source);
})