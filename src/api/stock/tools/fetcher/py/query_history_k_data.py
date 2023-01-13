import baostock as bs
import sys

lg = bs.login()

code = sys.argv[1]
fields = sys.argv[2]
start_date = sys.argv[3]
end_date = sys.argv[4]
frequency = sys.argv[5]
adjustflag = sys.argv[6]
rs = bs.query_history_k_data_plus(code,
    fields,
    start_date=start_date, end_date=end_date,
    frequency=frequency, adjustflag=adjustflag)
data_list = []
while (rs.error_code == '0') & rs.next():
    data_list.append(rs.get_row_data())
print(data_list)
bs.logout()