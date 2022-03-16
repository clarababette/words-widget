export class Analyse {
  constructor(sentences = []) {
    this._sentences = sentences;
    this._words;
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
    return longestWords
  }
  get moreThanFourChar() {
    return this._words.filter(word => word.replace(/\W+/g, '').length > 4)
  }
  get average() {
    console.log(this._sentences.reduce((sum, sentence) => sum + sentence.length, 0) / this._sentences.length)
    return this._sentences.reduce((sum, sentence) => sum + sentence.length, 0) / this._sentences.length;
  }
  analyse(sentence) {
    if (sentence !== '') {
      this._words = sentence.trim().split(/\s+/);
      this._sentences = this._sentences.length == 5 ? [this._words, ...this._sentences.slice(0, 4)] : [this._words, ...this._sentences]
      return {
        words: this._words,
        longestWords: this.longestWords,
        moreThanFourChar: this.moreThanFourChar,
        wordCount: this._words.length,
        avg: this._words.length >= this.average ? 'aboveAvg' : 'belowAvg'
      }
    }
  }
  get allSentences() {
    return this._sentences;
  }
}