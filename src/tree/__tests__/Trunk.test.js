import {
    getSnapshot,
    onSnapshot,
    types
} from 'mobx-state-tree';
import Trunk from '../Trunk';


describe('Trunk', () => {
    let trunk;
    let states = [];
    beforeAll(() => {
        //Here we reset the state before each test, and empty the states array.
        trunk = Trunk.create();
        states = [];
    })


    it('receives a type and creates a map entry for that type', () => {
        // const trunk = Trunk.create();
        // const states = [];
        onSnapshot(trunk, snapshot => {
            states.push(snapshot)
        })

        const TestModel = types.model('Test', {
            alive: true,
        }).actions(self => ({
            kill() {
                self.alive = false;
            }
        }))
        const testModel = TestModel.create();
        expect(testModel.alive).toBe(true);
        testModel.kill();

        const testSnap = getSnapshot(testModel);
        expect(testSnap.alive).toBe(false);

        expect(trunk.belts.size).toBe(0);
        trunk.addBelt('Test', testSnap);
        expect(trunk.belts.size).toBe(1);

        const testOnBelt = trunk.belts.get('Test')[0];
        expect(testOnBelt).toEqual(testSnap);

        expect(states).toMatchSnapshot();
    })
})