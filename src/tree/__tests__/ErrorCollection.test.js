import {
    getSnapshot,
    onSnapshot,
    types
} from 'mobx-state-tree';
import ErrorCollection from '../ErrorCollection';
import MapUtils from '../utils/MapUtils';

describe('ErrorCollection', () => {
    let states = [];

    const TestModel = types.compose(ErrorCollection, MapUtils, types.model({
        identity: types.string,
        alive: true,
    }).actions(self => ({
        kill() {
            self.alive = false;
            self.failure(self.identity, self.alive);
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

    it('has the dead model added to the failures map on ErrorCollection', () => {
        expect(testModel.failures.size).toBe(1);
        expect(testModel.failures.get('testOne')).toBe(false);
    })

    // const testModel2 = TestModel.create({
    //     identity: 'testTwo'
    // })

    // it('adds a second dead model to the same ErrorCollection instane', () => {
    //     testModel2.kill();
    //     console.log('testModel2', getSnapshot(testModel2))
    //     expect(testModel2.failures.size).toBe(2);
    // })

    it('matches snapshot', () => {
        expect(states).toMatchSnapshot();
    })
})