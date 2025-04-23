import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text, Icon, Divider } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

type FormData = {
  email: string;
};

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = (data: FormData) => {
    // TODO: Implementar recuperación de contraseña con Firebase
    console.log(data);
    setIsEmailSent(true);
  };

  if (isEmailSent) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={styles.headerContainer}
        >
          <View style={styles.headerContent}>
            <Text h2 style={styles.title}>¡Correo Enviado!</Text>
            <Text style={styles.subtitle}>
              Revisa tu bandeja de entrada y sigue las instrucciones para recuperar tu contraseña
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.successContainer}>
            <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary }]}>
              <Icon
                name="check"
                type="font-awesome"
                color="#fff"
                size={40}
              />
            </View>
            
            <Text style={styles.successText}>
              Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.
              Si no lo encuentras en tu bandeja de entrada, revisa tu carpeta de spam.
            </Text>

            <Button
              title="Volver a Inicio"
              onPress={() => navigation.navigate('Auth')}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [theme.colors.primary, theme.colors.primaryDark],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              }}
              buttonStyle={styles.backButton}
              titleStyle={styles.buttonTitle}
              icon={
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  color="#fff"
                  size={20}
                  containerStyle={styles.iconContainer}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text h2 style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña
          </Text>
        </View>
      </LinearGradient>
      
      <View style={styles.formContainer}>
        <View style={styles.infoContainer}>
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color="#666"
            containerStyle={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Te enviaremos un correo con un enlace para que puedas crear una nueva contraseña segura
          </Text>
        </View>

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

        <Button
          title="Enviar Instrucciones"
          onPress={handleSubmit(onSubmit)}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [theme.colors.primary, theme.colors.primaryDark],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          buttonStyle={styles.submitButton}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="paper-plane"
              type="font-awesome"
              color="#fff"
              size={20}
              containerStyle={styles.iconContainer}
            />
          }
        />

        <Divider style={styles.divider} />

        <Button
          title="Volver a Inicio"
          type="clear"
          onPress={() => navigation.navigate('Auth')}
          titleStyle={styles.backText}
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
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
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
  submitButton: {
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
  backText: {
    color: '#4285F4',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  successText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    height: 56,
    borderRadius: 28,
    marginTop: 10,
    borderWidth: 0,
    paddingHorizontal: 30,
  },
});