import {
    types
} from 'mobx-state-tree';

import Lane from './Lane';

const LaneStore = types.model({
    map: types.map(Lane),
})

export default LaneStore;