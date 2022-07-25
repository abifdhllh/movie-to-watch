import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import View from '@components/View';
import PersonItem from '@components/ListItem/PersonItem';
import Text from '@components/Text';
import {Dispatch, RootState} from '@store/index';
import {Colors} from '@utils/theme';
import {getAge, getImageApi} from '@utils/functions';
import FastImage from 'react-native-fast-image';
import {Cast} from '@store/models/types';

type Props = {
  title: string;
  id: number;
  keyID: string;
  mediaType: string;
};

const HorizontalPersonList = ({
  title,
  id: mediaId,
  keyID,
  mediaType,
}: Props) => {
  const {cast, loadingCast, castDetail, loadingCastDetail} = useSelector(
    (state: RootState) => state.movie,
  );
  const dispatch = useDispatch<Dispatch>();

  const [modalDetail, setModalDetail] = useState(false);
  const castDataRef = useRef<Cast | Record<string, never>>({});
  const castData = castDataRef.current as Cast;

  const renderItem = useCallback(
    ({item}: any) => (
      <PersonItem
        onPress={() => onModalOpen(item)}
        characterName={item.character}
        realName={item.name}
        image={getImageApi(item.profile_path, 'w300') as {uri: string}}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => `${keyID}-${index}`,
    [keyID],
  );

  function onModalClose() {
    setModalDetail(false);
  }

  function onModalOpen(castDataParam: Cast) {
    castDataRef.current = castDataParam;
    setModalDetail(true);
    dispatch.movie?.getCastDetail(castDataParam.id);
  }

  useEffect(() => {
    dispatch.movie?.getMainCast({mediaId, mediaType});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {!!title && (
        <>
          <Text
            fontSize={hp('2%')}
            color={Colors.gray}
            fontWeight="bold"
            paddingHorizontal={14}>
            {title}
          </Text>
          <View height={10} />
        </>
      )}

      <FlatList
        data={cast}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View width={20} />}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() =>
          loadingCast ? (
            <View height={hp('20%')} flex={1}>
              <ActivityIndicator color={Colors.primary} size="large" />
            </View>
          ) : (
            <View />
          )
        }
      />

      <Modal
        style={styles.modalContainer}
        isVisible={modalDetail}
        onBackButtonPress={onModalClose}
        onBackdropPress={onModalClose}
        statusBarTranslucent
        useNativeDriverForBackdrop
        onSwipeComplete={onModalClose}
        swipeDirection={['down']}
        propagateSwipe={true}>
        <View
          backgroundColor={Colors.white}
          height={'60%'}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}>
          <View
            alignSelf="center"
            height={5}
            width={'20%'}
            borderRadius={10}
            backgroundColor={Colors.grayWhite}
            marginVertical={16}
          />
          {loadingCastDetail ? (
            <View container center>
              <ActivityIndicator color={Colors.primary} size="large" />
            </View>
          ) : (
            <ScrollView style={styles.scrollViewContainer}>
              <TouchableOpacity>
                <View paddingHorizontal={5}>
                  <View row>
                    <FastImage
                      source={
                        getImageApi(castDetail.profile_path) as {uri: string}
                      }
                      style={styles.personImage}
                    />
                    <View paddingHorizontal={10} flexShrink={1}>
                      <Text
                        color={Colors.gray}
                        fontWeight="bold"
                        fontSize={hp('2.3%')}>
                        {`${castDetail?.name}`}{' '}
                        <Text
                          fontWeight="normal"
                          color={Colors.gray}
                          fontSize={hp('2.3%')}>
                          ({castData?.character})
                        </Text>
                      </Text>
                      <View height={5} />
                      <Text fontSize={hp('2%')} color={Colors.grayWhite}>
                        {castDetail?.known_for_department}
                      </Text>
                      <View height={5} />
                      <Text fontSize={hp('2%')} color={Colors.grayWhite}>
                        {castDetail?.birthday
                          ? getAge(castDetail?.birthday)
                          : 'Uninformed age'}
                      </Text>
                      <View height={5} />
                      <Text fontSize={hp('2%')} color={Colors.grayWhite}>
                        {castDetail?.place_of_birth
                          ? castDetail?.place_of_birth
                          : 'Uninformed place of birth'}
                      </Text>
                    </View>
                  </View>
                  <View marginTop={20}>
                    <Text
                      fontWeight="bold"
                      color={Colors.gray}
                      fontSize={hp('2.3%')}>
                      Biography
                    </Text>
                    <View height={5} />
                    <Text
                      fontSize={hp('2%')}
                      color={Colors.grayWhite}
                      textAlign="justify">
                      {castDetail?.biography + castDetail?.biography ||
                        'Uninformed'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View height={16} />
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HorizontalPersonList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 14,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollViewContainer: {
    paddingHorizontal: 16,
  },
  personImage: {
    height: hp('25%'),
    width: wp('35%'),
    borderRadius: 5,
  },
});
