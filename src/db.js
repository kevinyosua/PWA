const { Store, set, get, keys, del } = require("idb-keyval");
const teamStore = new Store('goool', 'team-store')

export default class db {
    static add(key, val) {
        return set(key, val, teamStore)
    }

    static getById(key) {
       return  get(key, teamStore)
    }

    static getAll() {
        return keys(teamStore)
            .then(keys => Promise.all(keys.map(key => this.getById(key))))
    }

    static deleteById(key) {
        return del(key, teamStore)
    }
}