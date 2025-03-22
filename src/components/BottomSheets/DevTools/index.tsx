import { Dimensions, View } from 'react-native';
import { forwardRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from '../@types';
import NetworkLogger from './NetworkLogger';
import LocalStorage from './LocalStorage';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';

const HEIGHT = Dimensions.get('window').height;

type Props = BottomSheetProps;

enum Screens {
  NetworkLogger,
  LocalStorage,
}

function Content({}: Props) {
  const [screen, setScreen] = useState<Screens>(Screens.NetworkLogger);

  const DevtoolsScreens = [NetworkLogger, LocalStorage];
  const ScreenComponent = DevtoolsScreens[screen];

  return (
    <BottomSheetView style={{ height: HEIGHT * 0.8 }}>
      <Text className="text-3xl font-semibold text-ink">Developer Tools</Text>

      <View className="flex-row items-center gap-2">
        <Button
          size="sm"
          className="flex-1"
          color={screen === Screens.NetworkLogger ? 'accent' : 'primary'}
          onPress={() => setScreen(Screens.NetworkLogger)}
        >
          Network Logs
        </Button>
        <Button
          size="sm"
          className="flex-1"
          color={screen === Screens.LocalStorage ? 'accent' : 'primary'}
          onPress={() => setScreen(Screens.LocalStorage)}
        >
          Client Store
        </Button>
      </View>
      <ScreenComponent />
    </BottomSheetView>
  );
}

const DevToolsSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function DevToolsSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default DevToolsSheet;
