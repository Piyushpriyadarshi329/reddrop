import {Text} from '@rneui/themed';
import {Component} from 'react';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;
export default class MyCarousel extends Component {
  constructor(props?: any) {
    super(props);
    this.state = {entries: [], activeSlide: 0};
  }

  _renderItem({item, index}) {
    return <Text>Hello{item}</Text>;
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View>
        <Carousel
          data={[1, 2, 3, 4]}
          renderItem={this._renderItem}
          itemWidth={sliderWidth}
          sliderWidth={sliderWidth}
          autoplay
          loop
          onSnapToItem={index => this.setState({activeSlide: index})}
        />
        {this.pagination}
      </View>
    );
  }
}
