import Item from "./Item.mjs";

export default class Dashboard {
    
    constructor() {
        this.items = [];
    }

    add(data) {
        this.items.push(new Item(data));
    }

    remove(item) {
        
    }

    sort(type) {}

    filter(attr) {}
}