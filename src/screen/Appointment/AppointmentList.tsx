import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {commonStyles} from '../../asset/styles';
import {RootState} from '../../redux/Store';
import {BookingStatus} from '../../types';
import AppointmentCard from './Appointmentcard';
import {useGetAppointments} from './useAppointmentQuery';
import {getToday} from '../../utils/dateMethods';

export const AppointmentList = ({status}: {status: BookingStatus[]}) => {
  const userid = useSelector((state: RootState) => state.Appstate.userid);
  const datePayload = useMemo(() => {
    if (status[0] === BookingStatus.BOOKED) {
      return {from_date: getToday()};
    } else if (status.includes(BookingStatus.COMPLETED)) {
      return {to_date: getToday()};
    }
    return {};
  }, [status]);
  const {data: appointments} = useGetAppointments({
    customerId: userid,
    status,
    ...datePayload,
  });
  const sortedAppointments = appointments?.sort(
    (a, b) => b.appointment_date - a.appointment_date,
  );
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
              <AppointmentCard appointment={i} />
            ))}
          </>
        )}
      </>
    </ScrollView>
  );
};
