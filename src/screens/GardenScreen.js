import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

export default function GardenScreen() {
    const [selectedBadge, setSelectedBadge] = useState(null);

    const badgesList = [
        { id: '1', icon: '🔥', title: '14-day streak', unlocked: true, desc: 'Studied for 14 consecutive days without breaking the streak.', progress: '14 / 14 days' },
        { id: '2', icon: '📚', title: 'First session', unlocked: true, desc: 'Completed your very first focus study session.', progress: '1 / 1 session' },
        { id: '3', icon: '🌸', title: 'Full bloom', unlocked: false, desc: 'Complete all daily tasks to make your plant reach full bloom.', progress: '3 / 6 tasks' },
        { id: '4', icon: '🌙', title: 'Night owl', unlocked: true, desc: 'Completed a focus session late at night past 9:00 PM.', progress: 'Completed' },
        { id: '5', icon: '⚡', title: '10 sessions', unlocked: false, desc: 'Complete 10 total focus study sessions.', progress: '4 / 10 sessions' },
        { id: '6', icon: '🏆', title: '30-day streak', unlocked: false, desc: 'Maintain a study streak for 30 consecutive days.', progress: '14 / 30 days' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 100 }}>
                {/* Title Header */}
                <Text style={styles.title}>Study Garden</Text>
                <Text style={styles.subtitle}>Complete tasks to grow your plant 🌿</Text>

                {/* Main Garden Card */}
                <View style={styles.plantCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <View>
                            <Text style={styles.plantTitle}>Seedling sprouting! 🌱</Text>
                            <Text style={styles.plantSub}>3/6 tasks · Stage 2/4</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.levelText}>Lv.3</Text>
                            <Text style={styles.xpText}>1240 XP</Text>
                        </View>
                    </View>

                    {/* Plant Display */}
                    <View style={styles.plantContainer}>
                        <View style={styles.pot}>
                            <View style={styles.stem} />
                            <View style={styles.leafLeft} />
                            <View style={styles.leafRight} />
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarTrack}>
                        <View style={[styles.progressBarFill, { width: '50%' }]} />
                    </View>
                    <Text style={styles.progressText}>50% — keep going!</Text>
                </View>

                {/* Weekly Tracker */}
                <View style={styles.sectionCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                        <Text style={styles.cardHeader}>This Week 🗓️</Text>
                        <Text style={styles.streakCount}>🔥 14 <Text style={styles.streakLabel}>day streak</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <View key={i} style={{ alignItems: 'center' }}>
                                <View style={[styles.dayDot, i < 4 && styles.dayDotActive]}>
                                    <Text style={{ fontSize: 10 }}>{i < 4 ? '🌱' : '·'}</Text>
                                </View>
                                <Text style={styles.dayLabel}>{day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Badges Section Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>Badges 🏅</Text>
                    <Text style={{ fontSize: 11, color: '#8C7A6B' }}>Tap badge for details</Text>
                </View>

                {/* Badges Grid */}
                <View style={styles.badgesGrid}>
                    {badgesList.map((badge) => (
                        <TouchableOpacity
                            key={badge.id}
                            style={[styles.badgeCard, !badge.unlocked && styles.badgeLocked]}
                            onPress={() => setSelectedBadge(badge)}
                            activeOpacity={0.7}
                        >
                            {!badge.unlocked && <Text style={styles.lockIcon}>🔒</Text>}
                            <Text style={styles.badgeIcon}>{badge.icon}</Text>
                            <Text style={[styles.badgeLabel, !badge.unlocked && styles.badgeLabelLocked]}>
                                {badge.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Interactive Modal */}
            <Modal
                visible={selectedBadge !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedBadge(null)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setSelectedBadge(null)}
                >
                    {selectedBadge && (
                        <View style={styles.modalContent}>
                            <Text style={styles.modalIcon}>{selectedBadge.icon}</Text>
                            <Text style={styles.modalTitle}>{selectedBadge.title}</Text>

                            <View style={[styles.statusBadge, selectedBadge.unlocked ? styles.statusUnlocked : styles.statusLocked]}>
                                <Text style={styles.statusText}>
                                    {selectedBadge.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                                </Text>
                            </View>

                            <Text style={styles.modalDesc}>{selectedBadge.desc}</Text>

                            <View style={styles.progressBox}>
                                <Text style={styles.progressBoxTitle}>Current Progress:</Text>
                                <Text style={styles.progressBoxVal}>{selectedBadge.progress}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => setSelectedBadge(null)}
                            >
                                <Text style={styles.closeBtnText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF4E8' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    subtitle: { fontSize: 12, color: '#8C7A6B', marginBottom: 15 },
    plantCard: { backgroundColor: '#EBF3EC', borderRadius: 20, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: '#D4E4D6' },
    plantTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    plantSub: { fontSize: 11, color: '#8C7A6B', marginTop: 2 },
    levelText: { fontSize: 16, fontWeight: 'bold', color: '#2C1E16' },
    xpText: { fontSize: 10, color: '#8C7A6B' },
    plantContainer: { height: 110, justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
    pot: { width: 50, height: 38, backgroundColor: '#C29B7F', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'flex-start' },
    stem: { width: 5, height: 35, backgroundColor: '#6B8E62', marginTop: -25, borderRadius: 3 },
    leafLeft: { position: 'absolute', top: -20, left: 12, width: 12, height: 8, backgroundColor: '#6B8E62', borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
    leafRight: { position: 'absolute', top: -24, right: 12, width: 12, height: 8, backgroundColor: '#6B8E62', borderTopRightRadius: 10, borderBottomLeftRadius: 10 },
    progressBarTrack: { height: 8, backgroundColor: '#D9E8DA', borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#6B8E62' },
    progressText: { textAlign: 'center', fontSize: 11, color: '#8C7A6B', marginTop: 6 },
    sectionCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EFE6D8' },
    cardHeader: { fontSize: 15, fontWeight: 'bold', color: '#2C1E16' },
    streakCount: { fontSize: 12, fontWeight: 'bold', color: '#2C1E16' },
    streakLabel: { fontSize: 10, color: '#8C7A6B', fontWeight: 'normal' },
    dayDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3EDE2', justifyContent: 'center', alignItems: 'center' },
    dayDotActive: { backgroundColor: '#C29B7F' },
    dayLabel: { fontSize: 10, color: '#8C7A6B', marginTop: 4 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif', marginVertical: 10 },
    badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    badgeCard: { backgroundColor: '#FFF', width: '31%', height: 90, borderRadius: 16, alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 1, borderColor: '#EFE6D8', position: 'relative' },
    badgeLocked: { backgroundColor: '#F8F6F0', opacity: 0.5 },
    lockIcon: { position: 'absolute', top: 6, right: 6, fontSize: 10 },
    badgeIcon: { fontSize: 24, marginBottom: 6 },
    badgeLabel: { fontSize: 10, fontWeight: '600', color: '#5C4D42', textAlign: 'center' },
    badgeLabelLocked: { color: '#A09589' },

    /* Modal Styling */
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    modalContent: { width: '100%', backgroundColor: '#FFF', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#EFE6D8' },
    modalIcon: { fontSize: 50, marginBottom: 10 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginVertical: 8 },
    statusUnlocked: { backgroundColor: '#E3F0E5' },
    statusLocked: { backgroundColor: '#F5E6EC' },
    statusText: { fontSize: 10, fontWeight: 'bold', color: '#5C4D42' },
    modalDesc: { fontSize: 13, color: '#666', textAlign: 'center', marginVertical: 10, lineHeight: 18 },
    progressBox: { backgroundColor: '#FAF4E8', width: '100%', padding: 12, borderRadius: 12, alignItems: 'center', marginVertical: 10 },
    progressBoxTitle: { fontSize: 10, color: '#8C7A6B' },
    progressBoxVal: { fontSize: 14, fontWeight: 'bold', color: '#2C1E16', marginTop: 2 },
    closeBtn: { backgroundColor: '#B88660', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20, marginTop: 10 },
    closeBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});