import baostock as bs
import sys

lg = bs.login()

code = 'sz.300769'
fields = 'date,code,open,high,low,close,volume,amount,adjustflag,turn,pctChg'
start_date = '2022-08-02'
end_date = '2023-01-13'
frequency = 'w'
adjustflag = '3'
rs = bs.query_history_k_data_plus(code,
    fields,
    start_date=start_date, end_date=end_date,
    frequency=frequency, adjustflag=adjustflag)
data_list = []
while (rs.error_code == '0') & rs.next():
    data_list.append(rs.get_row_data())
print(data_list)
bs.logout()