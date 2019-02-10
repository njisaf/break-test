import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import Root from '../Root';

import Cards from '../__mocks__/cards.mock.json';
import Lanes from '../__mocks__/lanes.mock.json';

describe('Root', () => {
    it('can toggle .loading to true and false', () => {
        const item = Root.create();
        const states = [];
        onSnapshot(item, snapshot => {
            states.push(snapshot)
        })
        
        expect(item.loading).toBe(false);

        item.setLoading(true);
        expect(item.loading).toBe(true);
        expect(item.isLoading).toBe(true);

        expect(getSnapshot(item)).toMatchSnapshot();
        expect(states).toMatchSnapshot();
    })

    it('receives an array of lanes with attached cards, and adds both cards and lanes to the board', () => {
        const item = Root.create();
        const states = [];
        onSnapshot(item, snapshot => {
            states.push(snapshot)
        })

        expect(item.laneStore.size).toBe(0);
        item.initializeBoard(Cards, Lanes);

        expect(item.laneStore.size).toBeGreaterThan(0);

        expect(states).toMatchSnapshot();
    })
})