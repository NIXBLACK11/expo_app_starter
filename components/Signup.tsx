// screens/AuthScreen/SignupComponent.tsx
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
} from "react-native";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";

const SignupComponent = () => {
	const { colors } = useTheme();
	const { showNotification } = useNotification();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = () => {
		// Basic validation
		if (!name || !email || !password || !confirmPassword) {
			showNotification("Please fill in all fields", "error");
			return;
		}

		if (password !== confirmPassword) {
			showNotification("Passwords do not match", "error");
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			showNotification("Please enter a valid email address", "error");
			return;
		}

		// Password strength validation
		if (password.length < 8) {
			showNotification(
				"Password must be at least 8 characters long",
				"error",
			);
			return;
		}

		// Simulate signup process
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);

			// Simulate success (in a real app, this would be based on API response)
			const success = Math.random() > 0.3; // 70% chance of success for demo

			if (success) {
				showNotification("Account created successfully!", "success");
				// Handle successful signup (e.g., navigation, state update)
			} else {
				showNotification("Email already in use", "error");
			}
		}, 1500);
	};

	const handleGoogleSignup = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);

			// Simulate Google auth
			const success = Math.random() > 0.2; // 80% chance of success for demo

			if (success) {
				showNotification("Google signup successful!", "success");
				// Handle successful signup
			} else {
				showNotification(
					"Google signup failed. Please try again.",
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
						Create Account
					</Text>

					<View
						style={[
							styles.inputContainer,
							{ borderColor: colors.tint },
						]}
					>
						<TextInput
							style={[styles.input, { color: colors.text }]}
							placeholder="Full Name"
							placeholderTextColor={colors.icon}
							value={name}
							onChangeText={setName}
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

					<View
						style={[
							styles.inputContainer,
							{ borderColor: colors.tint },
						]}
					>
						<TextInput
							style={[styles.input, { color: colors.text }]}
							placeholder="Confirm Password"
							placeholderTextColor={colors.icon}
							secureTextEntry
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
					</View>

					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: colors.tint },
						]}
						onPress={handleSignup}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.buttonText}>Sign Up</Text>
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
						onPress={handleGoogleSignup}
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

export default SignupComponent;
