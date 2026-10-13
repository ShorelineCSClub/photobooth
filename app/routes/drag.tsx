import { atom, useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import AnimatedButton from "~/ui/animated-button";
import AnimatedLink from "~/ui/animated-link";

export const photoOrderAtom = atom(new Array<number>(4));

export default function Drag() {
	const [searchParams] = useSearchParams();
	const [imgSrcs, setImgSrcs] = useState(new Array<string>());

	const [order, setOrder] = useAtom(photoOrderAtom);

	const isReady = useMemo(() => {
		for (let i = 0; i < order.length; i++) {
			if (order[i] === undefined) {
				return false;
			}
		}

		return true;
	}, [order]);

	const updatedUrlParams = useMemo(() => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("order", order.join(""));

		return newParams;
	}, [isReady === true]);

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
			<div className="w-1/2 h-screen flex flex-col items-center gap-2 mx-auto">
				<h1 className="text-6xl mt-12 text-center">Yay! Time to customize your photobooth strip!</h1>
				<h2 className="text-4xl mb-6 text-center">Simply drag and drop your photos into your desired slot!</h2>

				<div className="flex flex-row gap-16">
					<div className="flex flex-col gap-5">
						{imgSrcs.map((imgSrc, i) => {
							const isDraggable = !order.includes(i);

							return (
								<img
									key={i}
									src={imgSrc}
									className={`w-62 h-40 object-cover ${isDraggable ? "opacity-100" : "opacity-40"} hover:scale-105 transition-all duration-300 ease-out`}
									draggable={isDraggable}
									onDragStart={(event) => {
										event.dataTransfer.setData("index", i.toString());
									}}
								/>
							);
						})}
					</div>

					<div className="relative w-66">
						<img
							className="absolute pointer-events-none z-30"
							src={`/images/${searchParams.get("t") ?? 1}.png`}
						/>

						<div className="flex flex-col gap-2 items-center pt-8">
							{[...new Array(4).keys()].map((i) => (
								<img
									className="w-62 h-40"
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

				<div className="flex flex-row gap-4 mt-24">
					<AnimatedButton
						onClick={() => {
							setOrder(new Array(4));
						}}
					>
						Clear Photos
					</AnimatedButton>

					<AnimatedLink
						className={isReady ? "" : "pointer-events-none opacity-50"}
						to={`/stickers?${updatedUrlParams.toString()}`}
					>
						Next -&gt;
					</AnimatedLink>
				</div>
			</div>
		</main>
	);
}
