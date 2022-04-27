// This directory contains general utilities that you can use as helper functions throughout other scripts
module.exports = {
  coinFlip: () => {
    let flip = Math.random();
   
    if (flip < 0.5) {
      return "heads";
    }
    return "tails";
  },

  coinFlips: (flips) => {
    var arr = [];
    for (let i = 0; i < flips; i++) {
      let coin = module.exports.coinFlip();
      arr.push(coin);
    }
    return arr;
  },

  countFlips: (array) => {
    let heads = 0;
    let tails = 0;
    let counter = { heads, tails };
    let counterHeads = { heads };
    let counterTails = { tails };
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        heads++;
      } else {
        tails++;
      }
    }
    if (heads > 0 && tails > 0) {
      counter.heads = heads;
      counter.tails = tails;
      return counter;
    } else if (heads > 0 && tails == 0) {
      counterHeads.heads = heads;
      return counterHeads;
    } else {
      counterTails.tails = tails;
      return counterTails;
    }
  },

  flipACoin: (call) => {
    if (call == "heads" || call == "tails") {
      let result1 = { call: call, flip: "", result: "" };
      let coinF = module.exports.coinFlip();
      let result = "";
      if (call == coinF) {
        result = "win";
      } else {
        result = "lose";
      }
      result1.flip = coinF;
      result1.result = result;
      return result1;
    }
  },
};