export default class WebSpeechRecognition {
  /**
   * @param {SpeechRecognition} speech
   */
  constructor(speech) {
    this.speech = speech;
    this.callback = () => {};
  }

  set lang(lang) {
    this.speech.lang = lang;
  }

  get lang() {
    return this.speech.lang;
  }

  listenForResult(callback) {
    this.speech.start();
    this.callback = this.getResultHandler(callback);

    this.speech.addEventListener('result', this.callback, { once: true });
  }

  stopListening() {
    this.speech.stop();
  }

  getResultHandler(callback) {
    return event => callback(event.results[0][0].transcript);
  }
}
