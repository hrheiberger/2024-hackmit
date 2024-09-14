import pandas as pd
from yahoo_finance_parser import get_close_history
def get_s_and_p():
    '''
    Get a list of the 503 stocks in the S&P 500
    Repeats: 
        GOOG and GOOGL are both Google
        FOXA and FOX are both Fox 
        NWSA and NWA are both News Corporation
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

#temp1 = get_close_history("COST")
comp1 = get_close_history("NEE")
comp2 = get_close_history("AAPL")
comp3 = get_close_history("GOOG")
spy = get_close_history("SPY")

temp4 = get_stock_correlation(comp1, comp2, 100)
print(temp4)

temp6 = get_stock_correlation(comp2, comp3, 100)
print(temp6)
