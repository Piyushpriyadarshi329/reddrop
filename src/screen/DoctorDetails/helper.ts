export const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
import {useState, useEffect} from 'react';
export interface DateObj {
  date: number;
  month: number;
  day: number;
  senddate: string;
}

export const useDateList = () => {
  const [datelist, setdatelist] = useState<DateObj[]>([]);
  useEffect(() => {
    let localdaylist = [];

    for (let i = 0; i < 15; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);

      let obj = {
        date: d.getDate(),
        month: d.getMonth(),
        day: d.getDay(),
        senddate:
          d.getFullYear() +
          '-' +
          ('0' + (d.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + d.getDate()).slice(-2),
      };

      localdaylist.push(obj);
    }

    setdatelist(localdaylist);
  }, []);
  return datelist;
};
