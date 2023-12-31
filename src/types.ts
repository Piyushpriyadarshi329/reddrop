export type DataResponse<T> = {
  Success: boolean;
  Message: string;
  Message2?: string;
  data?: T;
};

/** DoctorController */
export interface DoctorDto {
  id: string;
  name: string;
  mobile: string;
  email: string;
  active: boolean;
  profile_image: string;
  profile_image_key: string;
  speciality: string;
  degree: string;
  appointment_time: number;
  fees: number;
  about: string;
  no_of_bookings?: number;
  experience?: number;
}

export interface SpecialityDto {
  id: string;
  name: string;
  doc_key: string;
}
export interface LocationDto {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
export type GetLocationListResponse = DataResponse<(LocationDto & {})[]>;

export interface GetDotcorsListRequest {
  clinic_id?: string;
  doctor_id?: string;
  speciality?: string;
  city?: string;
  mobile?: string;
  orderBy?: 'BOOKINGS' | 'NAME';
  doctor_name_search_string?: string;
}

export type SearchDoctor = DoctorDto & {
  profile_image: string;
  location: {
    city: string;
    lat: number;
    lan: number;
  }[];
  fees?: number;
};
export type SearchClinic = ClinicDto & {
  profile_image: string;
  address_line1: string;
  address_line2: string;
  city: string;
  location: {
    city: string;
    lat: number;
    lan: number;
  }[];
  fees?: number;
};
export enum EntityType {
  DOCTOR = 'DOCTOR',
  CLINIC = 'CLINIC',
}
export type SearchedEntity =
  | {type: EntityType; data: SearchDoctor}
  | {type: EntityType; data: SearchClinic};
export type SearchDoctorsListResponse = DataResponse<SearchedEntity[]>;
export type GetDoctorsListResponse = DataResponse<
  (DoctorDto & {
    profile_image: string;
    fees?: number;
  })[]
>;
export type GetDoctorResponse = DataResponse<
  DoctorDto & {profile_image: string; fees?: number}
>;
export type GetSpecialityListResponse = DataResponse<(SpecialityDto & {})[]>;

export type AddDoctorRequest = Omit<DoctorDto, 'id'> & {
  password: string;
  clinic_id: string;
};
export type AddDoctorResponse = DataResponse<{id: string}>;

export interface LinkDoctorRequest {
  clinic_id: string;
  doctor_id: string;
}

export type UpdateDoctorReqParams = {id: string};

export type UpdateDoctorRequest = {
  clinic_id?: string;
  name?: string;
  active?: boolean;
  profile_image_key?: string;
  speciality?: string;
  degree?: string;
  appointment_time?: number;
  fees?: number;
  about?: string;
  no_of_bookings?: number;
  experience?: number;
};

export type UpdateClinicReqParams = {id: string};
export type UpdateClinicRequest = {
  name?: string;
  active?: boolean;
  mobile?: string;
  email?: string;
  profile_image_key?: string;
  address_id?: string;
  about?: string;
};

export interface LeaveDto {
  id: string;
  doctor_id: string;
  fromdate: number;
  todate: number;
  worktime_id: string;
  created_datetime: string;
  active: boolean;
  fullday: boolean;
  reason?: string;
  clinic_id: string;
}
export type AddLeaveRequest = Omit<
  LeaveDto,
  'id' | 'created_datetime' | 'active'
>;
export type GetLeaveRequest = {
  doctor_id: string;
  clinic_id?: string;
  fromDate: number;
};

/** CusotmerController */
export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image_key: string;
  profile_image: string;
  active: boolean;
  address: string;
  is_agent: boolean;
  gender: string;
  dob: string;
  appointmentsCount: number;
  referralCode: string;
}
export type UpdateCustomerRequest = {
  name?: string;
  email?: string;
  mobile?: string;
  profile_image_key?: string;
  address?: string;
  is_agent?: boolean;
  gender?: string;
  dob?: string;
  fcmToken?: string;
};

/** Clinic Controller */
export interface ClinicDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image_key: string;
  active: boolean;
  address_id: string;
  about: string;
}
export interface ClinicWithAddress extends ClinicDto {
  address: ShowAddress;
}
export type ClinicWithAddressAndImage = ClinicWithAddress & {
  profile_image: string;
  clinic_doctor_id?: string;
  fees?: number;
};
export type GetClinicsRequest = {
  doctor_id?: string;
  clinic_id?: string;
  city?: string;
};
export type GetClinicsResponse = DataResponse<ClinicWithAddressAndImage[]>;

/** UserController */
export interface LoginRequest {
  userName: string;
  password: string;
  userType: number;
  fcm_token: string;
}

