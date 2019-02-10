import {
    types
} from 'mobx-state-tree';

import Trunk from './Trunk';
import MapUtils from './utils/MapUtils';

import Card from './Card';

const CardStore = types.model('CardStore', {
    map: types.map(Card),
})

export default types.compose('cardStore', CardStore, Trunk, MapUtils);