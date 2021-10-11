// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TradingJournal.sol";
import "../Structs/UserJournal.sol";

contract TradingJournalApp is Ownable {
    // Associate journals to user, and journal's name to address
    mapping(address => mapping(string => UserJournal)) public userToJournal;

    // EVENTS
    event JournalCreated(address journalAddress, address creator, string Name);

    function Exists(string memory _journalName, address _journalOwner) public view returns(bool exists){
        return userToJournal[_journalOwner][_journalName].initialized;
    } 

    function createJournal(string memory _JournalName) public returns(address newJournalAddress){
        require(bytes(_JournalName).length != 0,"TradingJournalApp::Journal's name cannot be empty");
        require(!Exists(_JournalName,msg.sender),"TradingJournalApp::Journal already exist");

        // Create new journal for user
        TradingJournal tradingJournal = new TradingJournal(msg.sender);
        address newTradingJournalAddr = address(tradingJournal); 
        
        UserJournal storage newUserJournal = userToJournal[msg.sender][_JournalName];

        newUserJournal.initialized = true;
        newUserJournal.journalAddress = newTradingJournalAddr;

        tradingJournal.transferOwnership(msg.sender);

        emit JournalCreated(newTradingJournalAddr,msg.sender,_JournalName);

        return newTradingJournalAddr;
        
    }

}