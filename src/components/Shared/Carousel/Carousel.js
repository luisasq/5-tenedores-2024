import React from 'react'
import {View} from "react-native";
import {Image} from "react-native-elements";
// import CarouselSnap from "react-native-snap-carousel";
import {styles} from "./Carousel.style";

export function Carousel(props) {

    const {arrayImage, width, height} = props;

    const renderItem = ({item}) => (
        <Image source={{uri: item}} style={{height, width}}/>
    )
  return (
    <View style={styles.content}>
      {/* <CarouselSnap 
        layout="default"
        data={arrayImage}
        sliderWidth={400}
        itemWidth={width}
        renderItem={renderItem}
      /> */}
    </View>
  )
}