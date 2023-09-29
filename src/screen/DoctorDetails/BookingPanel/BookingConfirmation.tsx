import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import {useGetSKU} from '../../../customhook/useGetSKU';
import {BookingOverview} from './BookingOverview';
import {Gender, UserCard} from './UserCard';

import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import _ from 'lodash';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {AppPages} from '../../../appPages';
import {useBookslot as useBookSlot} from '../../../customhook/useBookslot';
import {useCreatePaymentOrder} from '../../../customhook/useCreatePaymentOrder';
import {RootState} from '../../../redux/Store';
import {updateuserdata} from '../../../redux/reducer/Authreducer';
import {BookSlotRequest, OfferEntity} from '../../../types';
import {getAge} from '../../../utils/dateMethods';
import {useGetCustomer} from '../../Profile/useCustomerQuery';
import {errorAlert, successAlert} from './../../../utils/useShowAlert';
import {NameNote} from './NameNote';
import {BookingUserInterface, UserForm} from './UserForm';

export const BookingConfirmation = ({route}: {route: any}) => {
  console.log('route.prams', route.params);
  const {
    selectedTime,
    selectedDate,
    existingAppointment,
    selectedClinic,
    onBookingSuccess,
    setSelectedTime,
    doctor_id,
  } = route.params;

  const AppState = useSelector((state: RootState) => state.Appstate);
  const [loader, setLoader] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState<OfferEntity | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useDispatch();
  const onPaymentSuccess = () => {
    navigation.navigate(AppPages.AppointmentStack, {
      screen: AppPages.Appointment,
    });
  };

  useEffect(() => {
    if (selectedOffer?.percentage) {
      setDiscount(SKUData?.amounts?.amount * selectedOffer.percentage * 0.01);
    } else if (selectedOffer?.amount) {
      setDiscount(selectedOffer.amount);
    }
  }, [selectedOffer]);

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

  useEffect(() => {
    console.log('SKUData', SKUData?.offers);
    console.log('SKUDatas', _.sortBy(SKUData?.offers, 'priority'));

    setSelectedOffer(_.sortBy(SKUData?.offers, 'priority')[0]);
  }, [SKUData]);

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
        // doctor_clinic_id: selectedClinic?.clinic_doctor_id ?? '',
        doctor_id: doctor_id ?? '',
        clinic_id: selectedClinic?.id ?? '',
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
            <View
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
            </View>

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

            <View style={{marginTop: 20}}>
              <View>
                <Text>Payment Details</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Base Amount</Text>
                <Text style={{flex: 1}}>{SKUData?.amounts?.amount}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Discount</Text>
                <Text style={{flex: 1}}>{discount}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1}}>GST</Text>
                <Text style={{flex: 1}}>
                  {(SKUData.amounts.amount - discount) *
                    SKUData.amounts.gstRate *
                    0.01}
                </Text>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: Color.black,
                  height: 1,
                }}></View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Pay amount</Text>
                <Text style={{flex: 1}}>
                  {SKUData.amounts.amount -
                    discount +
                    (SKUData.amounts.amount - discount) *
                      SKUData.amounts.gstRate *
                      0.01}
                </Text>
              </View>
            </View>

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
