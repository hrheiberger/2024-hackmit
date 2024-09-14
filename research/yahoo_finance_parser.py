import yfinance as yf 
import pandas

company = yf.Ticker("NVDA")
print(company.info)

def get_industry(ticker):
    company = yf.Ticker(ticker)
    return company.info["industryKey"]

def get_sector(ticker):
    company = yf.Ticker(ticker)
    return company.info["sectorKey"]

def get_close_history(ticker):
    company = yf.Ticker(ticker)
    start = pandas.Timestamp('2024-09-09 00:00:00-0400', tz='America/New_York')
    history = company.history(period="max", interval="1wk", start=start)

    closes = [(row.values[0]) for index, row in history[["Close"]].iterrows()]
    return closes[::-1]

closes = get_close_history("NVDA")