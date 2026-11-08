import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TopHeader({ showBadge = false, badgeText = "BLOOM 🌸" }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoRow}>
                <View style={styles.avatarCircle}>
                    <Text style={{ fontSize: 16 }}>🌱</Text>
                </View>
                <Text style={styles.title}>StudyFlow</Text>
                {showBadge && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeText}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#FDF8F0',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#9E8055',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#362312',
        fontFamily: 'serif',
    },
    badge: {
        backgroundColor: '#F3E5D8',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        marginLeft: 8,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#B06D44',
    },
});