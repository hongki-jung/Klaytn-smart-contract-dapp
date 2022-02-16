pragma solidity ^0.5.6;

contract Count{

    // state variables 
    

    // 1) 블록체인에 영구히 저장할 값들은 상태변수(state variable)로 선언한다
    // - 어떤 값들은 반드시 state variable로 선언되어야 함( e.g, mapping)
    // => 블록체인에 기록되는 값

    // 2) public 키워드를 사용하여 변수를 외부에 노출할 수 있다
    // 이 경우 자동으로 해당 변수 값을 돌려주는 getter함수가 생성됨
    // => 외부에 노출 . getter 함수 자동 생성

    unit public count = 0;

    address public lastParticipant;



    // function 
    // 함수는 실행 가능한 코드를 정의한 것이다
    // external, public, internal, private 중 하나로 visibility를 설정할 수 있다.
    // payable, view, pure 등 함수의 유형을 정의 가능 

    function plus() public{
        count++;
        lastParticipant = msg.sender;
    }

    function minus() public{
        count--;
        lastParticipant = msg.sender
    }
}


