import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import Root from '../Root'

describe('Root', () => {

    const data = {
        lanes: [{
            id: 'lane1',
            title: 'Planned Tasks',
            label: '2/2',
            cards: [{
                    id: 'Card1',
                    title: 'Write Blog',
                    description: 'Can AI make memes',
                    label: '30 mins'
                },
                {
                    id: 'Card2',
                    title: 'Pay Rent',
                    description: 'Transfer via NEFT',
                    label: '5 mins',
                    metadata: {
                        sha: 'be312a1'
                    }
                }
            ]},
            {
                id: 'lane2',
                title: 'Completed',
                label: '0/0',
                cards: []
            }
        ]
    }

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

        expect(item.lanes.length).toBe(0);

        item.initializeBoard(data);

        expect(item.lanes.length).toBeGreaterThan(0);
    })
})