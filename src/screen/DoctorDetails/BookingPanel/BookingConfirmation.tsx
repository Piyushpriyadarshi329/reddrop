import React, {useEffect, useState} from 'react';
import {IModalMethods} from '../../../utils/useModalMethods';
import {View, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import Color from '../../../asset/Color';
import {Gender, UserCard} from './UserCard';
import {BookingOverview} from './BookingOverview';
import {commonStyles} from '../../../asset/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useGetSKU} from '../../../customhook/useGetSKU';
import {useCheckReferralCode} from '../../../customhook/useCheckReferralCode';

import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {BookingUserInterface, UserForm} from './UserForm';
import {
  Appointmentdto,
  BookSlotRequest,
  CB_NOTIFICATION,
  ClinicWithAddressAndImage,
  CreatePaymentResponse,
  OfferEntity,
  Slot,
} from '../../../types';
import {useBookslot as useBookSlot} from '../../../customhook/useBookslot';
import {getAge, getToday} from '../../../utils/dateMethods';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import uuid from 'react-native-uuid';
import {useGetCustomer} from '../../Profile/useCustomerQuery';
import {useCreatePaymentOrder} from '../../../customhook/useCreatePaymentOrder';
import {
  axiosAlert,
  successAlert,
  errorAlert,
} from './../../../utils/useShowAlert';
import {updateuserdata} from '../../../redux/reducer/Authreducer';
import {AppPages} from '../../../appPages';
import {NameNote} from './NameNote';

export const BookingConfirmation = ({route}: {route: any}) => {
  console.log('route.prams', route.params);
  const {
    selectedTime,
    selectedDate,
    existingAppointment,
    selectedClinic,
    onBookingSuccess,
    setSelectedTime,
  } = route.params;

  // {
  //   modalMethods,
  //   selectedTime,
  //   selectedDate,
  //   existingAppointment,
  //   selectedClinic,
  //   onBookingSuccess,
  // }: {
  //   modalMethods: IModalMethods;
  //   selectedTime: (Slot & {id: string}) | undefined;
  //   selectedDate: number | undefined;
  //   existingAppointment: Appointmentdto;
  //   onBookingSuccess: any;
  //   selectedClinic: ClinicWithAddressAndImage | undefined;
  // }

  const AppState = useSelector((state: RootState) => state.Appstate);
  const [loader, setLoader] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState<OfferEntity | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useDispatch();
  const onPaymentSuccess = () => {
    navigation.navigate(AppPages.AppointmentStack);
  };
  useEffect(() => {
    if (AppState.paymentStatus == 'COMPLETED') {
      successAlert('Payment Complete Successfully');
      onPaymentSuccess();
    } else if (AppState.paymentStatus == 'FAILED') {
      errorAlert('Payment Failed');
      navigation.goBack();
    }

    if (!AppState.paymentStatus) {
      return;
    }
    dispatch(
      updateuserdata({
        paymentStatus: '',
      }),
    );
  }, [AppState.paymentStatus]);

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID: string): any {
        console.log('payment complete', orderID);
        setLoader(true);
      },
      onError(error: CFErrorResponse, orderID: string): void {
        console.log('payment error', error);

        setLoader(true);
      },
    });
  }, []);

  let {data: customerData} = useGetCustomer(AppState.userid);

  let {data: SKUData} = useGetSKU({customerId: AppState.userid});

  console.log('SKUData', SKUData);

  const [user, setUser] = useState<BookingUserInterface | undefined>({
    dob: customerData?.dob ? getAge(Number(customerData?.dob)) : undefined,
    gender: (customerData?.gender ?? '') as Gender,
    name: customerData?.name ?? '',
  });

  useEffect(() => {
    setUser({
      // dob: new Date('1995-12-17T03:24:00'),
      dob: customerData?.dob ? getAge(Number(customerData?.dob)) : undefined,
      gender: (customerData?.gender ?? '') as Gender,
      name: customerData?.name ?? '',
    });
  }, [customerData]);

  const [showUserForm, setShowUserForm] = useState(false);

  const {mutate: bookSlot, isLoading} = useBookSlot({
    onSuccess: () => {
      successAlert('Booked Successfully');
      onPaymentSuccess();
    },
    onError: () => {
      setSelectedTime(undefined);
    },
  });
  const onPaymentOrderCreated = async (paymentOrder: any) => {
    try {
      let bookSlotPayload: BookSlotRequest = {
        customer_id: AppState.userid,
        doctor_clinic_id: selectedClinic?.clinic_doctor_id ?? '',
        slot_index: selectedTime?.index ?? 0,
        workingtime_id: selectedTime?.id ?? '',
        group_id: uuid.v4().toString(),
        // payment_order_id: uuid.v4().toString(),
        payment_order_id: paymentOrder?.CFResponse.order_id,
        appointment_date: selectedDate ?? 0,
        dob: user?.dob,
        gender: user?.gender,
        name: user?.name,
        amount: SKUData.amounts.amount,
        offerCode: '',
        discountAmount: '',
      };
      if (existingAppointment) {
        bookSlotPayload.existing_booking_id = existingAppointment.id;
        bookSlotPayload.group_id = existingAppointment.group_id;
      }

      console.log('bookSlotPayload', bookSlotPayload);

      bookSlot(bookSlotPayload);

      const session = new CFSession(
        paymentOrder?.CFResponse.payment_session_id,
        paymentOrder?.CFResponse.order_id,
        CFEnvironment.SANDBOX,
      );
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#E64A19')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();

      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );

      // CFPaymentGatewayService.doPayment(dropPayment);

      dispatch(
        updateuserdata({
          paymentStatus: 'COMPLETED',
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const {mutate: createPaymentOrder, isLoading: isCreatingPaymentOrder} =
    useCreatePaymentOrder({onSuccess: onPaymentOrderCreated});
  function bookAppointmentHandler() {
    createPaymentOrder({
      customerId: AppState.userid,
    });
  }
  const isSubmitLoading = isCreatingPaymentOrder || isLoading;

  return (
    <>
      <View
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          gap: 10,
        }}>
        {!loader ? (
          <>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={commonStyles.flexRowAlignCenter}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-left" color={Color.primary} />
                <Text style={{color: Color.primary}}>Edit</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 20}}>Confirm Booking</Text>
            </View>
            <BookingOverview />
            {showUserForm || !user ? (
              <UserForm
                onSubmit={user => {
                  setUser(user);
                  setShowUserForm(false);
                }}
              />
            ) : (
              <View style={{gap: 5}}>
                <TouchableOpacity
                  onPress={() => {
                    setUser(undefined);
                    setShowUserForm(true);
                  }}>
                  <UserCard user={user} />
                </TouchableOpacity>
                <NameNote />
              </View>
            )}
            {/* Apply offer */}
            {/* <View
              style={{
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: Color.lightgray,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate(AppPages.Offer, {
                    setSelectedOffer: setSelectedOffer,
                  });
                }}>
                <Text style={{marginLeft: 10}}>Apply Offer</Text>
                <View style={{flex: 1}}>
                  <Icon
                    name="chevron-right"
                    style={{alignItems: 'flex-end', marginRight: 10}}
                    color={Color.black}
                  />
                </View>
              </TouchableOpacity>
            </View> */}

            {/* selected offer */}

            {selectedOffer ? (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: Color.lightgray,
                  borderRadius: 10,
                  padding: 5,
                }}>
                <View>
                  <Text>Applied Offer details</Text>
                </View>
                <Text>Name:{selectedOffer?.name}</Text>
                <Text>Code:{selectedOffer?.code}</Text>
                <Text>{selectedOffer?.description}</Text>
              </View>
            ) : null}

            {/* amount and GSt details */}

            <View></View>
            <Button
              onPress={!isSubmitLoading ? bookAppointmentHandler : () => {}}
              title={'Book'}
              color={Color.primary}
              disabled={!user}
              loading={isSubmitLoading}
            />
          </>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Color.primary} />
          </View>
        )}
      </View>
    </>
  );
};
