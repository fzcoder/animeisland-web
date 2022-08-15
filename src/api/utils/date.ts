export declare type YearProps = {
  label: string,
  value: string,
}
export const getYearList = (): Promise<YearProps[]> => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startYear = 1900;
    const list: YearProps[] = [];
    for (let y = currentYear; y >= startYear; y--) {
      list.push({label: y + "年", value: y.toString()})
    }
    return Promise.resolve(list);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export declare type MonthProps = {
  label: string,
  value: string,
}
export const getMonthList = (): Promise<MonthProps[]> => {
  try {
    const list: MonthProps[] = [];
    for (let m = 1; m <= 12; m++) {
      if (m < 10) {
        list.push({label: m + '月', value: '0' + m});
      } else {
        list.push({label: m + '月', value: m.toString()});
      }
    }
  return Promise.resolve(list);
  } catch (err: any) {
    return Promise.reject(err);
  }
}