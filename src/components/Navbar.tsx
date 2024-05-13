import { CloseIcon, DarkModeIcon, HamburgerIcon, LightModeIcon } from "@/assets/icons";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Switch,
} from "@nextui-org/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";

export const NavbarComponent = () => {
	const mode = localStorage.getItem("theme");
	const navigate = useNavigate();
	const [isExpanded, setExpanded] = useState(false);
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
				<Dropdown>
					<DropdownTrigger>
						<Button variant="bordered" onClick={() => setExpanded(!isExpanded)}>
							{isExpanded ? <CloseIcon /> : <HamburgerIcon />}
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dropdown menu">
						<DropdownSection aria-label="login" showDivider>
							<DropdownItem key="login" textValue="login" >
								<Button fullWidth={true} variant="light" onClick={() => navigate({ to: "/auth/login" })}>Logg inn</Button>	
							</DropdownItem>
							<DropdownItem key="login" textValue="login">
								<Link className="w-full flex" to="/auth/login">
									Logg inn v2
								</Link>
							</DropdownItem>
						</DropdownSection>
						<DropdownSection aria-label="actions">
							<DropdownItem key="home" textValue="home" onClick={() => navigate({ to: "/" })}>
								<Button fullWidth={true} variant="light" onClick={() => navigate({ to: "/" })}>Hjem</Button>	
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</div>
	);
};
