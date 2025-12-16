import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ForgetPassword from '../modals/ForgetPassword';
import OTPVerificationModal from '../modals/OTPVerificationModal';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../api/BaseUrl';
import Toast from 'react-native-toast-message';

export default function Login({ navigation, setIsLoggedIn }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [loadingOtp, setOtpLoading] = useState(false);

  // Forget password modal state
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Change password modal state
  const [visibleChange, setVisibleChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingChange, setLoadingChange] = useState(false);

  const loginMethod = email ? 'email' : mobile ? 'mobile' : null;

  const validateLogin = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

    if (!password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Password is required',
      });
      return false;
    }

    // If both entered → invalid
    if (email.trim() && mobile.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Enter either Email OR Mobile, not both',
      });

      return false;
    }

    // If email is entered → validate email
    if (email.trim()) {
      if (!emailRegex.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Enter valid email',
        });
        return false;
      }
      return true;
    }

    // If mobile is entered → validate mobile
    if (mobile.trim()) {
      if (mobile.length !== 10) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Enter valid 10-digit mobile number',
        });
        return false;
      }
      return true;
    }

    return false;
  };

  const handleVerify = async () => {
    setOtpLoading(true);
    setTimeout(async () => {
      setOtpLoading(false);
      setOtpVisible(false);
      console.log('OTP Verified:', otp);
      const payload = {
        email: forgotEmail,
        otp,
      };
      try {
        const reponseOtpVerify = await axios.post(
          `${BASE_URL}verify_Forgot_otp`,
          payload,
        );
        console.log('reponseOtpVerify', reponseOtpVerify);
      } catch (error) {
        console.log(error);
      }
      setVisibleChange(true);
    }, 2000);
  };

  const handleUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    const payload = {
      email: forgotEmail,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}forgot_change_password`,
        payload,
        password,
      );
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    setTimeout(() => {
      setLoadingChange(false);
      setVisibleChange(false);
      Alert.alert('Success', 'Password changed successfully!');
    }, 1500);
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setLoading(true);

    try {
      const payload = {
        username: email || mobile,
        password,
      };

      const res = await axios.post(`${BASE_URL}login`, payload);
      const userInfo = res?.data?.user;

      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      await AsyncStorage.setItem('isLoggedIn', 'true');

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      setLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials',
      });
      console.log('Login Error:', error);
    }
  };

  const onSendForgot = async () => {
    if (!forgotEmail.trim()) {
      Alert.alert('Error', 'Enter your email');
      return;
    }
    setForgotLoading(true);
    try {
      // TODO: call forget-password API to send reset link / OTP
      const payload = {
        username: forgotEmail,
      };

      const response = await axios.post(`${BASE_URL}forgotpasswordd`, payload);

      setTimeout(() => {
        setForgotLoading(false);
        setForgotVisible(false);
        setOtpVisible(true);
        // Alert.alert('Success', 'Password reset link sent to your email');
      }, 800);
    } catch (err) {
      setForgotLoading(false);
      Alert.alert('Error', 'Failed to send reset link');
    }
  };

  // responsive sizes
  const containerPadding = Math.max(16, width * 0.06);
  const inputFontSize = Math.max(14, width * 0.038);
  const btnHeight = Math.max(44, width * 0.12);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { padding: containerPadding }]}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.form}>
            <View
              style={{
                backgroundColor: '#F1F5F9',
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Icon name="mail-outline" size={20} />
                <TextInput
                  value={email}
                  onChangeText={t => {
                    setEmail(t);
                    if (t) setMobile('');
                  }}
                  placeholder="you@example.com"
                  placeholderTextColor={'gray'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[styles.input, { fontSize: inputFontSize }]}
                  returnKeyType="next"
                  // onSubmitEditing={() => {}}
                />
              </View>
              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
              <View
                style={{
                  marginTop: 10,

                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'gray' }}>OR</Text>
              </View>
              <Text style={styles.label}>Mobile</Text>
              <View style={styles.inputRow}>
                <Icon name="call-outline" size={20} />
                <TextInput
                  value={mobile}
                  onChangeText={t => {
                    setMobile(t);
                    if (t) setEmail('');
                  }}
                  placeholder="Enter mobile number"
                  placeholderTextColor={'gray'}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  maxLength={10}
                  style={[styles.input, { fontSize: inputFontSize }]}
                  returnKeyType="next"
                  // onSubmitEditing={() => {}}
                />
              </View>
              {errors.mobile ? (
                <Text style={styles.error}>{errors.mobile}</Text>
              ) : null}
            </View>
            <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
            <View style={styles.inputRow}>
              <Icon name="lock-closed-outline" size={20} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor={'gray'}
                secureTextEntry={secure}
                style={[styles.input, { fontSize: inputFontSize }]}
                returnKeyType="done"
                // onSubmitEditing={onLogin}
              />
              <TouchableOpacity
                onPress={() => setSecure(s => !s)}
                style={{ padding: 6 }}
              >
                <Icon
                  name={secure ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => setForgotVisible(true)}
              style={styles.forgotRow}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.button, { height: btnHeight }]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
            <View style={styles.rowCenter}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password Modal */}
          <ForgetPassword
            visible={forgotVisible}
            onClose={() => setForgotVisible(false)}
            onConfirm={onSendForgot}
            loading={forgotLoading}
            title="Reset Password"
            placeholder="Enter your account email"
            value={forgotEmail}
            onChangeText={setForgotEmail}
          />
          <OTPVerificationModal
            visible={otpVisible}
            onClose={() => setOtpVisible(false)}
            onVerify={handleVerify}
            otp={otp}
            setOtp={setOtp}
            loading={loadingOtp}
          />
          <ChangePasswordModal
            visible={visibleChange}
            onClose={() => setVisibleChange(false)}
            onUpdate={handleUpdate}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loading={loadingChange}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  form: {
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 48,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    color: '#333',
    marginLeft: 8,
    paddingVertical: 8,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#007bff',
  },
  button: {
    backgroundColor: '#8C1212',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  link: {
    color: '#8C1212',
    fontWeight: '600',
  },
  error: {
    color: '#d9534f',
    marginTop: 6,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 20,
  },
  modalCard: {
    height: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalBtn: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  modalBtnPrimary: {
    backgroundColor: '#8C1212',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnPrimaryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
