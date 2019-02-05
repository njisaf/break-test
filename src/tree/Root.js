import { types } from 'mobx-state-tree';

import Lane from './Lane';
import Card from './Card';
import { type } from 'os';

//Here is our Root, the top of the Treee.
//The temptation is to start defining branches and leaves right here and noww, but we'll resist this and stay as flat as possible for as long as possiblee.
//We are worming our way into the heart of another application, and begin by replacing the Reducer.

const Root = types.model('Root', {
    loading: false,
    lanes: types.array(Lane),
    cards: type.array(Card)
})
.actions(self => {
    return {
        initializeLanes({lanes}) {
            console.log('lanes', lanes)
            self.lanes = lanes;
        },

        setLoading(boolean) {
            self.loading = boolean;
        },
    }
})
.views(self => {
    return {
        get isLoading() {
            return self.loading === true;
        },
    }
})

export default Root;