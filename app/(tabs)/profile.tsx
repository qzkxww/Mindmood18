import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Brain, Settings, CircleHelp as HelpCircle, Shield, RefreshCw, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [userPlan] = useState('Energy Recovery Plan');

  const handleRetakeQuiz = () => {
    Alert.alert(
      'Retake Assessment',
      'This will reset your current plan and take you through the assessment again. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => router.replace('/onboarding')
        }
      ]
    );
  };

  const handleManageSubscription = () => {
    Alert.alert(
      'Manage Subscription',
      'In a real app, this would open subscription management through RevenueCat or App Store/Google Play.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => router.replace('/') 
        }
      ]
    );
  };

  const MenuButton = ({ icon: Icon, title, subtitle, onPress, showArrow = true }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Icon size={20} color="#3b82f6" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <View style={styles.menuArrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.profileIcon}>
                <User size={32} color="#3b82f6" />
              </View>
              <Text style={styles.welcomeText}>Welcome to MindMood</Text>
              <Text style={styles.memberText}>Premium Member</Text>
            </View>

            <View style={styles.planCard}>
              <View style={styles.planHeader}>
                <Brain size={24} color="#3b82f6" />
                <Text style={styles.planTitle}>Your Current Plan</Text>
              </View>
              <Text style={styles.planName}>{userPlan}</Text>
              <Text style={styles.planDescription}>
                Personalized coaching to help you stabilize your mood and rebuild your energy levels.
              </Text>
              <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeQuiz}>
                <RefreshCw size={16} color="#3b82f6" />
                <Text style={styles.retakeButtonText}>Retake Assessment</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <View style={styles.menuGroup}>
                <MenuButton
                  icon={Settings}
                  title="App Preferences"
                  subtitle="Notifications, reminders, and more"
                  onPress={() => Alert.alert('Settings', 'Settings page would open here')}
                />
                <MenuButton
                  icon={Shield}
                  title="Privacy & Security"
                  subtitle="Data protection and account security"
                  onPress={() => Alert.alert('Privacy', 'Privacy settings would open here')}
                />
                <MenuButton
                  icon={HelpCircle}
                  title="Help & Support"
                  subtitle="Get help or contact our support team"
                  onPress={() => Alert.alert('Support', 'Support page would open here')}
                />
              </View>
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Account</Text>
              <View style={styles.menuGroup}>
                <MenuButton
                  icon={Settings}
                  title="Manage Subscription"
                  subtitle="Billing, plan changes, and more"
                  onPress={handleManageSubscription}
                />
                <MenuButton
                  icon={LogOut}
                  title="Sign Out"
                  onPress={handleLogout}
                  showArrow={false}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>MindMood v1.0.0</Text>
              <Text style={styles.footerSubtext}>
                Your mental wellness journey, powered by AI
              </Text>
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
  profileIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  memberText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 12,
  },
  planName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  retakeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  menuGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  menuArrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#cbd5e1',
    fontFamily: 'Inter-Regular',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 32,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    textAlign: 'center',
  },
});