import { CloseIcon, DarkModeIcon, HamburgerIcon, LightModeIcon } from "@/assets/icons";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Switch,
} from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";

export const NavbarComponent = () => {
	const mode = localStorage.getItem("theme");
	const [isExpanded, setExpanded] = useState(false);
	const [isDarkMode, setDarkMode] = useState(mode === "dark" ? true : false);
	const { setTheme } = useTheme();

	const updateMode = (isSelected: boolean) => {
		setDarkMode(isSelected);
		setTheme(!isSelected ? "light" : "dark");
	};

	return (
		<div>
			<div className="hidden sm:flex">
				<Navbar>
					<NavbarBrand>
						<p className="font-bold text-inherit">FIRMATAXI</p>
					</NavbarBrand>
					<NavbarContent className="flex gap-4" justify="center"></NavbarContent>
					<NavbarContent justify="end">
						<NavbarItem className="lg:flex">
							<Link to={"/auth/login"}>Logg inn</Link>
						</NavbarItem>
						<Switch
							color="default"
							thumbIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
							isSelected={isDarkMode}
							onValueChange={updateMode}
							aria-label="Dark mode"
						/>
					</NavbarContent>
				</Navbar>
			</div>
			<div className="sm:hidden float-right p-5 flex flex-row">
				<Switch
					color="default"
					thumbIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
					isSelected={isDarkMode}
					onValueChange={updateMode}
					aria-label="Dark mode"
				/>
				<Dropdown onClose={() => setExpanded(false)}>
					<DropdownTrigger>
						<Button variant="bordered" onClick={() => setExpanded(!isExpanded)}>
							{isExpanded ? <CloseIcon /> : <HamburgerIcon />}
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dropdown menu">
						<DropdownSection aria-label="login" showDivider>
							<DropdownItem key="login" textValue="login">
								<Link className="w-full flex" to="/auth/login">
									Logg inn
								</Link>
							</DropdownItem>
						</DropdownSection>
						<DropdownSection aria-label="actions">
							<DropdownItem key="home" textValue="home">
								<Link className="w-full flex" to="/">
									Hjem
								</Link>
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
};
