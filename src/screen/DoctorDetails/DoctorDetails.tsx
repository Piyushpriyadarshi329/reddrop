import {default as React} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../../asset/styles';
import {ClinicWithAddressAndImage, DoctorDto} from '../../types';
import ShadowWrapper, {shadowStyles} from '../../component/ShadowWrapper';

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
  console.log('doctorDetails', doctorDetails);
  return (
    <>
      <Text style={commonStyles.caption}>{doctorDetails?.speciality}</Text>
      <Text style={[commonStyles.font20, commonStyles.weight700]}>
        Dr.{doctorDetails?.name}
      </Text>
      <Text style={[commonStyles.font16, commonStyles.weight700]}>
        {clinicDetails.name}
      </Text>
      <Text style={[commonStyles.font16, commonStyles.weight700]}>
        consulting fees: {clinicDetails?.fees}
      </Text>
      {doctorDetails?.degree && (
        <Text style={commonStyles.caption}>{doctorDetails?.degree}</Text>
      )}
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
            <View
              style={{
                borderLeftWidth: 1,
                borderColor: 'grey',
                height: '80%',
                alignSelf: 'center',
              }}
            />
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Patients</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {doctorDetails?.no_of_bookings || 'Newly Joined'}
              </Text>
            </View>
          </View>
        </ShadowWrapper>
      </View>
      <View style={{paddingVertical: 20}}>
        <Text style={[commonStyles.font18, commonStyles.weight800]}>About</Text>
        <Text style={commonStyles.font14}>{doctorDetails?.about}</Text>
      </View>
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
