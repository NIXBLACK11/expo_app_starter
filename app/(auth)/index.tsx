import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import LoginComponent from "@/components/Login";
import SignupComponent from "@/components/Signup";

const AuthScreen = () => {
	const { colors } = useTheme();
	const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

	return (
		<View
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			{/* Logo Section */}
			<View style={styles.logoContainer}>
				<Text style={[styles.logoText, { color: colors.text }]}>
					MyApp
				</Text>
			</View>

			{/* Tab Selector */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[
						styles.tabButton,
						activeTab === "login" && {
							borderBottomColor: colors.tint,
							borderBottomWidth: 2,
						},
					]}
					onPress={() => setActiveTab("login")}
				>
					<Text
						style={[
							styles.tabText,
							{
								color:
									activeTab === "login"
										? colors.tint
										: colors.icon,
							},
						]}
					>
						Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tabButton,
						activeTab === "signup" && {
							borderBottomColor: colors.tint,
							borderBottomWidth: 2,
						},
					]}
					onPress={() => setActiveTab("signup")}
				>
					<Text
						style={[
							styles.tabText,
							{
								color:
									activeTab === "signup"
										? colors.tint
										: colors.icon,
							},
						]}
					>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>

			{/* Active Component */}
			{activeTab === "login" ? <LoginComponent /> : <SignupComponent />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	logoContainer: {
		alignItems: "center",
		marginTop: 60,
		marginBottom: 40,
	},
	logoText: {
		fontSize: 32,
		fontWeight: "bold",
		fontFamily: "GeistMono",
	},
	tabContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	tabButton: {
		flex: 1,
		paddingVertical: 15,
		alignItems: "center",
	},
	tabText: {
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "GeistMono",
	},
});

export default AuthScreen;