export type LoginResponse = DataResponse<any>;

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  DOCTOR = 'DOCTOR',
  CLINIC = 'CLINIC',
}
export interface SignupRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  usertype: UserType;
  fcm_token?: string;
}
export interface CustomerSignupRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  fcm_token?: string;
}

export type SignupResponse = DataResponse<any>;

/** BookingController */
export enum BookingStatus {
  BOOKED = 'BOOKED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
  COMPLETED = 'COMPLETED',
  STARTED = 'STARTED',
  NA = 'NA',
}
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}

export interface BookingDto {
  id: string;
  customer_id: string;
  doctor_clinic_id: string;
  slot_index: number;
  workingtime_id: string;
  created_datetime: number;
  status: BookingStatus;
  group_id: string;
  modified_datetime: number;
  payment_order_id: string;
  agent_id?: string;
  appointment_date: number;
  existing_booking_id?: string;
  dob: number;
  name: string;
  gender: Gender;
  phone: string;
  patient_address: string;
}
export type BookSlotRequest = Omit<
  BookingDto,
  | 'id'
  | 'created_datetime'
  | 'modified_datetime'
  | 'group_id'
  | 'status'
  | 'doctor_clinic_id'
> & {
  group_id?: string;
  offerCode?: string;
  amount: number;
  discountAmount?: number;
  baseAmount: number;
  gstAmount: number;
  doctor_id: string;
  clinic_id: string;
};
export type BookSlotResponse = DataResponse<any>;

export enum PaymentStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface PyamentDto {
  id: string;
  booking_group_id: string;
  payment_amount?: string;
  payment__mode?: string;
  payment_datetime?: string;
  order_id: string;
  transtation_id: string;
  status: PaymentStatus;
}

export interface GetOccupiedSlotsRequest {
  doctor_clinic_id: string;
  dateString: string; // YYYY-MM-DD
}

export interface OccupiedSlots {
  dateString: number;
  work_time_id: string;
  from_time: string;
  to_time: string;
  slotsCount: number;
  occupiedSlots: number[];
}

export type GetOccupiedSlotsResponse = DataResponse<OccupiedSlots[]>;

export interface WorkingTimeDto {
  id: string;
  doctor_id: string;
  clinic_id: string;
  entry_id: string;
  week_day: number;
  from_time: string;
  to_time: string;
  week?: number;
  no_of_slot: number;
}
export type AddAvailabilityRequest = Omit<
  WorkingTimeDto,
  'id' | 'week_day' | 'week'
> & {
  week_day: number[];
  month_week?: number[];
  all_weeks: boolean;
};
export interface OccupiedDto {
  work_time_id: string;
  doctor_clinic_id: string;
  entry_id: string;
  week_day: number;
  from_time: string;
  to_time: string;
  week: number;
  no_of_slot: number;
  booking_id: string;
  slot_index: number;
  workingtime_id: string;
  created_datetime: number;
  status: BookingStatus;
  group_id: string;
}

export interface GetAppointmentsRequest {
  customerId?: string;
  doctorId?: string;
  clinicId?: string;
  status?: BookingStatus[];
  appointment_date?: number;
  from_date?: number;
  to_date?: number;
}
export interface GetCustomerAppointmentsRequest {
  status?: BookingStatus[];
  appointment_date?: number;
  from_date?: number;
  to_date?: number;
}
export type GetCustomerAppointmentResponse = DataResponse<
  AppointmentWithLatestStatus[]
>;

export interface LatestBookingStatus {
  started_slot: number;
  completed_slot: number;
}

export interface AppointmentWithLatestStatus extends Appointmentdto {
  latestBookingStatus?: LatestBookingStatus;
}

export interface Appointmentdto extends BookingDto {
  customer_image_key?: string;
  doctorsName?: string;
  doctorSpeciality?: string;
  doctor_id?: string;
  clinic_name?: string;
  from_working_time?: string;
  address: ShowAddress;
  clinic_id?: string;
}

export interface ShowAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lan?: number;
}
export interface AddressDto extends ShowAddress {
  id: string;
}
export interface AddAdressRequest {
  id?: string;
  user_id?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: number;
  lat?: number;
  lan?: number;
  type: 'Clinic' | 'Doctor' | 'Customer';
}
export interface GetAdressRequest {
  user_id?: string;
}
export interface updateSlotsStatusRequest {
  id?: string;
  status?: string;
  remarks?: string;
}

export interface AddAdresstdto extends AddAdressRequest {
  id?: string;
}
export interface GetAdresstdto extends GetAdressRequest {}

export type AddAdressResponse = DataResponse<AddAdresstdto[]>;
export type GetAdressResponse = DataResponse<AddAdresstdto[]>;
export type GetAppointmentResponse = DataResponse<Appointmentdto[]>;

export type GetAvailabilityRequest = {
  doctor_id?: string;
  clinic_id?: string;
};
export type AvailabilityRes = WorkingTimeDto & {clinic_name: string};
export type GetAvailabilityResponse = DataResponse<AvailabilityRes[]>;

