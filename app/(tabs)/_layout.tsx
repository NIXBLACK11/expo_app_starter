import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
import { TopBar } from "@/components/ui/TopBar";

export default function TabLayout() {
	const { colors } = useTheme();

	return (
		<View style={{ flex: 1 }}>
			<TopBar />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: colors.tabIconSelected,
					tabBarInactiveTintColor: colors.tabIconDefault,
					tabBarStyle: {
						backgroundColor: colors.background,
					},
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name="home-outline"
								size={size}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="shop"
					options={{
						title: "Shop",
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name="search-outline"
								size={size}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="cart"
					options={{
						title: "Cart",
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name="cart-outline"
								size={size}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="orders"
					options={{
						title: "Orders",
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name="list-outline"
								size={size}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</View>
	);
}
