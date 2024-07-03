import { Pressable, View, } from 'react-native'
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import Input from '../../components/shared/input'
import Button from '../../components/shared/button'
import useUserGlobalStore from '../../store/useUserGlobalStore'
import { Controller, useForm } from 'react-hook-form'
import { IUser } from '../../types'
import { loginUser } from '../../services/api'


const SignInScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigationToSignUpScreen = () => {
        navigation.navigate('SignUp')

    }

    const { updateUser } = useUserGlobalStore()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<IUser, "name">>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: Omit<IUser, "name">) => {
        try {
            const { email, password } = data
            const _user = await loginUser({
                email: email.toLowerCase(),
                password: password.toLowerCase(),
            })
            updateUser({
                email: _user.email,
                name: _user.name,
            })
            console.log('user', JSON.stringify(_user, null, 1));
            
        } catch (error) { }
    }


    return (
        <SafeAreaWrapper>
            <Box flex={1} px="5.5" justifyContent='center'>
                <Text variant="textXl" fontWeight="700">
                    Welcome back!
                </Text>
                <Text variant="textXl" fontWeight="700" mb="6">
                    Your journey starts here
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                            error={errors.email}
                        />
                    )}
                    name="email"
                />


                <Box mb="6" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            error={errors.password}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />

                <Box mt="5.5" />
                <Pressable onPress={navigationToSignUpScreen}>
                    <Text color="primary" textAlign="right">
                        Register?
                    </Text>
                </Pressable>
                <Box mb="5.5" />

                <Button label='Login' onPress={handleSubmit(onSubmit)} uppercase />
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignInScreen