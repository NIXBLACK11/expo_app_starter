import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = () => {
		setIsLoading(true);
		// Add your login logic here
		setTimeout(() => {
			setIsLoading(false);
			// Navigate to home screen or show error
		}, 1500);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ThemedView style={styles.container}>
				{/* Logo section */}
				<ThemedView style={styles.logoContainer}>
					{/* <Image 
            source={require("../assets/images/logo.png")} 
            style={styles.logo}
            resizeMode="contain"
          /> */}
					<ThemedText style={styles.appName}>YourApp</ThemedText>
				</ThemedView>

				{/* Form section */}
				<ThemedView style={styles.formContainer}>
					<ThemedText style={styles.welcomeText}>
						Welcome Back
					</ThemedText>
					<ThemedText style={styles.subtitleText}>
						Sign in to continue
					</ThemedText>

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.inputLabel}>Email</ThemedText>
						<TextInput
							style={styles.input}
							placeholder="Enter your email"
							placeholderTextColor="#A9A9A9"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					</ThemedView>

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.inputLabel}>
							Password
						</ThemedText>
						<ThemedView style={styles.passwordContainer}>
							<TextInput
								style={styles.passwordInput}
								placeholder="Enter your password"
								placeholderTextColor="#A9A9A9"
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!isPasswordVisible}
								autoCapitalize="none"
							/>
							<TouchableOpacity
								onPress={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
								style={styles.eyeIcon}
							>
								<ThemedText>
									{isPasswordVisible ? "Hide" : "Show"}
								</ThemedText>
							</TouchableOpacity>
						</ThemedView>
					</ThemedView>

					<TouchableOpacity style={styles.forgotPasswordContainer}>
						<ThemedText style={styles.forgotPasswordText}>
							Forgot Password?
						</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.loginButton,
							isLoading && styles.loginButtonPressed,
						]}
						onPress={handleLogin}
						disabled={isLoading}
					>
						<ThemedText style={styles.loginButtonText}>
							{isLoading ? "Signing In..." : "Sign In"}
						</ThemedText>
					</TouchableOpacity>
				</ThemedView>

				{/* Footer section */}
				<ThemedView style={styles.footerContainer}>
					<ThemedText style={styles.noAccountText}>
						Don't have an account?
					</ThemedText>
					<TouchableOpacity>
						<ThemedText style={styles.signUpText}>
							Sign Up
						</ThemedText>
					</TouchableOpacity>
				</ThemedView>
			</ThemedView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	logoContainer: {
		alignItems: "center",
		marginTop: 50,
		marginBottom: 30,
	},
	logo: {
		width: 80,
		height: 80,
	},
	appName: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	formContainer: {
		flex: 1,
		justifyContent: "center",
	},
	welcomeText: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 8,
	},
	subtitleText: {
		fontSize: 16,
		color: "#666",
		marginBottom: 30,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: "500",
		marginBottom: 8,
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 16,
		backgroundColor: "#F9F9F9",
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 8,
		backgroundColor: "#F9F9F9",
	},
	passwordInput: {
		flex: 1,
		height: 50,
		paddingHorizontal: 15,
		fontSize: 16,
	},
	eyeIcon: {
		padding: 10,
	},
	forgotPasswordContainer: {
		alignItems: "flex-end",
		marginBottom: 30,
	},
	forgotPasswordText: {
		color: Colors.light.tint,
		fontSize: 14,
	},
	loginButton: {
		backgroundColor: Colors.light.text,
		borderRadius: 8,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	loginButtonPressed: {
		backgroundColor: Colors.light.tint,
	},
	loginButtonText: {
		color: Colors.light.background,
		fontSize: 16,
		fontWeight: "600",
	},
	footerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	noAccountText: {
		color: "#666",
		fontSize: 14,
		marginRight: 5,
	},
	signUpText: {
		color: Colors.light.tint,
		fontSize: 14,
		fontWeight: "600",
	},
});
