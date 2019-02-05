import { types } from 'mobx-state-tree';
import Card from './Card';

const Lane = types.model({
    id: types.identifier,
    title: types.string,
    label: types.string,
    cards: types.array(types.reference(Card))
})

export default Lane;