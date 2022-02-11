# Klaytn-smart-contract-dapp
한양대 X GroundX 강의 정리

klaytn기반의 스마트컨트랙트 &amp; 탈중앙화앱



블록체인이란? 
정보를 블록이라고 하는 단위로 저장하여 저장된 블록들을 체인 형태로 묶은 저장기술

block_0 — block_1 —— block_2 ———  block_3 —— block_4


Rule
1. 하나의 데이터에서 오직 단 하나의 해시가 도출
2. 임의의 데이터 x, y가 있을 때

A . If x == y  then H(x) == H(y)
B. If x != y then H(x) != H(y)
C. If H(x) == H(y) then x == y
 