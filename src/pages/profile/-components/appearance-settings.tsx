import { RadioGroup } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ThemeCustomRadio } from "./theme-custom-radio";

export const AppearanceSetting = () => {
	const mode = localStorage.getItem("theme");
	const [isDarkMode, setDarkMode] = useState(mode === "dark" ? true : false);
	console.log(isDarkMode);
	const { setTheme } = useTheme();

	const updateTheme = (variant: string) => {
		setDarkMode(variant === "dark" ? true : false);
		setTheme(variant);
	};

	return (
		<div>
			{/* Theme */}
			<div>
				<p className="text-base font-medium text-default-700">Tema</p>
				<p className="mt-1 text-sm font-normal text-default-400">Oppdater fargetema for siden.</p>
				{/* Theme radio group */}
				<RadioGroup className="mt-4 flex-wrap" orientation="horizontal">
					<ThemeCustomRadio
						checked={!isDarkMode}
						onChange={() => updateTheme("light")}
						value="light"
						variant="light"
					>
						Dag
					</ThemeCustomRadio>
					<ThemeCustomRadio
						checked={isDarkMode}
						onChange={() => updateTheme("dark")}
						value="dark"
						variant="dark"
					>
						Natt
					</ThemeCustomRadio>
				</RadioGroup>
			</div>
		</div>
	);
};

AppearanceSetting.displayName = "AppearanceSetting";
