import {Analyse} from '../src/words.js';
describe('The Analyse class', function () {
  it("should return the word count for a given sentence.", () => {
    const test = new Analyse();
    const outcome = test.analyse('The fox in the tophat whispered into the ear of the rabbit.');
    assert.equal(outcome.wordCount, 12);
  })
  it("should return a list of the longest words in a given sentence.", () => {
    const test = new Analyse();
    const outcome = test.analyse('The bees decided to have a mutiny against their queen.');
    assert.deepEqual(outcome.longestWords, ['against','decided']);
  })
  it("should return a list of the words shorter than a given number in a given sentence.", () => {
    const test = new Analyse();
    test.analyse('The quick brown fox jumps over the lazy dog.');
    assert.deepEqual(test.wordsShorter(4), ['The', 'fox', 'the', 'dog']);
  })
  it("should return a list of the last five sentences analysed.", () => {
    const test = new Analyse();
    test.analyse('The quick brown fox jumps over the lazy dog.');
    test.updateList();
    test.analyse('The bees decided to have a mutiny against their queen.');
    test.updateList();
    test.analyse('The fox in the tophat whispered into the ear of the rabbit.');
    test.updateList();
    test.analyse('I am happy to take your donation; any amount will be greatly appreciated.')
    test.updateList();
    test.analyse('Going from child, to childish, to childlike is only a matter of time.')
    test.updateList();
    test.analyse('Let me help you with your baggage.')
    test.updateList();
    test.analyse('Waffles are always better without fire ants and fleas.')
    test.updateList();
    assert.deepEqual(test.allSentences, [
    {
        "words": [
            "Waffles",
            "are",
            "always",
            "better",
            "without",
            "fire",
            "ants",
            "and",
            "fleas."
        ]
    },
    {
        "words": [
            "Let",
            "me",
            "help",
            "you",
            "with",
            "your",
            "baggage."
        ]
    },
    {
        "words": [
            "Going",
            "from",
            "child,",
            "to",
            "childish,",
            "to",
            "childlike",
            "is",
            "only",
            "a",
            "matter",
            "of",
            "time."
        ]
    },
    {
        "words": [
            "I",
            "am",
            "happy",
            "to",
            "take",
            "your",
            "donation;",
            "any",
            "amount",
            "will",
            "be",
            "greatly",
            "appreciated."
        ]
    },
    {
        "words": [
            "The",
            "fox",
            "in",
            "the",
            "tophat",
            "whispered",
            "into",
            "the",
            "ear",
            "of",
            "the",
            "rabbit."
        ]
    }
]);
  })
  it("shoud indicate if the average length of the words in a sentence is greater than or equal to the average length of words in the previous sentences.", () => {
    const test = new Analyse();
    test.analyse('The quick brown fox jumps over the lazy dog.');
    test.updateList();
    test.analyse('The bees decided to have a mutiny against their queen.');
    test.updateList();
    test.analyse('The fox in the tophat whispered into the ear of the rabbit.');
    test.updateList();
    const outcome = test.analyse('Going from child, to childish, to childlike is only a matter of time.')
    assert.equal(outcome.avg, 'aboveAvg');
  });
  it("shoud indicate if the average length of the words in a sentence is below the average length of words in the previous sentences.", () => {
    const test = new Analyse();
    test.analyse('The quick brown fox jumps over the lazy dog.');
    test.updateList();
    test.analyse('The bees decided to have a mutiny against their queen.');
    test.updateList();
    test.analyse('The fox in the tophat whispered into the ear of the rabbit.');
    test.updateList();
    test.analyse('I am happy to take your donation; any amount will be greatly appreciated.')
    test.updateList();
    test.analyse('Going from child, to childish, to childlike is only a matter of time.')
    test.updateList();
    const outcome = test.analyse('Let me help you with your baggage.')
    assert.equal(outcome.avg, 'belowAvg');
  });
});
