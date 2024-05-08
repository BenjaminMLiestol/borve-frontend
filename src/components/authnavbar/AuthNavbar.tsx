import { CloseIcon, DarkModeIcon, HamburgerIcon, LightModeIcon } from "@/assets/icons";
import { logout, selectAuthState } from "@/redux/reducers/authslice";
import { Icon } from "@iconify/react";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	ScrollShadow,
	Spacer,
	Switch,
} from "@nextui-org/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "./cn";
import Sidebar from "./sidebar";
import { sectionItemsWithTeams } from "./sidebar-items";

export const AuthNavBarComponent = () => {
	const auth = useSelector(selectAuthState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isExpanded, setExpanded] = useState(false);
	const isHidden = false;
	const mode = localStorage.getItem("theme");
	const [isDarkMode, setDarkMode] = useState(mode === "dark" ? true : false);
	const { setTheme } = useTheme();

	const updateMode = (isSelected: boolean) => {
		setDarkMode(isSelected);
		setTheme(!isSelected ? "light" : "dark");
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate({ to: "/auth/login" });
	};

	return (
		<div>
			<div className="sm:flex h-dvh mr-5 hidden">
				<div
					className={cn(
						"relative hidden h-full w-0 max-w-[288px] flex-1 flex-col bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 p-6 transition-[transform,opacity,margin] duration-250 ease-in-out lg:flex lg:w-72",
						{
							"-ml-72 -translate-x-72": isHidden,
						},
					)}
				>
					<div className="flex items-center justify-between px-2">
						<div className="flex items-center gap-2 px-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border-small border-foreground/20"></div>
							<span className="text-xs font-medium uppercase text-foreground">Børve spyling AS</span>
						</div>

						<Switch
							color="default"
							thumbIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
							isSelected={isDarkMode}
							onValueChange={updateMode}
							aria-label="Dark mode"
						/>
					</div>

					<Spacer y={8} />

					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3 px-2">
							<Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29028708c" />
							<div className="flex flex-col">
								<p className="text-small text-foreground">
									{auth.user?.first_name} {auth.user?.last_name}
								</p>
							</div>
						</div>
					</div>

					<ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
						<Sidebar
							defaultSelectedKey="home"
							iconClassName="text-default-600 group-data-[selected=true]:text-foreground"
							itemClasses={{
								base: "data-[selected=true]:bg-default-400/20 data-[hover=true]:bg-default-400/10",
								title: "text-default-600 group-data-[selected=true]:text-foreground",
							}}
							items={sectionItemsWithTeams}
							sectionClasses={{
								heading: "text-default-600 font-medium",
							}}
							variant="flat"
						/>
					</ScrollShadow>

					<Spacer y={8} />

					<div className="mt-auto flex flex-col">
						<Button
							onClick={handleLogout}
							className="justify-start text-default-600 data-[hover=true]:text-black"
							startContent={
								<Icon
									className="rotate-180 text-default-600"
									icon="solar:minus-circle-line-duotone"
									width={24}
								/>
							}
							variant="light"
						>
							Logg ut
						</Button>
					</div>
				</div>
			</div>
			<div>
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
							<DropdownSection aria-label="actions" showDivider>
								<DropdownItem key="home" textValue="home">
									<Link className="w-full flex" to="/home">
										Hjem
									</Link>
								</DropdownItem>
								<DropdownItem key="my_orders" textValue="orders">
									<Link className="w-full flex" to="/orders">
										Mine ordre
									</Link>
								</DropdownItem>
								<DropdownItem key="my_customers" textValue="customers">
									<Link className="w-full flex" to="/customers">
										Mine kunder
									</Link>
								</DropdownItem>
								<DropdownItem key="my_profile" textValue="profile">
									<Link className="w-full flex" to="/profile">
										Min profil
									</Link>
								</DropdownItem>
							</DropdownSection>
							<DropdownSection aria-label="logout">
								<DropdownItem
									color="danger"
									textValue="login"
									className="text-danger"
									key="logout"
									onClick={() => handleLogout()}
								>
									Logg ut
								</DropdownItem>
							</DropdownSection>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};
