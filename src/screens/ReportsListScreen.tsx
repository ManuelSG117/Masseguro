import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { MinimalButton } from '../components/MinimalButton';
import { MinimalInput } from '../components/MinimalInput';
import { theme } from '../theme/theme';

interface Report {
  id: string;
  type: 'official' | 'incident';
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

const mockReports: Report[] = [
  {
    id: '1',
    type: 'official',
    title: 'Funcionario municipal',
    description: 'Funcionario municipal solicitando soborno en trámite de licencia',
    date: '2025-04-22',
    location: 'Col. Centro',
    status: 'pending',
  },
  {
    id: '2',
    type: 'incident',
    title: 'Robo a transeúnte',
    description: 'Robo en la zona centro, dos individuos en motocicleta',
    date: '2025-04-21',
    location: 'Av. Principal',
    status: 'in_progress',
  },
];

export const ReportsListScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'official' | 'incident'>('all');
  const [reports] = useState<Report[]>(mockReports);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending': return theme.colors.warning;
      case 'in_progress': return theme.colors.secondary;
      case 'resolved': return theme.colors.primary;
      default: return theme.colors.text.disabled;
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En proceso';
      case 'resolved': return 'Resuelto';
      default: return 'Desconocido';
    }
  };

  const renderItem = ({ item }: { item: Report }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ReportDetail', { reportId: item.id })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Icon
            name={item.type === 'official' ? 'user-tie' : 'exclamation-triangle'}
            type="font-awesome-5"
            color={item.type === 'official' ? theme.colors.secondary : theme.colors.error}
            size={20}
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.locationContainer}>
          <Icon
            name="map-marker-alt"
            type="font-awesome-5"
            size={14}
            color={theme.colors.text.secondary}
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <View style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filterButtons = [
    { title: 'Todos', value: 'all' },
    { title: 'Funcionarios', value: 'official' },
    { title: 'Incidentes', value: 'incident' },
  ] as const;

  const filteredReports = reports.filter(report => {
    if (selectedFilter !== 'all' && report.type !== selectedFilter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        report.title.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower) ||
        report.location.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MinimalInput
          placeholder="Buscar reportes..."
          value={search}
          onChangeText={setSearch}
          icon="search"
          containerStyle={styles.searchInput}
        />
      </View>
      
      <View style={styles.filterContainer}>
        {filterButtons.map((button) => (
          <MinimalButton
            key={button.value}
            title={button.title}
            variant={selectedFilter === button.value ? "filled" : "outlined"}
            onPress={() => setSelectedFilter(button.value)}
            containerStyle={styles.filterButton}
          />
        ))}
      </View>

      <FlatList
        data={filteredReports}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      />

      <MinimalButton
        title=""
        onPress={() => navigation.navigate('CreateReport')}
        icon="plus"
        containerStyle={styles.fabContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.md,
    paddingBottom: 0,
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    margin: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.elevation.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
    fontWeight: '600' as const, // Fix the fontWeight type
  },
  dateText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  description: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  statusChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md,
    width: 'auto',
  },
});