
const Caver = require('caver-js');


const caver = new Caver('https://api.baobab.klaytn.net:8651/')


caver.klay.getBlockNumber(
    function(err, blockNumber){
        console.log(blockNumber)
    }
)

