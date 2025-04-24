import React from 'react';
import { Text as RNEText } from 'react-native-elements';
import { TextProps } from 'react-native-elements';

/**
 * A wrapper for react-native-elements Text component that uses default parameters
 * instead of defaultProps to avoid the React warning about defaultProps deprecation.
 */
export const Text = ({
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  style = {},
  h1Style = {},
  h2Style = {},
  h3Style = {},
  h4Style = {},
  ...rest
}: TextProps) => {
  return (
    <RNEText
      h1={h1}
      h2={h2}
      h3={h3}
      h4={h4}
      style={style}
      h1Style={h1Style}
      h2Style={h2Style}
      h3Style={h3Style}
      h4Style={h4Style}
      {...rest}
    />
  );
};