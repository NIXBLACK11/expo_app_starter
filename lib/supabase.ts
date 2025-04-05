import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yhjraovsjtqrrleiqwcu.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloanJhb3ZzanRxcnJsZWlxd2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzkxMTMsImV4cCI6MjA1ODgxNTExM30.Z-copNdAa04qZ19nnQRSxuMBm1JB7zUK9WfsZwXogEc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
