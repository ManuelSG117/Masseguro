import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Input, Button, Text, Icon, Divider } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const EmailSignupScreen = ({ navigation }: any) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const password = watch("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const getPasswordStrength = (pass: string): { strength: number; message: string } => {
    if (!pass) return { strength: 0, message: '' };
    
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    const messages = [
      'Muy débil',
      'Débil',
      'Media',
      'Fuerte',
      'Muy fuerte'
    ];

    return { strength, message: messages[strength] };
  };

  const onSubmit = (data: FormData) => {
    // TODO: Implementar registro con Firebase
    console.log(data);
    navigation.navigate('ProfileSetup');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text h2 style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>
            Únete a +Seguro para contribuir a un Uruapan más seguro
          </Text>
        </View>
      </LinearGradient>
      
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'El correo es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo inválido'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              leftIcon={
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={20}
                  color="#666"
                  containerStyle={styles.iconContainer}
                />
              }
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'La contraseña es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Input
                placeholder="Contraseña"
                secureTextEntry={!passwordVisible}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                }}
                errorMessage={errors.password?.message}
                leftIcon={
                  <Icon
                    name="lock"
                    type="font-awesome"
                    size={20}
                    color="#666"
                    containerStyle={styles.iconContainer}
                  />
                }
                rightIcon={
                  <Icon
                    name={passwordVisible ? 'eye-slash' : 'eye'}
                    type="font-awesome"
                    size={20}
                    color="#666"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              
              <View style={styles.passwordTipsContainer}>
                <Text style={styles.passwordTipsTitle}>Para una contraseña fuerte incluye:</Text>
                <View style={styles.tipsGrid}>
                  <View style={styles.tipContainer}>
                    <Icon
                      name="check-circle"
                      type="font-awesome"
                      size={14}
                      color={/[A-Z]/.test(value || '') ? theme.colors.primary : '#D1D1D1'}
                      containerStyle={styles.tipIcon}
                    />
                    <Text style={[styles.passwordTip, /[A-Z]/.test(value || '') && styles.tipActive]}>
                      Mayúscula
                    </Text>
                  </View>
                  <View style={styles.tipContainer}>
                    <Icon
                      name="check-circle"
                      type="font-awesome"
                      size={14}
                      color={/[0-9]/.test(value || '') ? theme.colors.primary : '#D1D1D1'}
                      containerStyle={styles.tipIcon}
                    />
                    <Text style={[styles.passwordTip, /[0-9]/.test(value || '') && styles.tipActive]}>
                      Número
                    </Text>
                  </View>
                  <View style={styles.tipContainer}>
                    <Icon
                      name="check-circle"
                      type="font-awesome"
                      size={14}
                      color={/[^A-Za-z0-9]/.test(value || '') ? theme.colors.primary : '#D1D1D1'}
                      containerStyle={styles.tipIcon}
                    />
                    <Text style={[styles.passwordTip, /[^A-Za-z0-9]/.test(value || '') && styles.tipActive]}>
                      Caracter especial
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirma tu contraseña',
            validate: value => 
              value === password || 'Las contraseñas no coinciden'
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar contraseña"
              secureTextEntry={!confirmPasswordVisible}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.confirmPassword?.message}
              leftIcon={
                <Icon
                  name="lock"
                  type="font-awesome"
                  size={20}
                  color="#666"
                  containerStyle={styles.iconContainer}
                />
              }
              rightIcon={
                <Icon
                  name={confirmPasswordVisible ? 'eye-slash' : 'eye'}
                  type="font-awesome"
                  size={20}
                  color="#666"
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                />
              }
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />
          )}
        />

        <Button
          title="Registrarse"
          onPress={handleSubmit(onSubmit)}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [theme.colors.primary, theme.colors.primaryDark],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          buttonStyle={styles.registerButton}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="user-plus"
              type="font-awesome"
              color="#fff"
              size={20}
              containerStyle={styles.iconContainer}
            />
          }
        />

        <Divider style={styles.divider} />

        <Button
          title="¿Ya tienes cuenta? Inicia sesión"
          type="clear"
          onPress={() => navigation.navigate('Auth')}
          titleStyle={styles.loginButtonText}
          icon={
            <Icon
              name="arrow-left"
              type="font-awesome"
              color="#4285F4"
              size={16}
              containerStyle={styles.iconContainer}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 10,
    lineHeight: 24,
  },
  formContainer: {
    padding: 20,
    paddingTop: 30,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 56,
    backgroundColor: '#F8F8F8',
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  passwordTipsContainer: {
    paddingHorizontal: 10,
    marginTop: -5,
    marginBottom: 15,
  },
  passwordTipsTitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
  },
  tipsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    marginRight: 6,
  },
  passwordTip: {
    color: '#666',
    fontSize: 12,
  },
  tipActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  registerButton: {
    height: 56,
    borderRadius: 28,
    marginTop: 20,
    borderWidth: 0,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginVertical: 25,
  },
  loginButtonText: {
    color: '#4285F4',
    fontSize: 16,
  },
});