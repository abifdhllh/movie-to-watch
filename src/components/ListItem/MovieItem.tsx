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

type Props = {
  image: number | Source;
  title: string;
  rating: string;
  onPress: () => void;
  onPressBookmark: () => void;
  isBookmarked: boolean;
};

const MovieHorizontalItem = ({
  image,
  title,
  rating,
  onPress,
  onPressBookmark,
  isBookmarked,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View width={wp('35%')}>
        <TouchableOpacity
          style={styles.iconBookmarkContainer}
          onPress={onPressBookmark}>
          <MaterialCommunityIcons
            color={isBookmarked ? Colors.primary : Colors.white}
            size={hp('5%')}
            name={isBookmarked ? 'bookmark-check' : 'bookmark-plus'}
          />
        </TouchableOpacity>
        <FastImage source={image} style={styles.image} resizeMode="stretch" />
        <View height={5} />
        <View row alignItems="center">
          <MaterialCommunityIcons
            color={Colors.yellow}
            size={hp('2%')}
            name="star"
          />
          <View width={2} />
          <Text fontSize={hp('1.5%')}>{rating}</Text>
        </View>
        <Text fontSize={hp('1.8%')} fontWeight="500" numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieHorizontalItem;

const styles = StyleSheet.create({
  image: {
    height: hp('25%'),
    width: wp('35%'),
    borderRadius: 5,
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
