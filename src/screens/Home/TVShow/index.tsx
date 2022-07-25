import {FlatList, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import View from '@components/View';
import Text from '@components/Text';
import {Colors} from '@utils/theme';
import MovieHorizontalItem from '@components/ListItem/MovieItem';
import {Dispatch, RootState} from '@store/index';
import {cutText, getImageApi, round} from '@utils/functions';
import {MEDIA_TYPE} from '@utils/constant';

const HomeTVShow = () => {
  const {tvShow} = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.home?.getAiringTodayTVShow();
    dispatch.home?.getOnTheAirTVShow();
    dispatch.home?.getPopularTVShow();
    dispatch.home?.getTopRatedTVShow();
    dispatch.home?.getTrendingTVShow(MEDIA_TYPE.TV);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View height={15} />

      <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
        Trending
      </Text>
      <View height={10} />
      <FlatList
        horizontal
        data={tvShow.trending}
        keyExtractor={(_, index) => `list-trending-tv-show-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={item.title}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <View height={20} />

      <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
        Popular
      </Text>
      <View height={10} />
      <FlatList
        horizontal
        data={tvShow.popular}
        keyExtractor={(_, index) => `list-popular-tv-show-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={cutText(item.name as string, 30)}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <View height={20} />

      <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
        Top Rated
      </Text>
      <View height={10} />
      <FlatList
        horizontal
        data={tvShow.topRated}
        keyExtractor={(_, index) => `list-top-rated-tv-show-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={cutText(item.name as string, 30)}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <View height={20} />

      <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
        Airing Today
      </Text>
      <View height={10} />
      <FlatList
        horizontal
        data={tvShow.airingToday}
        keyExtractor={(_, index) => `list-now-showing-tv-show-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={item.title}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <View height={20} />

      <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
        On The Air
      </Text>
      <View height={10} />
      <FlatList
        horizontal
        data={tvShow.onTheAir}
        keyExtractor={(_, index) => `list-upcoming-tv-show-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={item.title}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
          />
        )}
        ItemSeparatorComponent={() => <View width={15} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <View height={15} />
    </ScrollView>
  );
};

export default HomeTVShow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  list: {
    paddingHorizontal: 15,
  },
});
