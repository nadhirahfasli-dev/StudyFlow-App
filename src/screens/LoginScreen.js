import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
    Modal,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isSignUpVisible, setIsSignUpVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);

    const handleLogin = () => {
        if (!email.trim() && !password.trim()) {
            Alert.alert('Required Fields Missing', 'Please enter your email address and password to log in.');
            return;
        }
        if (!email.trim()) {
            Alert.alert('Missing Email', 'Please enter your email address.');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Missing Password', 'Please enter your password.');
            return;
        }

        navigation.replace('MainTabs', {
            userEmail: email,
            userName: email.split('@')[0],
        });
    };

    const handleSignUp = () => {
        if (!fullName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
            Alert.alert('Incomplete Form', 'Please fill in all fields to create your account.');
            return;
        }

        setIsSignUpVisible(false);
        navigation.replace('MainTabs', {
            userEmail: signUpEmail,
            userName: fullName,
        });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.brandRow}>
                        <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
                        <Text style={styles.brandTitle}>StudyFlow</Text>
                        <View style={styles.tagBadge}>
                            <Text style={styles.tagText}>BLOOM</Text>
                        </View>
                    </View>

                    <View style={styles.welcomeSection}>
                        <Text style={styles.subHeader}>Welcome back</Text>
                        <Text style={styles.headerTitle}>Sign in to continue</Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={18} color="#8C7A6B" style={{ marginRight: 10 }} />
                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor="#B5A595"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>PASSWORD</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={18} color="#8C7A6B" style={{ marginRight: 10 }} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#B5A595"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#8C7A6B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
                        <Text style={styles.loginBtnText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>New here? </Text>
                        <TouchableOpacity onPress={() => setIsSignUpVisible(true)}>
                            <Text style={styles.signupText}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            <Modal visible={isSignUpVisible} transparent={true} animationType="slide" onRequestClose={() => setIsSignUpVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                            <View style={styles.modalContent}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={styles.modalTitle}>Create Account</Text>
                                    <TouchableOpacity onPress={() => setIsSignUpVisible(false)}>
                                        <Ionicons name="close" size={24} color="#8C7A6B" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>FULL NAME</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="person-outline" size={18} color="#8C7A6B" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.input} placeholder="e.g. Nadhirah Fasli" placeholderTextColor="#B5A595" value={fullName} onChangeText={setFullName} />
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="mail-outline" size={18} color="#8C7A6B" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#B5A595" keyboardType="email-address" autoCapitalize="none" value={signUpEmail} onChangeText={setSignUpEmail} />
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>PASSWORD</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="lock-closed-outline" size={18} color="#8C7A6B" style={{ marginRight: 10 }} />
                                        <TextInput style={styles.input} placeholder="Create a password" placeholderTextColor="#B5A595" secureTextEntry={!showSignUpPassword} value={signUpPassword} onChangeText={setSignUpPassword} />
                                        <TouchableOpacity onPress={() => setShowSignUpPassword(!showSignUpPassword)}>
                                            <Ionicons name={showSignUpPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#8C7A6B" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp} activeOpacity={0.85}>
                                    <Text style={styles.loginBtnText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF4E8' },
    scrollContent: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
    brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
    logoImage: { width: 36, height: 36, marginRight: 8 },
    brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    tagBadge: { backgroundColor: '#EFE6D8', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
    tagText: { fontSize: 9, fontWeight: 'bold', color: '#8C7A6B', letterSpacing: 0.5 },
    welcomeSection: { marginBottom: 32 },
    subHeader: { fontSize: 14, color: '#8C7A6B', marginBottom: 4 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    formGroup: { marginBottom: 18 },
    inputLabel: { fontSize: 10, fontWeight: 'bold', color: '#8C7A6B', marginBottom: 6, letterSpacing: 0.5 },
    inputWrapper: { backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EFE6D8' },
    input: { flex: 1, fontSize: 14, color: '#2C1E16' },
    loginBtn: { backgroundColor: '#B88660', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 15, marginBottom: 20 },
    loginBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
    footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    footerText: { fontSize: 13, color: '#8C7A6B' },
    signupText: { fontSize: 13, fontWeight: 'bold', color: '#B88660' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, borderWidth: 1, borderColor: '#EFE6D8' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
});