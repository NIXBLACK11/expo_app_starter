import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
	const [session, setSession] = useState<Session | null | undefined>(
		undefined,
	);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);

			supabase.auth.onAuthStateChange((_event, session) => {
				setSession(session);
			});
		};

		fetchSession();
	}, []);

	if (session === undefined) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (session) {
		return <Redirect href={{ pathname: "/(tabs)" }} />;
	} else {
		return <Redirect href={{ pathname: "/(auth)" }} />;
	}
}
