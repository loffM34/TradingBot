import "../styles/newBotModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { createNewBot } from "../scripts/botScripts";
import { getAuthContext } from "../scripts/authContext";

function NewBotModal({ closeModal }) {
  const userEmail = getAuthContext().email;
  const [botName, setBotName] = useState("");
  const [alpacaEndpoint, setAlpacaEndpoint] = useState("");
  const [alpacaKey, setAlpacaKey] = useState("");
  const [alpacaSecret, setAlpacaSecret] = useState("");
  const [tradingStrategy, setTradingStrategy] = useState("");
  const [cashRiskPercentage, setCashRiskPercentage] = useState("");
  const [tradeProfitOrder, setTradeProfitOrder] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("");

  var validSymbol = /^[A-Z]+$/.test(stockSymbol);
  var validRisk =
    parseFloat(cashRiskPercentage) > 0 && parseFloat(cashRiskPercentage) <= 100;
  var validProfitOrder = parseFloat(tradeProfitOrder) > 0;

  async function handleStockSearch(query) {
    try {
      const response = await fetch(
        "http://localhost:9000/GetStocks?query=" + query
      );
      if (!response.ok) {
        console.error("Failed to search Stocks");
        setSearchResults([]);
        return;
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("error searching stocks: ", error);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;
    if (query) {
      handleStockSearch(query);
    }
  }

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div className="title">
            <h1> Create New Bot</h1>
          </div>
          <div className="body">
            <div className="bot-name-input">
              <input
                type="text"
                required
                className="form-control"
                placeholder="Bot Name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
            </div>
            <div className="alpaca-info-input">
              <h3>Alpaca Info</h3>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Endpoint"
                value={alpacaEndpoint}
                onChange={(e) => setAlpacaEndpoint(e.target.value)}
              />
              <input
                type="text"
                required
                className="form-control"
                placeholder="Alpaca Key"
                value={alpacaKey}
                onChange={(e) => setAlpacaKey(e.target.value)}
              />
              <input
                type="text"
                required
                className="form-control"
                placeholder="Alpaca Secret"
                value={alpacaSecret}
                onChange={(e) => setAlpacaSecret(e.target.value)}
              />
            </div>
            <h3>Trading Info</h3>
            <div className="stockInformation">
              <label className="stockSearchLabel">
                Stock Search <i className="bi bi-info-circle-fill"></i>
                <span className="infoTooltip">
                  Type a stock symbol of your choice, click the search button
                  and then click the search bar to select a symbol from the
                  dropdown
                </span>
              </label>
              <div className="stock-input"></div>
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="text"
                  name="searchQuery"
                  placeholder="Search for a stock"
                  list="stockOptions"
                  value={stockSymbol.toLowerCase()}
                  style={{
                    borderColor:
                      /^[A-Z]+$/.test(stockSymbol) || stockSymbol.length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      /^[A-Z]+$/.test(stockSymbol) || stockSymbol.length == 0
                        ? "1px"
                        : "2px",
                  }}
                  onChange={(e) => setStockSymbol(e.target.value)}
                  autoComplete="off"
                />
                <datalist id="stockOptions">
                  <option hidden>Select a stock</option>
                  {searchResults.map((result, index) => (
                    <option
                      className="drop-item"
                      key={index}
                      value={result.ticker}
                    >
                      {result.ticker}
                    </option>
                  ))}
                </datalist>
                <button
                  className="btn btn-outline-success"
                  id="searchButton"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <div className="trading-strategy-input">
                <label>
                  Strategy <i className="bi bi-info-circle-fill"></i>
                  <span className="infoTooltip">
                    choose your bot's trading strategy which will determine how
                    many transactions they make daily
                  </span>
                </label>
                <select
                  className="form-control"
                  value={tradingStrategy}
                  onChange={(e) => setTradingStrategy(e.target.value)}
                >
                  <option hidden>
                    Trading Strategy <i className="bi bi-list"></i>
                  </option>
                  <option value="dayTrader">Day Trader</option>
                  <option value="intermediateTrader">
                    Intermediate Trader
                  </option>
                  <option value="longTermTrader">Long Term Trader</option>
                </select>
              </div>
              {/* <div className="starting-cash-input">
                <label>Starting Amount:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Starting Amount"
                  min="5"
                  max="1000000"
                  style={{
                    borderColor:
                      parseFloat(startingAmount) > 0 ||
                      startingAmount.length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      parseFloat(startingAmount) > 0 ||
                      startingAmount.length == 0
                        ? "1px"
                        : "2px",
                  }}
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                />
              </div> */}
              <div className="risk-percent-input">
                <label>
                  Cash Risk Percentage{" "}
                  <i className="bi bi-info-circle-fill"></i>
                  <span className="infoTooltip">
                    Cash Risk Percentage is the percent of your cash your bot is
                    able to trade with each transaction
                  </span>
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Cash Risk Percentage"
                  min="1"
                  max="100"
                  style={{
                    borderColor:
                      (parseFloat(cashRiskPercentage) > 0 &&
                        parseFloat(cashRiskPercentage) <= 100) ||
                      cashRiskPercentage.length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      (parseFloat(cashRiskPercentage) > 0 &&
                        parseFloat(cashRiskPercentage) <= 100) ||
                      cashRiskPercentage.length == 0
                        ? "1px"
                        : "2px",
                  }}
                  value={cashRiskPercentage}
                  onChange={(e) => setCashRiskPercentage(e.target.value)}
                />
              </div>
              <div className="trade-profit-order-input">
                <label>
                  Trade Profit Order <i className="bi bi-info-circle-fill"></i>
                  <span className="infoTooltip">
                    Trade Profit Order is the buy out cash value where your bot
                    will sell all assets once reaching
                  </span>
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Trade Profit Order"
                  style={{
                    borderColor:
                      parseFloat(tradeProfitOrder) > 0 ||
                      tradeProfitOrder.length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      parseFloat(tradeProfitOrder) > 0 ||
                      tradeProfitOrder.length == 0
                        ? "1px"
                        : "2px",
                  }}
                  value={tradeProfitOrder}
                  onChange={(e) => setTradeProfitOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="footer">
              <button
                onClick={async () => {
                  if (
                    !botName ||
                    !alpacaEndpoint ||
                    !alpacaKey ||
                    !alpacaSecret ||
                    !stockSymbol ||
                    !tradingStrategy ||
                    !cashRiskPercentage ||
                    !tradeProfitOrder
                  ) {
                    alert("Please fill in all the fields");
                  } else {
                    if (!validSymbol || !validRisk || !validProfitOrder) {
                      alert("Invalid Data entered. Try again.");
                    } else {
                      const response = await createNewBot(
                        userEmail,
                        botName.trim(),
                        alpacaEndpoint,
                        alpacaKey,
                        alpacaSecret,
                        stockSymbol,
                        tradingStrategy,
                        parseFloat(cashRiskPercentage) * 0.01,
                        parseFloat(tradeProfitOrder)
                      );

                      if (response.status === "name taken") {
                        alert("Bot name already taken for this user");
                        return;
                      } else {
                        closeModal(false);
                        window.location.reload();
                      }
                    }
                  }
                }}
              >
                Create New Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewBotModal;
