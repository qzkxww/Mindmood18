import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Sample data for different time periods
const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [3.2, 2.8, 3.5, 4.1, 3.8, 4.2, 3.9],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [2.9, 3.1, 3.3, 3.8, 3.5, 4.0, 3.7],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 3,
    }
  ],
  legend: ['Mood', 'Energy']
};

const monthlyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      data: [3.4, 3.7, 3.2, 3.9],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [3.2, 3.5, 3.1, 3.8],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 3,
    }
  ],
  legend: ['Mood', 'Energy']
};

export default function TrendsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const currentData = selectedPeriod === 'week' ? weeklyData : monthlyData;
  
  // Calculate averages
  const moodAverage = currentData.datasets[0].data.reduce((a, b) => a + b, 0) / currentData.datasets[0].data.length;
  const energyAverage = currentData.datasets[1].data.reduce((a, b) => a + b, 0) / currentData.datasets[1].data.length;
  
  // Calculate trends (simplified)
  const moodTrend = currentData.datasets[0].data[currentData.datasets[0].data.length - 1] - currentData.datasets[0].data[0];
  const energyTrend = currentData.datasets[1].data[currentData.datasets[1].data.length - 1] - currentData.datasets[1].data[0];

  const renderStatCard = (title: string, value: number, trend: number, color: string) => {
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
    const trendColor = trend >= 0 ? '#10b981' : '#ef4444';
    
    return (
      <View style={styles.statCard}>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.statValue}>
          <Text style={[styles.statNumber, { color }]}>{value.toFixed(1)}</Text>
          <View style={styles.statTrend}>
            <TrendIcon size={16} color={trendColor} />
            <Text style={[styles.trendText, { color: trendColor }]}>
              {Math.abs(trend).toFixed(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.statLabel}>Average this {selectedPeriod}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Your Progress</Text>
              <Text style={styles.subtitle}>Track your mood and energy patterns</Text>
            </View>

            <View style={styles.periodSelector}>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'week' && styles.selectedPeriod]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === 'week' && styles.selectedPeriodText
                ]}>
                  7 Days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'month' && styles.selectedPeriod]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === 'month' && styles.selectedPeriodText
                ]}>
                  30 Days
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              {renderStatCard('Mood', moodAverage, moodTrend, '#3b82f6')}
              {renderStatCard('Energy', energyAverage, energyTrend, '#10b981')}
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Trend Analysis</Text>
                <Calendar size={20} color="#64748b" />
              </View>
              
              <LineChart
                data={currentData}
                width={width - 80}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.1})`,
                  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '5',
                    strokeWidth: '2',
                  },
                  propsForLabels: {
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>

            <View style={styles.insightsCard}>
              <Text style={styles.insightsTitle}>Key Insights</Text>
              <View style={styles.insightsList}>
                <View style={styles.insightItem}>
                  <View style={styles.insightDot} />
                  <Text style={styles.insightText}>
                    Your mood is most stable on weekends
                  </Text>
                </View>
                <View style={styles.insightItem}>
                  <View style={styles.insightDot} />
                  <Text style={styles.insightText}>
                    Energy levels peak in the morning hours
                  </Text>
                </View>
                <View style={styles.insightItem}>
                  <View style={styles.insightDot} />
                  <Text style={styles.insightText}>
                    Consistent improvement over the past week
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriod: {
    backgroundColor: '#3b82f6',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  insightsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  insightsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightDot: {
    width: 6,
    height: 6,
    backgroundColor: '#3b82f6',
    borderRadius: 3,
    marginRight: 12,
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 20,
    flex: 1,
  },
});