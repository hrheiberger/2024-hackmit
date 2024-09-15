var yahooFinance = from 'yahoo-finance'
import { startOfWeek } from 'date-fns';

interface CompanyInfo {
    country: string;
    industry: string;
    sector: string;
}

async function getCountry(ticker: string): Promise<string> {
    const company = await yahooFinance.quote(ticker);
    return company.country;
}

async function getIndustry(ticker: string): Promise<string> {
    const company = await yahooFinance.quote(ticker);
    return company.industry;
}

async function getSector(ticker: string): Promise<string> {
    const company = await yahooFinance.quote(ticker);
    return company.sector;
}

async function getCloseHistory(ticker: string): Promise<number[]> {
    const startDate = startOfWeek(new Date('2024-09-09T00:00:00-04:00'), { weekStartsOn: 1 });
    const history = await yahooFinance.historical(ticker, {
        period1: startDate,
        interval: '1wk'
    });

    return history.map(entry => entry.close);
}


async function getCompanyData(ticker: string): Promise<any> {
    const company = await yahooFinance.quote(ticker);
    const startDate = startOfWeek(new Date('2024-09-09T00:00:00-04:00'), { weekStartsOn: 1 });
    const history = await yahooFinance.historical(ticker, {
        period1: startDate,
        interval: '1wk'
    });

    const closes = history;

    return {
        ticker,
        closes,
        industry: company.industry,
        sector: company.sector,
        country: company.country
    };
}

