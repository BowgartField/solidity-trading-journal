const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { expect, assert } = require("chai");

//Generate random journal's names
const testJournalName = Math.random().toString(36).substr(2, 5);

let tradingJournalApp;
let tradingJournal;
let user;

describe("TradingJournalApp", function() {

    beforeEach(async () => {

        // waiting for contract deployement
        // await deployments.fixture(["TradingJournalApp"]);

       const {tester} = await getNamedAccounts();
       user = tester;

       tradingJournalApp = await ethers.getContract("TradingJournalApp",user)
    
    })

    describe("TradingJournalApp", function(){

        it("Cannot create a new journal with empty name", async () => {

            try{
                await tradingJournalApp.createJournal("");
                assert(false)
            }catch(error){
                assert(true)
            }
    
            // expect(await tradingJournalApp.createJournal("")).to.be.revertedWith("TradingJournalApp::Journal's name cannot be empty")
    
        });
    
        it("Create a journal with name - " + testJournalName, async () => {
            
            await tradingJournalApp.createJournal(testJournalName);
                    
        });
    
        it("Cannot create journal with same name", async function(){
    
            try{
                await tradingJournalApp.createJournal(testJournalName);
                assert(false)
            }catch(error){
                assert(true)
            }
    
            // expect(transac).to.be.revertedWith("TradingJournalApp::Journal already exist");
    
        });
    
        it("Verify journal exists", async function(){
            
            const journalExist = await tradingJournalApp.Exists(testJournalName,user);
            expect(journalExist,true)
    
        });


    });

    describe('TradingJournal', () => {

        it("verify user is the journal's owner", async function(){

            const userJournalStruc = await tradingJournalApp.userToJournal(user,testJournalName);
            const address = userJournalStruc['journalAddress'];
    
            // get deployed contract
            const TradingJournal = await ethers.getContractFactory("TradingJournal",user);
            tradingJournal = await TradingJournal.attach(address);
    
            const owner = await tradingJournal.owner();
    
            expect(owner,user);
    
        });

        it("Add Trade to journal", async function(){

            console.log(tradingJournal)

            await tradingJournal.addTrade(["Bitcoin","BTC",0,0,0,0,0,0]);

            // try{
               
            //     assert(true);
            // }catch(error){
            //     console.log(error);
            //     assert(false);
            // }   
        
        });
        
    });

});