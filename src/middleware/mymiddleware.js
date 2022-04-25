
const express = require('express')
const coin_controller = require('../controllers/mycontrollers');
const database = require('../services/database.js');
function status(req, res) {
    res.statusCode = 200; 
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
}

function coin_flip(req, res) {
    var flip = coin_controller.coinFlip();
    res.status(200).json({ "flip": flip });
}
function multiple_coins(req, res, next) {
    const flips = coin_controller.coinFlips(req.body.number);
    const count = coin_controller.countFlips(flips);
    res.status(200).json({ "raw": flips, "summary": count });
}
function number_coin_flip(req, res) {
    let raw = coin_controller.coinFlips(req.params.number);
    let summary = coin_controller.countFlips(raw);
    res.status(200).json({ "raw": raw, "summary": summary });
}
function flip_call(req, res, next) {
    const game = coin_controller.flipACoin(req.body.guess);
    res.status(200).json(game);
}
function head_call(req, res) {
    let heads = coin_controller.flipACoin('heads');
    let call = heads.call;
    let flip = heads.flip;
    let result = heads.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}
function tails_call(req, res) {
    let tails = coin_controller.flipACoin('tails');
    let call = tails.call;
    let flip = tails.flip;
    let result = tails.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}
function guess_flip(req, res, next) {
    const game = coin_controller.flipACoin(req.params.guess);
    res.status(200).json(game);
}

module.exports = {
    flip_call: flip_call,
    head_call: head_call,
    tails_call: tails_call,
    guess_flip: guess_flip,
    status: status,
    multiple_coins: multiple_coins,
    coin_flip: coin_flip,
    number_coin_flip: number_coin_flip,
}
  function db (req, res, next){
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      secure: req.secure,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
    };
    const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser,  logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
   res.status(200).json(info)
    next()
  };
   module.exports = {
    db: db
}