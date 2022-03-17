export class Analyse {
  constructor(sentences) {
    this._sentences = sentences ? sentences : [];
    this._words;
    this._rawInput;
  }
  get longestWords() {
    let longestWords = this._words.reduce((longWords, word) => {
      word = word.replace(/\W+/g, '');
      if (!longWords || word.length > longWords[0].length) {
        return [word];
      } else if (word.length == longWords[0].length) {
        return [word, ...longWords];
      } else {
        return longWords;
      }
    });
    return longestWords;
  }
  get moreThanFourChar() {
    return this._words.filter((word) => word.replace(/\W+/g, '').length > 4);
  }
  get average() {
    console.log(this._sentences)
    return (
      this._sentences.reduce(
        (sum, sentence) => sum + sentence.words.length,
        0,
      ) / this._sentences.length
    );
  }
  analyse(sentence) {
    this._rawInput = sentence;
    if (sentence !== '' || sentence !== null) {
      this._words = sentence.trim().split(/\s+/);
      return {
        words: this._words,
        longestWords: this.longestWords,
        moreThanFourChar: this.moreThanFourChar,
        wordCount: this._words.length,
        avg:
          this._sentences.length == 0
            ? ''
            : this._words.length >= this.average
            ? 'aboveAvg'
            : 'belowAvg',
      };
    }
  }
  get allSentences() {
    return this._sentences;
  }
  get rawInput() {
    return this._rawInput;
  }
  updateList() {
    if (!this._sentences.includes(this._words)) {
      this._sentences =
        this._sentences.length == 5
        ? [{ words: this._words }, ...this._sentences.slice(0, 4)]
          : [{words: this._words}, ...this._sentences];
    }
  }
  wordsShorter(length) {
    return this._words.filter((word) => word.replace(/\W+/g, '').length < length);
  }
}
