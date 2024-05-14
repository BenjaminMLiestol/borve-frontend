import { DarkModeIcon, LightModeIcon } from "@/assets/icons";
import { logout } from "@/redux/reducers/authslice";
import { Icon } from "@iconify/react";
import {
	Avatar,
	Button,
	Divider,
	Navbar,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	ScrollShadow,
	Spacer,
	Switch,
} from "@nextui-org/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cn } from "./cn";
import Sidebar from "./sidebar";
import { sectionItemsWithTeams } from "./sidebar-items";
import { useUser } from "@/core/UserProvider";

export const AuthNavBarComponent = () => {
	const user = useUser();
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
			<div className="sm:flex h-dvh hidden sticky top-0">
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
							<div className="flex h-8 w-8 items-center justify-center rounded-full border-small border-foreground/20">B</div>
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
									{user?.first_name} {user?.last_name}
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
				<div className="sm:hidden">
					<Navbar
						isBordered
						classNames={{
							item: "data-[active=true]:text-primary",
							wrapper: "px-4 sm:px-6",
						}}
						height="64px"
						isMenuOpen={isExpanded}
						onMenuOpenChange={setExpanded}
					>
						<NavbarMenuToggle className="mr-2 h-6 " />
							<NavbarMenu className="max-w-[1024px] mx-auto gap-y-5">
							<NavbarMenuItem onClick={() => setExpanded(false)}>
								<Link className="w-full flex gap-2 items-center" to="/">
									<Icon
										className="text-default-400 group-data-[selected=true]:text-foreground"
										icon="solar:home-2-linear"
										width={24}
									/>
									Oversikt
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem onClick={() => setExpanded(false)}>
								<Link aria-current="page" className="w-full flex gap-2 items-center" to="/customers">
									<Icon
										className="text-default-400 group-data-[selected=true]:text-foreground"
										icon="solar:add-circle-line-duotone"
										width={24}
									/>
									Kunder
								</Link>
							</NavbarMenuItem>
							<Divider />
							<NavbarMenuItem onClick={() => setExpanded(false)}>
								<Link aria-current="page" className="w-full flex gap-2 items-center" to="/orders">
									<Icon
										className="text-default-400 group-data-[selected=true]:text-foreground"
										icon="solar:add-circle-line-duotone"
										width={24}
									/>
									Ordre
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem onClick={() => setExpanded(false)}>
								<Link aria-current="page" className="w-full flex gap-2 items-center" to="/products">
									<Icon
										className="text-default-500 group-data-[selected=true]:text-foreground"
										icon="solar:pie-chart-2-outline"
										width={24}
									/>
									Produkt
								</Link>
							</NavbarMenuItem>
							<Divider />
							<NavbarMenuItem onClick={() => setExpanded(false)}>
								<Link aria-current="page" className="w-full flex gap-2 items-center" to="/profile">
									<Icon
										className="text-default-500 group-data-[selected=true]:text-foreground"
										icon="solar:settings-outline"
										width={24}
									/>
									Profil
								</Link>
							</NavbarMenuItem>
							<Divider />
							<NavbarMenuItem className="text-danger" onClick={() => {
								handleLogout();
								setExpanded(false);
							}}>
								Logg ut
							</NavbarMenuItem>
						</NavbarMenu>
				<Switch
					color="default"
					thumbIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
					isSelected={isDarkMode}
					onValueChange={updateMode}
					aria-label="Dark mode"
				/>
				</Navbar>
				</div>
			</div>
		</div>
	);
};
