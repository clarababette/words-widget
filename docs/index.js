document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    '.input-sentence',
    '.analyse-btn',
    '.output-sentence',
    '.word-count',
  ];

  const elements = selectors.map((selector) =>
    document.querySelector(selector),
  );

  const [inputSentence, analyseBtn, outputSentence, wordCount] = elements;

  analyseBtn.addEventListener('click', () => {
    let sentence = inputSentence.value;
    if (sentence !== '') {
      sentence = sentence.trim();
      const words = sentence.split(/\s+/);
      sentence = words.map((word) => {
        const chars = word.replace(/\W+/g, '');
        if (chars.length > 4) {
          word = `<mark>${word}</mark>`;
        }
        return word;
      });
      outputSentence.innerHTML = sentence.join(' ');
      wordCount.innerHTML = `Word count: ${words.length}`;
    }
  });
});
