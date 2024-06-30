
import { Image, View, } from 'react-native'
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/shared/button'

const IMAGE =
  "https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png"

const WelcomeScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
    const navigationToSignInScreen = () => {
        navigation.navigate('SignIn')
    }
    const navigationToSignUpScreen = () => {
        navigation.navigate('SignUp')
    }

    return (
        <SafeAreaWrapper>
            <LinearGradient
            colors={[
                "#ffffff",
                "#fcecff",
                "#f8daff",
                "#fae2ff",
                "#fae2ff",
                "#ffffff",
              ]}
            style={{ flex: 1 }}
            >
        <Box flex={1} justifyContent="center">
            <Box alignItems='center' mb="3.5">
            <Image
                source={{
                  uri: IMAGE,
                  width: 120,
                  height: 120,
                }}
              />
            </Box>
            <Box my="3.5" mx="10">
            <Button
              label="Start your journey"
              onPress={navigationToSignUpScreen}
            />
          </Box>
          <Text
            textAlign="center"
            variant="textXs"
            fontWeight="700"
            color="gray5"
          >
            5 registered today
          </Text>
        </Box>
        </LinearGradient>
        </SafeAreaWrapper>
    )
}

export default WelcomeScreen