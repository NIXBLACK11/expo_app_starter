import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
	TextInput,
	Platform,
	KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useNotification } from "@/context/NotificationContext";
import { supabase } from "@/lib/supabase";

const ProfileScreen = () => {
	const { colors } = useTheme();
	const { showNotification } = useNotification();

	// User profile state
	const [profile, setProfile] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		size: "Medium",
		country: "United States",
	});

	// Edit modal state
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editField, setEditField] = useState("");
	const [editValue, setEditValue] = useState("");

	// Size options for dropdown
	const sizeOptions = ["Small", "Medium", "Large", "X-Large"];

	// Common countries for dropdown
	const countryOptions = [
		"United States",
		"Canada",
		"United Kingdom",
		"Australia",
		"Germany",
		"France",
		"Japan",
		"China",
		"India",
		"Brazil",
	];

	// Get user profile on mount
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (user) {
					// Here you would typically fetch the profile from your database
					// For now, we'll use placeholder data
					console.log("User found:", user.email);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		fetchProfile();
	}, []);

	const handleEdit = (field) => {
		setEditField(field);
		setEditValue(profile[field]);
		setIsModalVisible(true);
	};

	const handleSave = async () => {
		try {
			// Update profile in state
			setProfile({
				...profile,
				[editField]: editValue,
			});

			// Here you would typically update the profile in your database

			showNotification(
				`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully`,
				"success",
			);
			setIsModalVisible(false);
		} catch (error) {
			showNotification(`Failed to update ${editField}`, "error");
		}
	};

	const renderEditModal = () => {
		const isDropdown = editField === "size" || editField === "country";
		const options = editField === "size" ? sizeOptions : countryOptions;

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					<View style={styles.modalOverlay}>
						<View
							style={[
								styles.modalContent,
								{ backgroundColor: colors.background },
							]}
						>
							<Text
								style={[
									styles.modalTitle,
									{ color: colors.text },
								]}
							>
								Edit{" "}
								{editField.charAt(0).toUpperCase() +
									editField.slice(1)}
							</Text>

							{isDropdown ? (
								<ScrollView style={styles.optionsContainer}>
									{options.map((option) => (
										<TouchableOpacity
											key={option}
											style={[
												styles.optionItem,
												editValue === option && {
													backgroundColor:
														colors.tint + "20",
												},
											]}
											onPress={() => setEditValue(option)}
										>
											<Text
												style={[
													styles.optionText,
													{ color: colors.text },
												]}
											>
												{option}
											</Text>
											{editValue === option && (
												<Ionicons
													name="checkmark"
													size={20}
													color={colors.tint}
												/>
											)}
										</TouchableOpacity>
									))}
								</ScrollView>
							) : (
								<TextInput
									style={[
										styles.input,
										{
											color: colors.text,
											borderColor: colors.tint,
										},
									]}
									value={editValue}
									onChangeText={setEditValue}
									autoCapitalize={
										editField === "email" ? "none" : "words"
									}
									keyboardType={
										editField === "email"
											? "email-address"
											: "default"
									}
								/>
							)}

							<View style={styles.modalActions}>
								<TouchableOpacity
									style={[
										styles.modalButton,
										{ borderColor: colors.tint },
									]}
									onPress={() => setIsModalVisible(false)}
								>
									<Text
										style={[
											styles.modalButtonText,
											{ color: colors.text },
										]}
									>
										Cancel
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.modalButton,
										{ backgroundColor: colors.tint },
									]}
									onPress={handleSave}
								>
									<Text style={styles.saveButtonText}>
										Save
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	};

	const renderProfileItem = (label, value, field) => {
		return (
			<TouchableOpacity
				style={[
					styles.profileItem,
					{ borderBottomColor: colors.icon + "20" },
				]}
				onPress={() => handleEdit(field)}
			>
				<View>
					<Text style={[styles.itemLabel, { color: colors.icon }]}>
						{label}
					</Text>
					<Text style={[styles.itemValue, { color: colors.text }]}>
						{value}
					</Text>
				</View>
				<Ionicons
					name="chevron-forward"
					size={20}
					color={colors.icon}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.profileHeader}>
				<View
					style={[
						styles.avatarContainer,
						{ backgroundColor: colors.tint + "20" },
					]}
				>
					<Text style={[styles.avatarText, { color: colors.tint }]}>
						{profile.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</Text>
				</View>
			</View>

			<View style={styles.profileContent}>
				{renderProfileItem("Name", profile.name, "name")}
				{renderProfileItem("Email", profile.email, "email")}
				{renderProfileItem("Size", profile.size, "size")}
				{renderProfileItem("Country", profile.country, "country")}
			</View>

			<TouchableOpacity
				style={[styles.logoutButton, { borderColor: colors.tint }]}
				onPress={() => supabase.auth.signOut()}
			>
				<Ionicons
					name="log-out-outline"
					size={20}
					color={colors.tint}
				/>
				<Text style={[styles.logoutText, { color: colors.tint }]}>
					Log Out
				</Text>
			</TouchableOpacity>

			{renderEditModal()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileHeader: {
		alignItems: "center",
		paddingVertical: 40,
	},
	avatarContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		fontSize: 36,
		fontWeight: "600",
		fontFamily: "GeistMono",
	},
	profileContent: {
		paddingHorizontal: 20,
	},
	profileItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		borderBottomWidth: 1,
	},
	itemLabel: {
		fontSize: 14,
		marginBottom: 4,
		fontFamily: "GeistMono",
	},
	itemValue: {
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 20,
		marginTop: 40,
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
	},
	logoutText: {
		marginLeft: 8,
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		paddingBottom: Platform.OS === "ios" ? 40 : 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 20,
		fontFamily: "GeistMono",
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	optionsContainer: {
		maxHeight: 300,
	},
	optionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderRadius: 8,
	},
	optionText: {
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	modalButton: {
		flex: 1,
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 5,
		borderWidth: 1,
	},
	modalButtonText: {
		fontSize: 16,
		fontFamily: "GeistMono",
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "GeistMono",
	},
});

export default ProfileScreen;
