import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import View from '@components/View';
import Text from '@components/Text';
import {Colors} from '@utils/theme';
import {HITSLOP_VALUE} from '@utils/constant';
import {SEARCH_ILLUSTRATION} from '@utils/images';
import {RootState, Dispatch} from '@store/index';
import {MediaListReponse} from '@store/models/types';
import {RootStackParamList} from '@navigation/types';
import {getImageApi, round} from '@utils/functions';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const Search = ({navigation}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const {searchResult, loadingSearchResult} = useSelector(
    (state: RootState) => state.movie,
  );
  const dispatch = useDispatch<Dispatch>();
  const searchResultList = searchResult as MediaListReponse;

  function onLoadMore() {
    if (searchResultList.page <= searchResultList.total_pages) {
      dispatch.movie?.getSearchResult({searchValue});
    }
  }

  function onChange(val: string) {
    setSearchValue(val);
    if (val) {
      dispatch.movie?.getSearchResult({searchValue: val, isInitial: true});
    }
  }

  return (
    <View container>
      <View
        row
        alignItems="center"
        backgroundColor={Colors.whiteDim}
        padding={10}
        borderRadius={10}
        marginHorizontal={20}
        marginTop={20}
        marginBottom={10}>
        <Octicons color={Colors.black} size={hp('2%')} name="search" />
        <View width={10} />
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchValue}
          onChangeText={onChange}
        />
        <View width={10} />
        {!!searchValue && (
          <TouchableOpacity
            onPress={() => setSearchValue('')}
            hitSlop={HITSLOP_VALUE}>
            <Octicons color={Colors.black} size={hp('2%')} name="x" />
          </TouchableOpacity>
        )}
      </View>
      {searchValue && loadingSearchResult && searchResult?.page === 0 ? (
        <View container center>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      ) : searchValue ? (
        <FlatList
          data={searchResultList?.results || []}
          contentContainerStyle={styles.list}
          numColumns={2}
          ItemSeparatorComponent={() => <View height={16} />}
          keyExtractor={(_, index) => `list-search-${index}`}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            searchResultList?.page > 0 && loadingSearchResult ? (
              <View center marginTop={16}>
                <ActivityIndicator color={Colors.primary} size="large" />
              </View>
            ) : (
              <View />
            )
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  item.media_type === 'movie' ? 'MovieDetail' : 'TVShowDetail',
                  {
                    id: item.id,
                  },
                )
              }
              style={styles.touchable}>
              <View height={hp('35%')}>
                <FastImage
                  source={
                    getImageApi(item.poster_path, 'w200') as {uri: string}
                  }
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
        />
      ) : (
        <View container center>
          <FastImage
            source={SEARCH_ILLUSTRATION}
            style={styles.imageEmpty}
            resizeMode="stretch"
          />
          <View height={35} />
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize={hp('2.5%')}
            paddingHorizontal={20}>
            Search your favorite Movie & TV Show
          </Text>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: hp('2%'),
  },
  list: {
    flexGrow: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  image: {
    height: hp('30%'),
    width: hp('20%'),
  },
  imageEmpty: {
    height: hp('30%'),
    width: hp('30%'),
  },
  touchable: {
    flex: 1,
    marginRight: 20,
  },
  iconBookmarkContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
});
