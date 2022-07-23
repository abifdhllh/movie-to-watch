import React, {ReactElement} from 'react';
import {
  StyleProp,
  View as ViewReactNative,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Colors} from '@utils/theme';

type IProps = StyleProp<ViewStyle> &
  ViewProps & {
    children?: string | React.ReactNode;
    center?: boolean;
    style?: ViewStyle;
    row?: boolean;
    container?: boolean;
  };

// @ts-ignore
function View({
  center,
  children,
  style,
  row,
  container,
  // @ts-ignore
  ...props
}: IProps): ReactElement {
  const customStyles = {
    alignItems: center ? 'center' : props.alignItems,
    justifyContent: center ? 'center' : props.justifyContent,
    flexDirection: row ? 'row' : props.flexDirection,
    flex: container ? 1 : props.flex,
    backgroundColor: container ? Colors.white : props.backgroundColor,
  };

  return (
    <ViewReactNative
      testID={props.testID}
      accessibilityLabel={props.accessibilityLabel}
      style={[props, customStyles, style]}>
      {children}
    </ViewReactNative>
  );
}

export default View;
