import { DarkTheme as NativeDarkTheme, DefaultTheme as NativeDefaultTheme, Theme } from "@react-navigation/native";
import { Colors } from "./colors";

export const DefaultTheme: Theme = {
	dark: false,
	colors: {
		...NativeDefaultTheme.colors,
		...Colors.light,
	},
	fonts: NativeDefaultTheme.fonts,
}

export const DarkTheme: Theme = {
	dark: true,
	colors: {
		...NativeDarkTheme.colors,
		...Colors.dark,
	},
	fonts: NativeDarkTheme.fonts,
}
