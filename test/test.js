var request = require('supertest');
var express = require('express');
var monk = require("monk");

var app = require('../hello.js');

describe('GET /', function() {
  it('respond with plain text', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  })
})

