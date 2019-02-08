import { types } from 'mobx-state-tree';

const Trunk = types.model('Trunk', {
    belts: types.map(types.array(types.frozen()))
})
.actions(self => {
    return {
        addBelt(key, value) {
            self.belts.set(key, [value])
        }
    }
})

export default Trunk;