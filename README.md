## Input Component

This component represents the main typing lesson interface where users can practice their typing skills. It includes the following functionalities:

1. Random Sentence Generation:

   - The component generates a random sentence based on the specified word count and letter count.
   - The sentence can be generated using either words or individual letters.
   - The generated sentence is displayed for the user to type.

2. Typing Input:

   - The user can input their typing in the text input field.
   - The input is stored in the `text` state variable.
   - Sound effects are played when the user types (if sound is enabled).

3. Accuracy and Words Per Minute (WPM) Calculation:

   - The component calculates the accuracy and WPM of the user's typing.
   - Accuracy is calculated based on the percentage of correct characters compared to the total characters typed.
   - WPM is calculated based on the number of words typed and the time taken.

4. Lesson Progress and Thresholds:

   - The component keeps track of the lesson count, word count, and letter count.
   - Thresholds for WPM and accuracy are set and incremented as the user completes lessons.
   - The current lesson count and thresholds are displayed in the UI.

5. Lesson Restart and Completion:

   - The user can restart the lesson at any time, which resets the input and generates a new random sentence.
   - When the user completes the lesson (input matches the generated sentence), the lesson count and thresholds are updated, and a new random sentence is generated.

6. Stopwatch:

   - A stopwatch component displays the elapsed time during the lesson.
   - The start time is recorded when the user starts typing, and the end time is recorded when the input matches the generated sentence.

7. Sound Toggle:
   - The user can toggle sound effects on/off using the sound icon in the footer.
   - The sound preference is saved in the local storage for future sessions.

## Usage:

To use this component, simply import it and place it in your application where you want to provide a typing lesson interface. Make sure to include the required dependencies and customize the thresholds, word count, and letter count according to your requirements.

```jsx
import Input from "./Input";

function App() {
	return (
		<div className="App">
			<Input />
		</div>
	);
}

export default App;
```

## StopWatch Component

The Stopwatch component provides the ability to track and display the elapsed time between the startTime and endTime props. You can integrate it into your application to show the elapsed time while the user is typing or performing certain actions.

To create a README for this component, you can provide a brief description of its purpose and usage, along with any additional information or instructions. Here's an example:

The Stopwatch component is a React component that displays the elapsed time in hours, minutes, and seconds. It can be used to track time for various purposes in your application.

## Usage

```jsx
Import the Stopwatch component:

import Stopwatch from './Stopwatch';

//Integrate the Stopwatch component into your application:
<Stopwatch startTime={/* startTime value */} endTime={/* endTime value */} />

```

-> startTime (number): The start time in milliseconds. Pass null if the stopwatch is not running.
-> endTime (number): The end time in milliseconds. Pass null if the stopwatch has not finished yet.

The Stopwatch component will display the formatted elapsed time based on the provided start and end times.

---

# CustomInp Component

The CustomInp component is a React component that renders a custom input area with a text area, a submit button, and a close button. It allows the user to enter custom text and perform actions based on that input.

## Usage

1. Import the CustomInp component:

   ```jsx
   import CustomInp from './CustomInp';
   //Integrate the CustomInp component into your application:

    <CustomInp onInput={/* handleInput function */} />
   ```

---

## Note - 
### The app is completed yet. It needs some more minor changes but most of the functionalities would remain the same.

---

### Website Link 
#### https://touchtype-93286.web.app/

