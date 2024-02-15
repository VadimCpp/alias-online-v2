import VocabularyProd from './vocabulary-prod.json';
import VocabularyTest from './vocabulary-test.json';
import * as Types from '../types'

const vocabulary: Types.Card[] = (import.meta.env.MODE === 'development') ? VocabularyTest : VocabularyProd;

export default vocabulary
