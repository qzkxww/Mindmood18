import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Sun, Globe, X, Mail } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolate,
  Easing,
  withSpring,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Animation values
  const pulseScale = useSharedValue(1);
  const coreGlow = useSharedValue(0);
  const particle1Rotation = useSharedValue(0);
  const particle2Rotation = useSharedValue(0);
  const particle3Float = useSharedValue(0);
  const particle4Float = useSharedValue(0);
  const modalScale = useSharedValue(0);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    // Core pulsing animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Core glow animation
    coreGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Particle orbital animations
    particle1Rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    particle2Rotation.value = withRepeat(
      withTiming(-360, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );

    // Particle floating animations
    particle3Float.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    particle4Float.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
    // Animate modal in
    modalOpacity.value = withTiming(1, { duration: 300 });
    modalScale.value = withSpring(1, {
      damping: 20,
      stiffness: 300,
    });
  };

  const handleCloseModal = () => {
    // Animate modal out
    modalOpacity.value = withTiming(0, { duration: 200 });
    modalScale.value = withTiming(0.9, { duration: 200 }, () => {
      runOnJS(setShowSignInModal)(false);
    });
  };

  const handleAppleSignIn = () => {
    // In a real app, implement Apple Sign In
    handleCloseModal();
    router.push('/(tabs)');
  };

  const handleGoogleSignIn = () => {
    // In a real app, implement Google Sign In
    handleCloseModal();
    router.push('/(tabs)');
  };

  const handleEmailSignIn = () => {
    // Navigate to email sign in screen
    handleCloseModal();
    router.push('/auth/email-signin');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'ES' : 'EN');
  };

  const theme = {
    background: isDarkMode ? '#0f172a' : '#ffffff',
    text: isDarkMode ? '#f8fafc' : '#1e293b',
    subtext: isDarkMode ? '#94a3b8' : '#64748b',
    accent: '#3b82f6',
    buttonBg: isDarkMode ? '#f8fafc' : '#1e293b',
    buttonText: isDarkMode ? '#1e293b' : '#ffffff',
  };

  // Animated styles
  const animatedCoreStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: interpolate(coreGlow.value, [0, 1], [0.8, 1]),
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value * 0.8 }],
      opacity: interpolate(coreGlow.value, [0, 1], [0.4, 0.8]),
    };
  });

  const animatedParticle1Style = useAnimatedStyle(() => {
    const translateX = interpolate(
      particle1Rotation.value,
      [0, 360],
      [0, 2 * Math.PI]
    );
    return {
      transform: [
        { translateX: Math.cos(translateX) * 80 },
        { translateY: Math.sin(translateX) * 80 },
        { scale: interpolate(particle1Rotation.value % 180, [0, 90, 180], [0.8, 1.2, 0.8]) }
      ],
    };
  });

  const animatedParticle2Style = useAnimatedStyle(() => {
    const translateX = interpolate(
      particle2Rotation.value,
      [-360, 0],
      [0, 2 * Math.PI]
    );
    return {
      transform: [
        { translateX: Math.cos(translateX) * 60 },
        { translateY: Math.sin(translateX) * 60 },
        { scale: interpolate(Math.abs(particle2Rotation.value) % 180, [0, 90, 180], [0.6, 1, 0.6]) }
      ],
    };
  });

  const animatedParticle3Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(particle3Float.value, [0, 1], [0, -15]) },
        { scale: interpolate(particle3Float.value, [0, 1], [0.8, 1.2]) }
      ],
      opacity: interpolate(particle3Float.value, [0, 0.5, 1], [0.6, 1, 0.6]),
    };
  });

  const animatedParticle4Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(particle4Float.value, [0, 1], [0, 12]) },
        { scale: interpolate(particle4Float.value, [0, 1], [1, 0.7]) }
      ],
      opacity: interpolate(particle4Float.value, [0, 0.5, 1], [0.8, 0.4, 0.8]),
    };
  });

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
      transform: [{ scale: modalScale.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
    };
  });

  // Abstract brain/energy visualization component
  const EnergyVisualization = () => (
    <View style={styles.visualizationContainer}>
      <View style={[styles.energyRing, styles.outerRing, { borderColor: theme.accent + '20' }]}>
        <View style={[styles.energyRing, styles.middleRing, { borderColor: theme.accent + '40' }]}>
          <View style={[styles.energyRing, styles.innerRing, { borderColor: theme.accent + '60' }]}>
            <Animated.View style={[styles.energyCore, { backgroundColor: theme.accent }, animatedCoreStyle]}>
              <Animated.View style={[styles.energyPulse, { backgroundColor: theme.accent + '80' }, animatedPulseStyle]} />
            </Animated.View>
          </View>
        </View>
      </View>
      
      {/* Floating particles with animations */}
      <Animated.View style={[
        styles.particle, 
        styles.particle1, 
        { backgroundColor: theme.accent },
        animatedParticle1Style
      ]} />
      <Animated.View style={[
        styles.particle, 
        styles.particle2, 
        { backgroundColor: theme.accent },
        animatedParticle2Style
      ]} />
      <Animated.View style={[
        styles.particle, 
        styles.particle3, 
        { backgroundColor: theme.accent },
        animatedParticle3Style
      ]} />
      <Animated.View style={[
        styles.particle, 
        styles.particle4, 
        { backgroundColor: theme.accent },
        animatedParticle4Style
      ]} />
    </View>
  );

  // Apple logo component using the provided image
  const AppleLogo = () => (
    <View style={styles.appleLogoContainer}>
      <Image 
        source={{ uri: 'https://i.imgur.com/eyHcHLY.png' }}
        style={styles.appleLogoImage}
        resizeMode="contain"
      />
    </View>
  );

  // Google logo component using the provided image
  const GoogleLogo = () => (
    <View style={styles.googleLogoContainer}>
      <Image 
        source={{ uri: 'https://i.imgur.com/bunX9Gb.png' }}
        style={styles.googleLogoImage}
        resizeMode="contain"
      />
    </View>
  );

  // Email icon component to match logo sizes
  const EmailIcon = () => (
    <View style={styles.emailIconContainer}>
      <Mail size={24} color="#64748b" />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with controls */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: theme.background }]}
            onPress={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun size={20} color={theme.text} />
            ) : (
              <Moon size={20} color={theme.text} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.languageButton, { backgroundColor: theme.background }]}
            onPress={toggleLanguage}
          >
            <Globe size={16} color={theme.text} />
            <Text style={[styles.languageText, { color: theme.text }]}>{language}</Text>
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Energy visualization */}
          <View style={styles.illustrationContainer}>
            <EnergyVisualization />
          </View>

          {/* Text content */}
          <View style={styles.textContainer}>
            <Text style={[styles.headline, { color: theme.text }]}>
              Mood & Energy Coaching,{'\n'}Simplified
            </Text>
            <Text style={[styles.subheadline, { color: theme.subtext }]}>
              Understand your emotions. Build better days.
            </Text>
          </View>

          {/* Action buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.getStartedButton, { backgroundColor: theme.buttonBg }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={[styles.getStartedText, { color: theme.buttonText }]}>
                Get Started
              </Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={[styles.signInPrompt, { color: theme.subtext }]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={[styles.signInLink, { color: theme.text }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sign In Modal */}
        <Modal
          visible={showSignInModal}
          transparent={true}
          animationType="none"
          onRequestClose={handleCloseModal}
        >
          <Animated.View style={[styles.modalBackdrop, animatedBackdropStyle]}>
            <TouchableOpacity 
              style={styles.modalBackdropTouchable}
              activeOpacity={1}
              onPress={handleCloseModal}
            >
              <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
                <TouchableOpacity 
                  activeOpacity={1}
                  onPress={(e) => e.stopPropagation()}
                >
                  <View style={styles.modalContent}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Sign In</Text>
                      <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={handleCloseModal}
                      >
                        <X size={20} color="#64748b" />
                      </TouchableOpacity>
                    </View>

                    {/* Sign In Options */}
                    <View style={styles.signInOptions}>
                      {/* Apple Sign In */}
                      <TouchableOpacity 
                        style={styles.appleSignInButton}
                        onPress={handleAppleSignIn}
                        activeOpacity={0.8}
                      >
                        <AppleLogo />
                        <Text style={styles.appleSignInText}>Sign in with Apple</Text>
                      </TouchableOpacity>

                      {/* Google Sign In */}
                      <TouchableOpacity 
                        style={styles.googleSignInButton}
                        onPress={handleGoogleSignIn}
                        activeOpacity={0.8}
                      >
                        <GoogleLogo />
                        <Text style={styles.googleSignInText}>Sign in with Google</Text>
                      </TouchableOpacity>

                      {/* Email Sign In */}
                      <TouchableOpacity 
                        style={styles.emailSignInButton}
                        onPress={handleEmailSignIn}
                        activeOpacity={0.8}
                      >
                        <EmailIcon />
                        <Text style={styles.emailSignInText}>Continue with email</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Terms */}
                    <View style={styles.termsContainer}>
                      <Text style={styles.termsText}>
                        By continuing you agree to MindMood's{'\n'}
                        <Text style={styles.termsLink}>Terms and Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  visualizationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  energyRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    width: 180,
    height: 180,
  },
  middleRing: {
    width: 120,
    height: 120,
  },
  innerRing: {
    width: 80,
    height: 80,
  },
  energyCore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  energyPulse: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  particle1: {
    top: 30,
    right: 60,
  },
  particle2: {
    bottom: 40,
    left: 50,
  },
  particle3: {
    top: 80,
    left: 20,
  },
  particle4: {
    bottom: 80,
    right: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headline: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subheadline: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  actionContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.2,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInPrompt: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  signInLink: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdropTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  closeButton: {
    padding: 4,
  },
  signInOptions: {
    gap: 16,
    marginBottom: 32,
  },
  appleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  appleSignInText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  googleSignInText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  emailSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emailSignInText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  appleLogoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  appleLogoImage: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },
  googleLogoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogoImage: {
    width: 40,
    height: 40,
  },
  emailIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
});