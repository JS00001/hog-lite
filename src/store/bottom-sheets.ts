import { create } from 'zustand';
import * as Haptic from 'expo-haptics';
import { Keyboard } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  IndividualSheetName,
  IndividualSheetProps,
} from '@/components/BottomSheets/@types';

interface IBottomSheetState {
  refs: {
    name: IndividualSheetName;
    ref: BottomSheetModal;
  }[];
}

interface IBottomSheetStore extends IBottomSheetState {
  /** Close a bottom sheet by its name */
  close: (name: IndividualSheetName) => void;
  /** Register a bottom sheet and its ref so that it can be opened */
  register: (name: IndividualSheetName, ref: BottomSheetModal) => void;
  /** Snap a bottom sheet to a specific index */
  snapToIndex: (name: IndividualSheetName, index: number) => void;
  /** Snap a bottom sheet to a specific position */
  snapToPosition: (name: IndividualSheetName, position: string) => void;
  /** Open a bottom sheet by its name */
  open: <T extends IndividualSheetName>(
    name: T,
    props?: IndividualSheetProps[T],
  ) => void;
}

const useBottomSheetStore = create<IBottomSheetStore>((set, get) => {
  const initialState: IBottomSheetState = {
    refs: [],
  };

  const open = <T extends IndividualSheetName>(
    name: T,
    props?: IndividualSheetProps[T],
  ) => {
    const sheet = get().refs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      Keyboard.dismiss();
      Haptic.selectionAsync();
      sheet.ref.present(props);
    }
  };

  const close = (name: IndividualSheetName) => {
    const sheet = get().refs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.dismiss();
    }
  };

  const snapToIndex = (name: IndividualSheetName, index: number) => {
    const sheet = get().refs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.snapToIndex(index);
    }
  };

  const snapToPosition = (name: IndividualSheetName, position: string) => {
    const sheet = get().refs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.snapToPosition(position);
    }
  };

  const register = (name: IndividualSheetName, ref: BottomSheetModal) => {
    set((state) => {
      const existingIndex = state.refs.findIndex((r) => r.name === name);

      // If ref name already exists, create a new array with the updated ref
      if (existingIndex >= 0) {
        const newRefs = [...state.refs];
        newRefs[existingIndex] = { name, ref };
        return { ...state, refs: newRefs };
      }

      // Otherwise, add the new ref to the array
      return { ...state, refs: [...state.refs, { name, ref }] };
    });
  };

  return {
    ...initialState,
    open,
    close,
    snapToIndex,
    snapToPosition,
    register,
  };
});

export default useBottomSheetStore;
