import { types } from 'mobx-state-tree';

import Trunk from './Trunk';
import MapUtils from './utils/MapUtils';

import LaneStore from './LaneStore';
import CardStore from './CardStore';

// const _laneStore = types.compose(Trunk, MapUtils, LaneStore);
// const _cardStore = types.compose(Trunk, MapUtils, CardStore);

const Root = types.model('Root', {
    loading: false,
    laneStore: types.compose('laneStore', Trunk, MapUtils, LaneStore),
    cardStore: types.compose('cardStore', Trunk, MapUtils, CardStore),
})
.actions(self => {
    return {

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
                    self.cards.set(card.id, card);
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