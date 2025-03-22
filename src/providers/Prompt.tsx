import { PropsWithChildren, useEffect } from 'react';

import useClientStore from '@/store/client';
import useBottomSheetStore from '@/store/bottom-sheets';

/**
 * A provider to prompt user's with actions, on a specific
 * schedule, specific to them
 */
export default function PromptProvider({ children }: PropsWithChildren) {
  const openBottomSheet = useBottomSheetStore((s) => s.open);

  const setField = useClientStore((s) => s.setField);
  const reviewPromptTime = useClientStore((s) => s.reviewPromptTime);

  useEffect(() => {
    const currentTime = new Date().getTime();

    // If it's time to show the review prompt, show it, then never show it again
    if (reviewPromptTime && currentTime > reviewPromptTime) {
      openBottomSheet('LEAVE_REVIEW');
      setField('reviewPromptTime', null);
    }
  }, []);

  return children;
}
