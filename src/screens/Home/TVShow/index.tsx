import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import View from '@components/View';
import HorizontalMovieList from '@components/List/HorizontalMovieList';
import {Colors} from '@utils/theme';
import {Dispatch, RootState} from '@store/index';
import {MEDIA_TYPE} from '@utils/constant';
import {RootStackParamList} from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TabMenu'>;

const HomeTVShow = ({navigation}: Props) => {
  const {tvShow} = useSelector((state: RootState) => state.home);
  const {
    loadingAiringToday,
    loadingOnTheAir,
    loadingPopular,
    loadingTopRated,
    loadingTrending,
  } = tvShow;
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

      <HorizontalMovieList
        data={tvShow.trending}
        title="Trending"
        keyID="list-trending-tv-show"
        navigate={navigation.navigate}
        screenToNavigate="TVShowDetail"
        titleKey="name"
        loading={loadingTrending}
        customUrl="/trending/tv/week"
        headerTitle="Trending TV Show"
      />

      <View height={20} />

      <HorizontalMovieList
        data={tvShow.airingToday}
        title="Airing Today"
        keyID="list-airing-today-tv-show"
        navigate={navigation.navigate}
        screenToNavigate="TVShowDetail"
        titleKey="name"
        loading={loadingAiringToday}
        customUrl="/tv/airing_today"
        headerTitle="Airing Today TV Show"
      />

      <View height={20} />

      <HorizontalMovieList
        data={tvShow.onTheAir}
        title="On The Air"
        keyID="list-on-the-air-tv-show"
        navigate={navigation.navigate}
        screenToNavigate="TVShowDetail"
        titleKey="name"
        loading={loadingOnTheAir}
        customUrl="/tv/on_the_air"
        headerTitle="On The Air TV Show"
      />

      <View height={20} />

      <HorizontalMovieList
        data={tvShow.popular}
        title="Popular"
        keyID="list-popular-tv-show"
        navigate={navigation.navigate}
        screenToNavigate="TVShowDetail"
        titleKey="name"
        loading={loadingPopular}
        customUrl="/tv/popular"
        headerTitle="Popular TV Show"
      />

      <View height={20} />

      <HorizontalMovieList
        data={tvShow.topRated}
        title="Top Rated"
        keyID="list-top-rated-tv-show"
        navigate={navigation.navigate}
        screenToNavigate="TVShowDetail"
        titleKey="name"
        loading={loadingTopRated}
        customUrl="/tv/top_rated"
        headerTitle="Top Rated TV Show"
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
