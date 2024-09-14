import yfinance as yf 

def get_close_history(ticker):
    company = yf.Ticker(ticker)
    history = company.history(period="max", interval="1wk")

    closes = [row.values[0] for index, row in history[["Close"]].iterrows()]
    return closes[::-1]

#print(get_close_history("COST"))