import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SubscriptionScreen({ navigation }) {
    const [selectedPlan, setSelectedPlan] = useState('bloom'); // 'seedling' or 'bloom'

    const handleContinue = () => {
        if (selectedPlan === 'bloom') {
            Alert.alert(
                '14-Day Free Trial Started!',
                'Welcome to Bloom Pro! You now have access to all premium features.',
                [
                    {
                        text: 'Continue to App',
                        onPress: () => navigation.replace('Login'), // Tukar 'LoginScreen' kepada 'Login'
                    },
                ]
            );
        } else {
            navigation.replace('Login'); // Tukar 'LoginScreen' kepada 'Login'
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header with Logo */}
                <View style={styles.brandRow}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.brandTitle}>StudyFlow</Text>
                </View>

                {/* Title Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.mainTitle}>Pick your study vibe</Text>
                    <Text style={styles.subTitle}>Start free forever. Upgrade when you're ready.</Text>
                </View>

                {/* Seedling Plan (Free) */}
                <TouchableOpacity
                    style={[
                        styles.planCard,
                        selectedPlan === 'seedling' && styles.selectedPlanCard,
                    ]}
                    onPress={() => setSelectedPlan('seedling')}
                    activeOpacity={0.85}
                >
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="leaf-outline" size={20} color="#6B8E62" style={{ marginRight: 6 }} />
                            <Text style={styles.planName}>Seedling</Text>
                        </View>
                        <View style={styles.freeBadge}>
                            <Text style={styles.freeBadgeText}>FREE</Text>
                        </View>
                    </View>
                    <Text style={styles.planDesc}>Basic tools to get started</Text>

                    {/* Features Grid */}
                    <View style={styles.featuresGrid}>
                        <View style={styles.featureChip}>
                            <Ionicons name="checkmark" size={12} color="#6B8E62" />
                            <Text style={styles.chipText}>5 tasks/day</Text>
                        </View>
                        <View style={styles.featureChip}>
                            <Ionicons name="checkmark" size={12} color="#6B8E62" />
                            <Text style={styles.chipText}>2 lo-fi stations</Text>
                        </View>
                        <View style={styles.featureChip}>
                            <Ionicons name="checkmark" size={12} color="#6B8E62" />
                            <Text style={styles.chipText}>Basic timer</Text>
                        </View>
                        <View style={styles.featureChip}>
                            <Ionicons name="checkmark" size={12} color="#6B8E62" />
                            <Text style={styles.chipText}>Habit streak</Text>
                        </View>
                        <View style={[styles.featureChip, styles.disabledChip]}>
                            <Text style={styles.disabledChipText}>Ambient mixer</Text>
                        </View>
                        <View style={[styles.featureChip, styles.disabledChip]}>
                            <Text style={styles.disabledChipText}>All stations</Text>
                        </View>
                        <View style={[styles.featureChip, styles.disabledChip]}>
                            <Text style={styles.disabledChipText}>Study analytics</Text>
                        </View>
                        <View style={[styles.featureChip, styles.disabledChip]}>
                            <Text style={styles.disabledChipText}>Custom themes</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Bloom Plan (Pro - Popular) */}
                <TouchableOpacity
                    style={[
                        styles.planCard,
                        styles.proCard,
                        selectedPlan === 'bloom' && styles.selectedProCard,
                    ]}
                    onPress={() => setSelectedPlan('bloom')}
                    activeOpacity={0.85}
                >
                    {/* Popular Tag */}
                    <View style={styles.popularTag}>
                        <Ionicons name="sparkles" size={10} color="#FFF" style={{ marginRight: 3 }} />
                        <Text style={styles.popularTagText}>POPULAR</Text>
                    </View>

                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="flower-outline" size={20} color="#B88660" style={{ marginRight: 6 }} />
                            <Text style={styles.planName}>Bloom</Text>
                        </View>
                        <View style={styles.proBadge}>
                            <Text style={styles.proBadgeText}>PRO</Text>
                        </View>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceText}>RM 19.90</Text>
                        <Text style={styles.periodText}>/month</Text>
                    </View>

                    {/* Features Grid */}
                    <View style={styles.featuresGrid}>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>Unlimited tasks</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>All 12 lo-fi stations</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>Ambient sound mixer</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>Study analytics</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>Custom themes</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>No ads</Text>
                        </View>
                        <View style={styles.featureChipPro}>
                            <Ionicons name="checkmark" size={12} color="#B88660" />
                            <Text style={styles.chipTextPro}>Buddy outfits</Text>
                        </View>
                    </View>

                    <View style={styles.trialNoteRow}>
                        <Ionicons name="cafe-outline" size={14} color="#8C7A6B" />
                        <Text style={styles.trialNoteText}>14-day free trial · Cancel anytime</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Fixed Bottom Action Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={handleContinue}
                    activeOpacity={0.85}
                >
                    <Text style={styles.actionBtnText}>
                        {selectedPlan === 'bloom' ? 'Try Bloom Free for 14 Days' : 'Continue with Free Plan'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF4E8',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 120,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoImage: {
        width: 36,
        height: 36,
        marginRight: 8,
    },
    brandTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
    },
    headerSection: {
        marginBottom: 25,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
        lineHeight: 38,
    },
    subTitle: {
        fontSize: 13,
        color: '#8C7A6B',
        marginTop: 6,
    },
    planCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#EFE6D8',
        position: 'relative',
    },
    selectedPlanCard: {
        borderColor: '#6B8E62',
        backgroundColor: '#F7FAF7',
    },
    proCard: {
        backgroundColor: '#FFF',
        borderColor: '#EFE6D8',
    },
    selectedProCard: {
        borderColor: '#B88660',
        backgroundColor: '#FCF8F5',
    },
    popularTag: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#B88660',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    popularTagText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
    },
    freeBadge: {
        backgroundColor: '#E3F0E5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    freeBadgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#4B6E43',
    },
    proBadge: {
        backgroundColor: '#F5E6EC',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    proBadgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#B88660',
    },
    planDesc: {
        fontSize: 12,
        color: '#8C7A6B',
        marginBottom: 14,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 14,
    },
    priceText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C1E16',
        fontFamily: 'serif',
    },
    periodText: {
        fontSize: 12,
        color: '#8C7A6B',
        marginLeft: 4,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    featureChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF4E8',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
    },
    chipText: {
        fontSize: 11,
        color: '#5C4D42',
        fontWeight: '500',
    },
    disabledChip: {
        backgroundColor: '#F2EDE5',
        opacity: 0.5,
    },
    disabledChipText: {
        fontSize: 11,
        color: '#A09589',
        textDecorationLine: 'line-through',
    },
    featureChipPro: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7EFE8',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
    },
    chipTextPro: {
        fontSize: 11,
        color: '#2C1E16',
        fontWeight: '600',
    },
    trialNoteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 16,
    },
    trialNoteText: {
        fontSize: 11,
        color: '#8C7A6B',
        fontStyle: 'italic',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FAF4E8',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#EFE6D8',
    },
    actionBtn: {
        backgroundColor: '#B88660',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    actionBtnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});