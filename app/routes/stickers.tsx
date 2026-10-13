import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Draggable from "react-draggable";
import AnimatedButton from "~/ui/animated-button";
import html2canvas from "html2canvas-pro";

const availableStickers = ["⭐", "❤️", "🌟", "✨", "💫", "🌈", "🦋", "🌸", "🎀", "💖", "🎉", "🎊", "🎈", "🌺", "🌼"];

export default function Stickers() {
	const [searchParams] = useSearchParams();
	const [order, setOrder] = useState<number[]>([]);
	const [imgSrcs, setImgSrcs] = useState(new Array<string>());
	const [stickers, setStickers] = useState(new Array<{ text: string; initialX: number; initialY: number }>());
	const imgRef = useRef<HTMLImageElement>(undefined!);
	const nodeRef = useRef<HTMLDivElement>(undefined!);
	const boothRef = useRef<HTMLDivElement>(undefined!);

	useEffect(() => {
		const data = searchParams.get("order");

		if (!data) {
			throw new Error("order search param is null");
		}

		const o = new Array<number>(4);

		for (let i = 0; i < data.length; i++) {
			o[i] = Number(data[i]);
		}

		setOrder(o);
	}, []);

	useEffect(() => {
		const data = sessionStorage.getItem("img-srcs");

		if (!data) {
			throw new Error("img-srcs sessionstorage key not found");
		}

		const parsed = JSON.parse(data);

		setImgSrcs(parsed as string[]);
	}, []);

	return (
		<main>
			<div className="container flex flex-col gap-8 justify-center items-center mx-auto">
				<h1 className="text-6xl text-center mt-12">Add some stickers!</h1>

				<div className="flex flex-row gap-16">
					<div className="flex flex-col gap-4">
						<p className="text-4xl text-center">Double tap to remove</p>

						<div className="flex flex-row flex-wrap w-96 items-center justify-center gap-2">
							{availableStickers.map((text, i) => (
								<AnimatedButton
									key={i}
									className="text-2xl pt-2 text-center"
									onClick={() => {
										let { x, y, right, bottom } = imgRef.current.getBoundingClientRect();

										x = right - x;
										y = bottom - y;

										const s = [...stickers];

										s.push({ text, initialX: Math.random() * x, initialY: Math.random() * y });

										setStickers(s);
									}}
								>
									{text}
								</AnimatedButton>
							))}
						</div>
					</div>

					<div className="relative w-66 h-144" ref={boothRef}>
						<img
							className="absolute h-full pointer-events-none z-30"
							src={`/images/${searchParams.get("t") ?? 1}.png`}
							ref={imgRef}
						/>

						<div className="absolute h-full container z-40" ref={nodeRef}>
							{stickers.map(({ text, initialX, initialY }, i) => (
								<Draggable
									key={`${initialX}${initialY}`}
									nodeRef={nodeRef}
									defaultPosition={{ x: initialX, y: initialY }}
								>
									<p
										className="absolute text-4xl text-center transition-transform duration-300 ease-out"
										onDoubleClick={() => {
											const s = [...stickers];

											s.splice(i, 1);

											setStickers(s);
										}}
									>
										{text}
									</p>
								</Draggable>
							))}
						</div>

						<div className="flex flex-col gap-1 pt-7">
							{[...new Array(4).keys()].map((i) => (
								// TODO: Move this div img container into a new component
								<img
									className="w-48 h-29 object-cover"
									key={i}
									src={order[i] === undefined ? undefined : imgSrcs[order[i]]}
									draggable={false}
									onDragOver={(event) => {
										event.preventDefault();
									}}
									onDrop={(event) => {
										event.preventDefault();

										const index = Number(event.dataTransfer.getData("index"));
										const o = [...order];

										o[i] = index;

										setOrder(o);
									}}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="flex flex-row gap-4 mt-4">
					<AnimatedButton
						className="text-4xl"
						onClick={() => {
							setStickers([]);
						}}
					>
						Clear stickers
					</AnimatedButton>

					<AnimatedButton
						className="text-4xl"
						onClick={async () => {
							const canvas = await html2canvas(boothRef.current, {
								backgroundColor: "#ffffff",
								scale: 2,
								useCORS: true,
							});

							const link = document.createElement("a");

							link.download = "photobooth-strip.png";
							link.href = canvas.toDataURL("image/png");
							link.click();
						}}
					>
						Download
					</AnimatedButton>
				</div>
			</div>
		</main>
	);
}
