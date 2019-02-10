import { types } from 'mobx-state-tree';

const Trunk = types.model('Trunk', {
    failures: types.map(types.frozen())
})
.actions(self => {
    return {
        failure(error, value) {
            console.log('error! ', error, value);
            self.failures.set(error, value);
        }
    }
})

export default Trunk;