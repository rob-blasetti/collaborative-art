// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConditionalPayment {
    address payable public owner;
    uint public endTime;
    bool public criteriaMet = false;
    mapping(address => uint) public deposits;

    constructor(uint _duration) payable {
        owner = payable(msg.sender);
        endTime = block.timestamp + _duration;
    }

    function deposit() external payable {
        require(msg.value > 0, "Must send ether");
        deposits[msg.sender] += msg.value;
    }

    function meetCriteria() external {
        require(msg.sender == owner, "Only the owner can meet the criteria");
        criteriaMet = true;
    }

    function claimPayment() external {
        require(block.timestamp > endTime, "Cannot claim before the end time");
        require(!criteriaMet, "Criteria was met, cannot claim payment");
        
        uint amount = deposits[msg.sender];
        deposits[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function finalizePayment() external {
    require(block.timestamp > endTime, "Cannot finalize before the end time");
    
    if (criteriaMet) {
        owner.transfer(address(this).balance);
    } else {
        deposits[msg.sender] = 0;
        payable(msg.sender).transfer(address(this).balance);
    }
}
}
