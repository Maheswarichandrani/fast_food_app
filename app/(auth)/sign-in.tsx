import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignIn = () => {
    return (
        <View>
            <Text>SignIn</Text>
            <Button title={"sign-up"} onPress={() => router.push("/sign-up")} />
        </View>
    )
}
export default SignIn
