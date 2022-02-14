
// Solidity
// - Ethereum/Klaytn에서 지원하는 스마트 컨트랙트 언어
// - Clayton Solidity 버전 0.4.24, 0.5.6 을 지원
// - 일반적인 프로그래밍 언어와 그 문법과 사용이 유사하나 몇가지 제약이 존재
// - e.g, 포인터의 개념이 없기 때문에 recursive type의 선언이 불가능


// Contract = Code + Data

// - solidity 컨트랙트는 코드(함수)와 데이터(상태)로 구성 : 코드는 함수!! 데이터는 상태!!
// - solidity 함수는 코드 안에 변수로 선언된 상태(state)를 변경하거나 불러옴

// Contract SimpleStorage{

// 	uint storedData;
// 	function set(uint x) public{
// 		storedData = x ;
// 	}

// 	function get() public view reutuns (uint){
// 		return storedData;
// 	}

// }

//////////////////////////////////////////////////////////////////////
// carver

// klay.getBlockNumber()
const Caver = require('caver-js');


const caver = new Caver('https://api.baobab.klaytn.net:8651/')


caver.klay.getBlockNumber(
    function(err, blockNumber){
        console.log(blockNumber)
    }
)



// klay.account.wallet
const account = caver.klay.accounts.create();
// in-memory wallet

const wallet = caver.klay.accounts.wallet;

wallet.add(account);
console.log(wallet.length);             // wallet에 저장된 어카운트 갯수를 리턴
console.log(wallet[account.address]);   // 해당 주소를 가지는 어카운트를 불러옴; 없을 경우 undefined
console.log(wallet[0]);                 // 저장된 첫번째 어칸운트를 불러옴; 없을 경우 undefined 




 


// 토큰전송 TX 생성 & 서명

wallet.clear();
wallet.create(2);   // in-memory wallet 초기화 & 어카운트 2개 생성



const tx = {
    type: 'VALUE_TRANSFER', // type, sender, recipient
    from: wallet[0].address,    
    to: wallet[1].address,
    value: caver.utils.toPeb('1', 'KLAY'),  // 1 Klay 전송
    gas: 30000           // tx가 사용할 수 있는 가스 총량
}

// 첫번째 어카운트의 비밀키로 서명
caver.klay.accounts.signTransaction(tx, wallet[0].privateKey).then(console.log("wallet[0].privateKey ",wallet[0].privateKey))




// 서명된 TX 전송 (서명이 되어있어야만 전송가능)

//const tx = {...};
(
    async()=>{
        const signedTransaction = await caver.klay.accounts.signTransaction(tx, sender.privateKey);
        await caver.klay.sendSignedTransaction(signedTransaction.rawTransaction)
            .on('transactionHash', (txhash)=> console.log('hash first', txhash))
            .on('receipt', (receipt) => console.log('receipt later', receipt))
            .on('error', (err)=> console.log('something went wrong'))
    }
)



// 스마트 컨트랙트 배포
// ABI와 bytecode 사용
// 실제로는 트러플 사용
const abi // =  [...];
const contract = new caver.klay.contract(abi);

constract.deploy({data:'6054092309480993432'})
    .send({
        from: wallet[1].address,
        gas: 300000,
        value: 0
    })
    .on('receipt',(receipt)=>{
        console.log('contract deployed at', receipt.contractAddress);
    })




// 스마트 컨트랙트 함수 실행(mutation)
const contract = new caver.klay.Contract(abi, '0x20e199c44768F2C39Cb771D2F96');

contract.methods.set(100)   // SimpleStorage의 set함수를 실행; 상태를 바꾸는 함수이기 때문에 tx로 실행
    .send({
        from : wallet[1].address,
        gas: 30000
    })
    .on('error', (hash) => {})
    .on('transactionHash',(hash)=>{})
    .on('receipt',(receipt)=>{});


    

// 스마트 컨트랙트 함수 실행(constant)
const contract = new caver.klay.Contract(abi, '0x20e199c44768F2C39Cb771D2F96');

contract.methods.get().call(null, (err, result)=>{
    if(err == null){
        console.log(result);
    }else{
        console.error(err);
    }
})
