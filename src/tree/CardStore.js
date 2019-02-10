import {
    types
} from 'mobx-state-tree';

import Card from './Card';

const CardStore = types.model('CardStore', {
    map: types.optional(types.map(Card), {}),
})

export default CardStore;