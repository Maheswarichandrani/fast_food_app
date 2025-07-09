import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form , setForm] = useState({email: "", password: ""})

    const submit = async () => {
        if(!form.email || !form.password) return Alert.alert('Error', "Please enter valid email and valid password")
        setIsSubmitting(true);

        try {
            Alert.alert('Success', "You have successfully logged in")
            router.replace("/")
        } catch(error : any) {
            Alert.alert('Error', error.message)
            Sentry.captureEvent(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">


            <CustomInput
                placeholder={"Enter your Email"}
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text}))}
                label={"Email"}
                secureTextEntry={false}
                keyboardType={"email-address"}
            />
            <CustomInput
                placeholder={"Enter your password"}
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label={"Password"}
                secureTextEntry={true}
            />
            <CustomButton
                title={"Sign In"}
                isLoading={isSubmitting}
                onPress={submit}

            />

            <View className="flex bg-black justify-center mt-3 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Dont have an account?
                </Text>
                <Link href='/sign-up' className="base-bold text-primary">
                    Sign up
                </Link>
            </View>
        </View>
    )
}
export default SignIn
