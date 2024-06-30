import { Pressable, View, } from 'react-native'
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import Input from '../../components/shared/input'
import Button from '../../components/shared/button'


const SignInScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigationToSignUpScreen = () => {
        navigation.navigate('SignUp')
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
            
            <Input
                label="Email"
                placeholder="Email"
            />
            <Box mb="6" />
            <Input
                label="Password"
                placeholder="Password"
            />

            <Box mt="5.5" />
            <Pressable onPress={navigationToSignUpScreen}>
                <Text color="primary" textAlign="right">
                    Register?
                </Text>
            </Pressable>
            <Box mb="5.5" />

            <Button label='Login' onPress={navigationToSignUpScreen} uppercase />
        </Box>
    </SafeAreaWrapper>
    )
}

export default SignInScreen