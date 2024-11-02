import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const DashboardApp = () => {
  const navigation=useNavigation();
    const [activeSection, setActiveSection] = useState('Home');
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);

    const toggleDashboard = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'Profile':
                return <ProfileSection />;
            case 'Settings':
                return <SettingsSection />;
            case 'Analytics':
                return <AnalyticsSection />;
            case 'Messages':
                return <MessagesSection />;
            case 'Tasks':
                return <TasksSection />;
            case 'Calendar':
                return <CalendarSection />;
            default:
                return <HomeSection />;
        }
    };

    const DashboardButton = ({ name, icon, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.dashboardButton}>
            <Icon name={icon} size={30} color="white" />
            {isDashboardOpen && <Text style={styles.dashboardButtonText}>{name}</Text>}
        </TouchableOpacity>
    );

    const HomeSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Welcome to the Dashboard!</Text>
        </View>
    );

    const ProfileSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Profile Section</Text>
            <Text style={styles.contentText}>Username: Maniiish</Text>
            <Text style={styles.contentText}>Email: bonnay@gmail.com</Text>
        </View>
    );

    const SettingsSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Settings Section</Text>
            <Text style={styles.contentText}>Notifications: On</Text>
            <Text style={styles.contentText}>Theme: Light</Text>
        </View>
    );

    const AnalyticsSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Analytics Section</Text>
            <Text style={styles.contentText}>Analytics Content Goes Here</Text>
        </View>
    );

    const MessagesSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Messages Section</Text>
            <Text style={styles.contentText}>Messages Content Goes Here</Text>
        </View>
    );

    const TasksSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Tasks Section</Text>
            <Text style={styles.contentText}>Upcoming Tasks</Text>
            {/* Add task items here */}
        </View>
    );

    const CalendarSection = () => (
        <View style={styles.mainContent}>
            <Text style={styles.headerTitle1}>Calendar Section</Text>
            <Text style={styles.contentText}>Events This Week</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.dashboardContainer, { width: isDashboardOpen ? 110 : 80 }]}>
                <TouchableOpacity onPress={toggleDashboard} style={styles.menuButton}>
                    <Icon name="menu" size={30} color="white" />
                </TouchableOpacity>

                <DashboardButton
                    name="Profile"
                    icon="person"
                    onPress={() => setActiveSection('Profile')}
                />
                <DashboardButton
                    name="Settings"
                    icon="settings"
                    onPress={() => setActiveSection('Settings')}
                />
                <DashboardButton
                    name="Analytics"
                    icon="stats-chart"
                    onPress={() => setActiveSection('Analytics')}
                />
                <DashboardButton
                    name="Messages"
                    icon="chatbox"
                    onPress={() => setActiveSection('Messages')}
                />
                <DashboardButton
                    name="Tasks"
                    icon="checkbox-outline"
                    onPress={() => setActiveSection('Tasks')}
                />
                <DashboardButton
                    name="Calendar"
                    icon="calendar"
                    onPress={() => setActiveSection('Calendar')}
                />
            </View>

            <View style={styles.mainContentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Dashboard App</Text>
                </View>
                {renderSection()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    dashboardContainer: {
        backgroundColor: 'green',
        paddingVertical: 20,
        alignItems: 'center',
        // borderRightWidth: 1,
        borderRightColor: '#ddd',
        overflow: 'hidden',
        width:50
    },
    menuButton: {
        marginBottom: 20,
    },
    dashboardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    dashboardButtonText: {
        color: 'white',
        marginLeft: 0,
    },
    mainContentContainer: {
        flex: 0,
        backgroundColor: '#f0f0f0',
    },
    headerContainer: {
        // backgroundColor: '#3498db',
        backgroundColor: 'green',
        padding: 15,
        width:1000,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerTitle1: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
  },
    mainContent: {
        flex: 0,
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    button:{
      marginLeft:20,
      width:100,
      height:50,
      backgroundColor:'#3498db'
    }
});

export default DashboardApp;
