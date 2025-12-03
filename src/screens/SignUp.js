// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   useWindowDimensions,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function SignUp({ navigation }) {
//   const { width } = useWindowDimensions();
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [secure, setSecure] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErr = {};
//     const emailRegex =
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

//     if (!mobile.trim()) newErr.mobile = 'Mobile Number is required';
//     if (!email.trim()) newErr.email = 'Email is required';
//     else if (!emailRegex.test(email)) newErr.email = 'Enter a valid email';
//     if (!password) newErr.password = 'Password is required';
//     else if (password.length < 6) newErr.password = 'At least 6 characters';
//     if (password !== confirmPassword)
//       newErr.confirmPassword = 'Passwords do not match';

//     setErrors(newErr);
//     return Object.keys(newErr).length === 0;
//   };

//   const onSignUp = async () => {
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       // TODO: Replace with your real API call
//       // const res = await api.post('/signup', { name, email, password });
//       setTimeout(() => {
//         setLoading(false);
//         Alert.alert('Success', 'Account created successfully!');
//         navigation.replace('Login');
//       }, 1000);
//     } catch (err) {
//       setLoading(false);
//       Alert.alert('Signup failed', err.message || 'Please try again');
//     }
//   };

//   const containerPadding = Math.max(16, width * 0.06);
//   const inputFontSize = Math.max(14, width * 0.038);
//   const btnHeight = Math.max(44, width * 0.12);

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={[styles.container, { padding: containerPadding }]}>
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>Sign up to get started</Text>

//           <Text style={styles.label}>Your Number</Text>
//           <View style={styles.inputRow}>
//             <Icon name="call-outline" size={20} />
//             <TextInput
//               value={mobile}
//               onChangeText={setMobile}
//               keyboardType="phone-pad"
//               placeholder="Enter mobile number"
//               placeholderTextColor={'gray'}
//               style={[styles.input, { fontSize: inputFontSize }]}
//             />
//           </View>
//           {errors.mobile ? (
//             <Text style={styles.error}>{errors.mobile}</Text>
//           ) : null}

//           <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
//           <View style={styles.inputRow}>
//             <Icon name="mail-outline" size={20} />
//             <TextInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="you@example.com"
//               placeholderTextColor={'gray'}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               style={[styles.input, { fontSize: inputFontSize }]}
//             />
//           </View>
//           {errors.email ? (
//             <Text style={styles.error}>{errors.email}</Text>
//           ) : null}

//           <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
//           <View style={styles.inputRow}>
//             <Icon name="lock-closed-outline" size={20} />
//             <TextInput
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter password"
//               placeholderTextColor={'gray'}
//               secureTextEntry={secure}
//               style={[styles.input, { fontSize: inputFontSize }]}
//             />
//             <TouchableOpacity
//               onPress={() => setSecure(s => !s)}
//               style={{ padding: 6 }}
//             >
//               <Icon
//                 name={secure ? 'eye-off-outline' : 'eye-outline'}
//                 size={20}
//               />
//             </TouchableOpacity>
//           </View>
//           {errors.password ? (
//             <Text style={styles.error}>{errors.password}</Text>
//           ) : null}

//           <Text style={[styles.label, { marginTop: 12 }]}>
//             Confirm Password
//           </Text>
//           <View style={styles.inputRow}>
//             <Icon name="lock-closed-outline" size={20} />
//             <TextInput
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               placeholder="Confirm password"
//               placeholderTextColor={'gray'}
//               secureTextEntry={true}
//               style={[styles.input, { fontSize: inputFontSize }]}
//             />
//           </View>
//           {errors.confirmPassword ? (
//             <Text style={styles.error}>{errors.confirmPassword}</Text>
//           ) : null}

//           <TouchableOpacity
//             onPress={onSignUp}
//             style={[styles.button, { height: btnHeight }]}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>
//               {loading ? 'Creating...' : 'Sign Up'}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.rowCenter}>
//             <Text>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.link}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginTop: 12,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 13,
//     marginBottom: 6,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     height: 48,
//     backgroundColor: '#fafafa',
//   },
//   input: {
//     flex: 1,
//     marginLeft: 8,
//     paddingVertical: 8,
//   },
//   button: {
//     backgroundColor: '#8C1212',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 18,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   rowCenter: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   link: {
//     color: '#8C1212',
//     fontWeight: '600',
//   },
//   error: {
//     color: '#d9534f',
//     marginTop: 6,
//     fontSize: 12,
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BASE_URL from '../api/BaseUrl';

