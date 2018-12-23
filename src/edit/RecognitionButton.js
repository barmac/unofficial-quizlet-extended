const ELEMENT_TEMPLATE = `
  <span class="ContextToggle">
    <span class="UIIconButton">
      <button class="UIButton UIButton--borderless" tabindex="-1" type="button">
        <span class="UIButton-wrapper">
          <span class="UIIcon UIIcon--foot">
            🦶🏻
          </span>
        </span>
      </button>
    </span>
  </span>
`;

export default class RecognitionButton {
  /**
   *
   * @param {WebSpeechRecognition} recognition
   */
  constructor(recognition) {
    this.recognition = recognition;
    this.button = this.buildElement();
  }

  /**
   * @param {HTMLElement} parent
   */
  attach(parent) {
    parent.appendChild(this.button);
  }

  /**
   * @returns {HTMLElement}
   */
  buildElement() {
    return createElementFromTemplate(ELEMENT_TEMPLATE).querySelector('.ContextToggle');
  }

  listen(callback, lang = 'pl') {
    const actualButton = this.button.querySelector('.UIButton-wrapper');

    actualButton.addEventListener('mousedown', this.handleMousedown(callback, lang));
  }

  handleMousedown = (callback, lang) => () => {
    this.recognition.lang = lang;
    this.recognition.listenForResult(callback);
    document.addEventListener('mouseup', () => this.recognition.stopListening(), { once: true });
  }
}



// helper /////
function createElementFromTemplate(template) {
  return document.createRange().createContextualFragment(template);
}
