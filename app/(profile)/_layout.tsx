import { useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function ProfileLayout() {
	const { colors } = useTheme();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTintColor: colors.text,
					headerTitle: () => (
						<Text
							style={{
								paddingVertical: 2,
								marginHorizontal: 2,
								fontSize: 20,
								fontFamily: "GeistMono",
								color: colors.text,
							}}
						>
							Your Profile
						</Text>
					),
				}}
			/>
		</Stack>
	);
}
