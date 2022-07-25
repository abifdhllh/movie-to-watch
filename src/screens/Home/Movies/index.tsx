import {FlatList, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import View from '@components/View';
import Text from '@components/Text';
import {Colors} from '@utils/theme';
import MovieHorizontalItem from '@components/ListItem/MovieItem';
import {Dispatch, RootState} from '@store/index';
import {getImageApi, round} from '@utils/functions';
import {MEDIA_TYPE} from '@utils/constant';
import {RootStackParamList} from '@navigation/types';
import HorizontalMovieList from '@components/List/HorizontalMovieList';

type Props = NativeStackScreenProps<RootStackParamList, 'TabMenu'>;

const HomeMovies = ({navigation}: Props) => {
  const {movies} = useSelector((state: RootState) => state.home);
  const {
    loadingNowPlaying,
    loadingPopular,
    loadingTopRated,
    loadingTrending,
    loadingUpcoming,
  } = movies;
  console.log('Loading', loadingNowPlaying);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.home?.getNowPlayingMovies();
    dispatch.home?.getUpcomingMovies();
    dispatch.home?.getPopularMovies();
    dispatch.home?.getTopRatedMovies();
    dispatch.home?.getTrendingMovies(MEDIA_TYPE.MOVIE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View height={15} />

      <HorizontalMovieList
        data={movies.trending}
        title="Trending"
        keyID="list-trending-movie"
        navigate={navigation.navigate}
        screenToNavigate="MovieDetail"
        titleKey="title"
        loading={loadingTrending}
      />

      <View height={20} />

      <HorizontalMovieList
        data={movies.nowPlaying}
        title="Now Showing"
        keyID="list-now-showing-movie"
        navigate={navigation.navigate}
        screenToNavigate="MovieDetail"
        titleKey="title"
        loading={loadingNowPlaying}
      />

      <View height={20} />

      <HorizontalMovieList
        data={movies.upcoming}
        title="Upcoming"
        keyID="list-upcoming-movie"
        navigate={navigation.navigate}
        screenToNavigate="MovieDetail"
        titleKey="title"
        loading={loadingUpcoming}
      />

      <View height={20} />

      <HorizontalMovieList
        data={movies.popular}
        title="Popular"
        keyID="list-popular-movie"
        navigate={navigation.navigate}
        screenToNavigate="MovieDetail"
        titleKey="title"
        loading={loadingPopular}
      />

      <View height={20} />

      <HorizontalMovieList
        data={movies.topRated}
        title="Top Rated"
        keyID="list-top-rated-movie"
        navigate={navigation.navigate}
        screenToNavigate="MovieDetail"
        titleKey="title"
        loading={loadingTopRated}
      />

      <View height={15} />
    </ScrollView>
  );
};

export default HomeMovies;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  list: {
    paddingHorizontal: 15,
  },
});
