import type React from "react";
import { Link, type LinkProps } from "react-router";
import { twMerge } from "tailwind-merge";

export default function AnimatedLink(props: React.PropsWithChildren<LinkProps>) {
	return (
		<Link
			{...props}
			className={twMerge(
				props.className,
				"border-2 border-gray-200 rounded-xl px-6 pb-2 hover:scale-105 transition-transform duration-300 ease-out",
			)}
		>
			{props.children}
		</Link>
	);
}
