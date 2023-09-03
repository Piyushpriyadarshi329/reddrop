import {BookingStatus} from '../../types';

export enum AppointmentTab {
  Scheduled = 'Scheduled',
  History = 'History',
  Cancelled = 'Cancelled',
}
export const appointmentTabToStatus = {
  [AppointmentTab.Scheduled]: [BookingStatus.BOOKED],
  [AppointmentTab.History]: [BookingStatus.COMPLETED, BookingStatus.BOOKED],
  [AppointmentTab.Cancelled]: [BookingStatus.CANCELLED],
};
