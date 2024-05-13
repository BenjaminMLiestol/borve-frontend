import { DarkModeIcon, LightModeIcon } from "@/assets/icons";
import {

	Listbox,
	ListboxItem,
	ListboxSection,
	Switch,
} from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";

export const NavbarComponent = () => {
	const mode = localStorage.getItem("theme");
	// const [isExpanded, setExpanded] = useState(false);
	const [isDarkMode, setDarkMode] = useState(mode === "dark" ? true : false);
	const { setTheme } = useTheme();

	const updateMode = (isSelected: boolean) => {
		setDarkMode(isSelected);
		setTheme(!isSelected ? "light" : "dark");
	};

	return (
			<div className="p-5 flex flex-row justify-end mx-auto max-w-[1250px] w-full">
				<Switch
					color="default"
					thumbIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
					isSelected={isDarkMode}
					onValueChange={updateMode}
					aria-label="Dark mode"
				/>
				<Listbox>
					<ListboxSection>
						<ListboxItem key="login">
							<Link to="auth/login">
							Logg inn
							</Link>
						</ListboxItem>
						<ListboxItem>
							<Link to="/">
								Hjem
								</Link>
						</ListboxItem>
					</ListboxSection>
				</Listbox>
				{/* <Dropdown>
					<DropdownTrigger>
						<Button variant="bordered" onClick={() => setExpanded(!isExpanded)}>
							{isExpanded ? <CloseIcon /> : <HamburgerIcon />}
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dropdown menu">
						<DropdownSection aria-label="login" showDivider>
							<DropdownItem key="login" textValue="login" href="/auth/login" >
								Logg inn
							</DropdownItem>
						</DropdownSection>
						<DropdownSection aria-label="actions">
							<DropdownItem key="home" textValue="home" href="/">
								Hjem
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown> */}
			</div>
	);
};
