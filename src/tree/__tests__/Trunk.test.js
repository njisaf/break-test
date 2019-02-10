import {
    getSnapshot,
    onSnapshot,
    types
} from 'mobx-state-tree';
import Trunk from '../Trunk';
import MapUtils from '../utils/MapUtils';

describe('Trunk', () => {
    let states = [];

    const TestModel = types.compose(Trunk, MapUtils, types.model({
        identity: types.string,
        alive: true,
    }).actions(self => ({
        kill() {
            self.alive = false;
            self.failure('Test is alive?', self.alive);
        }
    })))

    const testModel = TestModel.create({
        identity: 'testOne'
    });
  
    onSnapshot(testModel, snapshot => {
        states.push(snapshot)
    })


    it('testModel.alive can toggle to false', () => {
        console.log('testModel', getSnapshot(testModel))
        expect(testModel.alive).toBe(true);
        testModel.kill();
        expect(testModel.alive).toBe(false);
    })

    it('has the dead model added to the failures map on Trunk', () => {
        expect(testModel.failures.size).toBe(1);
        expect(testModel.failures.get('Test is alive?')).toBe(false);
    })

    it('matches snapshot', () => {
        expect(states).toMatchSnapshot();
    })
})