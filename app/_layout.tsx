import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { colors } = useTheme();

	const [loaded] = useFonts({
		GeistMono: require("../assets/fonts/GeistMono.ttf"),
	});

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colors.background);
	}, [colors]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider>
			<NotificationProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.globalContainer}>
						<Stack>
							<Stack.Screen
								name="index"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(auth)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="+not-found" />
						</Stack>
					</View>
				</SafeAreaView>
				<StatusBar style="auto" />
			</NotificationProvider>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		fontFamily: "GeistMono",
	},
});
