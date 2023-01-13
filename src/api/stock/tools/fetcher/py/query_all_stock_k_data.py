import baostock as bs
import pandas as pd
import sys

bs.login()

date = sys.argv[1]
stock_rs = bs.query_all_stock(date)
stock_df = stock_rs.get_data()
data_df = pd.DataFrame()
for code in stock_df["code"]:
    k_rs = bs.query_history_k_data_plus(code, "date,code,open,high,low,close", date, date)
    data_df = pd.concat([data_df, k_rs.get_data()])
print(data_df.values)

bs.logout()