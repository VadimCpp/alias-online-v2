import Vocabulary from './vocabulary.json';
import VocabularyTest from './vocabulary-test.json';
import * as Types from '../types'

const vocabulary: Types.Card[] = (import.meta.env.MODE === 'development') ? VocabularyTest : Vocabulary;

export default vocabulary
