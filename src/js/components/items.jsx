var React = require('react'),
    Reflux = require('reflux'),
    ItemsStore = require('../stores/items');

var Items = React.createClass({
    getInitialState: function() {
        return {
            items: ItemsStore.getItems()
        }
    },

    componentDidMount: function() {
        this.bindDrag();
    },


    
    bindDrag: function() {
        var self = this;
        var el = this.getDOMNode();
        var draggables = el.querySelectorAll('[draggable]'),
            dragSrcEl;
        

        var handleDragStart = function (e) {
            // index in DOM, but should also be our index in the array
            var index = Array.prototype.indexOf.call(this.parentNode.children, this);
            
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('item_index', index);
            e.dataTransfer.setData('src_el', this);
        }

        var handleDragOver = function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }

        var handleDragEnter = function(e) {
            this.classList.add('over');
        }

        var handleDragLeave = function (e) {
            this.classList.remove('over');
        }


        /**
         * Get the index of our drop target in this.state.items, and
         * switch the position of the two items. Then force DOM update.
         */
        var handleDrop = function (e) {
            var src_index = parseInt( e.dataTransfer.getData('item_index') ),
                src_el = this.parentNode.children[src_index],
                target_index = Array.prototype.indexOf.call(this.parentNode.children, this);

            // Don't do anything if we're dropping ourselves onto ourselves.
            if (src_el !== this) {
                var temp = self.state.items[src_index];
                self.state.items[src_index] = self.state.items[target_index];
                self.state.items[target_index] = temp;
                self.forceUpdate();
            }

            return false;
        }


        var handleDragEnd = function(e) {
            _.each(draggables, function (draggable) {
                draggable.classList.remove('over');
            });
        }


        _.each(draggables, function(draggable) {
            draggable.addEventListener('dragstart', handleDragStart, false);
            draggable.addEventListener('dragenter', handleDragEnter, false);
            draggable.addEventListener('dragover', handleDragOver, false);
            draggable.addEventListener('dragleave', handleDragLeave, false);
            draggable.addEventListener('drop', handleDrop, false);
            draggable.addEventListener('dragend', handleDragEnd, false);
        });
    },



    render: function() {
        var items = _.map(this.state.items, function(item) {
            return (
                <li key={item.id} draggable="true" ref="item">{item.name}</li>
            );
        });

        var raw_items = _.map(this.state.items, function(item) {
            return (
                <li key={item.id}>{JSON.stringify(item)}</li>
            )
        });

        return (
            <div>
                <h4>Drag n drop sortable list:</h4>
                <ol className="items">
                    {items}
                </ol>

                <h4>Array content:</h4>
                <ol>
                    {raw_items}
                </ol>
            </div>
        );
    }
});

module.exports = Items;