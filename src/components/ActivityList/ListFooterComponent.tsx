import useColors from '@/lib/theme';
import { ActivityIndicator } from 'react-native';

interface Props {
  isLoading: boolean;
}

export default function ListFooterComponent({ isLoading }: Props) {
  const colors = useColors();

  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        className="w-full bg-highlight p-4"
        color={colors.gray}
      />
    );
  }

  return null;
}
