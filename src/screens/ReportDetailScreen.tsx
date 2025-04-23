import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { MinimalButton } from '../components/MinimalButton';

export const ReportDetailScreen = ({ route, navigation }: any) => {
  // Mock data - replace with actual data fetching
  const report = {
    id: '1',
    type: 'official',
    title: 'Funcionario municipal',
    description: 'Funcionario municipal solicitando soborno en trámite de licencia. El funcionario en cuestión solicitó un pago adicional no oficial para agilizar el trámite de la licencia de funcionamiento.',
    date: '2025-04-22',
    location: 'Col. Centro',
    street: 'Av. Principal #123',
    status: 'pending',
    mediaUrl: null,
    updates: [
      {
        date: '2025-04-22 10:30',
        status: 'pending',
        comment: 'Reporte recibido y en revisión',
      },
      {
        date: '2025-04-22 11:45',
        status: 'in_progress',
        comment: 'Caso asignado al departamento de asuntos internos',
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return theme.colors.warning;
      case 'in_progress': return theme.colors.secondary;
      case 'resolved': return theme.colors.primary;
      default: return theme.colors.text.disabled;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En proceso';
      case 'resolved': return 'Resuelto';
      default: return 'Desconocido';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Icon
            name={report.type === 'official' ? 'user-tie' : 'exclamation-triangle'}
            type="font-awesome-5"
            color={report.type === 'official' ? theme.colors.secondary : theme.colors.error}
            size={24}
          />
          <View style={styles.statusChip}>
            <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>
              {getStatusText(report.status)}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.date}>{report.date}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{report.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.locationContainer}>
            <Icon
              name="map-marker-alt"
              type="font-awesome-5"
              size={16}
              color={theme.colors.text.secondary}
            />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>{report.location}</Text>
              <Text style={styles.streetText}>{report.street}</Text>
            </View>
          </View>
        </View>

        {report.mediaUrl && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evidencia</Text>
            <Image source={{ uri: report.mediaUrl }} style={styles.media} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actualizaciones</Text>
          {report.updates.map((update, index) => (
            <View key={index} style={styles.updateItem}>
              <View style={styles.updateHeader}>
                <Text style={styles.updateDate}>{update.date}</Text>
                <Text style={[styles.updateStatus, { color: getStatusColor(update.status) }]}>
                  {getStatusText(update.status)}
                </Text>
              </View>
              <Text style={styles.updateComment}>{update.comment}</Text>
            </View>
          ))}
        </View>

        <MinimalButton
          title="Agregar Actualización"
          icon="plus"
          onPress={() => {}}
          containerStyle={styles.updateButton}
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
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
    ...theme.elevation.small,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statusChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600' as const,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    fontWeight: '600' as const,
  },
  description: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationTextContainer: {
    marginLeft: theme.spacing.sm,
  },
  locationText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  streetText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
  },
  updateItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  updateDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  updateStatus: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  updateComment: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  updateButton: {
    marginTop: theme.spacing.md,
  },
});