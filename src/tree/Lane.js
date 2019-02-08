import { types } from 'mobx-state-tree';
import Card from './Card';

const Lane = types.model('Lane', {
    id: types.identifier,
    title: types.string,
    label: types.string,
    cards: types.array(types.safeReference(Card))
})

export default Lane;