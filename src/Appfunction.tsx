export function showtime(timestamp: number) {
  let date = new Date(timestamp);

  let hour = date.getHours();
  let am_pm = 'AM';

  if (hour > 12) {
    hour = hour - 12;
    am_pm = 'PM';
  }

  let min = date.getMinutes();

  return ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ' ' + am_pm;
}
export function showtimefromstring(time: string) {
  let hour = Number(time.substring(0, 2));

  let am_pm = 'AM';

  if (hour > 11) {
    hour = hour - 12;
    am_pm = 'PM';
  }

  let min = Number(time.substring(2, 4));

  return ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ' ' + am_pm;
}

export function sendtime(timestamp: number) {
  let date = new Date(timestamp);

  let hour = date.getHours();

  let min = date.getMinutes();

  return ('0' + hour).slice(-2) + ('0' + min).slice(-2);
}

export function getSlotwisetime(t1: string, t2: string, slot: number) {
  //   let t1="0930"
  // let t2="1430"
  // let slot=6

  var time_start: any = new Date();
  var time_end: any = new Date();
  time_start.setHours(
    Number(t1.substring(0, 2)),
    Number(t1.substring(2, 4)),
    0,
    0,
  );
  time_end.setHours(
    Number(t2.substring(0, 2)),
    Number(t2.substring(2, 4)),
    0,
    0,
  );

  let timediffinmin = (time_end - time_start) / (1000 * 60);
  let slot_timing = timediffinmin / slot;
  console.log('slot_timing', slot_timing);
  let arr = [];

  for (var i = 0; i < slot; i++) {
    var first_slot = new Date();
    first_slot.setHours(
      Number(t1.substring(0, 2)),
      Number(t1.substring(2, 4)) + slot_timing * i,
      0,
      0,
    );

    arr.push(
      ('0' + first_slot.getHours()).slice(-2) +
        '' +
        ('0' + first_slot.getMinutes()).slice(-2),
    );
  }

  return arr;
}
