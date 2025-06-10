import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { LineChart } from 'react-native-chart-kit';
import { ChevronRight, Lightbulb } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const aiTips = [
  "Your energy dips in the afternoon. Try a 10-minute walk to reset your focus.",
  "Consistent sleep patterns boost mood stability. Aim for 7-8 hours nightly.",
  "Notice how social interactions affect your energy. Set boundaries when needed.",
  "Morning sunlight helps regulate your circadian rhythm and improves mood.",
  "Track your wins, no matter how small. Progress builds momentum."
];

export default function TodayScreen() {
  const [moodValue, setMoodValue] = useState(3);
  const [energyValue, setEnergyValue] = useState(3);
  const [dailyTip, setDailyTip] = useState('');
  const [hasLogged, setHasLogged] = useState(false);

  // Sample data for 7-day preview
  const chartData = {
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

  useEffect(() => {
    // Set daily tip
    const tipIndex = Math.floor(Math.random() * aiTips.length);
    setDailyTip(aiTips[tipIndex]);
  }, []);

  const handleSaveLog = () => {
    setHasLogged(true);
    // In a real app, this would save to backend/local storage
  };

  const getMoodLabel = (value: number) => {
    if (value <= 1) return 'Very Low';
    if (value <= 2) return 'Low';
    if (value <= 3) return 'Neutral';
    if (value <= 4) return 'Good';
    return 'Excellent';
  };

  const getEnergyLabel = (value: number) => {
    if (value <= 1) return 'Drained';
    if (value <= 2) return 'Low';
    if (value <= 3) return 'Moderate';
    if (value <= 4) return 'High';
    return 'Energized';
  };

  return (
    <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>How are you feeling today?</Text>
              <Text style={styles.date}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>

            <View style={styles.trackingCard}>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderSection}>
                  <Text style={styles.sliderLabel}>Mood</Text>
                  <Text style={styles.sliderValue}>{getMoodLabel(moodValue)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={0.1}
                    value={moodValue}
                    onValueChange={setMoodValue}
                    minimumTrackTintColor="#3b82f6"
                    maximumTrackTintColor="#e2e8f0"
                    thumbStyle={styles.sliderThumb}
                  />
                </View>

                <View style={styles.separator} />

                <View style={styles.sliderSection}>
                  <Text style={styles.sliderLabel}>Energy</Text>
                  <Text style={styles.sliderValue}>{getEnergyLabel(energyValue)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={0.1}
                    value={energyValue}
                    onValueChange={setEnergyValue}
                    minimumTrackTintColor="#10b981"
                    maximumTrackTintColor="#e2e8f0"
                    thumbStyle={styles.sliderThumb}
                  />
                </View>
              </View>

              {!hasLogged && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveLog}>
                  <Text style={styles.saveButtonText}>Log Today's Mood</Text>
                </TouchableOpacity>
              )}

              {hasLogged && (
                <View style={styles.successMessage}>
                  <Text style={styles.successText}>Today's mood logged successfully!</Text>
                </View>
              )}
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <Lightbulb size={20} color="#f59e0b" />
                <Text style={styles.tipTitle}>Daily Insight</Text>
              </View>
              <Text style={styles.tipText}>{dailyTip}</Text>
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>This Week</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              
              <LineChart
                data={chartData}
                width={width - 80}
                height={180}
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
                    r: '4',
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
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  trackingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderSection: {
    marginBottom: 32,
  },
  sliderLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    width: 24,
    height: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  successMessage: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  successText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#166534',
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 20,
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});