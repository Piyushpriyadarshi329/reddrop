import {
  NavigationProp,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {Button, Icon, Input, Text} from '@rneui/themed';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import {useGetSKU} from '../../../customhook/useGetSKU';
import {UserCard} from './User/UserCard';

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
import {BookSlotRequest, Gender, OfferEntity} from '../../../types';
import {getAge} from '../../../utils/dateMethods';
import {useGetCustomer} from '../../Profile/useCustomerQuery';
import {
  errorAlert as errorPopup,
  successAlert,
} from '../../../utils/useShowAlert';
import {NameNote} from './NameNote';
import {BookingUserInterface, UserForm} from './User/UserForm';
import {OfferCard} from './Offer/OfferCard';
import {ApplyOfferButton} from './Offer/ApplyOfferButton';
import {PaymentAmount} from './Amount';

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
  const [errorAlert, setErrorAlert] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState<OfferEntity | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useDispatch();

  const onPaymentSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: AppPages.AppointmentStack,
            state: {
              routes: [
                {
                  name: AppPages.Appointment,
                },
              ],
            },
          },
        ],
      }),
    );

    // navigation.navigate(AppPages.AppointmentStack, {
    //   screen: AppPages.Appointment,
    // });
  };

  useEffect(() => {
    if (AppState.paymentStatus == 'COMPLETED') {
      successAlert('Payment Complete Successfully');
      onPaymentSuccess();
    } else if (AppState.paymentStatus == 'FAILED') {
      errorPopup('Payment Failed');
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

  const amountObject = useMemo(
    () =>
      !existingAppointment
        ? SKUData?.amounts
        : {
            id: '',
            name: 'Reschedule',
            amount: 0,
            serviceCharges: 0,
            gstRate: 0,
          },
    [SKUData],
  );

  const offerObject = useMemo(
    () => (!existingAppointment ? SKUData?.offers : []),
    [SKUData],
  );

  useEffect(() => {
    if (!!offerObject?.length) {
      setSelectedOffer(_.sortBy(offerObject, 'priority')[0]);
    }
  }, [SKUData]);

  const [user, setUser] = useState<BookingUserInterface | undefined>({
    dob: customerData?.dob ? getAge(Number(customerData?.dob)) : undefined,
    gender: (customerData?.gender ?? '') as Gender,
    name: customerData?.name ?? '',
    phone: customerData?.mobile ?? '',
    patient_address: customerData?.address ?? '',
  });

  useEffect(() => {
    console.log('customerData==>', customerData);

    setUser({
      // dob: new Date('1995-12-17T03:24:00'),
      dob: customerData?.dob ? getAge(Number(customerData?.dob)) : undefined,
      gender: (customerData?.gender ?? '') as Gender,
      name: customerData?.name ?? '',
      phone: customerData?.mobile ?? '',
      patient_address: customerData?.address ?? '',
    });
  }, [customerData]);

  useEffect(() => {
    if (existingAppointment) {
      setUser({
        // dob: new Date('1995-12-17T03:24:00'),
        dob: existingAppointment?.dob,
        gender: existingAppointment?.gender,
        name: existingAppointment?.name,
        patient_address: existingAppointment.patient_address ?? '',
        phone: existingAppointment?.phone ?? '',
      });
    }
  }, [existingAppointment]);

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

  const discount = useMemo(() => {
    if (selectedOffer?.percentage) {
      return (amountObject?.amount ?? 0) * selectedOffer.percentage * 0.01;
    } else if (selectedOffer?.amount) {
      return selectedOffer.amount;
    }
    return 0;
  }, [selectedOffer, SKUData]);

  const payableAmount = useMemo(() => {
    return (
      (amountObject?.amount ?? 0) -
      discount +
      ((amountObject?.amount ?? 0) - discount) *
        (amountObject?.gstRate ?? 0) *
        0.01
    );
  }, [selectedOffer, SKUData]);

  const gstAmount = useMemo(() => {
    return (
      ((amountObject?.amount ?? 0) - discount) *
      (amountObject?.gstRate ?? 0) *
      0.01
    );
  }, [selectedOffer, SKUData]);

  const onPaymentOrderCreated = async (paymentOrder: any) => {
    try {
      if (!user?.gender || !user?.name) {
        setErrorAlert(true);
        return;
      }
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
        dob: existingAppointment ? existingAppointment.dob : user?.dob,
        gender: existingAppointment ? existingAppointment.gender : user?.gender,
        name: existingAppointment ? existingAppointment.name : user?.name,
        phone: existingAppointment ? existingAppointment.phone : user?.phone,
        patient_address: existingAppointment
          ? existingAppointment.patient_address
          : user?.patient_address,

        amount: payableAmount,
        baseAmount: amountObject?.amount ?? 0,
        gstAmount: gstAmount,
        offerCode: selectedOffer ? selectedOffer.code : '',
        discountAmount: discount,
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

      // dispatch(
      //   updateuserdata({
      //     paymentStatus: 'COMPLETED',
      //   }),
      // );
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
            <ScrollView>
              {showUserForm ? (
                <UserForm
                  user={user}
                  onClose={() => setShowUserForm(false)}
                  onSubmit={user => {
                    setUser(user);
                    setShowUserForm(false);
                  }}
                />
              ) : (
                <View style={{gap: 5, padding: 10}}>
                  <UserCard
                    user={existingAppointment ? existingAppointment : user}
                    existingAppointment={existingAppointment}
                    errorAlert={errorAlert}
                    onEdit={() => {
                      setErrorAlert(false);
                      setShowUserForm(true);
                    }}
                  />
                  <NameNote />
                </View>
              )}

              {existingAppointment ? null : (
                <>
                  {!selectedOffer && (
                    <ApplyOfferButton setSelectedOffer={setSelectedOffer} />
                  )}

                  {selectedOffer && (
                    <View style={{padding: 10}}>
                      <OfferCard
                        selectedOffer={selectedOffer}
                        setSelectedOffer={setSelectedOffer}
                      />
                    </View>
                  )}
                </>
              )}

              <View style={{marginTop: 20, padding: 10, gap: 10}}>
                <Text style={{textAlign: 'center'}}>Bill Summary</Text>
                <PaymentAmount
                  discount={discount}
                  gstAmount={gstAmount}
                  payableAmount={payableAmount}
                  amount={amountObject?.amount ?? 0}
                />
              </View>
            </ScrollView>

            <Button
              onPress={!isSubmitLoading ? bookAppointmentHandler : () => {}}
              title={existingAppointment ? 'Reschedule' : 'Book'}
              color={Color.primary}
              disabled={showUserForm}
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
