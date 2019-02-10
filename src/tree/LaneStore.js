import {
    types
} from 'mobx-state-tree';

import Trunk from './Trunk';
import MapUtils from './utils/MapUtils';

import Lane from './Lane';

const LaneStore = types.model({
    map: types.map(Lane),
})

export default types.compose('laneStore', LaneStore, Trunk, MapUtils);