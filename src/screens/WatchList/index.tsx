import React from 'react';
import {Alert, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Text from '@components/Text';
import View from '@components/View';
import {RootStackParamList} from '@navigation/types';
import {RootState, Dispatch} from '@store/index';
import {Colors} from '@utils/theme';
import {getImageApi, round} from '@utils/functions';
import {WATCH_LIST_ILLUSTRATION} from '@utils/images';

type Props = NativeStackScreenProps<RootStackParamList, 'WatchList'>;

const WatchList = ({navigation}: Props) => {
  const {watchList} = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch<Dispatch>();

  const onPressBookmark = (item: any) => {
    dispatch.movie?.removeWatchListData(item.id);
    Alert.alert('Successfully removed from Watch WatchList!');
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={watchList}
      numColumns={2}
      ItemSeparatorComponent={() => <View height={16} />}
      keyExtractor={(_, index) => `list-watch-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(item.name ? 'TVShowDetail' : 'MovieDetail', {
              id: item.id,
            })
          }
          style={styles.touchable}>
          <View height={hp('35%')}>
            <TouchableOpacity
              style={styles.iconBookmarkContainer}
              onPress={() => onPressBookmark(item)}>
              <MaterialCommunityIcons
                color={Colors.primary}
                size={hp('5%')}
                name={'bookmark-check'}
              />
            </TouchableOpacity>
            <FastImage
              source={getImageApi(item.poster_path, 'w200') as {uri: string}}
              style={styles.image}
              resizeMode="stretch"
            />
            <View height={5} />
            <View row alignItems="center">
              <MaterialCommunityIcons
                color={Colors.yellow}
                size={hp('2%')}
                name="star"
              />
              <View width={2} />
              <Text fontSize={hp('1.5%')}>{round(item.vote_average)}</Text>
            </View>
            <Text fontSize={hp('1.8%')} fontWeight="500" numberOfLines={1}>
              {item.title || item.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={() => (
        <View container center>
          <FastImage
            source={WATCH_LIST_ILLUSTRATION}
            style={styles.imageEmpty}
            resizeMode="stretch"
          />
          <View height={35} />
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize={hp('2.5%')}
            paddingHorizontal={20}>
            You don't have any Watch List yet
          </Text>
        </View>
      )}
    />
  );
};

export default WatchList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  image: {
    height: hp('30%'),
    width: '100%',
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
  touchable: {
    width: '50%',
    paddingHorizontal: 10,
  },
  imageEmpty: {
    height: hp('30%'),
    width: hp('40%'),
  },
});
