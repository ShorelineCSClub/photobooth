import { atom, useAtom } from "jotai";

export const enum FrameType {
	RED = 1,
	BLUE,
	PINK,
}

export const frameChoiceAtom = atom<FrameType>(FrameType.RED);

export default function FrameChoice({ type }: { type: FrameType }) {
	const [frameChoice, setFrameChoice] = useAtom(frameChoiceAtom);

	return (
		<img
			src={`/images/${type}.png`}
			className={`${frameChoice === type ? "border-2 border-gray-200" : ""} h-96 hover:scale-105 transition-transform duration-300 ease-out`}
			onClick={() => {
				setFrameChoice(type);
			}}
		/>
	);
}
