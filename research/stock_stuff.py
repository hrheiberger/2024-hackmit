import pandas as pd
import numpy as np
from scipy.stats import pearsonr
from yahoo_finance_parser import get_close_history, get_sector
def get_s_and_p():
    '''
    Get a list of the 503 stocks in the S&P 500
    Repeats: 
        GOOG and GOOGL are both Google
        FOXA and FOX are both Fox 
        NWSA and NWS are both News Corporation
    '''

    # Scrape the table from Wikipedia
    url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
    sp500_table = pd.read_html(url)[0]

    # Convert to a list of ticker symbols
    sp500_tickers = sp500_table['Symbol'].tolist()
    return sp500_tickers

def get_stock_correlation(x, y, time_period):
    '''
    Finds the correlation of two stocks
    Use SPY or S&P 500 Equal weight index for stock y if you want to find beta
    Average correlation between two stocks is 0.3
    '''
    sigma_1 = 0
    mean_x = 0
    mean_y = 0
    for i in range(time_period): 
        mean_x+=x[i]
        mean_y+=y[i]
    mean_x = mean_x/time_period
    mean_y = mean_y/time_period

    sigma_2 = 0
    sigma_3 = 0

    for i in range(time_period): 
        sigma_1+=(x[i]-mean_x)*(y[i]-mean_y)
        sigma_2+=(x[i]-mean_x)**2
        sigma_3+=(y[i]-mean_y)**2

    return sigma_1/((sigma_2*sigma_3)**(1/2))

def get_stock_correlation2(x,y,time_period, window):
    sigma = []
    for start in range(time_period-window+1):
        sigma_1 = 0
        mean_x = 0
        mean_y = 0
        for i in range(start, start+window): 
            mean_x+=x[i]
            mean_y+=y[i]
        mean_x = mean_x/window
        mean_y = mean_y/window

        sigma_2 = 0
        sigma_3 = 0

        for i in range(start, start+window): 
            sigma_1+=(x[i]-mean_x)*(y[i]-mean_y)
            sigma_2+=(x[i]-mean_x)**2
            sigma_3+=(y[i]-mean_y)**2
        sigma.append(sigma_1/((sigma_2*sigma_3)**(1/2)))
    return sigma
#temp1 = get_close_history("COST")

#All "should we draw an edge" stuff
def correlated(ticker1, ticker2):
    corr =  get_stock_correlation(ticker1, ticker2, 36)
    if corr>.8: 
        return 1
    elif corr<.3: 
        return -1
    return 0

def same_industry(ticker1, ticker2):
    '''
    Get sector is better than get_industry
    '''
    if get_sector(ticker1)==get_sector(ticker2):
        return 1
    return 0


'''
comp1 = get_close_history("NEE")
comp2 = get_close_history("AAPL")
comp3 = get_close_history("GOOG")
spy = get_close_history("SPY")

temp = get_stock_correlation2(comp1, comp2, min(len(comp1), len(comp2)), 30)
print(temp)
sum = 0
for val in temp: 
    sum+=val
print(sum/len(temp))
'''
