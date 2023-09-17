import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {commonStyles} from '../../asset/styles';
import {RootState} from '../../redux/Store';
import {BookingStatus} from '../../types';
import AppointmentCard from './Appointmentcard';
import {useGetAppointments} from './useAppointmentQuery';
import {getToday} from '../../utils/dateMethods';
import {AppointmentTab, appointmentTabToStatus} from './helper';

export const AppointmentList = ({
  tab,
  showMenuOptions,
}: {
  tab: AppointmentTab;
  showMenuOptions?: boolean;
}) => {
  const bookingStatus = appointmentTabToStatus[tab];
  const userid = useSelector((state: RootState) => state.Appstate.userid);
  const datePayload = useMemo(() => {
    if (bookingStatus[0] === BookingStatus.BOOKED) {
      return {from_date: getToday().getTime()};
    } else if (bookingStatus.includes(BookingStatus.COMPLETED)) {
      return {to_date: getToday().getTime() + 24 * 60 * 60 * 1000};
    }
    return {};
  }, [bookingStatus]);
  const {data: appointments} = useGetAppointments({
    customerId: userid,
    status: bookingStatus,
    ...datePayload,
  });

  const sortedAppointments = useMemo(() => {
    if (tab === AppointmentTab.History) {
      return appointments
        ?.filter(
          a =>
            !(
              a.status == BookingStatus.BOOKED &&
              a.appointment_date == getToday().getTime()
            ),
        )
        ?.sort((a, b) => b.appointment_date - a.appointment_date);
    } else {
      return appointments?.sort(
        (a, b) => b.appointment_date - a.appointment_date,
      );
    }
  }, [appointments, tab]);

  return (
    <ScrollView>
      <>
        {!sortedAppointments?.length ? (
          <View style={commonStyles.flex1Center}>
            <Text style={[commonStyles.font18, commonStyles.weight600]}>
              No Records Found
            </Text>
          </View>
        ) : (
          <>
            {sortedAppointments?.map(i => (
              <AppointmentCard
                appointment={i}
                showMenuOptions={showMenuOptions}
              />
            ))}
          </>
        )}
      </>
    </ScrollView>
  );
};
