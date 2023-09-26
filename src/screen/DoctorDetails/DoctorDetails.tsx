import {default as React} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../../asset/styles';
import {ClinicWithAddressAndImage, DoctorDto} from '../../types';
import ShadowWrapper, {shadowStyles} from '../../component/ShadowWrapper';
import {VerticalLine} from './VerticalLine';

const DoctorDetails = ({
  doctorDetails,
  clinicDetails,
}: {
  doctorDetails:
    | (DoctorDto & {
        profile_image: string;
      })
    | undefined;
  clinicDetails: ClinicWithAddressAndImage;
}) => {
  console.log('clinicDetails', clinicDetails);

  return (
    <>
      <Text style={commonStyles.caption}>{doctorDetails?.speciality}</Text>
      <Text style={[commonStyles.font20, commonStyles.weight700]}>
        Dr.{doctorDetails?.name}
      </Text>
      {doctorDetails?.degree && (
        <Text style={commonStyles.caption}>{doctorDetails?.degree}</Text>
      )}
      <Text style={[commonStyles.font18, commonStyles.weight700]}>
        {clinicDetails.name}
      </Text>
      <View
        style={{
          marginTop: 10,
        }}>
        <ShadowWrapper>
          <View style={style.detailsCardContainer}>
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Experience</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {doctorDetails?.experience
                  ? `${doctorDetails?.experience + ' Yrs'}`
                  : ''}
              </Text>
            </View>
            <VerticalLine />
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Patients</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {doctorDetails?.no_of_bookings || 'Newly Joined'}
              </Text>
            </View>
            <VerticalLine />
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Fees</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {clinicDetails?.fees}
              </Text>
            </View>
          </View>
        </ShadowWrapper>
      </View>
      {!!doctorDetails?.about.trim().length && (
        <View style={{paddingVertical: 20}}>
          <Text style={[commonStyles.font18, commonStyles.weight800]}>
            About
          </Text>
          <Text style={commonStyles.font14}>{doctorDetails?.about}</Text>
        </View>
      )}
    </>
  );
};

export default DoctorDetails;

const style = StyleSheet.create({
  detailsCardContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  detailsCard: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
