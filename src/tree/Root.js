import {
    types,
    getSnapshot
} from 'mobx-state-tree';

// import Trunk from './Trunk';
// import MapUtils from './utils/MapUtils';

import LaneStore from './LaneStore';
import CardStore from './CardStore';

// const _laneStore = types.compose(Trunk, MapUtils, LaneStore);
// const _cardStore = types.compose(Trunk, MapUtils, CardStore);

const Root = types.model('Root', {
        loading: false,
        laneStore: types.optional(LaneStore, {}),
        cardStore: types.optional(CardStore, {}),
    })
    .actions(self => {
        return {
            afterCreate() {
                // console.log('Initializing Root', getSnapshot(self))
            },

            initializeBoard(cards, lanes) {
                lanes.forEach((lane) => {
                    try {
                        self.laneStore.set(lane.id, lane);
                    } catch (e) {
                        self.laneStore.failure(e, lane);
                    }
                })

                cards.forEach((card) => {
                    try {
                        self.cardStore.set(card.id, card);
                    } catch (e) {
                        self.cardStore.failure(e, card);
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