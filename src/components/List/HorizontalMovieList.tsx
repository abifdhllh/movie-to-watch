import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import React from 'react';

import View from '@components/View';
import MovieHorizontalItem from '@components/ListItem/MovieItem';
import {getImageApi, round} from '@utils/functions';
import Text from '@components/Text';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from '@utils/theme';

type Props = {
  title?: string;
  data: any;
  keyID: string;
  navigate: (screenName: string, params: any) => void;
  screenToNavigate: string;
  titleKey: string;
  loading: boolean;
};

const HorizontalMovieList = ({
  title,
  data,
  keyID,
  navigate,
  screenToNavigate,
  titleKey,
  loading,
}: Props) => {
  return (
    <>
      {!!title && (
        <>
          <Text fontSize={hp('2.5%')} fontWeight="bold" paddingHorizontal={15}>
            {title}
          </Text>
          <View height={10} />
        </>
      )}
      <FlatList
        horizontal
        data={data}
        keyExtractor={(_, index) => `${keyID}-${index}`}
        renderItem={({item}) => (
          <MovieHorizontalItem
            title={item[titleKey]}
            image={getImageApi(item.poster_path) as {uri: string}}
            rating={round(item.vote_average, 1)}
            onPress={() => navigate(screenToNavigate, {id: item.id})}
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
