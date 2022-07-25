import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
import {MediaListReponse} from '@store/models/types';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({navigation, route}: Props) => {
  const {customUrl, screenToNavigate} = route?.params || {};
  const {list, loadingList} = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch<Dispatch>();
  const movieList = list as MediaListReponse;

  function onLoadMore() {
    if (movieList.page <= movieList.total_pages) {
      dispatch.movie?.getMovieList({customUrl});
    }
  }

  function onRefresh() {
    dispatch.movie?.getMovieList({customUrl, isInitial: true});
  }

  useEffect(() => {
    dispatch.movie?.getMovieList({customUrl, isInitial: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={false}
      style={styles.listContainer}
      data={movieList?.results || []}
      numColumns={2}
      ItemSeparatorComponent={() => <View height={16} />}
      keyExtractor={(_, index) => `list-media-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screenToNavigate as 'MovieDetail', {
              id: item.id,
            })
          }
          style={styles.touchable}>
          <View height={hp('35%')}>
            <TouchableOpacity style={styles.iconBookmarkContainer}>
              <MaterialCommunityIcons
                color={Colors.white}
                size={hp('5%')}
                name="bookmark-plus"
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
      ListEmptyComponent={() =>
        loadingList ? (
          <View container center>
            <ActivityIndicator color={Colors.primary} size="large" />
          </View>
        ) : (
          <View />
        )
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        movieList?.page > 0 && loadingList ? (
          <View center marginVertical={5}>
            <ActivityIndicator color={Colors.primary} size="large" />
          </View>
        ) : (
          <View />
        )
      }
    />
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
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
    flex: 1,
    marginRight: 16,
  },
});
