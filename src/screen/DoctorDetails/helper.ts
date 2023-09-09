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
import {SlotStatus} from '../../types';
export interface DateObj {
  date: number;
  month: number;
  day: number;
  senddate: Date;
}

export const useDateList = () => {
  const [datelist, setdatelist] = useState<DateObj[]>([]);
  useEffect(() => {
    let localdaylist = [];

    for (let i = 0; i < 15; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);

      let obj = {
        date: d.getDate(),
        month: d.getMonth(),
        day: d.getDay(),
        senddate: d,
      };

      localdaylist.push(obj);
    }

    setdatelist(localdaylist);
  }, []);
  return datelist;
};

export const getSlotColor = (status: SlotStatus) => {
  switch (status) {
    case SlotStatus.AVAILABLE:
      return 'white';
    case SlotStatus.BOOKED:
      return 'pink';
    case SlotStatus.NA:
      return 'lightgrey';
  }
};
