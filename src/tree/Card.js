import { types } from 'mobx-state-tree';
import Lane from './Lane'

const Card = types.model({
    id: types.identifier,
    title: types.string,
    description: types.string,
    label: types.string,
    parentLane: types.reference(Lane)
})

export default Card;