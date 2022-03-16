import { Analyse } from "./words.js";
document.addEventListener('DOMContentLoaded', () => {

  const sentences = new Analyse;

  const selectors = [
    '.input-sentence',
    '.analyse-btn',
    '.output-sentence',
    '.word-count',
    '#hide-words',
  ];

  const elements = selectors.map((selector) =>
    document.querySelector(selector),
  );

  const [inputSentence, analyseBtn, outputSentence, wordCount, hideWords] =
    elements;

  analyseBtn.addEventListener('click', () => {
    let sentence = inputSentence.value;
    console.log(sentences.analyse(sentence));
    if (sentence !== '') {
      sentence = sentence.trim();
      const words = sentence.split(/\s+/);
      let longestWords = words.reduce((longWords, word) => {
        word = word.replace(/\W+/g, '');
        if (!longWords || word.length > longWords[0].length) {
          return [word];
        } else if (word.length == longWords[0].length) {
          return [word, ...longWords];
        } else {
          return longWords;
        }
      });
      sentence = words.map((word) => {
        const chars = word.replace(/\W+/g, '');
        if (longestWords.includes(chars)) {
          word = `<mark class="longest">${word}</mark>`;
        } else if (chars.length > 4) {
          word = `<mark>${word}</mark>`;
        }
        return `<span>${word}</span>`;
      });
      outputSentence.innerHTML = sentence.join(' ');
      wordCount.innerHTML = `Word count: ${words.length}`;
    }
  });

  hideWords.addEventListener('click', () => {
    let words = outputSentence.children;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML
      if (word.length < 5) {
        words[i].classList.toggle('hidden');
      }
    }
  });
});
