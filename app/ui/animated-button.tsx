import { twMerge } from "tailwind-merge";

export default function AnimatedButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className={twMerge(
				props.className,
				"border-2 border-gray-200 rounded-xl px-6 pb-2 text-center hover:scale-105 transition-transform duration-300 ease-out",
			)}
		>
			{props.children}
		</button>
	);
}
