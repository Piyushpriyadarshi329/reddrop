export const getTimeStringFromDBTime = (time?: string) => {
  if (!time) return '';
  let hour = time.slice(0, 2);
  let ampm = 'AM';
  if (Number(hour) > 12) {
    hour = ('0' + (Number(hour) - 12).toString()).slice(-2);
    ampm = 'PM';
  }
  return hour + ' : ' + time.slice(2) + ' ' + ampm;
};

export const getToday = (): number =>
  new Date(
    `${
      new Date().getFullYear() +
      '-' +
      ('0' + (new Date().getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date().getDate()).slice(-2)
    }T00:00:00Z`,
  ).getTime();

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
