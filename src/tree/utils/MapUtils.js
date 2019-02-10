import { types } from 'mobx-state-tree';

const MapUtils = types.model()
.named('MapUtils')
.actions(self => {
    return {
        set(key, value) {
            try {
                self.map.set(key, value);
            } catch (e) {
                self.failure(key, value);
            }
        },
        delete(key) {
            self.map.delete(key);
        },
        clear() {
            self.map.clear()
        },
    }
})
.views(self => {
    return {
        get size() {
            return self.map.size;
        },
        get keys() {
            return self.map.keys();
        },
        get values() {
            return self.map.values();
        },
        get entries() {
            return self.map.entries();
        },
        has(key) {
            return self.map.has(key);
        },
        get(key) {
            return self.map.get(key);
        }
    }
})

export default MapUtils;