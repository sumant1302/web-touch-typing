import React, { useEffect, useState } from "react";
import CustomInp from "./CustomInp";
import Footer from "./Footer";
import { englishWords } from "../assets/englishWords";
import Stopwatch from "./StopWatch";
var lastCorrectLength = 0;
const lastSoundValue = localStorage.getItem("soundValue");

const Input = () => {
	//State Variables
	const [text, setText] = useState("");
	const [printText, setPrintText] = useState("");
	const [sound, setSound] = useState(lastSoundValue);
	const [wordCount, setWordCount] = useState(4);
	const [letterCount, setLetterCount] = useState(2);

	//Audio elements for Sound
	const correctSound = new Audio("./sounds/correct.mp3");
	const incorrectSound = new Audio("./sounds/incorrect.mp3");
	const keySound = new Audio("./sounds/key-sound.mp3");

	//Timing and accuracy Variables
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [totalChars, setTotalChars] = useState(0);

	const [thresWPM, setThresWPM] = useState(40);
	const [thresAccuracy, setThresAccuracy] = useState(60);
	const [lastWPM, setLastWPM] = useState(40);
	const [lastAccuracy, setLastAccuracy] = useState(60);

	//Lesson Count
	const [lessonCount, setLessonCount] = useState(1);
	//Letters
	const letters = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];

	// Generate a random sentence based on wordCount and letterCount
	const generateRandomSentence = () => {
		let sentence = "";
		if (letterCount === "words") {
			for (let i = 0; i < wordCount; i++) {
				const randomIndex = Math.floor(Math.random() * englishWords.length);
				let word = englishWords[randomIndex];
				sentence += word;
				if (i !== wordCount - 1) {
					sentence += " ";
				}
			}
		} else {
			for (let i = 0; i < wordCount; i++) {
				let word = "";
				for (let j = 0; j < letterCount; j++) {
					const randomIndex = Math.floor(Math.random() * letters.length);
					word += letters[randomIndex];
				}
				sentence += word;
				if (i !== wordCount - 1) {
					sentence += " ";
				}
			}
		}
		return sentence;
	};

	// Check if the input text matches the generated sentence
	const isInputCorrect = () => {
		if (text.length === printText.length) {
			return text === printText;
		}
	};
	// Calculate accuracy based on the input text
	const calculateAccuracy = () => {
		if (totalChars === 0) {
			return 0;
		}
		const accuracy = 100 - Math.round(((totalChars - printText.length) / printText.length) * 100);
		return accuracy;
	};
	// Calculate words per minute (WPM) based on the input text
	const calculateWPM = () => {
		if (!startTime || !endTime) {
			return 0;
		}
		const minutes = (endTime - startTime) / 60000;

		let words;
		if (letterCount !== "words") {
			words = printText.length / letterCount;
		} else {
			words = printText.split(" ").length;
		}
		console.warn("words->" + words);

		return Math.round(words / minutes);
	};

	// Handle finishing typing of text
	const handleFinishTyping = () => {
		if (isInputCorrect()) {
			setEndTime(new Date());
			if (sound) {
				correctSound.play();
			}
		} else {
			setEndTime(null);
		}
		console.warn("Start -> " + startTime);
		console.warn("End->" + endTime);
	};
	//Handle Key press event
	const handleText = (e) => {
		if (!startTime || text === "") {
			setStartTime(new Date());
		}
		if (text.length <= printText.length) {
			setText(e.target.value);
			setTotalChars(totalChars + 1);
			if (sound) {
				keySound.play();
			}
		}
	};
	//Check if user is typing correct text
	const checkRight = () => {
		var i = text.length - 1;
		return printText.substring(0, i) === text.substring(0, i);
	};
	const checkCurrentLetter = () => {
		var i = text.length - 1;
		if (printText.charAt(i) === text.charAt(i)) {
			return true;
		}
		return false;
	};

	//Check the next letter to type and highlight on keys
	const nextLetter = () => {
		var i = text.length;
		if (checkRight()) {
			lastCorrectLength++;
			return printText.charAt(i);
		} else {
			return text.charAt(lastCorrectLength);
		}
	};

	//Handle Sound toggle
	const handleSound = () => {
		setSound(!sound);
		localStorage.setItem("soundValue", sound);
	};
	//Handle PrintText Changes for input
	const handlePrintText = (e) => {
		setPrintText(e.target.value);
	};

	//Check for the wordcount & Letter count changes
	const handleLetterCountChange = (val) => {
		if (val === 0) {
			customText();
		} else if (val === "words") {
			setLetterCount("words");
		} else {
			setLetterCount(Number(val));
		}
	};
	const handleWordCountChange = (val) => {
		if (val === 0) {
			customWordCount();
		} else {
			setWordCount(Number(val));
		}
	};
	//Handle custom texts
	const customText = () => {
		setLetterCount(0);
	};
	const customWordCount = (val) => {
		if (val === 0) {
			customText();
		} else {
			setWordCount(val);
		}
	};

	//Handle reset of text with tab & esc keys
	const handleKeyDown = (e) => {
		if (e.key === "Tab" || e.key === "Escape") {
			setText("");
			setTotalChars(0);
			setStartTime(new Date());
		}
	};

	//Reset Print text on word count and letter count changes
	useEffect(() => {
		setPrintText(generateRandomSentence());
	}, [wordCount, letterCount]);

	//Get new printText on lessonCount change
	useEffect(() => {
		setPrintText(generateRandomSentence());
	}, [lessonCount]);
	//Handle printText Changes
	useEffect(() => {
		setText("");
		setStartTime(null);
		setTotalChars(0);
	}, [printText]);

	useEffect(() => {
		if (text !== "") {
			if (!checkRight() || !checkCurrentLetter()) {
				if (sound) {
					incorrectSound.play();
				}
			} else if (text.length === printText.length) {
				handleFinishTyping();
			}
		}
	}, [text]);
	useEffect(() => {
		if (endTime) {
			setLastAccuracy(calculateAccuracy());
			setLastWPM(calculateWPM());
			console.warn(3);
		}
	}, [endTime]);
	useEffect(() => {
		if (lastAccuracy > thresAccuracy && lastWPM > thresWPM) {
			setLessonCount(lessonCount + 1);
			console.warn("1");
		} else {
			setText("");
			setTotalChars(0);
			setStartTime(null);
			console.warn(2);
		}
	}, [lastAccuracy, lastWPM]);

	return (
		<div>
			<span className="timer">
				{<Stopwatch startTime={startTime} endTime={endTime} onInputCorrect={isInputCorrect} />}
			</span>
			<span className="soundButton" onClick={handleSound}>
				<img
					src={
						process.env.PUBLIC_URL + `${sound ? "/images/sound-on.png" : "/images/sound-off.png"}`
					}
					alt="sound"
				/>
			</span>
			<div className="counts">
				<div className="div-count card">
					<h3>Set Letter Count</h3>
					<select value={letterCount} onChange={(e) => handleLetterCountChange(e.target.value)}>
						<option value={2}>Bigrams</option>
						<option value={3}>Trigrams</option>
						<option value={4}>Tetragrams</option>
						<option value={"words"}>Words</option>
						<option value={0}>Custom</option>
					</select>
				</div>
				<div className="div-count card">
					<h3>Set Word Count</h3>
					<select value={wordCount} onChange={(e) => handleWordCountChange(e.target.value)}>
						<option value={1}>One</option>
						<option value={2}>Two</option>
						<option value={3}>Three</option>
						<option value={4}>Four</option>
						<option value={0}>Custom</option>
					</select>
				</div>
				<div className="div-count div-threshold card">
					<h3>Threshold</h3>
					<label htmlFor="set-wpm">WPM</label>
					<input
						name="set-wpm"
						type="number"
						min={0}
						max={100}
						value={thresWPM}
						onChange={(e) => setThresWPM(e.target.value)}
					/>
					<label htmlFor="set-accuracy">Accuracy</label>
					<input
						name="set-accuracy"
						type="number"
						min={0}
						max={100}
						value={thresAccuracy}
						onChange={(e) => setThresAccuracy(e.target.value)}
					/>
				</div>
			</div>
			<div>
				<h3>Lesson {lessonCount} / 25</h3>
			</div>
			<div className="input-boxes">
				<input className="inputBox-printText" type="text" value={printText} disabled={false} />
				<input
					className="inputBox-text"
					value={text}
					onChange={handleText}
					type="text"
					placeholder="Enter text"
					style={{
						border:
							text.length > 0
								? checkRight() && checkCurrentLetter()
									? "3px solid  rgb(18, 209, 21)"
									: "3px solid rgb(209, 18, 18)"
								: "2px solid  rgb(79, 33, 232)",
						color: checkRight() && checkCurrentLetter() ? "rgb(18, 209, 21)" : "rgb(209, 18, 18)",
						backgroundColor: text === printText ? "3px solid  rgb(18, 209, 21)" : "white",
					}}
					maxLength={printText.length}
					onKeyDown={handleKeyDown}
					disabled={text === printText}
				/>
			</div>

			{letterCount === 0 || wordCount === 0 ? <CustomInp onInput={handlePrintText} /> : ""}
			<div className="keyboard-keys">
				<ul className="keys">
					{letters.map((letter) => (
						<li key={letter} className={`card ${nextLetter() === letter ? "k-green" : "k-black"}`}>
							{letter}
						</li>
					))}
				</ul>
				<ul className="keys k-space">
					<li className={`k-space card ${nextLetter() === " " ? "k-green" : "k-black"}`}>SPACE</li>
				</ul>
			</div>
			<div className="">
				{isInputCorrect() ? (
					<img
						className="correctTick"
						src={process.env.PUBLIC_URL + "/images/correctTick.gif"}
						alt="correct👍"
					/>
				) : (
					<p></p>
				)}
			</div>
			<div>
				{text.length !== printText.length && text.length > 0 ? (
					<h4>{checkRight() && checkCurrentLetter() ? "Going Right....👍" : "Going Wrong...❌"}</h4>
				) : (
					<p></p>
				)}
			</div>
			<div className="results">
				<p>Accuracy : {lessonCount > 1 ? lastAccuracy : 0}%</p>
				<p>WPM: {lessonCount > 1 ? lastWPM : 0}</p>
			</div>
			<Footer />
		</div>
	);
};

export default Input;
