import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
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
      Alert.alert('Password is required');
      return false;
    }

    // If both entered → invalid
    if (email.trim() && mobile.trim()) {
      Alert.alert('Enter either Email OR Mobile, not both');
      return false;
    }

    // If email is entered → validate email
    if (email.trim()) {
      if (!emailRegex.test(email)) {
        Alert.alert('Enter valid email');
        return false;
      }
      return true;
    }

    // If mobile is entered → validate mobile
    if (mobile.trim()) {
      if (mobile.length !== 10) {
        Alert.alert('Enter valid 10-digit mobile number');
        return false;
      }
      return true;
    }

    Alert.alert('Please enter Email or Mobile');
    return false;
  };

  const handleVerify = () => {
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpVisible(false);
      console.log('OTP Verified:', otp);
      setVisibleChange(true);
    }, 2000);
  };

  const handleUpdate = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // setLoading(true);
    setTimeout(() => {
      setLoadingChange(false);
      setVisibleChange(false);
      Alert.alert('Success', 'Password changed successfully!');
    }, 1500);
  };

  //   for saprate country code validation and mobile number

  // const validate = () => {
  //   const newErr = {};

  //   // Email regex
  //   const emailRegex =
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

  //   // ✅ Mobile regex — allow optional country/state code + 10 digits
  //   const mobileRegex = /^(\+?\d{1,4}[-\s]?)?(\d{10})$/;

  //   let countryCode = '';
  //   let pureMobile = '';

  //   if (!mobile.trim()) {
  //     newErr.mobile = 'Mobile number is required';
  //   } else {
  //     // Remove all spaces and hyphens
  //     const cleaned = mobile.replace(/[-\s]/g, '');

  //     // Match the pattern
  //     const match = cleaned.match(/^(\+?\d{1,4})?(\d{10})$/);

  //     if (match) {
  //       // Extract country code (if any)
  //       countryCode = match[1] ? match[1] : '';
  //       // Extract last 10 digits
  //       pureMobile = match[2];
  //     } else {
  //       newErr.mobile = 'Enter a valid mobile number';
  //     }
  //   }

  //   if (!email.trim()) {
  //     newErr.email = 'Email is required';
  //   } else if (!emailRegex.test(email)) {
  //     newErr.email = 'Enter a valid email';
  //   }

  //   if (!password) {
  //     newErr.password = 'Password is required';
  //   } else if (password.length < 6) {
  //     newErr.password = 'Password must be at least 6 characters';
  //   }

  //   setErrors(newErr);

  //   // ✅ If valid, you can log or save both values
  //   if (Object.keys(newErr).length === 0) {
  //     console.log('Country Code:', countryCode);
  //     console.log('Mobile Number:', pureMobile);
  //     return { countryCode, pureMobile };
  //   }

  //   return false;
  // };

  // const validate = () => {
  //   const newErr = {};

  //   // Email regex (unchanged)
  //   const emailRegex =
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

  //   // ✅ Mobile validation (with optional country code)
  //   // Examples accepted: +919876543210, +1 5555555555, 9876543210
  //   const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  //   if (!mobile.trim()) {
  //     newErr.mobile = 'Mobile number is required';
  //   } else if (!mobileRegex.test(mobile)) {
  //     newErr.mobile = 'Enter a valid mobile number with country code';
  //   }

  //   if (!email.trim()) {
  //     newErr.email = 'Email is required';
  //   } else if (!emailRegex.test(email)) {
  //     newErr.email = 'Enter a valid email';
  //   }

  //   if (!password) {
  //     newErr.password = 'Password is required';
  //   } else if (password.length < 6) {
  //     newErr.password = 'Password must be at least 6 characters';
  //   }

  //   setErrors(newErr);
  //   return Object.keys(newErr).length === 0;
  // };

  // const validateLogin = () => {
  //     const emailRegex =
  //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

  //     if (!password.trim()) {
  //       Alert.alert('Password is required');
  //       return false;
  //     }

  //     // If both entered → invalid
  //     if (email.trim() && mobile.trim()) {
  //       Alert.alert('Enter either Email OR Mobile, not both');
  //       return false;
  //     }

  //     // If email is entered → validate email
  //     if (email.trim()) {
  //       if (!emailRegex.test(email)) {
  //         Alert.alert('Enter valid email');
  //         return false;
  //       }
  //       return true;
  //     }

  //     // If mobile is entered → validate mobile
  //     if (mobile.trim()) {
  //       if (mobile.length !== 10) {
  //         Alert.alert('Enter valid 10-digit mobile number');
  //         return false;
  //       }
  //       return true;
  //     }

  //     Alert.alert('Please enter Email or Mobile');
  //     return false;
  //   };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setLoading(true);

    try {
      const payload = {
        username: email || mobile,
        password,
      };

      const res = await axios.post(
        'https://emonkey.in/emonkey_admin/api/AdminController/login',
        payload,
      );
      const userInfo = res?.data?.user;
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

      // const data = await res.json();
      setLoading(false);
      // console.log('LoginResponse ', data?.data);

      // if (!res.ok) {
      //   Alert.alert(data.message || 'Login failed');
      //   return;
      // }

      Alert.alert('Login successful!');
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      setLoading(false);
      Alert.alert('Network error, please try again');
      console.log('Login Error:', error);
    }
  };
  const onLogin = async () => {
    const validated = validate();
    if (!validated) return;

    const { email, pureMobile, countryCode, password } = validated;

    setLoading(true);
    try {
      // Example payload logic:
      const payload = pureMobile
        ? { mobile: pureMobile, countryCode, password }
        : { email, password };

      console.log('Login payload:', payload);

      // Example API call
      // const response = await axios.post('https://emonkey.in/admin_login.php', payload);

      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);

      setTimeout(() => {
        setLoading(false);
        // navigation.navigate('RootNavigator'); // navigate after successful login
      }, 800);
    } catch (err) {
      setLoading(false);
      Alert.alert('Login failed', err.message || 'Please try again');
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

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   useWindowDimensions,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Login = ({ navigation, setIsLoggedIn }) => {
//   const { width } = useWindowDimensions();

//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 🔍 Decide login method automatically
//   const loginMethod = email ? 'email' : mobile ? 'mobile' : null;

//   const validateLogin = () => {
//     const emailRegex =
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

//     if (!password.trim()) {
//       Alert.alert('Password is required');
//       return false;
//     }

//     // If both entered → invalid
//     if (email.trim() && mobile.trim()) {
//       Alert.alert('Enter either Email OR Mobile, not both');
//       return false;
//     }

//     // If email is entered → validate email
//     if (email.trim()) {
//       if (!emailRegex.test(email)) {
//         Alert.alert('Enter valid email');
//         return false;
//       }
//       return true;
//     }

//     // If mobile is entered → validate mobile
//     if (mobile.trim()) {
//       if (mobile.length !== 10) {
//         Alert.alert('Enter valid 10-digit mobile number');
//         return false;
//       }
//       return true;
//     }

//     Alert.alert('Please enter Email or Mobile');
//     return false;
//   };

//   const handleLogin = async () => {
//     if (!validateLogin()) return;

//     setLoading(true);

//     try {
//       const payload = {
//         username: email || mobile,
//         password,
//       };

//       const res = await fetch(
//         'https://emonkey.in/emonkey_admin/api/AdminController/login',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         },
//       );

//       const data = await res.json();
//       setLoading(false);
//       console.log('LoginResponse ', data?.data);

//       if (!res.ok) {
//         Alert.alert(data.message || 'Login failed');
//         return;
//       }

//       Alert.alert('Login successful!');
//       await AsyncStorage.setItem('isLoggedIn', 'true');
//       setIsLoggedIn(true);
//       setTimeout(() => {
//         setLoading(false);
//       }, 800);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Network error, please try again');
//       console.log('Login Error:', error);
//     }
//   };

//   return (
//     <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
//       <Text style={styles.title}>Welcome back</Text>
//       <Text style={styles.subText}>Sign in to continue</Text>
//       <View
//         style={{ backgroundColor: '#DFEAF5', padding: 10, borderRadius: 8 }}
//       >
//         {/* EMAIL FIELD */}
//         <Text style={styles.label}>Email</Text>
//         <View style={styles.inputBox}>
//           <Ionicons name="mail-outline" size={20} color="#666" />
//           <TextInput
//             style={styles.input}
//             placeholder="you@example.com"
//             autoCapitalize="none"
//             placeholderTextColor={'gray'}
//             value={email}
//             onChangeText={t => {
//               setEmail(t);
//               if (t) setMobile('');
//             }}
//             keyboardType="email-address"
//           />
//         </View>

//         <Text style={styles.orText}>OR</Text>

//         {/* MOBILE FIELD */}
//         <Text style={styles.label}>Mobile</Text>
//         <View style={styles.inputBox}>
//           <Ionicons name="call-outline" size={20} color="#666" />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter mobile number"
//             placeholderTextColor={'gray'}
//             value={mobile}
//             onChangeText={t => {
//               setMobile(t);
//               if (t) setEmail('');
//             }}
//             keyboardType="phone-pad"
//             maxLength={10}
//           />
//         </View>
//       </View>
//       {/* PASSWORD */}
//       <Text style={styles.label}>Password</Text>
//       <View style={styles.inputBox}>
//         <Ionicons name="lock-closed-outline" size={20} color="#666" />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter password"
//           placeholderTextColor={'gray'}
//           secureTextEntry={!showPass}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPass(!showPass)}>
//           <Ionicons
//             name={showPass ? 'eye-off-outline' : 'eye-outline'}
//             size={22}
//             color="#666"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.forgotBtn}>
//         <Text style={styles.forgotText}>Forgot password?</Text>
//       </TouchableOpacity>

//       {/* LOGIN BUTTON */}
//       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//         <Text style={styles.loginText}>
//           {loading ? 'Please wait...' : 'Sign In'}
//         </Text>
//       </TouchableOpacity>

//       <View style={styles.signupRow}>
//         <Text style={styles.signupText}>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//           <Text style={styles.signupLink}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#111',
//   },
//   subText: {
//     fontSize: 14,
//     color: '#777',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   inputBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     backgroundColor: '#F4F7FE',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 48,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 15,
//     color: '#222',
//   },
//   orText: {
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#666',
//     fontWeight: '600',
//   },
//   forgotBtn: {
//     alignSelf: 'flex-end',
//     marginVertical: 8,
//   },
//   forgotText: {
//     color: '#1D7FF3',
//     fontWeight: '600',
//   },
//   loginBtn: {
//     backgroundColor: '#8B0000',
//     borderRadius: 10,
//     marginTop: 20,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   loginText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '700',
//   },
//   signupRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 18,
//   },
//   signupText: {
//     color: '#444',
//   },
//   signupLink: {
//     color: '#8B0000',
//     fontWeight: '700',
//   },
// });
