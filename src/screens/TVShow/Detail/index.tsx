import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import Text from '@components/Text';
import View from '@components/View';
import {Colors} from '@utils/theme';
import {Dispatch, RootState} from '@store/index';
import {RootStackParamList} from '@navigation/types';
import {getImageApi, round} from '@utils/functions';
import moment from 'moment';
import HorizontalPersonList from '@components/List/HorizontalPersonList';
import {MEDIA_TYPE} from '@utils/constant';

type Props = NativeStackScreenProps<RootStackParamList, 'TVShowDetail'>;

const TVShowDetail = ({route}: Props) => {
  const {id: tvId} = route?.params || {};
  const {detail, loadingDetail} = useSelector(
    (state: RootState) => state.tvShow,
  );
  const dispatch = useDispatch<Dispatch>();

  console.log('Detail', detail);
  useEffect(() => {
    dispatch.tvShow?.getTVShowDetail(tvId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loadingDetail ? (
        <View container center>
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      ) : (
        <>
          {/* Header */}
          <View style={styles.headerImageContainer}>
            <FastImage
              style={styles.headerImage}
              source={
                getImageApi(detail?.backdrop_path, 'w500') as {uri: string}
              }
              resizeMode="stretch"
            />
            <View
              position="absolute"
              left={10}
              bottom={10}
              paddingRight={wp('20%')}>
              <Text fontSize={hp('3%')} color={Colors.white} fontWeight="bold">
                {detail?.name}
              </Text>
              <View row alignItems="center">
                <MaterialCommunityIcons
                  color={Colors.white}
                  size={hp('2.5%')}
                  name="star"
                />
                <View width={5} />
                <Text
                  fontSize={hp('2.5%')}
                  color={Colors.white}
                  fontWeight="bold">
                  {round(detail?.vote_average, 1)}
                </Text>
              </View>
            </View>
          </View>

          <View height={30} />

          {/* Body */}
          <View row paddingHorizontal={14}>
            <View>
              <FastImage
                source={
                  getImageApi(detail?.poster_path, 'w500') as {uri: string}
                }
                style={styles.bodyImage}
                resizeMode="stretch"
              />
            </View>
            <View
              paddingHorizontal={16}
              justifyContent="space-between"
              flexShrink={1}>
              <View>
                <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
                  Season & Episodes
                </Text>
                <Text color={Colors.grayWhite}>
                  {`${detail?.number_of_seasons} Season(s) & ${detail?.number_of_episodes} Episode(s)`}
                </Text>
              </View>
              <View>
                <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
                  Genre
                </Text>
                <Text color={Colors.grayWhite}>
                  {detail?.genres?.map(item => item.name).join(', ')}
                </Text>
              </View>
              <View>
                <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
                  Last Air Date
                </Text>
                <Text color={Colors.grayWhite}>
                  {detail?.last_air_date
                    ? moment(detail?.last_air_date).format('D MMM YYYY')
                    : ''}
                </Text>
              </View>
              <View>
                <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
                  Available Language
                </Text>
                <Text color={Colors.grayWhite}>
                  {detail?.spoken_languages
                    ?.map(item => item.english_name)
                    .join(', ')}
                </Text>
              </View>
            </View>
          </View>

          <View height={22} />

          <View paddingHorizontal={14}>
            <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
              Overview
            </Text>
            <View height={10} />
            <Text color={Colors.grayWhite} textAlign="justify">
              {`${detail?.overview}`}
            </Text>
          </View>

          <View height={22} />

          <View>
            <HorizontalPersonList
              title="Main Cast"
              id={tvId}
              keyID="list-movie-cast"
              mediaType={MEDIA_TYPE.TV}
            />
          </View>

          <View height={22} />

          <View paddingHorizontal={14}>
            <Text fontSize={hp('2%')} color={Colors.gray} fontWeight="bold">
              More Info
            </Text>
            <View height={10} />
            <View row>
              <Text flex={1.5} color={Colors.grayWhite}>
                Original Title
              </Text>
              <Text flex={3} color={Colors.grayWhite} fontWeight="bold">
                {detail?.original_name}
              </Text>
            </View>
            <View height={5} />
            <View row>
              <Text flex={1.5} color={Colors.grayWhite}>
                Status
              </Text>
              <Text flex={3} color={Colors.grayWhite} fontWeight="bold">
                {detail?.status}
              </Text>
            </View>
            <View height={5} />
            <View row>
              <Text flex={1.5} color={Colors.grayWhite}>
                Companies
              </Text>
              <Text flex={3} color={Colors.grayWhite} fontWeight="bold">
                {detail?.production_companies
                  ?.map(item => item?.name)
                  .join(', ')}
              </Text>
            </View>
            <View height={5} />
            <View row>
              <Text flex={1.5} color={Colors.grayWhite}>
                Networks
              </Text>
              <Text flex={3} color={Colors.grayWhite} fontWeight="bold">
                {detail?.networks?.map(item => item?.name).join(', ')}
              </Text>
            </View>
          </View>

          <View height={14} />
        </>
      )}
    </ScrollView>
  );
};

export default TVShowDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  headerImageContainer: {
    height: hp('30%'),
    width: '100%',
    backgroundColor: Colors.black,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  bodyImage: {
    height: hp('25%'),
    width: wp('35%'),
    borderRadius: 5,
  },
  list: {
    paddingHorizontal: 14,
  },
});
