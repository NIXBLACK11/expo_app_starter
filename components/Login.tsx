import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	AppState,
} from "react-native";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

const LoginComponent = () => {
	const { colors } = useTheme();
	const { showNotification } = useNotification();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		if (!email || !password) {
			showNotification("Please enter both email and password", "error");
			return;
		}

		setIsLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			showNotification("Failed to login", "error");
		}
		showNotification("Successfully logged in", "success");
		router.replace("/(tabs)");
		setIsLoading(false);
	};

	const handleGoogleLogin = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);

			// Simulate Google auth
			const success = Math.random() > 0.2; // 80% chance of success for demo

			if (success) {
				showNotification("Google login successful!", "success");
				// Handle successful login
			} else {
				showNotification(
					"Google login failed. Please try again.",
					"error",
				);
			}
		}, 1500);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.formContainer}>
					<Text style={[styles.title, { color: colors.text }]}>
						Welcome Back
					</Text>

					<View
						style={[
							styles.inputContainer,
							{ borderColor: colors.tint },
						]}
					>
						<TextInput
							style={[styles.input, { color: colors.text }]}
							placeholder="Email"
							placeholderTextColor={colors.icon}
							keyboardType="email-address"
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<View
						style={[
							styles.inputContainer,
							{ borderColor: colors.tint },
						]}
					>
						<TextInput
							style={[styles.input, { color: colors.text }]}
							placeholder="Password"
							placeholderTextColor={colors.icon}
							secureTextEntry
							value={password}
							onChangeText={setPassword}
						/>
					</View>

					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: colors.tint },
						]}
						onPress={handleLogin}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.buttonText}>Log In</Text>
						)}
					</TouchableOpacity>

					<View style={styles.divider}>
						<View
							style={[
								styles.dividerLine,
								{ backgroundColor: colors.icon },
							]}
						/>
						<Text
							style={[styles.dividerText, { color: colors.icon }]}
						>
							OR
						</Text>
						<View
							style={[
								styles.dividerLine,
								{ backgroundColor: colors.icon },
							]}
						/>
					</View>

					<TouchableOpacity
						style={[
							styles.socialButton,
							{ borderColor: colors.icon },
						]}
						onPress={handleGoogleLogin}
						disabled={isLoading}
					>
						{/* Replace with actual Google icon */}
						<View style={styles.socialIconContainer}>
							<Text
								style={[
									styles.googleIcon,
									{ color: colors.text },
								]}
							>
								G
							</Text>
						</View>
						<Text
							style={[
								styles.socialButtonText,
								{ color: colors.text },
							]}
						>
							Continue with Google
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
	},
	formContainer: {
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 20,
		fontFamily: "GeistMono",
	},
	inputContainer: {
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 16,
		overflow: "hidden",
	},
	input: {
		paddingHorizontal: 15,
		paddingVertical: 12,
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	button: {
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 8,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "GeistMono",
	},
	divider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
	},
	dividerLine: {
		flex: 1,
		height: 1,
	},
	dividerText: {
		marginHorizontal: 10,
		fontSize: 14,
		fontFamily: "GeistMono",
	},
	socialButton: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	socialIconContainer: {
		marginRight: 10,
	},
	googleIcon: {
		fontSize: 18,
		fontWeight: "bold",
	},
	socialButtonText: {
		fontSize: 16,
		fontFamily: "GeistMono",
	},
});

export default LoginComponent;
