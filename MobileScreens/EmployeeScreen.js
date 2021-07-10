import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerItems } from 'react-navigation-drawer';

//HomeScreen for Employee
function HomeScreen({ navigation }) {
    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Home</Text>
                </View>
                {/*Break*/}
                <Text>{'\n'}</Text>
                {/* CheckIn */}
                <View style={styles.active}>
                    <Text style={styles.activetext}> Check in to start working....</Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.ActiveButton}>
                        <Text style={styles.activebuttontext}>Check-In</Text>
                        <Feather name="clipboard" size={40} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.activetext}> Status </Text>
                </View>
            </ImageBackground>
        </View>
    );
}

//Settings Screen
function SettingScreen({ navigation }) {

    //Logout Method

    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Settings</Text>
                </View>
                {/*Break*/}
                <Text>{'\n'}</Text>
                {/* LogOut */}
                <View>
                    <TouchableOpacity
                        color="black"
                        style={styles.LogoutButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Text style={styles.logouttext}>Log Out</Text>
                        <Feather name="log-out" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

//Profile Screen
function ProfileScreen({ navigation }) {

    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Profile</Text>
                </View>
                {/*Break*/}
                <Text>{'\n'}</Text>
                <View style={styles.Profile}>
                    <Text style={styles.ProfileInfo}>Name: </Text>
                    <Text style={styles.ProfileInfo}>PhoneNumber: </Text>
                    <Text style={styles.ProfileInfo}>Email: </Text>
                    <View style={styles.ProfileButton} >
                        <TouchableOpacity
                            color="black"
                            style={styles.EditButton}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Text style={styles.editbuttontext}>Edit</Text>
                            <Feather name="edit" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

//Task Screen
function TaskScreen({ navigation }) {

    const [people, setPeople] = useState([
        {room:'101', order:'Tea', amount:'2', key:'1'},
        {room:'102', order:'Soap', amount:'1', key:'2'},
        {room:'104', order:'Sandwitch', amount:'5', key:'3'},
        {room:'105', order:'Coffee', amount:'7', key:'4'},
        {room:'123', order:'Beer', amount:'1', key:'5'},
    ]);



    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Tasks</Text>
                </View>
                {/*Break*/}
                <Text>{'\n'}</Text>
                {/* List of Tasks */}
                <View style={styles.listoftasks}>
                    <FlatList
                        data={people}
                        renderItem={({item}) => (
                            <View style={styles.Tasks}>
                                <Text style={styles.taskinfo}> Room: {item.room} </Text>
                                <Text style={styles.taskinfo}> Order: {item.amount} {item.order} </Text>
                            </View>
                        )}
                    />
                </View>
                {/*Break*/}
                <Text>{'\n'}</Text>
                {/* Break Button */}
                <View>
                    <TouchableOpacity
                        color="black"
                        style={styles.BreakButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Text style={styles.breaktext}>Taking a Break </Text>
                        <Feather name="clock" size={35} color="black" />
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
}

//Drawer
const Drawer = createDrawerNavigator();

//Actual Screen
export default class EmployeeScreen extends Component {

    //Message
    constructor() {
        super()
        this.state = {
            message: ' '
        }
    }

    //Login Screen
    render() {
        return (
            <NavigationContainer>

                <Drawer.Navigator
                    initialRouteName="Tasks"
                    drawerType='slide'
                    drawerStyle={styles.Drawer}
                >
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Settings" component={SettingScreen} />
                    <Drawer.Screen name="Tasks" component={TaskScreen} />
                </Drawer.Navigator>
            </NavigationContainer>

        );
    }

    handlerClick = async () => {
        try {
            this.props.navigation.navigate('Login');
        } catch (e) {
            this.setState({ message: e.message });
        }
    }

}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        opacity: 0.9
    },
    Drawer: {
        backgroundColor: 'gold',
        fontSize: 50,
        color: 'red'

    },
    topbar: {
        flexDirection: 'row',
        backgroundColor: 'gold',
        width: '100%'
    },
    topbartext: {
        fontSize: 40,
        color: 'black',
    },
    LogoutButton: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
        width: '30%',
        borderRadius: 5,
    },
    logouttext: {
        color: 'black',
        fontSize: 25,
    },
    active: {
        top: '30%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        width: '99%',
        opacity: 0.8,
    },
    activetext: {
        fontSize: 30,
    },
    ActiveButton: {
        backgroundColor: 'lime',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activebuttontext: {
        fontSize: 30,
        padding: 5,
    },
    Profile: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        width: '99%',
        opacity: 0.8,

    },
    ProfileInfo: {
        fontSize: 30,
    },
    EditButton: {
        flexDirection: 'row',
        backgroundColor: 'red',
        alignContent: 'center',
        justifyContent: 'center',
        width: '30%',
        borderRadius: 5,
        padding: 10,
    },
    editbuttontext: {
        fontSize: 30
    },
    BreakButton:{
        backgroundColor:'green',
        padding:10,
        flexDirection:'row',

    },
    breaktext:{
        fontSize:30,

    },
    listoftasks:{
        maxHeight:'70%',
        width:'80%'

    },
    Tasks:{
        padding:5,
        borderRadius:10,
        backgroundColor:'white',
    },
    taskinfo:{
        fontSize:30
    }


});