import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { MinimalInput } from '../components/MinimalInput';
import { MinimalButton } from '../components/MinimalButton';

interface ReportForm {
  title: string;
  description: string;
  street: string;
  neighborhood: string;
}

export const CreateReportScreen = ({ navigation }: any) => {
  const [reportType, setReportType] = useState<'official' | 'incident'>('official');
  const [media, setMedia] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  
  const { control, handleSubmit, formState: { errors } } = useForm<ReportForm>();

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos de ubicación para esta funcionalidad');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const onSubmit = (data: ReportForm) => {
    const reportData = {
      ...data,
      type: reportType,
      mediaUrl: media,
      location: location,
      status: 'pending',
      date: new Date().toISOString(),
    };
    console.log(reportData);
    navigation.navigate('ReportsList');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeOption,
            reportType === 'official' && styles.typeOptionActive
          ]}
          onPress={() => setReportType('official')}
        >
          <Text style={[
            styles.typeText,
            reportType === 'official' && styles.typeTextActive
          ]}>
            Funcionario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeOption,
            reportType === 'incident' && styles.typeOptionActive
          ]}
          onPress={() => setReportType('incident')}
        >
          <Text style={[
            styles.typeText,
            reportType === 'incident' && styles.typeTextActive
          ]}>
            Incidente
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'El título es requerido' }}
          render={({ field: { onChange, value } }) => (
            <MinimalInput
              placeholder="Título del reporte"
              value={value}
              onChangeText={onChange}
              error={errors.title?.message}
              icon="heading"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: 'La descripción es requerida' }}
          render={({ field: { onChange, value } }) => (
            <MinimalInput
              placeholder="Descripción detallada"
              multiline
              numberOfLines={4}
              value={value}
              onChangeText={onChange}
              error={errors.description?.message}
              icon="align-left"
              style={styles.textArea}
            />
          )}
        />

        <View style={styles.locationContainer}>
          <Controller
            control={control}
            name="street"
            rules={{ required: 'La calle es requerida' }}
            render={({ field: { onChange, value } }) => (
              <MinimalInput
                placeholder="Calle"
                value={value}
                onChangeText={onChange}
                error={errors.street?.message}
                icon="road"
                containerStyle={styles.halfInput}
              />
            )}
          />

          <Controller
            control={control}
            name="neighborhood"
            rules={{ required: 'La colonia es requerida' }}
            render={({ field: { onChange, value } }) => (
              <MinimalInput
                placeholder="Colonia"
                value={value}
                onChangeText={onChange}
                error={errors.neighborhood?.message}
                icon="map-marked-alt"
                containerStyle={styles.halfInput}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.mediaButton, media && styles.mediaPreviewContainer]}
          onPress={pickMedia}
        >
          {media ? (
            <Image source={{ uri: media }} style={styles.mediaPreview} />
          ) : (
            <Text style={styles.mediaButtonText}>Agregar foto o video</Text>
          )}
        </TouchableOpacity>

        <MinimalButton
          title={location ? "Ubicación guardada ✓" : "Usar ubicación actual"}
          onPress={getCurrentLocation}
          variant={location ? "filled" : "outlined"}
          icon="map-marker-alt"
        />

        <MinimalButton
          title="Enviar Reporte"
          onPress={handleSubmit(onSubmit)}
          icon="paper-plane"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  typeSelector: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    ...theme.elevation.small,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  typeOptionActive: {
    backgroundColor: theme.colors.primary,
  },
  typeText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.text.secondary,
  },
  typeTextActive: {
    color: theme.colors.background,
    fontWeight: '600',
  },
  formContainer: {
    padding: theme.spacing.md,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  mediaButton: {
    height: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  mediaButtonText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.body1.fontSize,
  },
  mediaPreviewContainer: {
    borderStyle: 'solid',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});