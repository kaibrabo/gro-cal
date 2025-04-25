export default class Item {

    constructor(name, type, duration, start, flip, end) {
        this.name = name; 
        this.type = type; 
        this.duration = duration;
        this.start = start;
        this.flip = flip;
        this.end = end;
        this.id = Date.now();
    }

    update(field, value) {
        if (!(field in this)) {
            console.log("Property doesnt exist in Item class");
        }

        this[field] = value;
    }
}