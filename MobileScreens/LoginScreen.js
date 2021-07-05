import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

//Global Variables
global.userName = '';
global.password = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.accType = '';

export default class Loginscreen extends Component {

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
            <View style={styles.container}>

                <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>
                    
                    {/*Break*/}
                    <Text>{'\n'}</Text>
                    <View style={styles.blanck}>
                        <View>
                            <Text style={styles.title}> Hotel Knightro </Text>
                        </View>
                        {/*Break*/}
                        <Text>{'\n'}</Text>
                        {/* UserName */}
                        <View style={styles.login_pack}>
                            <Feather name='user' size={40} color="black" />
                            <TextInput
                                style={styles.login}
                                placeholder="UserName    "
                                onChangeText={(val) => { this.changeLoginNameHandler(val) }}
                            />
                        </View>
                        {/*Break*/}
                        <Text>{'\n'}</Text>
                        {/* Password */}
                        <View style={styles.login_pack}>
                            <Feather name='eye-off' size={40} color="black" />
                            <TextInput
                                style={styles.password}
                                placeholder="Password    "
                                secureTextEntry={true}
                                onChangeText={(val) => { this.changePasswordHandler(val) }}
                            />
                        </View>
                        {/*Break*/}
                        <Text>{'\n'}</Text>
                        <View>
                            <Text style={styles.status}>Status</Text>
                        </View>
                        {/*Break*/}
                        <Text>{'\n'}</Text>
                        <TouchableOpacity
                            color="black"
                            title="LOGIN"
                            style={styles.button}
                            onPress={this.handlerClick}
                        >
                            <View style={styles.button_pack}>
                                <Text style={styles.button}>Log In </Text>
                                <Feather name="log-in" size={40} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    
    handleClick = async () => {
        try {
            //Make a JSON packet
            var obj = {login: global.userName.trim(), password: global.password.trim() };
            var js = JSOM.stringify(obj);

            //Run the API
            const response = await fetch('', { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            //Responce variable
            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                this.setState({ message: "User/Password combination incorrect" });
            } else {
                //Set the info
                global.firstName = res.firstName;
                global.lastName = res.lastName;
                global.userId = res.id;

                //Navigate to next page
                if (global.accType === 'Guest') {
                    this.props.navigation.navigate('User_Guest');
                }
                if (global.accType === 'Employee') {
                    this.props.navigation.navigate('User_Employee');
                }
                if (global.accType === 'Reciptionist') {
                    this.props.navigation.navigate('User_Reciptionist');
                }
            }

        } catch (e) {
            this.setState({ message: e.message });
        }
    }

    //Set the global variables
    changeLoginNameHandler = async (val) => {
        global.userName = val;
    }

    changePasswordHandler = async (val) => {
        global.password = val;
    }

    changeAccountHandler = async (val) => {
        global.accType = val;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    login_index: {
        textAlign: 'center',
        fontSize: 25,
        color: 'green',
        backgroundColor: "orange",
        fontWeight: 'bold',
        borderRadius: 5
    },
    login: {
        textAlign: 'center',
        fontSize: 40,
        backgroundColor: "lightgrey",
        borderRadius: 5,
        height:50
    },
    password: {
        textAlign: 'center',
        fontSize: 40,
        backgroundColor: "lightgrey",
        borderRadius: 5,
        height:50
    },
    button: {
        textAlign: 'center',
        fontSize: 30,
        backgroundColor: 'green',
        borderRadius: 5,
        fontWeight: 'bold',
        height:40,
        color:'white'
    },
    status: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    },
    blanck: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        width:'75%'
    },
    login_pack: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        borderRadius: 5
    },
    button_pack: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'green',
        borderRadius: 5
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color:'black'
    }
});