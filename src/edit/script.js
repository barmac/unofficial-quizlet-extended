import './style.css';
import WebSpeechRecognition from './WebSpeechRecognition';
import RecognitionButton from './RecognitionButton';


const EXTENSION_INTERVAL = 1000;


main();

async function main() {

  try {
    await askForAudioPermission();
  } catch (error) {
    return console.error(error);
  }

  const recognition = new WebSpeechRecognition(new webkitSpeechRecognition());

  setInterval(() => {

    const termRows = document.querySelectorAll('.TermRow:not(.is-phantom)');

    for (const termRow of termRows) {
      appendRecognitionButtons(termRow, recognition);
    }
  }, EXTENSION_INTERVAL);
}


/**
 * @param {HTMLElement} rootElement
 * @param {WebSpeechRecognition} recognition
 */
function appendRecognitionButtons(rootElement, recognition) {
  const termContents = rootElement.querySelectorAll('.TermContent-side');

  for (const termContent of termContents) {
    const contextToggleGroup = termContent.querySelector('.ContextToggleGroup-inner');
    const textArea = termContent.querySelector('textarea');

    if (contextToggleGroup.marked) {
      continue;
    }

    const recognitionButton = new RecognitionButton(recognition);
    recognitionButton.attach(contextToggleGroup);

    const lang = textArea.getAttribute('lang');

    recognitionButton.listen(result => {
      const text = window.prompt('Recognized text:', result);

      if (text) {
        textArea.value = text;
        textArea.focus();
      }
    }, lang);

    contextToggleGroup.marked = true;
  }
}



// helper //////
function askForAudioPermission() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}
