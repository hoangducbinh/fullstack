
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Image, Pressable } from "react-native"
import { AuthScreenNavigationType } from "../../navigation/types"
import useUserGlobalStore from "../../store/useUserGlobalStore"
import { IUser } from "../../types"
import { loginUser } from "../../services/api"
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper"
import { Box, Text } from "../../utils/theme"
import Input from "../../components/shared/input"
import Button from "../../components/shared/button"
import Animated, { ZoomIn } from "react-native-reanimated"

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
        avatar: _user.avatar,
      })
    } catch (error) {}
  }

  const navigationToForgotPassScreen = () => {
    navigation.navigate('ForgotPass')

}
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent='center'>
            <Animated.View entering={ZoomIn.duration(2000)}>
            <Image
                    source={require('../../image/logo.png')}
                    style={{alignSelf:'center', height: 110, width:120}}
              />
              </Animated.View>
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
                <Pressable onPress={navigationToForgotPassScreen}>
                    <Text color="purple1000" textAlign="right">
                        Quên mật khẩu?
                    </Text>
                </Pressable>
                <Box mb="5.5" />
                <Button label='Đăng nhập' onPress={handleSubmit(onSubmit)} uppercase />
                <Box mb="5.5" />
                <Pressable onPress={navigationToSignUpScreen}>
                    <Text color="purple1000" textAlign="center">
                        Đăng ký tài khoản
                    </Text>
                </Pressable>
                <Box mt="5.5" />
       
      </Box>
    </SafeAreaWrapper>
  )
}

export default SignInScreen