import { Stack } from "expo-router";
import React from "react";

function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="signup" options={{ presentation: "modal" }} />
		</Stack>
	);
}

export default Layout;
