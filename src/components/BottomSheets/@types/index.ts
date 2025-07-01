export interface BottomSheetProps {
  close: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: string) => void;
}

export type IndividualSheetName = keyof IndividualSheetProps;

export type IndividualSheetData<T extends IndividualSheetName> = {
  data: IndividualSheetProps[T];
};

export interface IndividualSheetProps {
  ACTIVITY_INSTRUCTION: undefined;
  CREATE_API_KEY: undefined;
  DEV_TOOLS: undefined;
  DATA_SECURITY: undefined;
  DATA_REGION: undefined;
  LEAVE_REVIEW: undefined;
  SHARE_WITH_FRIENDS: undefined;
  CONFIGURE_ACTIVITY: undefined;
  INSIGHTS_INSTRUCTION: undefined;
  EXCEPTION_INSTRUCTION: undefined;
}
