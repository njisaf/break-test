import {
    types
} from 'mobx-state-tree';

import Lane from './Lane';

const LaneStore = types.model('LaneStore', {
    map: types.optional(types.map(Lane), {}),
})

export default LaneStore;