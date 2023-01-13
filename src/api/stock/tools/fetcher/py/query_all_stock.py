import baostock as bs
import sys

bs.login()

date = sys.argv[1]
stock_rs = bs.query_all_stock(date)
data_list = []

while (stock_rs.error_code == '0') & stock_rs.next():
    data_list.append(stock_rs.get_row_data())
print(data_list)

bs.logout()