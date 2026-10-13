import useCountdown from "ahooks/lib/useCountDown";
import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Webcam from "react-webcam";
import AnimatedButton from "~/ui/animated-button";
import AnimatedLink from "~/ui/animated-link";

export default function Camera() {
	const [searchParams] = useSearchParams();
	const [imgSrcs, setImgSrcs] = useState<string[]>([]);
	const [timeLeft, setTimeLeft] = useState<number>();

	const webcamRef = useRef<Webcam>(null);

	const capture = useCallback(() => {
		return webcamRef.current?.getScreenshot();
	}, [webcamRef]);

	const [countdown] = useCountdown({
		leftTime: timeLeft,
		onEnd: () => {
			const imgSrc = capture();

			if (imgSrc) {
				setImgSrcs([...imgSrcs, imgSrc]);
			}

			setTimeLeft(undefined);
		},
	});

	return (
		<main>
			<div className="w-1/2 h-full mx-auto flex flex-col justify-center items-center gap-4">
				<p className="text-7xl">{countdown > 0 ? Math.ceil(countdown / 1000) : "3"}</p>

				<Webcam
					className="h-96"
					audio={false}
					width={1280}
					height={720}
					screenshotFormat="image/jpeg"
					ref={webcamRef}
				/>

				{imgSrcs.length < 4 ? (
					<AnimatedButton
						onClick={() => {
							setTimeLeft(3000);
						}}
					>
						Capture
					</AnimatedButton>
				) : (
					<AnimatedLink
						to={`/drag?t=${searchParams.get("t") ?? 1}`}
						onClick={() => {
							sessionStorage.setItem("img-srcs", JSON.stringify(imgSrcs));
						}}
					>
						Ready!
					</AnimatedLink>
				)}

				<div className="flex flex-row flex-wrap gap-4 justify-center w-3/4">
					{imgSrcs.map((imgSrc, i) => (
						<img key={i} className="h-72" src={imgSrc} />
					))}
				</div>
			</div>
		</main>
	);
}
