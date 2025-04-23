import React from 'react';
import { StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { theme } from '../theme/theme';

interface MinimalInputProps extends TextInputProps {
  icon?: string;
  iconType?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const MinimalInput = ({ icon, iconType = 'font-awesome-5', error, containerStyle, ...props }: MinimalInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Input
        {...props}
        leftIcon={
          icon ? (
            <Icon
              name={icon}
              type={iconType}
              size={20}
              color={theme.colors.text.secondary}
              containerStyle={styles.iconContainer}
            />
          ) : undefined
        }
        errorMessage={error}
        containerStyle={styles.inputContainer}
        inputContainerStyle={[
          styles.input,
          error ? styles.inputError : null
        ]}
        inputStyle={styles.inputText}
        errorStyle={styles.errorText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    height: 56,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.text.primary,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
});