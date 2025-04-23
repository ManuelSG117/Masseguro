import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

export const AuthScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>+Seguro</Text>
        <Text style={styles.subtitle}>
          Tu plataforma de reportes de seguridad y prevención
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar sesión con Google"
          onPress={() => {/* TODO: Implement Google Sign In */}}
          buttonStyle={styles.googleButton}
          icon={
            <Icon
              name="google"
              type="font-awesome"
              color="#fff"
              size={20}
              containerStyle={styles.buttonIcon}
            />
          }
        />
        <Button
          title="Iniciar sesión con correo"
          onPress={() => navigation.navigate('EmailLogin')}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [theme.colors.primary, theme.colors.primaryDark],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          buttonStyle={styles.emailButton}
          icon={
            <Icon
              name="envelope"
              type="font-awesome"
              color="#fff"
              size={20}
              containerStyle={styles.buttonIcon}
            />
          }
        />
        <Button
          title="¿No tienes cuenta? Regístrate aquí"
          type="clear"
          onPress={() => navigation.navigate('EmailSignup')}
          titleStyle={styles.registerText}
          containerStyle={styles.registerContainer}
        />
      </View>

      <Text style={styles.versionText}>v1.0.0</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    marginBottom: 15,
    height: 54,
    borderRadius: 27,
  },
  emailButton: {
    backgroundColor: theme.colors.primary,
    marginBottom: 15,
    height: 54,
    borderRadius: 27,
  },
  buttonIcon: {
    marginRight: 10,
  },
  registerText: {
    color: '#4285F4',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 10,
  },
  versionText: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
});