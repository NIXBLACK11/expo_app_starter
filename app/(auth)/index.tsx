import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Button, StyleSheet } from "react-native";

export default function Signup() {
	return (
		<>
			<ThemedView style={styles.container}>
				<ThemedText type="title">This is the auth shit</ThemedText>
				{/* <Button onPress={() => {
                    setColorScheme('light')
                }}> */}
				{/* </Button> */}
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
