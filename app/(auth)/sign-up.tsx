import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form , setForm] = useState({username: "" ,email: "", password: ""});

    const submit = async () => {
        const { username, email, password } = form;

        if(!username || !email || !password) return Alert.alert('Error', "Please enter valid email and valid password")
        setIsSubmitting(true);

        try {
            //call Appwrite sign-up function
            await createUser({ email, password, name: username })

            router.replace("/")
        } catch (error : any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="bg-white gap-10 rounded-lg p-5 mt-5">

            <CustomInput
                placeholder={"Enter your name"}
                value={form.username}
                onChangeText={(text) => setForm((prev) => ({...prev, username: text}))}
                label={"Name"}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder={"Enter your Email"}
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
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
                title={"Sign Up"}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">Already have an account ?</Text>
                <Link href={'/sign-in'} className="base-bold text-primary">
                    Sign In
                </Link>
            </View>
        </View>
    )
}

export default SignUp;