export default function SignUp({ navigation }) {
  const { width } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // default user
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  //   otp
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState(null); // store OTP from API

  const validate = () => {
    const newErr = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

    if (!name.trim()) newErr.name = 'Full name is required';
    if (!email.trim()) newErr.email = 'Email is required';
    if (!mobile.trim()) newErr.mobile = 'Mobile Number is required';
    else if (!emailRegex.test(email)) newErr.email = 'Enter a valid email';
    if (!password) newErr.password = 'Password is required';
    else if (password.length < 6) newErr.password = 'At least 6 characters';
    if (password !== confirmPassword)
      newErr.confirmPassword = 'Passwords do not match';

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };
  // verify otp
  const verifyOtp = async () => {
    setOtp('');
    if (otp.trim().length === 0) {
      Alert.alert('Enter OTP');
      return;
    }
    const payload = {
      email,
      otp,
    };
    try {
      const res = await fetch(
        'https://emonkey.in/emonkey_admin/api/AdminController/verify_otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      console.log('otpResponse', res?.data?.message);
      const data = await res.json();

      console.log('otpResponse', data);
      if (data?.message !== 'Invalid OTP or Email.') {
        navigation.navigate('Login');
      }
      Alert.alert(data?.message);
    } catch (error) {
      Alert.alert(error, 'Please try again');
    }

    // if (otp == serverOtp) {
    //   setOtpModal(false);
    //   Alert.alert('Success', 'Account created successfully!');
    //   navigation.replace('ELogin');
    // } else {
    //   Alert.alert('Invalid OTP', 'Please try again');
    // }
  };

  //   withotp
  const onSignUp = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        type: userType,
        name,
        email,
        phone_number: mobile,
        password,
        c_password: confirmPassword,
      };

      const res = await fetch(`${BASE_URL}emonkeysignup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        Alert.alert('Signup Failed', data?.message || 'Try again');
        return;
      }
      setOtp('');
      // Suppose your API returns OTP — e.g. data.otp
      setServerOtp(data.otp); // save OTP from API
      setOtpModal(true); // 💥 open OTP modal
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputRow}>
            <Icon name="person-outline" size={20} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={'gray'}
              style={[styles.input, { fontSize: inputFontSize }]}
            />
          </View>
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

          <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
          <View style={styles.inputRow}>
            <Icon name="mail-outline" size={20} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={'gray'}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { fontSize: inputFontSize }]}
            />
          </View>
          {errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}
          <Text style={[styles.label, { marginTop: 12 }]}>Mobile</Text>
          <View style={styles.inputRow}>
            <Icon name="phone-portrait-outline" size={20} />
            <TextInput
              value={mobile}
              onChangeText={setMobileNumber}
              placeholder="Enter mobile number"
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={10}
              style={[styles.input, { fontSize: inputFontSize }]}
            />
          </View>
          {errors.mobile ? (
            <Text style={styles.error}>{errors.mobile}</Text>
          ) : null}

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

          <Text style={[styles.label, { marginTop: 12 }]}>
            Confirm Password
          </Text>
          <View style={styles.inputRow}>
            <Icon name="lock-closed-outline" size={20} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              placeholderTextColor={'gray'}
              secureTextEntry={true}
              style={[styles.input, { fontSize: inputFontSize }]}
            />
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 20 }]}>
            Select User Type
          </Text>

          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setUserType('vendor')}
            >
              <View
                style={[
                  styles.radioCircle,
                  userType === 'vendor' && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>Vendor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setUserType('customer')}
            >
              <View
                style={[
                  styles.radioCircle,
                  userType === 'customer' && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setUserType('both')}
            >
              <View
                style={[
                  styles.radioCircle,
                  userType === 'both' && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>Both</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onSignUp}
            style={[styles.button, { height: btnHeight }]}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.rowCenter}>
            <Text style={{ color: '#666' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {otpModal && (
          <View style={styles.otpOverlay}>
            <View style={styles.otpBox}>
              <Text style={styles.otpTitle}>Verify OTP</Text>
              <Text style={styles.otpSubtitle}>
                Enter the OTP sent to your mobile number
              </Text>

              <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                placeholderTextColor={'gray'}
                keyboardType="number-pad"
                style={styles.otpInput}
                maxLength={6}
              />

              <TouchableOpacity style={styles.otpBtn} onPress={verifyOtp}>
                <Text style={styles.otpBtnText}>Verify</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOtpModal(false)}>
                <Text style={styles.otpCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    color: '#666',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
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
    marginLeft: 8,
    paddingVertical: 8,
    color: '#000',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#8C1212',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  radioSelected: {
    backgroundColor: '#8C1212',
  },

  radioText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
  //   modal
  otpOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  otpBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
  },
  otpTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  otpSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 3,
  },
  otpBtn: {
    backgroundColor: '#8C1212',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  otpBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  otpCancel: {
    textAlign: 'center',
    marginTop: 10,
    color: '#8C1212',
    fontWeight: '600',
  },
});
