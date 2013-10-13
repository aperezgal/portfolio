window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "works": "works",
        "about": "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });

        this.footerView = new FooterView();
        $('.footer').html(this.footerView.render().el);
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');
    },

    works: function () {
        if (!this.worksView) {
            this.worksView = new WorksView();
            this.worksView.render();
        }

        $('#content').html(this.worksView.el);
        this.headerView.select('works-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
            this.aboutView.render();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.select('about-menu');
    }

});

templateLoader.load(["HomeView", "HeaderView", "FooterView", "WorksView", "AboutView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });



