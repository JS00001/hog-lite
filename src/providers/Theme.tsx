import classNames from 'classnames';
import { View } from 'react-native';
import { PropsWithChildren } from 'react';

import useClientStore from '@/store/client';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useClientStore((state) => state.theme);

  const classes = classNames('flex-1 bg-primary', theme);

  return (
    <View key={theme} className={classes}>
      {children}
    </View>
  );
}
