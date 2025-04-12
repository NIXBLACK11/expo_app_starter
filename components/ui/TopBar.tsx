import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";

export const TopBar = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const state = useNavigationState((state) => state);
	const currentRoute = state.routes[state.index];
	let tabRouteName =
		currentRoute.state?.routes?.[currentRoute.state.index || 0]?.name;
	if (!tabRouteName || tabRouteName === "index") tabRouteName = "Home";

	const screenName =
		tabRouteName.charAt(0).toUpperCase() + tabRouteName.slice(1);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.background,
					borderBottomColor: colors.icon + "20",
				},
			]}
		>
			<StatusBar
				barStyle={
					colors.background === "#ffffff"
						? "dark-content"
						: "light-content"
				}
				backgroundColor={colors.background}
			/>
			<View style={styles.content}>
				<Text style={[styles.screenName, { color: colors.text }]}>
					{screenName}
				</Text>
				<View style={styles.iconsContainer}>
					<TouchableOpacity
						style={styles.iconButton}
						activeOpacity={0.7}
					>
						<Ionicons
							name="search-outline"
							size={24}
							color={colors.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={() => router.push("/(profile)")}
						activeOpacity={0.7}
					>
						<Ionicons
							name="person-sharp"
							size={24}
							color={colors.icon}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderBottomWidth: 1,
	},
	content: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	screenName: {
		fontSize: 20,
		fontWeight: "600",
		fontFamily: "GeistMono",
	},
	iconsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		padding: 4,
		marginLeft: 16,
	},
	searchButton: {
		padding: 4,
	},
});
