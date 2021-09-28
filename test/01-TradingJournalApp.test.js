const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { expect } = require("chai");

//Generate random journal's names
const testJournalName = Math.random().toString(36).substr(2, 5);

let tradingJournalApp;
let user;

describe("TradingJournalApp", function() {

    beforeEach(async () => {

        // waiting for contract deployement
        // await deployments.fixture(["TradingJournalApp"]);

       const {tester} = await getNamedAccounts();
       user = tester;

       tradingJournalApp = await ethers.getContract("TradingJournalApp",user)
    
    })

    it("Create a new Journal called " + testJournalName, async function(){
        
        await tradingJournalApp.createJournal(testJournalName);
        
    });

    it("Verify journal exists", async function(){

        const journalExist = await tradingJournalApp.Exists(testJournalName);

        expect(journalExist == true)
    });

    // it("verify trading journal's owner", async function(){});

    it("Add Trade to journal", async function(){

        await tradingJournalApp.addTrade(testJournalName,[
            "Bitcoin","BTC",0,0,0,0,0,0 
        ]);

    });

});