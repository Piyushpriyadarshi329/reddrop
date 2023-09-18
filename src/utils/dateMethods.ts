export const getTimeStringFromDBTime = (time?: string) => {
  if (!time) return '';
  let hour = time.slice(0, 2);
  let ampm = 'AM';
  if (Number(hour) === 12) {
    ampm = 'PM';
  }
  if (Number(hour) > 12) {
    hour = ('0' + (Number(hour) - 12).toString()).slice(-2);
    ampm = 'PM';
  }
  return hour + ' : ' + time.slice(2) + ' ' + ampm;
};

export const getToday = (): Date => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export function getAge(epoch: number) {
  var today = new Date();
  var birthDate = new Date(epoch);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age + ' y';
}
