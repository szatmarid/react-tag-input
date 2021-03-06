"use strict";

var React = require('react');

// determines the min query length for which
// suggestions are displayed
var MIN_QUERY_LENGTH = 2;

var Suggestions = React.createClass({
    displayName: "Suggestions",

    propTypes: {
        query: React.PropTypes.string.isRequired,
        selectedIndex: React.PropTypes.number.isRequired,
        suggestions: React.PropTypes.array.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        handleHover: React.PropTypes.func.isRequired
    },
    markIt: function markIt(input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
            __html: input.replace(r, "<mark>$&</mark>")
        };
    },
    render: function render() {
        var props = this.props;
        var suggestions = this.props.suggestions.map((function (item, i) {
            return React.createElement(
                "li",
                { key: i,
                    onClick: props.handleClick.bind(null, i),
                    onMouseOver: props.handleHover.bind(null, i),
                    className: i == props.selectedIndex ? "active" : "" },
                React.createElement("span", { dangerouslySetInnerHTML: this.markIt(item, props.query) })
            );
        }).bind(this));

        if (suggestions.length === 0 || props.query.length < MIN_QUERY_LENGTH) {
            return React.createElement(
                "div",
                { className: "ReactTags__suggestions" },
                " "
            );
        }

        return React.createElement(
            "div",
            { className: "ReactTags__suggestions" },
            React.createElement(
                "ul",
                null,
                " ",
                suggestions,
                " "
            )
        );
    }
});

module.exports = Suggestions;