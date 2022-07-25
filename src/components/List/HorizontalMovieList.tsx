import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import View from '@components/View';
import MovieHorizontalItem from '@components/ListItem/MovieItem';
import {getImageApi, round} from '@utils/functions';
import Text from '@components/Text';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from '@utils/theme';
import {HITSLOP_VALUE} from '@utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, Dispatch} from '@store/index';

type Props = {
  title?: string;
  data: any;
  keyID: string;
  navigate: (screenName: string, params: any) => void;
  screenToNavigate: string;
  titleKey: string;
  loading: boolean;
  customUrl: string;
  headerTitle: string;
};

const HorizontalMovieList = ({
  title,
  data,
  keyID,
  navigate,
  screenToNavigate,
  titleKey,
  loading,
  customUrl,
  headerTitle,
}: Props) => {
  const {watchList} = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch<Dispatch>();

  const filteredData = data.map((item: any) => ({
    ...item,
    isBookmarked: watchList?.some(listItem =>
      listItem.id === item.id ? true : false,
    ),
  }));

  const onPressBookmark = (item: any) => {
    if (item.isBookmarked) {
      dispatch.movie?.removeWatchListData(item.id);
      Alert.alert('Successfully removed from Watch List!');
    } else {
      dispatch.movie?.setWatchListData(item);
      Alert.alert('Successfully added to Watch List!');
    }
  };

  return (
    <>
      {!!title && (
        <>
          <View row justifyContent="space-between" alignItems="center">
            <Text
              fontSize={hp('2.5%')}
              fontWeight="bold"
              paddingHorizontal={15}>
              {title}
            </Text>
            <TouchableOpacity
              hitSlop={HITSLOP_VALUE}
              onPress={() =>
                navigate('List', {
                  customUrl,
                  title: headerTitle,
                  screenToNavigate,
                })
              }>
              <MaterialCommunityIcons
                color={Colors.black}
                size={hp('4%')}
                name="chevron-right"
              />
            </TouchableOpacity>
          </View>
          <View height={10} />
        </>
      )}
      <FlatList
        horizontal
        data={filteredData}
        keyExtractor={(_, index) => `${keyID}-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={item[titleKey]}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
            onPress={() => navigate(screenToNavigate, {id: item.id})}
            onPressBookmark={() => onPressBookmark(item)}
            isBookmarked={item.isBookmarked}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() =>
          loading ? (
            <View height={hp('20%')} container center>
              <ActivityIndicator color={Colors.primary} size="large" />
            </View>
          ) : (
            <View />
          )
        }
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HorizontalMovieList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
});
