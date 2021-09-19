// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

struct Trade{
    string name;
    string symbol;

    uint256 amountBuy;

    uint256 buyDate;
    uint256 buyPrice;

    uint256 stopLossPrice;

    uint256 sellDate;
    uint256 sellPrice;

}