export type GetBookingAvailabilityRequest = {
  doctor_id: string;
  clinic_id: string;
  date: number;
};

export interface BookingAvailability {
  workingtime_id: string;
  fromtime: string;
  totime: string;
  slots: Slot[];
}
export type GetBookingvavilabilityResponse = BookingAvailability[];

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  NA = 'NA',
}

export interface Slot {
  index: number;
  status: SlotStatus;
}

export interface GetBookingsSummaryRequest {
  doctor_id: string;
}
export type GetBookingsSummaryResponse = DataResponse<
  {clinic_id: string; count: number; appointment_date: number}[]
>;

export interface Document {
  id: string;
  fileName: string;
  path: string;
}

export interface VisibleDocument {
  id: string;
  fileKey: string;
  presignedUrl: string;
}

export type AddDocumentResponse = DataResponse<VisibleDocument>;

export type GetAvailableDatesResponse = DataResponse<
  {date: number; available: boolean}[]
>;

export enum CB_NOTIFICATION {
  FIRST_SLOT_STARTED = 'FIRST_SLOT_STARTED',
  VISIBLE_NOTIFICATION = 'VISIBLE_NOTIFICATION',
  LIVE_STATUS = 'LIVE_STATUS',
  NEW_BOOKING = 'NEW_BOOKING',
  PAYMENT_CLOSURE = 'PAYMENT_CLOSURE',
}

export interface LiveStatusNotificationData {
  name: CB_NOTIFICATION.LIVE_STATUS;
  started_slot: string;
  completed_slot: string;
}
export interface NewBookingNotificationData {
  name: CB_NOTIFICATION.NEW_BOOKING;
  doctorId: string;
  date: string;
}
export interface PaymentClosureNotification {
  name: CB_NOTIFICATION.PAYMENT_CLOSURE;
  status: PaymentStatus;
}
export interface VisibleNotification {
  name: CB_NOTIFICATION.VISIBLE_NOTIFICATION;
}
export interface FirstSlotStartedNotification {
  name: CB_NOTIFICATION.FIRST_SLOT_STARTED;
}

export type NotificationData =
  | LiveStatusNotificationData
  | NewBookingNotificationData
  | PaymentClosureNotification
  | FirstSlotStartedNotification
  | VisibleNotification;

export type CreatePaymentResponse = DataResponse<{
  orderId: string;
  amount: string;
  CFResponse: any;
}>;

export interface CFPaymentWebhookBody {
  data: {
    order: {
      order_id: string;
      order_amount: number;
      order_currency: string;
      order_tags: null;
    };
    payment: {
      cf_payment_id: number;
      payment_status: string;
      payment_amount: number;
      payment_currency: string;
      payment_message: string;
      payment_time: string;
      bank_reference: string;
      auth_id: null;
      payment_method: {
        upi: {
          channel: null;
          upi_id: string;
        };
      };
      payment_group: string;
    };
    customer_details: {
      customer_name: null;
      customer_id: string;
      customer_email: string;
      customer_phone: string;
    };
    payment_gateway_details: {
      gateway_name: string;
      gateway_order_id: string;
      gateway_payment_id: string;
      gateway_status_code: null;
    };
    payment_offers: [
      {
        offer_id: string;
        offer_type: string;
        offer_meta: {
          offer_title: string;
          offer_description: string;
          offer_code: string;
          offer_start_time: string;
          offer_end_time: string;
        };
        offer_redemption: {
          redemption_status: string;
          discount_amount: number;
          cashback_amount: number;
        };
      },
    ];
  };
  event_time: string;
  type: CashFreeWebHookType;
}
export enum CashFreeWebHookType {
  PAYMENT_SUCCESS_WEBHOOK = 'PAYMENT_SUCCESS_WEBHOOK',
  PAYMENT_FAILED_WEBHOOK = 'PAYMENT_FAILED_WEBHOOK',
}

export interface SKUItemEntity {
  id: string;
  name: string;
  amount: number;
  serviceCharges: number;
  gstRate: number;
}
export interface OfferEntity {
  id: string;
  amount?: number | null;
  percentage?: number | null;
  maxOff?: number | null;
  name: string;
  description: string;
  expiry: number;
  code: string;
  priority: number | null;
  maxApplies: number | null;
  validFrom: number;
  skuID: string | null;
}

export type getAmountAndOffersResponse = DataResponse<{
  amounts: SKUItemEntity;
  offers: OfferEntity[];
}>;

export enum CodeType {
  REFERRAL = 'REFERRAL',
}

export interface AdBanner {
  id: string;
  name: string;
  image_key: string;
}

export type AdDataResponse = DataResponse<AdBanner[]>;
