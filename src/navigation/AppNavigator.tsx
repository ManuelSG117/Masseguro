import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';

import { AuthScreen } from '../screens/AuthScreen';
import { EmailLoginScreen } from '../screens/EmailLoginScreen';
import { EmailSignupScreen } from '../screens/EmailSignupScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ProfileSetupScreen } from '../screens/ProfileSetupScreen';
import { CreateReportScreen } from '../screens/CreateReportScreen';
import { ReportsListScreen } from '../screens/ReportsListScreen';
import { ReportDetailScreen } from '../screens/ReportDetailScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLoginScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen
          name="EmailSignup"
          component={EmailSignupScreen}
          options={{ title: 'Registro con Correo' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Recuperar Contraseña' }}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
          options={{ title: 'Configurar Perfil' }}
        />
        <Stack.Screen
          name="ReportsList"
          component={ReportsListScreen}
          options={{ title: 'Mis Reportes' }}
        />
        <Stack.Screen
          name="CreateReport"
          component={CreateReportScreen}
          options={{ title: 'Nuevo Reporte' }}
        />
        <Stack.Screen
          name="ReportDetail"
          component={ReportDetailScreen}
          options={{ title: 'Detalles del Reporte' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};