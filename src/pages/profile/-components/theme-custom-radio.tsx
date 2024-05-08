import { DarkTheme, LightTheme } from "@/assets/icons";
import type { RadioProps } from "@nextui-org/react";
import { VisuallyHidden, useRadio } from "@nextui-org/react";
import { cn } from "./cn";

interface ThemeCustomRadioProps extends RadioProps {
	variant: "light" | "dark";
}

export const ThemeCustomRadio = (props: ThemeCustomRadioProps) => {
	const { variant } = props;
	const {
		Component,
		children,
		// isSelected,
		description,
		getBaseProps,
		getWrapperProps,
		getInputProps,
		getLabelProps,
		getLabelWrapperProps,
		getControlProps,
	} = useRadio(props);
	const wrapperProps = getWrapperProps();

	return (
		<Component
			{...getBaseProps()}
			className={cn(
				"group inline-flex flex-row-reverse justify-between overflow-visible hover:bg-content2",
				"max-w-[300px] cursor-pointer gap-4 rounded-large border-1 border-default-200 px-4 py-2.5 shadow-md",
				"relative h-[132px] flex-1 overflow-hidden",
			)}
		>
			<VisuallyHidden>
				<input aria-label="theme-checker" {...getInputProps()} />
			</VisuallyHidden>
			<span
				{...getWrapperProps()}
				className={cn(
					wrapperProps["className"],
					"border-2 border-default",
					"group-data-[selected=true]:border-default-foreground",
				)}
			>
				<span
					{...getControlProps()}
					className={cn(
						"z-10 h-2 w-2 origin-center scale-0 rounded-full bg-default-foreground text-primary-foreground opacity-0 transition-transform-opacity group-data-[selected=true]:scale-100 group-data-[selected=true]:opacity-100 motion-reduce:transition-none",
					)}
				/>
			</span>
			<div {...getLabelWrapperProps()}>
				{children && <span {...getLabelProps()}>{children}</span>}
				{description && (
					<span className="text-small text-foreground opacity-70">{description}</span>
				)}
			</div>
			<div
				className={cn("absolute left-[32px] top-[37px]", {
					hidden: variant === "light",
				})}
			>
				<DarkTheme />
			</div>

			<div
				className={cn("absolute left-[32px] top-[37px]", {
					hidden: variant === "dark",
				})}
			>
				<LightTheme />
			</div>
		</Component>
	);
};
