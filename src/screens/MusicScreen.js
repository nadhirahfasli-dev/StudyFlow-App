import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MusicScreen() {
    const stations = [
        { id: '1', title: 'Rainy Café', sub: 'jazz + rain', bpm: '72 BPM' },
        { id: '2', title: 'Cozy Library', sub: 'lo-fi + pages', bpm: '68 BPM' },
        { id: '3', title: 'Night Study', sub: 'synth + calm', bpm: '80 BPM' },
    ];

    const ambientSounds = [
        { id: 'rain', name: 'Rain', icon: '🌧️' },
        { id: 'cafe', name: 'Café', icon: '☕' },
        { id: 'fire', name: 'Fire', icon: '🔥' },
        { id: 'vinyl', name: 'Vinyl', icon: '🎵' },
        { id: 'birds', name: 'Birds', icon: '🐦' },
        { id: 'thunder', name: 'Thunder', icon: '🌩️' },
    ];

    const [activeStation, setActiveStation] = useState(stations[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeMix, setActiveMix] = useState(['rain', 'cafe']);

    // Toggle Ambient Sound Selection
    const toggleAmbient = (soundId) => {
        if (activeMix.includes(soundId)) {
            setActiveMix(activeMix.filter((id) => id !== soundId));
        } else {
            setActiveMix([...activeMix, soundId]);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/music.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {/* Overlay Gelap supaya Teks Sentiasa Jelas Dibaca */}
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 100 }}>
                    {/* Header Info */}
                    <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
                    <Text style={styles.stationTitle}>{activeStation.title}</Text>
                    <Text style={styles.stationSub}>
                        {activeStation.sub} · {activeStation.bpm}
                    </Text>

                    {/* Animated Soundwave Visualizer */}
                    <View style={styles.visualizerRow}>
                        {[40, 70, 50, 90, 60, 80, 55, 45, 65].map((height, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.waveBar,
                                    { height: isPlaying ? height : 15, opacity: isPlaying ? 1 : 0.4 },
                                ]}
                            />
                        ))}
                    </View>

                    {/* Main Play / Pause Button */}
                    <View style={{ alignItems: 'center', marginVertical: 25 }}>
                        <TouchableOpacity
                            style={styles.mainPlayBtn}
                            onPress={() => setIsPlaying(!isPlaying)}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name={isPlaying ? 'pause' : 'play'}
                                size={28}
                                color="#221915"
                                style={{ marginLeft: isPlaying ? 0 : 3 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Stations Section */}
                    <Text style={styles.sectionTitle}>Stations</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 25 }}>
                        {stations.map((station) => {
                            const isSelected = activeStation.id === station.id;
                            return (
                                <TouchableOpacity
                                    key={station.id}
                                    style={[styles.stationCard, isSelected && styles.stationCardActive]}
                                    onPress={() => setActiveStation(station)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.stationCardTitle, isSelected && styles.stationCardTitleActive]}>
                                        {station.title}
                                    </Text>
                                    <Text style={styles.stationCardSub}>{station.bpm}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* Ambient Mix Section */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text style={styles.sectionTitle}>Ambient Mix</Text>
                        <Text style={{ fontSize: 11, color: '#DDD' }}>Tap to toggle layered sounds</Text>
                    </View>

                    <View style={styles.ambientGrid}>
                        {ambientSounds.map((sound) => {
                            const isActive = activeMix.includes(sound.id);
                            return (
                                <TouchableOpacity
                                    key={sound.id}
                                    style={[styles.ambientCard, isActive && styles.ambientCardActive]}
                                    onPress={() => toggleAmbient(sound.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={{ fontSize: 26, marginBottom: 6 }}>{sound.icon}</Text>
                                    <Text style={[styles.ambientName, isActive && styles.ambientNameActive]}>
                                        {sound.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)', // Lapisan lutsinar gelap (55% opacity)
    },
    nowPlayingLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#E0C9B6',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    stationTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'serif',
    },
    stationSub: {
        fontSize: 12,
        color: '#D4C4B7',
        marginTop: 2,
    },
    visualizerRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 8,
        height: 90,
        marginVertical: 20,
    },
    waveBar: {
        width: 6,
        backgroundColor: '#C8A88A',
        borderRadius: 3,
    },
    mainPlayBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#C8A88A',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'serif',
        marginBottom: 12,
    },
    stationCard: {
        backgroundColor: 'rgba(42, 33, 29, 0.75)',
        borderRadius: 16,
        padding: 14,
        marginRight: 10,
        width: 125,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    stationCardActive: {
        borderColor: '#C8A88A',
        backgroundColor: 'rgba(53, 41, 36, 0.9)',
    },
    stationCardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#DDD',
        marginBottom: 4,
    },
    stationCardTitleActive: {
        color: '#FFF',
    },
    stationCardSub: {
        fontSize: 10,
        color: '#BBB',
    },
    ambientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    ambientCard: {
        backgroundColor: 'rgba(42, 33, 29, 0.75)',
        width: '31%',
        height: 85,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    ambientCardActive: {
        borderColor: '#C8A88A',
        backgroundColor: 'rgba(53, 41, 36, 0.9)',
    },
    ambientName: {
        fontSize: 11,
        color: '#CCC',
        fontWeight: '500',
    },
    ambientNameActive: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});