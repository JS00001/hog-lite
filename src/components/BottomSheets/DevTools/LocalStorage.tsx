import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';
import ErrorMessage from '@/components/ErrorMessage';

export default function LocalStorage() {
  const colors = useColors();

  const query = useQuery({
    queryKey: ['localStorage'],
    queryFn: async () => {
      const data = await AsyncStorage.getItem('client-storage');
      if (!data) throw new Error('No data found');
      return JSON.parse(data).state;
    },
  });

  if (query.isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color={colors.gray} />
      </View>
    );
  }

  if (query.isError) {
    return (
      <ErrorMessage
        error={query.error}
        description="Could not fetch local storage data"
      />
    );
  }

  const data = query.data;

  return (
    <FlatList
      data={Object.entries(data)}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => {
        const [key, value] = item;

        if (
          typeof value !== 'object' &&
          typeof value !== 'string' &&
          typeof value !== 'number' &&
          typeof value !== 'boolean'
        ) {
          return null;
        }

        return (
          <View className="w-full p-4 bg-primary border border-divider rounded-xl">
            <Text className="text-ink text-lg font-semibold">{key}</Text>
            <Text className="text-gray">
              {typeof value === 'object' ? JSON.stringify(value) : `${value}`}
            </Text>
          </View>
        );
      }}
    />
  );
}
