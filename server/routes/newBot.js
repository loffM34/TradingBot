const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserData = require("../mongo");

router.post("/", async (req, res) => {
  const user_email = req.body.user_email;
  const bot_name = req.body.bot_name;
  const alpaca_endpoint = req.body.alpaca_endpoint;
  const alpaca_key = req.body.alpaca_key;
  const alpaca_secret = req.body.alpaca_secret;
  const stock_symbol = req.body.stock_symbol;
  const trading_strat = req.body.trading_strat;
  const start_cash = req.body.start_cash;
  const risk_percentage = req.body.risk_percentage;
  const trade_profit_order = req.body.trade_profit_order;

  try {
    const user = await UserData.findOne({ email: user_email });
    var botNameTaken = false;
    for (let i = 0; i < user.userBots.length; i++) {
      if (user.userBots[i].botName == bot_name) {
        botNameTaken = true;
        break;
      }
    }

    if (botNameTaken) {
      res.json({ status: "name taken" });
      return;
    } else {
      res.json({ status: "name avaiable" });
    }

    await user.updateOne({
      $push: {
        userBots: {
          botName: bot_name,
          alpacaEndpoint: alpaca_endpoint,
          alpacaKey: alpaca_key,
          alpacaSecret: alpaca_secret,
          stockSymbol: stock_symbol,
          tradingStrat: trading_strat,
          startCash: start_cash,
          riskPercent: risk_percentage,
          tradeProfitOrder: trade_profit_order,
        },
      },
    });
    console.log("successfully added");
  } catch (error) {
    console.error(error);
  }

  //find the user and add array of objects if not already exisiting and then create add a new bot with parameters into the file
});

module.exports = router;
