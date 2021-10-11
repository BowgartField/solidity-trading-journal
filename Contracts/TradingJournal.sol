// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
pragma abicoder v2;

import "../Structs/Trade.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TradingJournal is Ownable{

    address journalOwner;
    Trade[] trades;

    // TODO: Complete event
    event TradeAdded();

    constructor(address _journalOwner){
        journalOwner = _journalOwner;
    }

    function addTrade(Trade memory trade) public onlyOwner{
        trades.push(trade);
    }

    function changeJournalOwner(address _journalOwner, address _newJournalOwner) public onlyOwner{

        // TODO: mettre des require dans la fonction qui va apeller celle-ci

        require(journalOwner == _journalOwner);
        journalOwner = _newJournalOwner;
    }

    // TODO: Add functions which returns the first 25 journals of a use
    function getTrades(string memory _journalName, address _journalOwner) public{
        // TradingJournal(userToJournal[msg.sender][_journalName].journalAddress).getTrades(trade);
    } 
    
}


