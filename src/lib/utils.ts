import { API } from '@/@types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
    return 'Just now';
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  } else {
    return `${Math.floor(days)}d ago`;
  }
};

/**
 * Format a number to a readable string
 */
export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format date as January 1, 2021 11:00 AM
 */
export const formatDate = (date: string) => {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return d.toLocaleString('en-US', options);
};

/**
 * Check if an api response is an error
 */
export const validateResponse = <T extends any>(res: API.Response<T>) => {
  if (typeof res !== 'object' || !res) {
    return res as T;
  }

  if ('type' in res && 'code' in res && 'detail' in res) {
    throw res;
  }

  return res as T;
};

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const simpleHash = (str: string) => {
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i); // ^ is bitwise XOR
  }
  return hash >>> 0; // Ensure non-negative integer
};

// Format seconds as either s, m, h, or d
export const secondsToString = (seconds: number) => {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`;
  } else if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h`;
  } else {
    return `${Math.floor(seconds / 86400)}d`;
  }
};
