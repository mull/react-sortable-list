var Reflux = require('reflux');


var _items = [
    {id: 1, name: "React"},
    {id: 2, name: "Reflux"},
    {id: 3, name: "Flux"},
    {id: 4, name: "HTML 5"},
    {id: 5, name: "Drag 'n drop"}
];


var Store = Reflux.createStore({
    getItems: function() {
        return _items;
    }
});

module.exports = Store;