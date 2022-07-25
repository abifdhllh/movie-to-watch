import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import View from '@components/View';
import Text from '@components/Text';
import {Colors} from '@utils/theme';
import {PEOPLE_TEST} from '@utils/images';

type Props = {
  image: number | Source;
  realName: string;
  characterName: string;
  onPress: () => void;
};

const PersonItem = ({image, realName, characterName, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View width={wp('20%')} center>
        <Text
          fontSize={hp('1.5%')}
          numberOfLines={1}
          fontWeight="bold"
          color={Colors.grayWhite}>
          {characterName}
        </Text>
        <View height={5} />
        <FastImage source={image} style={styles.image} />
        <View height={5} />
        <Text fontSize={hp('1.5%')} numberOfLines={1} color={Colors.grayWhite}>
          {realName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PersonItem;

const styles = StyleSheet.create({
  image: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('10%'),
  },
  title: {
    fontSize: hp('3%'),
  },
  genre: {
    fontSize: hp('2%'),
  },
  iconBookmarkContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
});
