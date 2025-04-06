// theme/ThemeContext.tsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { Colors } from "../constants/Colors";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	colors: typeof Colors.light;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	colors: Colors.light,
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<Theme>("light");

	const toggleTheme = () =>
		setTheme((prev) => (prev === "light" ? "dark" : "light"));

	const value = useMemo(
		() => ({
			theme,
			colors: theme === "light" ? Colors.light : Colors.dark,
			toggleTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
