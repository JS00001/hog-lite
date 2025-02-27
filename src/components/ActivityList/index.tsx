import { ActivityListProps } from "./@types";

import FullActivityList from "./Full";
import CompactActivityList from "./Compact";

import useClientStore from "@/store/client";

export default function ActivityList(props: ActivityListProps) {
  const displayMode = useClientStore((store) => store.activityDisplayMode);

  if (displayMode === "compact") {
    return <CompactActivityList {...props} />;
  }

  return <FullActivityList {...props} />;
}
