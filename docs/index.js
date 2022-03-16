import {Analyse} from './words.js';
document.addEventListener('DOMContentLoaded', () => {
  const sentences = new Analyse();

  const selectors = [
    '.input-sentence',
    '.analyse-btn',
    '.new-sentence',
    '.sentence-bank',
    '.new-sentence .sentence-details'
  ];

  const elements = selectors.map((selector) =>
    document.querySelector(selector)
  );

  const [
    inputSentence,
    analyseBtn,
    newSentence,
    sentenceBank,
    newDetails
  ] = elements;

  Handlebars.registerHelper('included', (list, word) => {
    return list.includes(word.replace(/\W+/g, ''));
});
  const detailsTemplate = document.querySelector('#sentence-details-template').innerHTML;
  const detailsScript = Handlebars.compile(detailsTemplate);

  const sentenceTemplate = document.querySelector('#sentence-template').innerHTML;
  const sentenceScript = Handlebars.compile(sentenceTemplate);
  
  // sentences.allSentences.forEach(sentence => {
  //   sentenceBank.innerHTML += sentenceScript({words: sentence})
  // })
  
  const hideWords = () => {
  let words = document.querySelector('.output-sentence').children;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].innerHTML;
      if (word.length < 5) {
        words[i].classList.toggle('hidden');
      }
    }
}

  const addToBank = () => {
    sentenceBank.innerHTML = '';
    sentences.allSentences.forEach(sentence => {
      sentenceBank.innerHTML += sentenceScript({ words: sentence })
        })
  }
  const analyseSentence = () => {
    let sentence = inputSentence.value;
    newDetails.innerHTML = detailsScript(sentences.analyse(sentence))
  }

  newSentence.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("analyse-btn")) {
      analyseSentence();
      addToBank();
    }
    if (target.id == "hide-words") {
      hideWords()
    }
  })

});
