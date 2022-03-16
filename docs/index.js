import {Analyse} from './words.js';
document.addEventListener('DOMContentLoaded', () => {
  const sentences = new Analyse();

  const selectors = [
    '.input-sentence',
    '.analyse-btn',
    '.output-sentence',
    '.word-count',
    '#hide-words',
    '.new-sentence',
  ];

  const elements = selectors.map((selector) =>
    document.querySelector(selector),
  );

  const [
    inputSentence,
    analyseBtn,
    outputSentence,
    wordCount,
    hideWords,
    newSentence,
  ] = elements;

  Handlebars.registerHelper('included', (list, word) => {
    return list.includes(word.replace(/\W+/g, ''));
});
  const sentencTemplate = document.querySelector('#sentence-template').innerHTML;
  const templateScript = Handlebars.compile(sentencTemplate);

  analyseBtn.addEventListener('click', () => {
    let sentence = inputSentence.value;
    newSentence.innerHTML += templateScript(sentences.analyse(sentence));
  });

  hideWords.addEventListener('click', () => {
    let words = outputSentence.children;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML;
      if (word.length < 5) {
        words[i].classList.toggle('hidden');
      }
    }
  });
});
