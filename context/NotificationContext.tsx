// context/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Feather } from "@expo/vector-icons"; // Import X icon (or use any other icon library)
import { useTheme } from "./ThemeContext";

type NotificationType = "success" | "error" | "info";

interface NotificationContextType {
	showNotification: (message: string, type?: NotificationType) => void;
	hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined,
);

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error(
			"useNotification must be used within a NotificationProvider",
		);
	}
	return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { colors } = useTheme();
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState<NotificationType>("info");
	const [animation] = useState(new Animated.Value(0));

	const getTypeColor = () => {
		switch (type) {
			case "success":
				return "#32CD32"; // Green color
			case "error":
				return "#FF3B30"; // Red color
			case "info":
				return "#007AFF"; // Blue color
			default:
				return "#007AFF";
		}
	};

	const showNotification = (
		newMessage: string,
		newType: NotificationType = "info",
	) => {
		setMessage(newMessage);
		setType(newType);
		setVisible(true);

		// Animate in
		Animated.timing(animation, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();

		// Auto-hide after 3 seconds
		setTimeout(hideNotification, 3000);
	};

	const hideNotification = () => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setVisible(false);
		});
	};

	// Clean up timer on unmount
	useEffect(() => {
		return () => {
			// This clears any pending timeouts when component unmounts
		};
	}, []);

	return (
		<NotificationContext.Provider
			value={{ showNotification, hideNotification }}
		>
			{children}
			{visible && (
				<Animated.View
					style={[
						styles.container,
						{
							backgroundColor: colors.background,
							borderColor: getTypeColor(),
							transform: [
								{
									translateY: animation.interpolate({
										inputRange: [0, 1],
										outputRange: [-100, 0],
									}),
								},
							],
							opacity: animation,
						},
					]}
				>
					<View style={styles.content}>
						<Text style={[styles.message, { color: colors.text }]}>
							{message}
						</Text>
						<TouchableOpacity
							onPress={hideNotification}
							style={styles.closeButton}
						>
							<Feather
								width={20}
								height={20}
								color={colors.icon}
							/>
						</TouchableOpacity>
					</View>
				</Animated.View>
			)}
		</NotificationContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 50,
		left: 20,
		right: 20,
		padding: 16,
		borderRadius: 8,
		borderLeftWidth: 5,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		zIndex: 9999,
	},
	content: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	message: {
		flex: 1,
		fontSize: 14,
		fontFamily: "GeistMono",
	},
	closeButton: {
		marginLeft: 10,
	},
});
