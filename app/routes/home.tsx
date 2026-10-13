import type { Route } from "./+types/home";
import FrameChoice, { frameChoiceAtom, FrameType } from "~/ui/frame-choice";
import AnimatedLink from "~/ui/animated-link";
import { useAtomValue } from "jotai";

export default function Home() {
	const frameChoice = useAtomValue(frameChoiceAtom);

	return (
		<main>
			<div className="w-1/2 h-screen mx-auto flex flex-col gap-8 justify-center items-center">
				<p className="text-5xl">Hi! Please select a frame!</p>

				<div className="flex flex-row gap-8">
					<FrameChoice type={FrameType.RED} />
					<FrameChoice type={FrameType.BLUE} />
					<FrameChoice type={FrameType.PINK} />
				</div>

				<AnimatedLink to={`/camera?t=${frameChoice}`} className="mt-4 text-center">
					Select
				</AnimatedLink>
			</div>
		</main>
	);
}
