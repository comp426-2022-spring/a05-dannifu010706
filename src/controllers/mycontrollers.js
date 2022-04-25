// The files in this directory contain functions that handle requests coming to different routes
function coinFlip() {
    return Math.random() > .5 ? ("heads") : ("tails")
  }

function coinFlips(flips) {
    var arr = [];
    for(let i =0 ; i<flips;i++){
      arr.push(coinFlip());
    }
   return arr;
  }

  function countFlips(array) {
    let result={};
    array.forEach((item) => { 
      if(result[item]){
        result[item]++;
      }else{
        result[item]=1;
      }
    });
    return result;
   }

   function flipACoin(call) {
  
    const results = {call: '', flip: '', result: ''}
    results.call=call;
    results.flip=coinFlip();
    if(results.call==results.flip){
      results.result="win";
    }
    else{
      results.result="lose";
    }
    return results;
    }
  
 export const coinFlips = coinFlips;
export const flipACoin = flipACoin;
export const countFlips = countFlips;
export const coinFlip = coinFlip;