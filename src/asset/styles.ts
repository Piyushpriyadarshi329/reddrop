import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  font: {color: 'black'},
  font20: {fontSize: 20, color: 'black'},
  font18: {fontSize: 18, color: 'black'},
  font16: {fontSize: 16, color: 'black'},
  font12: {fontSize: 12, color: 'black'},
  weight600: {fontWeight: '600'},
  justifyCenter: {
    justifyContent: 'center',
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  p5: {
    padding: 5,
  },
  pv5: {
    paddingVertical: 5,
  },
  ph5: {
    paddingHorizontal: 5,
  },
  p10: {
    padding: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  gap10: {
    gap: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});
