import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text, Icon, Divider } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';


type FormData = {
  email: string;
  password: string;
};

export const EmailLoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    // TODO: Implementar inicio de sesión con Firebase
    console.log(data);
    navigation.navigate('ReportsList');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text h2 style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Bienvenido de vuelta a +Seguro
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
            required: 'La contraseña es requerida'
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Contraseña"
              secureTextEntry={!passwordVisible}
              value={value}
              onChangeText={onChange}
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
          )}
        />

        <Button
          title="Iniciar Sesión"
          onPress={handleSubmit(onSubmit)}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [theme.colors.primary, theme.colors.primaryDark],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          buttonStyle={styles.loginButton}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="sign-in"
              type="font-awesome"
              color="#fff"
              size={20}
              containerStyle={styles.iconContainer}
            />
          }
        />

        <Button
          title="¿Olvidaste tu contraseña?"
          type="clear"
          onPress={() => navigation.navigate('ForgotPassword')}
          titleStyle={styles.forgotPasswordText}
          containerStyle={styles.forgotPasswordContainer}
        />

        <Divider style={styles.divider} />

        <Button
          title="¿No tienes cuenta? Regístrate aquí"
          type="clear"
          onPress={() => navigation.navigate('Auth')}
          titleStyle={styles.registerText}
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
  loginButton: {
    height: 56,
    borderRadius: 28,
    marginTop: 20,
    borderWidth: 0,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  forgotPasswordContainer: {
    marginTop: 15,
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginVertical: 25,
  },
  registerText: {
    color: '#4285F4',
    fontSize: 16,
  },
});