import React from 'react';
import { StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

interface MinimalButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'filled' | 'outlined' | 'text';
  icon?: string;
  iconType?: string;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const MinimalButton = ({ 
  title, 
  variant = 'filled',
  icon,
  iconType = 'font-awesome-5',
  loading,
  disabled,
  containerStyle,
  ...props 
}: MinimalButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'outlined':
        return styles.outlinedButton;
      case 'text':
        return styles.textButton;
      default:
        return styles.filledButton;
    }
  };

  const getTitleStyle = () => {
    switch (variant) {
      case 'outlined':
        return styles.outlinedTitle;
      case 'text':
        return styles.textTitle;
      default:
        return styles.filledTitle;
    }
  };

  return (
    <Button
      title={title}
      disabled={disabled}
      loading={loading}
      loadingProps={{ color: variant === 'filled' ? '#fff' : theme.colors.primary }}
      ViewComponent={variant === 'filled' ? LinearGradient : undefined}
      linearGradientProps={variant === 'filled' ? {
        colors: [theme.colors.primary, theme.colors.primaryDark],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      } : undefined}
      icon={icon ? {
        name: icon,
        type: iconType,
        color: variant === 'filled' ? '#fff' : theme.colors.primary,
        size: 20,
      } : undefined}
      buttonStyle={[styles.button, getButtonStyle()]}
      titleStyle={[styles.title, getTitleStyle()]}
      containerStyle={[styles.container, containerStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  button: {
    height: 56,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.xl,
  },
  filledButton: {
    borderWidth: 0,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: '600',
  },
  filledTitle: {
    color: '#fff',
  },
  outlinedTitle: {
    color: theme.colors.primary,
  },
  textTitle: {
    color: theme.colors.primary,
  },
});