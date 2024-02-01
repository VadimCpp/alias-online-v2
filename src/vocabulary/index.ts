import Vocabulary from './vocabulary.json';
import VocabularyTest from './vocabulary-test.json';

const vocabulary = (import.meta.env.MODE === 'development') ? VocabularyTest : Vocabulary;

export default vocabulary
