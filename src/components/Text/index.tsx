import React, {ReactElement} from 'react';
import {StyleProp, Text as TextRN, TextProps, TextStyle} from 'react-native';
import {Colors} from '@utils/theme';

type IProps = StyleProp<TextStyle> &
  TextProps & {
    children?: string | React.ReactNode;
    style?: TextStyle;
    numberOfLines?: number;
  };

// @ts-ignore
function Text({
  children,
  style,
  numberOfLines,
  // @ts-ignore
  ...props
}: IProps): ReactElement {
  const color = props.color || Colors.black;

  return (
    <TextRN
      testID={props.testID}
      accessibilityLabel={props.accessibilityLabel || props.testID}
      style={[{color}, props, style]}
      numberOfLines={numberOfLines}>
      {children}
    </TextRN>
  );
}

export default Text;
