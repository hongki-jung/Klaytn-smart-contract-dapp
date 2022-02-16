pragma solidity ^0.5.6;

// function modifiers
// 함수의 실행 전,후의 성격을 정의
// 대부분의 경우 함수의 실행조건을 정의하는데 사용된다.

contract Ballot{
    constructor() public {chairperson = msg.sender;}
    address chairperson;
    modifier onlyChair{
        requre(msg.sender == chairperson, "Only the chairperson can call this function");
        _;
    }

    function giveRightToVote(address to) public onlyChair{
        //
    }
}

// Event 
// 이벤트는 EVM 로깅을 활용한 시스템
// - 이벤트가 실행될 때마다 트랜잭션 로그에 저장
// - 저장된 로그는 컨트랙트 주소와 연동되어 클라이언트가 RPC로 조회 가능
contract Ballot{    // contract
    event Voted(address voter, uint proposal);
    function vote(uint proposal) public {
        //...
        emit Voted(msg.sender, proposal)
    }
}




 // struct Types
 // solidity에서 제공하지 않는 새로운 형식의 자료를 만들 때 사용
 // - 여러 자료를 묶어 복잡한 자료형(conplex type)을 만들 때 유용

 contract Ballot{
     struct Voter{
         uint weight;
         bool voted;
         address deletgate;
         uint vote;
     }
 }

 contract SocialMedia{
     struct Friend{
         uint id;
         mapping(uint => address) 
     }
 }