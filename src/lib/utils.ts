import { API } from "@/@types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createUUID = () => {
  return uuidv4();
};

export const timeAgo = (date: string) => {
  const now = new Date();
  const then = new Date(date);

  const diff = now.getTime() - then.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  } else {
    return `${Math.floor(days)}d ago`;
  }
};

/**
 * Format date as January 1, 2021 11:00 AM
 */
export const formatDate = (date: string) => {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return d.toLocaleString("en-US", options);
};

/**
 * Check if an api response is an error
 */
export const validateResponse = <T extends any>(res: API.Response<T>) => {
  if (typeof res !== "object" || !res) {
    return res as T;
  }

  if ("type" in res && "code" in res && "detail" in res) {
    throw res;
  }

  return res as T;
};

/**
 * Copy the vars function from nativewind because
 * its currently broken
 */
export const vars = <T extends Record<`--${string}`, string | number>>(
  variables: T
) => {
  const $variables: Record<string, string> = {};

  for (const [key, value] of Object.entries(variables)) {
    if (key.startsWith("--")) {
      $variables[key] = value.toString();
    } else {
      $variables[`--${key}`] = value.toString();
    }
  }

  return $variables;
};
