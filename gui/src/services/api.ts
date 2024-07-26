import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types";
import axiosInstance, { TOKEN_NAME, saveToken } from "./config";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';

type RegisterUserTypes = IUser;

export const useDeviceToken = () => {
  const [deviceToken, setDeviceToken] = useState<string>('');

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const token = await messaging().getToken();
      console.log('FCM token:', token);
      setDeviceToken(token);
    };
    requestUserPermission();
  }, []);

  return deviceToken;
};

export const registerUser = async ({
  email,
  name,
  password,
  deviceToken, // Thêm deviceToken vào đây
}: RegisterUserTypes & { deviceToken: string }) => {
  try {
    const response = await axiosInstance.post("/users/create", {
      email,
      password,
      name,
      deviceToken, // Gửi deviceToken cùng với dữ liệu người dùng
    });
    return response.data.user;
  } catch (error) {
    console.log("error in registerUser", error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, "name">;

// export const loginUser = async ({ email, password }: LoginUserTypes) => {
//   try {
//     const response = await axiosInstance.post("/users/login", {
//       email,
//       password,
//     });
//     const _token = response.data.token;
//     axiosInstance.defaults.headers.common["Authorization"] = _token;
//     saveToken(TOKEN_NAME, _token);
//     return response.data.user;
//   } catch (error) {
//     console.log("error in loginUser", error);
//     throw error;
//   }
// };

export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    const _token = response.data.token;
    axiosInstance.defaults.headers.common["Authorization"] = _token;
    saveToken(TOKEN_NAME, _token);

    // Lấy deviceToken và cập nhật cho người dùng
    const deviceToken = await messaging().getToken();
    if (deviceToken) {
      await axiosInstance.post("/users/update-device-token", {
        userId: response.data.user.id,  // Giả sử bạn nhận user ID từ phản hồi
        deviceToken,
      });
    }

    return response.data.user;
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};



export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_NAME);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
