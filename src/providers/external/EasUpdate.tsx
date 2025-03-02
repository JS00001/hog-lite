import * as Updates from 'expo-updates';
import { AppState, AppStateStatus } from 'react-native';
import { PropsWithChildren, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import alert from '@/lib/alert';
import constants from '@/constants';
import usePosthog from '@/hooks/usePosthog';

export default function EasUpdateProvider({ children }: PropsWithChildren) {
	const posthog = usePosthog();
	const appState = useRef(AppState.currentState);

	/**
	 * When the app moves from background to foreground,
	 * we want to check if there is an update pending.
	 */
	useEffect(() => {
		if (constants.environment !== 'production') return;

		const checkForUpdates = async (nextAppState: AppStateStatus) => {
			const regex = /inactive|background/;

			if (appState.current.match(regex) && nextAppState === 'active') {
				await fetchUpdateAsync();
			}

			appState.current = nextAppState;
		};

		// When app first loads, check for updates
		fetchUpdateAsync();

		// Subscribe to app state changes
		const subscription = AppState.addEventListener('change', checkForUpdates);

		return () => subscription.remove();
	}, []);

	/**
	 * Check for OTA updates and prompt the user to update if a new version is available.
	 * Also check if the user has already been prompted for this update, if so, ignore.
	 */
	const fetchUpdateAsync = async () => {
		const res = await Updates.fetchUpdateAsync();
		const currentUpdate = await AsyncStorage.getItem('currentUpdate');

		if (res.isNew && currentUpdate !== res.manifest.id) {
			await AsyncStorage.setItem('currentUpdate', res.manifest.id);

			posthog.capture('update_fetched');

			alert({
				title: 'Update Available',
				message:
					'A new update is available. Reload the app now to get the latest features.',
				buttons: [
					{
						text: 'Reload',
						onPress: () => {
							Updates.reloadAsync();
							posthog.capture('update_reloaded');
						},
					},
					{
						text: 'Later',
						onPress: () => posthog.capture('update_ignored'),
					},
				],
			});
		}
	};

	return children;
}
