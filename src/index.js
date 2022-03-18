import {Analyse} from './words.js';
document.addEventListener('DOMContentLoaded', () => {
  const sentences = new Analyse(JSON.parse(localStorage.getItem('sentences')));

  const selectors = [
    '.input-sentence',
    '.analyse-btn',
    '.new-sentence',
    '.sentence-bank',
    '.new-sentence .sentence-details',
  ];

  const elements = selectors.map((selector) =>
    document.querySelector(selector),
  );

  const [inputSentence, analyseBtn, newSentence, sentenceBank, newDetails] =
    elements;

  Handlebars.registerHelper('included', (list, word) => {
    return list.includes(word.replace(/\W+/g, ''));
  });
  const detailsTemplate = document.querySelector(
    '#sentence-details-template',
  ).innerHTML;
  const detailsScript = Handlebars.compile(detailsTemplate);

  const sentenceTemplate =
    document.querySelector('#sentence-template').innerHTML;
  const sentenceScript = Handlebars.compile(sentenceTemplate);
  sentenceBank.innerHTML = sentenceScript({sentences: sentences.allSentences});

  const hideWords = () => {
    let words = document.querySelector('.output-sentence').children;
    const hide = sentences.wordsShorter(
      document.querySelector('#hideLength').value
    );
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML.replace(/\W+/g, '');
      if (hide.includes(word) && !words[i].classList.contains('hidden')) {
        words[i].classList.add('hidden');
      } else if (!hide.includes(word) && words[i].classList.contains('hidden')) {
        words[i].classList.remove('hidden');
      }
    }
  };

  const highlightWords = () => {
    let words = document.querySelector('.output-sentence').children;
    const dontHighlight = sentences.wordsShorter(
      document.querySelector('#hideLength').value
    );
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML.replace(/\W+/g, '');
      if (!dontHighlight.includes(word) && !words[i].classList.contains('highlight')) {
        words[i].classList.add('highlight');
      } else if (dontHighlight.includes(word) && words[i].classList.contains('highlight')) {
        words[i].classList.remove('highlight');
      }
    }
  };

  const addToBank = () => {
    sentenceBank.innerHTML = '';
    localStorage.setItem('sentences', JSON.stringify(sentences.allSentences));
    sentenceBank.innerHTML = sentenceScript({
      sentences: sentences.allSentences,
    });
  };
  const analyseSentence = () => {
    let sentence = inputSentence.value;
    newDetails.innerHTML = detailsScript(sentences.analyse(sentence));
  };

  newSentence.addEventListener('click', (event) => {
    const minWords = document.querySelector('#minWordCount').value;
    const target = event.target;
    if (
      target.classList.contains('analyse-btn') &&
      inputSentence.value !== ''
    ) {
      const sentence = inputSentence.value;
      if (sentence.trim().split(/\s+/).length < minWords) {
        inputSentence.value = '';
        inputSentence.placeholder = `Your sentence must be at least ${minWords} words long.`
      } else {
        analyseSentence();
      }
    }
    if (target.id == 'hide-words') {
      if (target.checked) {
        hideWords();
      } else {
        let words = document.querySelector('.output-sentence').children;
        for (let i = 0; i < words.length; i++) {
          if (words[i].classList.contains('hidden')) {
            words[i].classList.remove('hidden');
          }
        }
      }
    }
    if (target.id == 'input-sentence') {
      if (
        inputSentence.value == sentences.rawInput &&
        newDetails.innerHTML != ''
      ) {
        inputSentence.value = '';
        sentences.updateList();
        addToBank();
        newDetails.innerHTML = '';
        inputSentence.placeholder = "Enter a sentence."
      }
    }
  });

  newSentence.addEventListener('change', (event) => {
    if (event.target.id == 'hideLength') {
      const length = event.target.value;
      if (length == 0) {
        newDetails.innerHTML = '';
      } else {
      document.querySelector(
        '.hideLength',
      ).innerHTML = `Target word length: ${length} characters`;
      
      document.querySelector('#targetKey').innerHTML = `Words longer than ${length -1} characters`
      document.querySelector(
        'label[for=hide-words]',
      ).innerHTML = `Hide all words fewer than ${length} characters long.`;
      if (document.querySelector('#hide-words').checked) {
        hideWords()
      }
      highlightWords()
      }
    }
    if (event.target.id == 'minWordCount') {
      document.querySelector('.minWordCount').innerHTML = `Minimum word count: ${event.target.value} words`
    }
  });

  sentenceBank.addEventListener('click', (event) => {
    const target = event.target;
    if (
      inputSentence.value == sentences.rawInput &&
      newDetails.innerHTML != '' &&
      inputSentence.value != ''
    ) {
      sentences.updateList();
      addToBank();
    }
    inputSentence.value = sentences.allSentences[target.id].words.join(' ');
    analyseSentence();
  });
});
