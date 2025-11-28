// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuckyCard {

    // A fixed list of lucky cards the contract already knows
    string[6] private luckyCards = [
        " Joker of Luck",
        "Ace of Fortune",
        "Dragon's Blessing",
        "Crown of Destiny",
        "Mystic Lottery Legend",
        "Star of Randomness"
    ];

    // Store last drawn card for each user
    mapping(address => string) public lastCard;

    // Function to draw a lucky card (no input needed)
    function drawCard() public {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        );

        uint256 index = randomNumber % luckyCards.length;
        lastCard[msg.sender] = luckyCards[index];  // save result
    }

    // Function to view your last drawn lucky card
    function myLuckyCard() public view returns (string memory) {
        return lastCard[msg.sender];
    }
}
