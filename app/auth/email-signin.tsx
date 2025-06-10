import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Mail, Eye, EyeOff } from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing
} from 'react-native-reanimated';

export default function EmailSignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Animation values
  const buttonScale = useSharedValue(1);
  const inputFocusScale = useSharedValue(1);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleContinue = async () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // Animate button press
      buttonScale.value = withSpring(0.95, {
        damping: 20,
        stiffness: 300,
      }, () => {
        buttonScale.value = withSpring(1);
      });

      // Simulate authentication
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/(tabs)');
      }, 1500);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inputFocusScale.value }],
    };
  });

  return (
    <LinearGradient colors={['#f8fafc', '#ffffff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <Animated.View 
            style={styles.header}
            entering={FadeIn.duration(600).easing(Easing.out(Easing.cubic))}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <ChevronLeft size={24} color="#1e293b" />
            </TouchableOpacity>
          </Animated.View>

          {/* Content */}
          <View style={styles.content}>
            <Animated.View 
              style={styles.titleContainer}
              entering={SlideInDown.delay(200).duration(800).easing(Easing.out(Easing.cubic))}
            >
              <Text style={styles.title}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp 
                  ? 'Join MindMood to start your wellness journey'
                  : 'Welcome back to your wellness journey'
                }
              </Text>
            </Animated.View>

            <Animated.View 
              style={styles.formContainer}
              entering={SlideInDown.delay(400).duration(800).easing(Easing.out(Easing.cubic))}
            >
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  errors.email && styles.inputError
                ]}>
                  <Mail size={20} color="#64748b" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: undefined }));
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => {
                      inputFocusScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      inputFocusScale.value = withSpring(1);
                    }}
                  />
                </View>
                {errors.email && (
                  <Animated.Text 
                    style={styles.errorText}
                    entering={FadeIn.duration(300)}
                  >
                    {errors.email}
                  </Animated.Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  errors.password && styles.inputError
                ]}>
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: undefined }));
                      }
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => {
                      inputFocusScale.value = withSpring(1.02);
                    }}
                    onBlur={() => {
                      inputFocusScale.value = withSpring(1);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#64748b" />
                    ) : (
                      <Eye size={20} color="#64748b" />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Animated.Text 
                    style={styles.errorText}
                    entering={FadeIn.duration(300)}
                  >
                    {errors.password}
                  </Animated.Text>
                )}
              </View>

              {/* Forgot Password (only for sign in) */}
              {!isSignUp && (
                <TouchableOpacity 
                  style={styles.forgotPassword}
                  onPress={() => {
                    // Handle forgot password
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </View>

          {/* Footer */}
          <Animated.View 
            style={styles.footer}
            entering={SlideInDown.delay(600).duration(800).easing(Easing.out(Easing.cubic))}
          >
            <Animated.View style={[animatedButtonStyle]}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  isLoading && styles.continueButtonLoading
                ]}
                onPress={handleContinue}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingDot} />
                    <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
                    <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
                  </View>
                ) : (
                  <Text style={styles.continueButtonText}>
                    {isSignUp ? 'Create Account' : 'Continue'}
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.switchModeContainer}>
              <Text style={styles.switchModeText}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode} activeOpacity={0.7}>
                <Text style={styles.switchModeLink}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to MindMood's{'\n'}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
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
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 24,
  },
  formContainer: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  passwordInput: {
    paddingRight: 12,
  },
  passwordToggle: {
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ef4444',
    marginLeft: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 24,
  },
  continueButton: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonLoading: {
    backgroundColor: '#64748b',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    opacity: 0.6,
  },
  loadingDotDelay1: {
    opacity: 0.8,
  },
  loadingDotDelay2: {
    opacity: 1,
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  switchModeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  switchModeLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3b82f6',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#3b82f6',
    fontFamily: 'Inter-Medium',
  },
});