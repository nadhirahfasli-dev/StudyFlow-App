import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FocusScreen() {
    const modes = [
        { key: 'Pomodoro', label: 'Pomodoro', minutes: 25 },
        { key: 'DeepWork', label: 'Deep Work', minutes: 50 },
        { key: 'Quick', label: 'Quick', minutes: 15 },
    ];

    const [activeMode, setActiveMode] = useState('Pomodoro');
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    // Handle countdown timer logic
    useEffect(() => {
        let interval = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0 && isActive) {
            setIsActive(false);
            clearInterval(interval);
            Alert.alert('Session Complete! 🎉', 'Great job! Take a well-deserved break.');
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft]);

    // Switch Modes
    const handleModeChange = (mode) => {
        setActiveMode(mode.key);
        setIsActive(false);
        setSecondsLeft(mode.minutes * 60);
    };

    // Toggle Start / Pause
    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // Reset Timer
    const resetTimer = () => {
        setIsActive(false);
        const currentModeObj = modes.find((m) => m.key === activeMode);
        setSecondsLeft((currentModeObj ? currentModeObj.minutes : 25) * 60);
    };

    // Format mm:ss
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        const formattedMins = mins < 10 ? `0${mins}` : mins;
        const formattedSecs = secs < 10 ? `0${secs}` : secs;
        return `${formattedMins} : ${formattedSecs}`;
    };

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.headerArea}>
                <Text style={styles.title}>Focus Mode</Text>
                <View style={styles.subHeader}>
                    <Ionicons name="musical-notes-outline" size={14} color="#8C7A6B" />
                    <Text style={styles.subtitle}>lo-fi is playing — you got this!</Text>
                </View>
            </View>

            {/* Mode Selector Tab */}
            <View style={styles.tabContainer}>
                {modes.map((mode) => (
                    <TouchableOpacity
                        key={mode.key}
                        style={[styles.tabButton, activeMode === mode.key && styles.activeTabButton]}
                        onPress={() => handleModeChange(mode)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabText, activeMode === mode.key && styles.activeTabText]}>
                            {mode.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Circular Progress Timer Display */}
            <View style={styles.timerCircleOuter}>
                <View style={[styles.timerCircleInner, isActive && styles.timerCircleInnerActive]}>
                    <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
                    <View style={styles.labelRow}>
                        <Text style={{ fontSize: 13 }}>📚</Text>
                        <Text style={styles.focusLabel}>
                            {isActive ? 'focusing...' : 'focus time'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Mascot & Status Feedback */}
            <View style={styles.statusArea}>
                <Text style={{ fontSize: 44, marginBottom: 4 }}>
                    {isActive ? '🔥' : secondsLeft === 0 ? '🎉' : '🌝'}
                </Text>
                <Text style={styles.statusText}>
                    {isActive
                        ? 'Stay focused, step by step~ 🌿'
                        : secondsLeft === 0
                            ? 'Amazing work! Take a break! 🍵'
                            : 'ready when you are'}
                </Text>
            </View>

            {/* Action Controls */}
            <View style={styles.actionRow}>
                {/* Reset Button */}
                <TouchableOpacity style={styles.resetButton} onPress={resetTimer} activeOpacity={0.7}>
                    <Ionicons name="refresh-outline" size={20} color="#5C4D42" />
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>

                {/* Start / Pause Main Button */}
                <TouchableOpacity
                    style={[styles.startButton, isActive && styles.pauseButton]}
                    onPress={toggleTimer}
                    activeOpacity={0.85}
                >
                    <Ionicons
                        name={isActive ? 'pause' : 'play'}
                        size={18}
                        color="#FFF"
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles.startText}>
                        {isActive ? 'Pause Session' : 'Start Session'}
                    </Text>
                    <Text style={{ fontSize: 14, marginLeft: 6 }}>🌿</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF4E8',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    headerArea: {
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
    },
    subHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#8C7A6B',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#EFE6D8',
        borderRadius: 24,
        padding: 4,
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    activeTabButton: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    tabText: {
        fontSize: 13,
        color: '#8C7A6B',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#2C1E16',
        fontWeight: 'bold',
    },
    timerCircleOuter: {
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: '#FAF4E8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    timerCircleInner: {
        width: 230,
        height: 230,
        borderRadius: 115,
        borderWidth: 10,
        borderColor: '#C4A482',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    timerCircleInnerActive: {
        borderColor: '#6B8E62',
    },
    timerText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#2C1E16',
        letterSpacing: 2,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
    },
    focusLabel: {
        fontSize: 12,
        color: '#8C7A6B',
    },
    statusArea: {
        alignItems: 'center',
        marginBottom: 35,
    },
    statusText: {
        fontSize: 13,
        color: '#8C7A6B',
        fontStyle: 'italic',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        paddingHorizontal: 10,
    },
    resetButton: {
        backgroundColor: '#EFE6D8',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetText: {
        fontSize: 10,
        color: '#5C4D42',
        fontWeight: '600',
        marginTop: 2,
    },
    startButton: {
        flex: 1,
        backgroundColor: '#B88660',
        paddingVertical: 16,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    pauseButton: {
        backgroundColor: '#6B8E62',
    },
    startText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});