async function main() {
    const sp500_tickers = [
        "A", "AAPL", "ABBV", "ABC", "ABMD", "ABT", "ACN", "ADBE", "ADI", "ADM", "ADP", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG", "AIZ",
        "AJG", "AMAT", "AMCR", "AMD", "AME", "AMGN", "AMP", "AMT", "AMZN", "AMZ", "ANET", "ANSS", "AON", "AOS", "APA", "APD", "APH",
        "APTV", "ARDX", "ARE", "ARNC", "ATO", "ATVI", "AVB", "AVGO", "AVY", "AWK", "AXP", "BA", "BAC", "BAX", "BB", "BBWI", "BBY",
        "BDX", "BEN", "BF.B", "BG", "BHF", "BIIB", "BMY", "BR", "BRK.B", "BSX", "BMY", "C", "CAG", "CAH", "CAR", "CAT", "CB", "CBOE",
        "CBRE", "CBS", "CCL", "CDNS", "CDW", "CE", "CELG", "CERN", "CF", "CFG", "CHTR", "CI", "CINF", "CL", "CLX", "CMA", "CMCSA",
        "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COG", "COL", "COO", "COST", "COTY", "CRL", "CRM", "CSCO", "CSX", "CTAS",
        "CTLT", "CTS", "CVS", "CVX", "D", "DAL", "DHR", "DIA", "DIS", "DISH", "DNB", "DNR", "DO", "DOV", "DOW", "DPZ", "DRE", "DRI",
        "DSW", "DTE", "DUK", "DVA", "DXC", "EA", "EBAY", "ECL", "ED", "EFX", "EGP", "EIX", "EL", "EMN", "EMR", "ENPH", "EOG", "EQR",
        "EQT", "ES", "ESS", "ETN", "ETR", "EUL", "EV", "EXC", "EXPD", "EXPE", "F", "FAST", "FB", "FIS", "FISV", "FITB", "FL", "FLIR",
        "FLS", "FMC", "FOX", "FOXA", "FRT", "FTI", "FTV", "GD", "GE", "GILD", "GIS", "GL", "GLW", "GM", "GNRC", "GOOG", "GOOGL", "GPC",
        "GPN", "GPS", "GRMN", "GS", "GT", "GWW", "HAL", "HAS", "HBI", "HCA", "HCE", "HCP", "HD", "HES", "HFC", "HIG", "HII", "HIT",
        "HLT", "HOG", "HOLX", "HON", "HRB", "HRL", "HRS", "HSE", "HST", "HSY", "HTA", "HTH", "HTZ", "HUM", "HUN", "HUR", "IAC", "IBM",
        "ICE", "IDXX", "IEX", "IFF", "ILMN", "INCY", "INDU", "INFO", "INTC", "INTU", "INVH", "IP", "IPG", "IR", "IRM", "ISRG", "IT",
        "ITW", "IVZ", "J", "JBHT", "JCI", "JCOM", "JCP", "JEC", "JNJ", "JNPR", "JPM", "JWN", "K", "KHC", "KIM", "KLAC", "KMB", "KMI",
        "KMX", "KO", "KORS", "KRC", "KSS", "KSU", "L", "LB", "LDOS", "LEG", "LEN", "LH", "LMT", "LNC", "LIN", "LKQ", "LLY", "LM",
        "LMT", "LNC", "LIN", "LKQ", "LLY", "LMT", "LNC", "LIN", "LKQ", "LLY", "LUV", "LVS", "LW", "LYB", "M", "MA", "MAC", "MAR",
        "MAS", "MAST", "MAT", "MCD", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "MGM", "MGP", "MHK", "MKTX", "MLM", "MMC", "MMM",
        "MNST", "MO", "MOS", "MPC", "MRK", "MLNX", "MRO", "MS", "MSCI", "MSFT", "MSI", "MTB", "MTD", "MU", "NCLH", "NDAQ", "NDSN",
        "NEE", "NEM", "NFLX", "NFX", "NIO", "NKE", "NLOK", "NLOK", "NOC", "NUE", "NVDA", "NVR", "NWL", "NOW", "NWS", "NWSA", "O",
        "ODFL", "OHI", "OMC", "ON", "ORCL", "ORLY", "OXY", "PAYC", "PAYX", "PBCT", "PCAR", "PEAK", "PEG", "PENN", "PEP", "PFE",
        "PG", "PGR", "PH", "PKI", "PLD", "PLL", "PM", "PNC", "PNW", "PPG", "PPL", "PRU", "PSA", "PSX", "PYPL", "QCOM", "QRVO",
        "RCL", "RE", "REGN", "RF", "RHI", "RJF", "RL", "RMD", "ROK", "ROL", "ROP", "ROST", "RSG", "RTN", "SABR", "SBUX", "SCHW",
        "SE", "SEE", "SHW", "SJM", "SLB", "SNA", "SNPS", "SO", "SPG", "SPGI", "SPLK", "SPY", "SRE", "STE", "STT", "STX", "STZ",
        "SYF", "SYK", "SYMC", "SYY", "T", "TAP", "TDG", "TDY", "TE", "TEL", "TEN", "TER", "TFC", "TFX", "TGT", "THC", "TMO",
        "TMUS", "TNC", "TROW", "TRP", "TRV", "TSCO", "TSLA", "TSN", "TTWO", "TWTR", "TXN", "UAL", "UDR", "UHS", "ULTA", "UNH",
        "UNP", "UPS", "URBN", "USB", "V", "VAR", "VFC", "VIAC", "VLO", "VMC", "VNO", "VRSK", "VRSN", "VRTX", "VZ", "WAB",
        "WAT", "WBA", "WBC", "WBD", "WDC", "WEC", "WELL", "WFC", "WFM", "WHR", "WLTW", "WM", "WMB", "WMT", "WRB", "WRK", "WU",
        "WWE", "X", "XEC", "XEL", "XOM", "XPO", "XRX", "XYL", "YUM", "ZBH", "ZBRA", "ZION", "ZTS"
    ]

    const data = [];
    for (const ticker of sp500_tickers.slice(0, 25)) {
        data.push(await getCompanyData(ticker));
    }

    const nvdaCloses = await getCloseHistory("NVDA");
    console.log('NVDA Closes:', nvdaCloses);
}

main().catch(console.error);
