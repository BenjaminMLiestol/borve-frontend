import type { ListboxProps, ListboxSectionProps, Selection } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { cn } from "./cn";
import { Key, ReactNode, forwardRef, useCallback, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export type SidebarItem = {
	key: string;
	title: string;
	icon?: string;
	href?: string;
	startContent?: ReactNode;
	endContent?: ReactNode;
	items?: SidebarItem[];
	className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
	items: SidebarItem[];
	isCompact?: boolean;
	hideEndContent?: boolean;
	iconClassName?: string;
	sectionClasses?: ListboxSectionProps["classNames"];
	classNames?: ListboxProps["classNames"];
	defaultSelectedKey: string;
	onSelect?: (key: string) => void;
};

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
	(
		{
			items,
			isCompact,
			defaultSelectedKey,
			onSelect,
			hideEndContent,
			sectionClasses: sectionClassesProp = {},
			itemClasses: itemClassesProp = {},
			iconClassName,
			className,
			...props
		},
		ref,
	) => {
		const router = useRouterState();
		const [selected, setSelected] = useState<Key>(router.location.pathname.slice(1) ?? defaultSelectedKey);
		const navigate = useNavigate();

		const sectionClasses = {
			...sectionClassesProp,
			base: cn(sectionClassesProp?.base, {
				"p-0 max-w-[44px]": isCompact,
			}),
			group: cn(sectionClassesProp?.group, {
				"flex flex-col gap-1": isCompact,
			}),
			heading: cn(sectionClassesProp?.heading, {
				hidden: isCompact,
			}),
		};

		const itemClasses = {
			...itemClassesProp,
			base: cn(itemClassesProp?.base, {
				"w-11 h-11 gap-0 p-0": isCompact,
			}),
		};

		const renderItem = useCallback(
			(item: SidebarItem) => {
				return (
					<ListboxItem
						{...item}
						key={item.key}
						href={undefined}
						onClick={() => 	navigate({ to: item.href })}
						endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
						startContent={
							isCompact ? null : item.icon ? (
									<Icon
											className={cn(
													"text-default-500 group-data-[selected=true]:text-foreground",
													iconClassName,
											)}
											icon={item.icon}
											width={24}
									/>
							) : (
								item.startContent ?? null
							)
						}
						title={isCompact ? null : item.title}
					/>
				);
			},
			[isCompact, hideEndContent, iconClassName, navigate],
	);
	

		return (
			<Listbox
				key={isCompact ? "compact" : "default"}
				ref={ref}
				hideSelectedIcon
				as="nav"
				className={cn("list-none", className)}
				color="default"
				itemClasses={{
					...itemClasses,
					base: cn(
						"px-3 rounded-large h-[44px] data-[selected=true]:bg-default-100",
						itemClasses?.base,
					),
					title: cn(
						"text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
						itemClasses?.title,
					),
				}}
				items={items}
				selectedKeys={[selected] as unknown as Selection}
				selectionMode="single"
				variant="flat"
				onSelectionChange={(keys) => {
					const key = Array.from(keys)[0];

					setSelected(key as Key);
					onSelect?.(key as string);
				}}
				{...props}
			>
				{(item) =>
					item.items && item.items?.length > 0 ? (
						<ListboxSection
							key={item.key}
							classNames={sectionClasses}
							showDivider={isCompact}
							title={item.title}
						>
							{item.items.map(renderItem)}
						</ListboxSection>
					) : (
						renderItem(item)
					)
				}
			</Listbox>
		);
	},
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
