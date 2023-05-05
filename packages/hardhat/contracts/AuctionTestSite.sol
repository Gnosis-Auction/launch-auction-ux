pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract AuctionTestSite {
    address public owner;
    mapping(address => bool) public authorizedUsers;

    event AuthorizedUserAdded(address user);
    event AuthorizedUserRemoved(address user);

    constructor() payable {
        // what should we do on deploy?
        owner = msg.sender;
    }

    function addAuthorizedUser(address user) public onlyOwner {
        require(!authorizedUsers[user], "User is already authorized");
        authorizedUsers[user] = true;
        emit AuthorizedUserAdded(user);
    }

    function removeAuthorizedUser(address user) public onlyOwner {
        require(authorizedUsers[user], "User is not authorized");
        authorizedUsers[user] = false;
        emit AuthorizedUserRemoved(user);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedUsers[msg.sender],
            "Only authorised users can perform this action"
        );
        _;
    }

    // to support receiving ETH by default
    receive() external payable {}

    fallback() external payable {}
}
