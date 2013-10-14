window.HeaderView = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    events: {
    },

    select: function(menuItem) {
        $('.nav li a').removeClass('active');
        $('.' + menuItem + ' a').addClass('active');
    }

});