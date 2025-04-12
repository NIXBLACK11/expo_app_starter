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

export const TopBar = () => {
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
				<TouchableOpacity
					style={styles.searchButton}
					// onPress={onSearchPress}
					activeOpacity={0.7}
				>
					<Ionicons
						name="search-outline"
						size={24}
						color={colors.icon}
					/>
				</TouchableOpacity>
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
	searchButton: {
		padding: 4,
	},
});
