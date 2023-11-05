import React, {useState} from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon library


const SettingScreen = ({navigation}) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        // You can handle saving the user's preference here
    };
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);

    const toggleDarkMode = () => { // Implement logic to toggle dark mode here
        setDarkModeEnabled(!isDarkModeEnabled);
    };

    const handleChangePassword = () => { // Implement logic to navigate to change password screen
    };

    const handleDeleteAccount = () => { // Implement logic to show confirmation modal and delete account
    };

    const openDrawer = () => {
        navigation.openDrawer();
    };


    return (
        <View style={
            styles.container
        }>
            <View style={
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 40,
                    top: 30
                }
            }>
                <TouchableOpacity onPress={openDrawer}>
                    <Icon name="bars"
                        size={30}
                        color="#1697C7"
                        top={5}/>
                </TouchableOpacity>

                {/* logo */}
                <Image style={
                        {
                            width: 200,
                            height: 150,
                            position: 'absolute',
                            left: 230,
                            top: -40

                        }
                    }
                    source={
                        require('../../assets/logo2.png')
                    }/>

            </View>
            <View style={
                styles.background
            }></View>
            <Text style={
                styles.heading
            }>Settings</Text>


            <View style={
                styles.setting
            }>
                <Text style={
                    styles.settingLabel
                }>Enable Notifications</Text>
                <Switch value={notificationsEnabled}  trackColor={{

    true: '#1697C7', 
    
  }}
  thumbColor={notificationsEnabled ? '#fff' : '#fff'}
                    onValueChange={toggleNotifications}/>
            </View>
            <View style={
                styles.settingRow
            }>
                <Text style={
                    styles.settingLabel
                }>Dark Mode</Text>
                <Switch value={isDarkModeEnabled}
                 trackColor={{

true: '#1697C7', 

}}
thumbColor={notificationsEnabled ? '#fff' : '#fff'}
                    onValueChange={toggleDarkMode}/>
            </View>

            <TouchableOpacity style={
                    styles.settingRow
                }
                onPress={handleChangePassword}>
                <Text style={
                    styles.settingLabel
                }>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={
                    styles.settingRow
                }
                onPress={handleDeleteAccount}>
                <Text style={
                    [
                        styles.settingLabel, {
                            color: 'red'
                        }
                    ]
                }>Delete Account</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop:100,
        letterSpacing:2,
        marginLeft:20
    },
    background: {
      position: 'absolute',
      top: 100,
      left: 0,
      width: '120%',
      height: '15%',
      backgroundColor: '#1697C7', // Set your preferred color
  },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 80
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    settingLabel: {
        fontSize: 20
    }
});

export default SettingScreen;
