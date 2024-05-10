import type { SidebarItem } from "./sidebar";

import { Icon } from "@iconify/react";

// import TeamAvatar from "./team-avatar";

export const items: SidebarItem[] = [
	{
		key: "home",
		href: "/home",
		icon: "solar:home-2-linear",
		title: "Hjem",
	},
	{
		key: "orders",
		href: "/orders",
		icon: "solar:widget-2-outline",
		title: "Ordre",
		endContent: (
			<Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
		),
	},
	{
		key: "tasks",
		href: "/tasks",
		icon: "solar:checklist-minimalistic-outline",
		title: "Tasks",
		endContent: (
			<Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
		),
	},
	{
		key: "team",
		href: "/team",
		icon: "solar:users-group-two-rounded-outline",
		title: "Team",
	},
];

export const sectionItems: SidebarItem[] = [
	{
		key: "overview",
		title: "Oversikt",
		items: [
			{
				key: "home",
				href: "/home",
				icon: "solar:home-2-linear",
				title: "Oversikt",
			},
			{
				key: "customers",
				href: "/customers",
				icon: "solar:checklist-minimalistic-outline",
				title: "Kunder",
				endContent: (
					<Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
				),
			}
		],
	},
	{
		key: "sale",
		title: "Salg",
		items: [
			{
				key: "orders",
				href: "/orders",
				icon: "solar:widget-2-outline",
				title: "Ordre",
				endContent: (
					<Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
				),
			},
			{
				key: "products",
				href: "/products",
				title: "Produkter",
				icon: "solar:pie-chart-2-outline",
			},
		],
	},
	{
		key: "administration",
		title: "Administrasjon",
		items: [
			{
				key: "Profil",
				href: "/profile",
				icon: "solar:settings-outline",
				title: "Profil",
				
			},
		],
	},
];

export const sectionItemsWithTeams: SidebarItem[] = [
	...sectionItems,
	//   {
	//     key: "your-teams",
	//     title: "Your Teams",
	//     items: [
	//       {
	//         key: "nextui",
	//         href: "/nextui",
	//         title: "NextUI",
	//         startContent: <TeamAvatar name="Next UI" />,
	//       },
	//       {
	//         key: "tailwind-variants",
	//         href: "/tailwind-variants",
	//         title: "Tailwind Variants",
	//         startContent: <TeamAvatar name="Tailwind Variants" />,
	//       },
	//       {
	//         key: "nextui-pro",
	//         href: "/nextui-pro",
	//         title: "NextUI Pro",
	//         startContent: <TeamAvatar name="NextUI Pro" />,
	//       },
	//     ],
	//   },
];
