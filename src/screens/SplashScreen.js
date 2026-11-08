import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;

    useEffect(() => {
        // Smooth Fade-In and Scale-Up Animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto navigate to Subscription Screen after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Subscription');
        }, 2500);

        return () => clearTimeout(timer);
    }, [fadeAnim, scaleAnim, navigation]);

    return (
        <View style={styles.container}>
            {/* Decorative Minimalist Background Shapes */}
            <View style={[styles.circleBg, styles.circleTopLeft]} />
            <View style={[styles.circleBg, styles.circleBottomRight]} />

            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {/* App Logo */}
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* App Title */}
                <Text style={styles.appTitle}>StudyFlow</Text>

                {/* Tagline */}
                <Text style={styles.tagline}>Study soft. Grow daily.</Text>
            </Animated.View>

            {/* Modern Bottom Loading Indicator Dots */}
            <View style={styles.loadingDotsRow}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF4E8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    circleBg: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: 'rgba(239, 230, 216, 0.55)',
    },
    circleTopLeft: {
        width: 280,
        height: 280,
        top: -80,
        left: -80,
    },
    circleBottomRight: {
        width: 320,
        height: 320,
        bottom: -100,
        right: -100,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#2C1E16',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#EFE6D8',
    },
    logoImage: {
        width: 58,
        height: 58,
    },
    appTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
        letterSpacing: 0.5,
    },
    tagline: {
        fontSize: 14,
        color: '#8C7A6B',
        marginTop: 8,
        letterSpacing: 1,
        fontWeight: '500',
    },
    loadingDotsRow: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#DCD0C0',
    },
    dotActive: {
        width: 18,
        backgroundColor: '#B88660',
    },
});