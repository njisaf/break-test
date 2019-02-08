import { types } from 'mobx-state-tree';
import Lane from './Lane'

const Card = types.model('Card', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    label: types.string,
})

export default Card;