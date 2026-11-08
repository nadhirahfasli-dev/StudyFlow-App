import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
    const initialEmail = route?.params?.userEmail || 'you@example.com';
    const initialName = route?.params?.userName || 'Nadhirah';

    const defaultTasks = [
        { id: '1', title: 'Calculus problem set ch.4', time: '10:00 AM', done: false },
        { id: '2', title: 'Read Romeo & Juliet Act III', time: '12:30 PM', done: true },
        { id: '3', title: 'Lab report — photosynthesis', time: '03:00 PM', done: false },
        { id: '4', title: 'Essay outline: Cold War', time: '05:00 PM', done: false },
    ];

    const [tasks, setTasks] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

    const [userName, setUserName] = useState(initialName);
    const [userEmail, setUserEmail] = useState(initialEmail);
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(userName);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskTime, setNewTaskTime] = useState('');

    // 1. Muat turun Tugasan & Profil dari Storage semasa skrin dibuka
    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('@studyflow_tasks');
            const savedName = await AsyncStorage.getItem('@studyflow_username');

            if (savedTasks !== null) {
                setTasks(JSON.parse(savedTasks));
            } else {
                setTasks(defaultTasks);
            }

            if (savedName !== null) {
                setUserName(savedName);
            }
        } catch (error) {
            console.log('Error loading stored data:', error);
        }
    };

    // 2. Simpan Tugasan ke AsyncStorage Setiap Kali 'tasks' Bertukar
    const saveTasksToStorage = async (newTasks) => {
        try {
            setTasks(newTasks);
            await AsyncStorage.setItem('@studyflow_tasks', JSON.stringify(newTasks));
        } catch (error) {
            console.log('Error saving tasks:', error);
        }
    };

    // Toggle Task Completion
    const toggleTask = (id) => {
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
        saveTasksToStorage(updatedTasks);
    };

    // Add New Task
    const handleAddTask = () => {
        if (!newTaskTitle.trim()) {
            Alert.alert('Missing Title', 'Please enter a task title.');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            title: newTaskTitle.trim(),
            time: newTaskTime.trim() ? newTaskTime.trim() : 'Anytime',
            done: false,
        };

        const updatedTasks = [newTask, ...tasks];
        saveTasksToStorage(updatedTasks);

        setNewTaskTitle('');
        setNewTaskTime('');
        setIsModalVisible(false);
    };

    // Save New Name
    const handleSaveName = async () => {
        if (!tempName.trim()) {
            Alert.alert('Empty Name', 'Name cannot be empty.');
            return;
        }
        const nameToSave = tempName.trim();
        setUserName(nameToSave);
        setIsEditingName(false);
        try {
            await AsyncStorage.setItem('@studyflow_username', nameToSave);
        } catch (error) {
            console.log('Error saving name:', error);
        }
    };

    // Delete Task on Long Press
    const handleDeleteTask = (id) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const updatedTasks = tasks.filter(t => t.id !== id);
                        saveTasksToStorage(updatedTasks);
                    }
                },
            ]
        );
    };

    // Format Tarikh
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    // Calculate Progress
    const completedCount = tasks.filter(t => t.done).length;
    const totalCount = tasks.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Handle Log Out
    const handleLogOut = () => {
        setIsProfileModalVisible(false);
        Alert.alert('Log Out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', style: 'destructive', onPress: () => navigation.replace('Login') },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 120 }}>

                {/* User Header */}
                <View style={styles.topRow}>
                    <View>
                        <Text style={styles.subGreeting}>Good morning, {userName.split(' ')[0]} 👋</Text>
                        <Text style={styles.dateTitle}>{formattedDate}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.profileAvatar}
                        onPress={() => {
                            setTempName(userName);
                            setIsEditingName(false);
                            setIsProfileModalVisible(true);
                        }}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="person" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Dynamic Progress Card */}
                <View style={styles.progressCard}>
                    <View style={styles.circleProgress}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#2C1E16' }}>{progressPercent}%</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' }}>
                            {completedCount}/{totalCount} tasks done
                        </Text>
                        <Text style={{ fontSize: 12, color: '#8C7A6B' }}>
                            {progressPercent === 100 && totalCount > 0 ? 'All done! Fantastic job! 🎉' : 'Ready to get started?'}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>🔥</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2C1E16' }}>14</Text>
                        <Text style={{ fontSize: 9, color: '#8C7A6B' }}>day streak</Text>
                    </View>
                </View>

                {/* Mini Music Player Widget */}
                <View style={styles.musicWidget}>
                    <View style={styles.musicThumb}>
                        <Ionicons name="musical-notes" size={18} color="#C4A482" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Rainy Café</Text>
                        <Text style={{ color: '#AAA', fontSize: 11 }}>jazz + rain</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.playBtn}
                        onPress={() => setIsPlaying(!isPlaying)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={14}
                            color="#2C221E"
                            style={{ marginLeft: isPlaying ? 0 : 2 }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Section Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.sectionTitle}>Today's Tasks 📝</Text>
                    <Text style={{ fontSize: 11, color: '#8C7A6B' }}>Long-press to delete</Text>
                </View>

                {/* General Task List */}
                {tasks.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={{ fontSize: 30 }}>✨</Text>
                        <Text style={styles.emptyText}>No tasks left. Tap + to add a new task!</Text>
                    </View>
                ) : (
                    tasks.map(task => (
                        <TouchableOpacity
                            key={task.id}
                            style={[styles.taskCard, task.done && styles.taskCardDone]}
                            onPress={() => toggleTask(task.id)}
                            onLongPress={() => handleDeleteTask(task.id)}
                            activeOpacity={0.8}
                        >
                            <TouchableOpacity
                                style={[styles.checkbox, task.done && styles.checkboxChecked]}
                                onPress={() => toggleTask(task.id)}
                            >
                                {task.done && <Ionicons name="checkmark" size={12} color="#FFF" />}
                            </TouchableOpacity>

                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={[styles.taskText, task.done && styles.taskDoneText]}>{task.title}</Text>
                                <Text style={styles.timeText}>🕒 {task.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={30} color="#FFF" />
            </TouchableOpacity>

            {/* Profile Modal */}
            <Modal
                visible={isProfileModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsProfileModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsProfileModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.profileModalContent}>
                            <View style={styles.profileHeader}>
                                <View style={styles.largeProfileAvatar}>
                                    <Ionicons name="person" size={32} color="#FFF" />
                                </View>

                                {isEditingName ? (
                                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 6 }}>
                                        <TextInput
                                            style={styles.nameInput}
                                            value={tempName}
                                            onChangeText={setTempName}
                                            placeholder="Enter your name"
                                            placeholderTextColor="#AAA"
                                            autoFocus
                                        />
                                        <TouchableOpacity style={styles.saveNameBtn} onPress={handleSaveName}>
                                            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 12 }}>Save Name</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={styles.profileName}>{userName}</Text>
                                            <TouchableOpacity onPress={() => setIsEditingName(true)}>
                                                <Ionicons name="pencil" size={15} color="#B88660" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.profileEmail}>{userEmail}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.profileStatsRow}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statNum}>14</Text>
                                    <Text style={styles.statLabel}>Day Streak 🔥</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statNum}>{completedCount}</Text>
                                    <Text style={styles.statLabel}>Completed ✅</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut} activeOpacity={0.8}>
                                <Ionicons name="log-out-outline" size={18} color="#D9534F" style={{ marginRight: 8 }} />
                                <Text style={styles.logoutBtnText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            {/* Add Task Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Add New Task ✏️</Text>

                                <Text style={styles.inputLabel}>TASK TITLE</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Finish Assignment / Revision"
                                    placeholderTextColor="#AAA"
                                    value={newTaskTitle}
                                    onChangeText={setNewTaskTitle}
                                />

                                <Text style={styles.inputLabel}>TIME / DUE (OPTIONAL)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. 10:00 AM or Before 5 PM"
                                    placeholderTextColor="#AAA"
                                    value={newTaskTime}
                                    onChangeText={setNewTaskTime}
                                />

                                <View style={{ flexDirection: 'row', gap: 10, marginTop: 15 }}>
                                    <TouchableOpacity
                                        style={styles.cancelBtn}
                                        onPress={() => setIsModalVisible(false)}
                                    >
                                        <Text style={styles.cancelBtnText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.createBtn}
                                        onPress={handleAddTask}
                                    >
                                        <Text style={styles.createBtnText}>Add Task</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF4E8' },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    subGreeting: { fontSize: 13, color: '#8C7A6B', fontWeight: '500' },
    dateTitle: { fontSize: 24, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif', marginTop: 2 },
    profileAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#B88660', justifyContent: 'center', alignItems: 'center', elevation: 2 },
    progressCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#EFE6D8' },
    circleProgress: { width: 46, height: 46, borderRadius: 23, borderWidth: 3, borderColor: '#C4A482', justifyContent: 'center', alignItems: 'center' },
    musicWidget: { backgroundColor: '#2C221E', borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center' },
    musicThumb: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#3D312A', justifyContent: 'center', alignItems: 'center' },
    playBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    taskCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#EFE6D8' },
    taskCardDone: { backgroundColor: '#F8F6F0', opacity: 0.7 },
    checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#C4A482', justifyContent: 'center', alignItems: 'center' },
    checkboxChecked: { backgroundColor: '#B88660', borderColor: '#B88660' },
    taskText: { fontSize: 15, fontWeight: '600', color: '#2C1E16' },
    taskDoneText: { textDecorationLine: 'line-through', color: '#AAA' },
    timeText: { fontSize: 11, color: '#8C7A6B', marginTop: 4 },
    fab: { position: 'absolute', bottom: 90, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#B88660', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4 },
    emptyContainer: { alignItems: 'center', paddingVertical: 30 },
    emptyText: { color: '#8C7A6B', fontSize: 13, marginTop: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderWidth: 1, borderColor: '#EFE6D8' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif', marginBottom: 15 },
    inputLabel: { fontSize: 10, fontWeight: 'bold', color: '#8C7A6B', marginBottom: 6 },
    input: { backgroundColor: '#FAF4E8', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#2C1E16', marginBottom: 15, borderWidth: 1, borderColor: '#EFE6D8' },
    cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 20, backgroundColor: '#EFE6D8', alignItems: 'center' },
    cancelBtnText: { color: '#5C4D42', fontWeight: 'bold', fontSize: 13 },
    createBtn: { flex: 1, paddingVertical: 14, borderRadius: 20, backgroundColor: '#B88660', alignItems: 'center' },
    createBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
    profileModalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#EFE6D8' },
    profileHeader: { alignItems: 'center', marginBottom: 20, width: '100%' },
    largeProfileAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#B88660', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    profileName: { fontSize: 18, fontWeight: 'bold', color: '#2C1E16', fontFamily: 'serif' },
    profileEmail: { fontSize: 12, color: '#8C7A6B', marginTop: 2 },
    nameInput: { backgroundColor: '#FAF4E8', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: '#2C1E16', borderWidth: 1, borderColor: '#B88660', width: '90%', textAlign: 'center' },
    saveNameBtn: { backgroundColor: '#B88660', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, marginTop: 8 },
    profileStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 20, width: '100%' },
    statBox: { flex: 1, backgroundColor: '#FAF4E8', padding: 12, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#EFE6D8' },
    statNum: { fontSize: 18, fontWeight: 'bold', color: '#2C1E16' },
    statLabel: { fontSize: 10, color: '#8C7A6B', marginTop: 2 },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF2F2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, borderWidth: 1, borderColor: '#F8D7DA', width: '100%', justifyContent: 'center' },
    logoutBtnText: { color: '#D9534F', fontWeight: 'bold', fontSize: 13 },
});