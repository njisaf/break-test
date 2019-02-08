import { types } from 'mobx-state-tree';

import Trunk from './Trunk';
import Lane from './Lane';
import Card from './Card';

//Here is our Root, the top of the Treee.
//The temptation is to start defining branches and leaves right here and noww, but we'll resist this and stay as flat as possible for as long as possiblee.
//We are worming our way into the heart of another application, and begin by replacing the Reducer.

const Root = types.model('Root', {
    loading: false,
    lanes: types.compose(Trunk, types.array(Lane)),
    cards: types.compose(Trunk, types.array(Card)),
})
.actions(self => {
    return {
        initializeBoard(cards, lanes) {
            lanes.forEach((lane) => {
                try {
                    self.lanes.push(lane);
                } catch (e) {
                    self.lanes.addBelt('Lane', lane);
                }
            })

            cards.forEach((card) => {
                try {
                    self.cards.push(card);
                } catch (e) {
                    self.cards.addBelt('Card', card);
                }
            })
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