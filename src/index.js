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
    return list.includes(word);
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
    console.log(document.querySelector('#hideLength').value)
    console.log(hide)
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML;
      if (hide.includes(word) && !words[i].classList.contains('hidden')) {
        words[i].classList.add('hidden');
      } else if (!hide.includes(word) && words[i].classList.contains('hidden')) {
        words[i].classList.remove('hidden');
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
    const target = event.target;
    if (
      target.classList.contains('analyse-btn') &&
      inputSentence.value !== ''
    ) {
      console.log(inputSentence.value);
      analyseSentence();
    }
    if (target.id == 'hide-words') {
      console.log(target.checked)
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
      }
    }
  });

  newSentence.addEventListener('change', (event) => {
    if (event.target.id == 'hideLength') {
      const length = event.target.value;
      document.querySelector(
        '.hideLength',
      ).innerHTML = `Word limit: ${length} characters`;

      document.querySelector(
        'label[for=hide-words]',
      ).innerHTML = `Hide all words fewer than ${length} characters long.`;
      if (document.querySelector('#hide-words').checked) {
        hideWords()
      }
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
