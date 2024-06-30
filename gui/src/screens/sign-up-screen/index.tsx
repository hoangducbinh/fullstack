import { Pressable, View, } from 'react-native'
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import Input from '../../components/shared/input'
import Button from '../../components/shared/button'


const SignUpScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigationToSignInScreen = () => {
        navigation.navigate('SignIn')
    }
    return (
        <SafeAreaWrapper>
            <Box flex={1} px="5.5" mt={"13"}>
                <Text variant="textXl" fontWeight="700">
                    Welcome to Viectodo!
                </Text>
                <Text variant="textXl" fontWeight="700" mb="6">
                    Your journey starts here
                </Text>
                <Input
                    label="Name"
                    placeholder="Name"
                />
                <Box mb="6" />
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
                <Pressable onPress={navigationToSignInScreen}>
                    <Text color="primary" textAlign="right">
                        Log in?
                    </Text>
                </Pressable>
                <Box mb="5.5" />

                <Button label='Register' onPress={navigationToSignInScreen} uppercase />
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignUpScreen