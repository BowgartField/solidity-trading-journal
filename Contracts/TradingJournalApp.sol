// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TradingJournal.sol";
import "../Structs/UserJournal.sol";

contract TradingJournalApp is Ownable {
    // Associate journals to user, and journal's name to address
    mapping(address => mapping(string => UserJournal)) public userToJournal;

    event JournalCreated(address journalAddress, address creator, string Name);
    // TODO: Complete event
    event TradeAdded();

    function Exists(string memory _journalName) public view returns(bool exists){
        // TODO: add address to parameters -> allow to check journals of others
        return userToJournal[msg.sender][_journalName].initialized;
    }

    function createJournal(string memory _JournalName) public {
        require(bytes(_JournalName).length != 0,"TradingJournalApp::Journal's name cannot be empty");
        require(!Exists(_JournalName),"TradingJournalApp::Journal already exist");

        // Create new journal for user
        address newTradingJournalAddr = address(new TradingJournal(msg.sender)); 
        
        UserJournal storage newUserJournal = userToJournal[msg.sender][_JournalName];

        newUserJournal.initialized = true;
        newUserJournal.journalAddress = newTradingJournalAddr;

        emit JournalCreated(newTradingJournalAddr,msg.sender,_JournalName);
        
    }

    function addTrade(string memory _journalName, Trade memory trade) public {
        require(Exists(_journalName),"TradingJournalApp::Journal don't exist");

        TradingJournal(userToJournal[msg.sender][_journalName].journalAddress).addTrade(trade);

        emit TradeAdded();

    }

    // TODO: Add function which return the first 25 trades from a journal
    // TODO: Add functions which returns the first 25 journals of a user
}
