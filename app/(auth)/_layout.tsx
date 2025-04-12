import { Stack } from "expo-router";
import React from "react";

function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ presentation: "modal" }} />
		</Stack>
	);
}

export default Layout;
