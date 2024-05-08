import { selectAuthState } from "@/redux/reducers/authslice";
import { Tab, Tabs } from "@nextui-org/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import AccountSetting from "./-components/account-settings";
import { AppearanceSetting } from "./-components/appearance-settings";
import ProfileSetting from "./-components/profile";

export const ProfileLayout = () => {
	const auth = useSelector(selectAuthState);
	return (
		<div className="w-full max-w-2xl flex-1 p-4">
			{/* Title */}
			<div className="flex items-center gap-x-3">
				<h1 className="text-3xl font-bold leading-9 text-default-foreground">Settings</h1>
			</div>
			<h2 className="mt-2 text-small text-default-500">
				Customize settings, email preferences, and web appearance.
			</h2>
			{/*  tabs*/}
			<Tabs
				fullWidth
				classNames={{
					base: "mt-6",
					cursor: "bg-content1 dark:bg-content1",
					panel: "w-full p-0 pt-4",
				}}
			>
				<Tab key="profile" title="Profil">
					{auth.user && <ProfileSetting user={auth.user} />}
				</Tab>
				<Tab key="appearance" title="Appearance">
					<AppearanceSetting />
				</Tab>
				<Tab key="account" title="Account">
					<AccountSetting />
				</Tab>
				<Tab key="billing" title="Billing">
					{/* <BillingSetting /> */}
				</Tab>
				<Tab key="team" title="Team">
					{/* <TeamSetting /> */}
				</Tab>
			</Tabs>
		</div>
	);
};

export const Route = createFileRoute("/profile/")({
	component: ProfileLayout,
	beforeLoad: async ({ location }) => {
		const isAuthenticated =
			localStorage.getItem("user") !== null && localStorage.getItem("token") !== null;
		if (!isAuthenticated) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location,
				},
			});
		}
	},
});
