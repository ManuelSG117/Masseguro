import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

export const ProfileSetupScreen = ({ navigation }: any) => {
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    phone: '',
    neighborhood: '',
    street: '',
    zipCode: '',
    profileImage: '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData({ ...profileData, profileImage: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    // TODO: Implement profile data saving
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={profileData.profileImage ? { uri: profileData.profileImage } : require('../../assets/icon.png')}
          style={styles.profileImage}
          onPress={pickImage}
        />
      </View>
      
      <Input
        placeholder="Nombre de usuario"
        value={profileData.username}
        onChangeText={(text) => setProfileData({ ...profileData, username: text })}
      />
      <Input
        placeholder="Nombre completo"
        value={profileData.fullName}
        onChangeText={(text) => setProfileData({ ...profileData, fullName: text })}
      />
      <Input
        placeholder="Teléfono"
        value={profileData.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
      />
      <Input
        placeholder="Colonia"
        value={profileData.neighborhood}
        onChangeText={(text) => setProfileData({ ...profileData, neighborhood: text })}
      />
      <Input
        placeholder="Calle"
        value={profileData.street}
        onChangeText={(text) => setProfileData({ ...profileData, street: text })}
      />
      <Input
        placeholder="Código Postal"
        value={profileData.zipCode}
        keyboardType="number-pad"
        onChangeText={(text) => setProfileData({ ...profileData, zipCode: text })}
      />
      
      <Button
        title="Guardar Perfil"
        onPress={handleSave}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [theme.colors.primary, theme.colors.primaryDark],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        buttonStyle={styles.saveButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
  },
});