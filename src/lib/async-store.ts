import { createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersistedAsyncStorage = createJSONStorage(() => ({
  setItem: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
}));

export default PersistedAsyncStorage;
