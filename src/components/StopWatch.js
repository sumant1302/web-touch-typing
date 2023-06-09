import React, { useState, useEffect } from "react";

const Stopwatch = ({ startTime, endTime }) => {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval;

		if (startTime) {
			setIsRunning(true);
			interval = setInterval(() => {
				setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [startTime]);
	useEffect(() => {
		setIsRunning(false);
	}, [endTime]);

	const formatTime = (time) => {
		const hours = Math.floor(time / 3600)
			.toString()
			.padStart(2, "0");
		const minutes = Math.floor((time % 3600) / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (time % 60).toString().padStart(2, "0");

		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<div>
			<p>{formatTime(elapsedTime)}</p>
		</div>
	);
};

export default Stopwatch;
