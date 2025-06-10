import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, TrendingUp, Calendar, Target } from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  Layout,
  Easing
} from 'react-native-reanimated';

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const benefits = [
    {
      icon: Brain,
      title: "Daily AI-powered mood tips",
      description: "Personalized insights based on your patterns"
    },
    {
      icon: TrendingUp,
      title: "Mood & energy tracking",
      description: "Visual progress with detailed analytics"
    },
    {
      icon: Calendar,
      title: "Weekly insights & growth plans",
      description: "Structured guidance for continuous improvement"
    },
    {
      icon: Target,
      title: "Personalized coaching",
      description: "AI coach tailored to your specific needs"
    }
  ];

  const handleStartPlan = () => {
    // In a real app, this would integrate with RevenueCat
    // For now, we'll simulate successful purchase
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Animated.View 
              style={styles.header}
              entering={FadeIn.duration(600).easing(Easing.out(Easing.cubic))}
            >
              <Text style={styles.title}>Unlock Your Personalized Mood Plan</Text>
              <Text style={styles.subtitle}>
                Start your journey to better mental wellness with AI-powered insights
              </Text>
            </Animated.View>

            <View style={styles.benefitsContainer}>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Animated.View
                    key={index}
                    entering={FadeIn.delay(index * 150 + 200).duration(600).easing(Easing.out(Easing.cubic))}
                    layout={Layout.springify()}
                  >
                    <View style={styles.benefitCard}>
                      <View style={styles.iconContainer}>
                        <IconComponent size={24} color="#3b82f6" />
                      </View>
                      <View style={styles.benefitContent}>
                        <Text style={styles.benefitTitle}>{benefit.title}</Text>
                        <Text style={styles.benefitDescription}>{benefit.description}</Text>
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
            </View>

            <View style={styles.pricingContainer}>
              <Animated.View
                entering={FadeIn.delay(800).duration(600).easing(Easing.out(Easing.cubic))}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                  style={[styles.planCard, selectedPlan === 'yearly' && styles.selectedPlan]}
                  onPress={() => setSelectedPlan('yearly')}
                >
                  <View style={styles.planHeader}>
                    <View style={styles.planInfo}>
                      <Text style={styles.planName}>Yearly</Text>
                      <Text style={styles.planPrice}>$59.99/year</Text>
                    </View>
                    <View style={styles.savesBadge}>
                      <Text style={styles.savesText}>Save 58%</Text>
                    </View>
                  </View>
                  <Text style={styles.planDescription}>Best value - $5.00/month</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                entering={FadeIn.delay(950).duration(600).easing(Easing.out(Easing.cubic))}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                  style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedPlan]}
                  onPress={() => setSelectedPlan('monthly')}
                >
                  <View style={styles.planHeader}>
                    <View style={styles.planInfo}>
                      <Text style={styles.planName}>Monthly</Text>
                      <Text style={styles.planPrice}>$11.99/month</Text>
                    </View>
                  </View>
                  <Text style={styles.planDescription}>Flexible monthly billing</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ScrollView>

        <Animated.View 
          style={styles.footer}
          entering={FadeIn.delay(1100).duration(600).easing(Easing.out(Easing.cubic))}
        >
          <TouchableOpacity style={styles.startButton} onPress={handleStartPlan}>
            <Text style={styles.startButtonText}>Start My Plan</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </Animated.View>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  benefitsContainer: {
    marginBottom: 40,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  pricingContainer: {
    gap: 12,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedPlan: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  savesBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savesText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#166534',
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  startButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
});