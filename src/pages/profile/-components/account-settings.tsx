import { Button, Input, Select, SelectItem, Spacer } from "@nextui-org/react";

import { forwardRef } from "react";
import { cn } from "./cn";

interface AccountSettingCardProps {
	className?: string;
}

const timeZoneOptions = [
	{
		label: "Coordinated Universal Time (UTC-1)",
		value: "utc-1",
		description: "Coordinated Universal Time (UTC-1)",
	},
];

const AccountSetting = forwardRef<HTMLDivElement, AccountSettingCardProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-2", className)} {...props}>
			{/* Full name */}
			<div>
				<p className="text-base font-medium text-default-700">Full name</p>
				<p className="mt-1 text-sm font-normal text-default-400">Name to be used for emails.</p>
				<Input className="mt-2" placeholder="e.g Kate Moore" />
			</div>
			<Spacer y={2} />
			{/* Username */}
			<div>
				<p className="text-base font-medium text-default-700">Username</p>
				<p className="mt-1 text-sm font-normal text-default-400">Nickname or first name.</p>
				<Input className="mt-2" placeholder="kate.moore" />
			</div>
			<Spacer y={2} />
			{/* Email Address */}
			<div>
				<p className="text-base font-medium text-default-700">Email Address</p>
				<p className="mt-1 text-sm font-normal text-default-400">
					The email address associated with your account.
				</p>
				<Input className="mt-2" placeholder="e.g kate.moore@acme.com" />
			</div>
			<Spacer y={2} />
			{/* Timezone */}
			<section>
				<div>
					<p className="text-base font-medium text-default-700">Timezone</p>
					<p className="mt-1 text-sm font-normal text-default-400">Set your current timezone.</p>
				</div>
				<Select className="mt-2" defaultSelectedKeys={["utc-3"]}>
					{timeZoneOptions.map((timeZoneOption) => (
						<SelectItem key={timeZoneOption.value} value={timeZoneOption.value}>
							{timeZoneOption.label}
						</SelectItem>
					))}
				</Select>
			</section>
			<Spacer y={2} />
			<Button className="mt-4 bg-default-foreground text-background" size="sm">
				Update Account
			</Button>
		</div>
	),
);

AccountSetting.displayName = "AccountSetting";

export default AccountSetting;
