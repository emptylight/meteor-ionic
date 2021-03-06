Tracker.autorun(function () {
  var ionTabCurrent = Session.get('ionTab.current');

  if( ionTabCurrent ){
    localStorage.setItem('ionTab.current', ionTabCurrent);  
  }
});

Meteor.startup(function () {
  var ionTabCurrent = localStorage.getItem('ionTab.current');
  
  if( ionTabCurrent ){
    Session.set('ionTab.current', ionTabCurrent);
  }
});

Template.ionTab.events({
  'click': function (event, template) {
    if (template.data.path) {
      Session.set('ionTab.current', template.data.path);
    }

    // If the tab's content is being rendered inside of a ionNavView
    // we don't want to slide it in when switching tabs
    IonNavigation.skipTransitions = true;
  }
});

Template.ionTab.helpers({
  url: function () {
    if (this.href) {
      return this.href;
    }

    if (this.path) {
      return Router.routes[this.path].path(Template.parentData(1));
    }
  },

  isActive: function () {
    var ionTabCurrent = Session.get('ionTab.current');

    if (this.path && this.path === ionTabCurrent) {
      return 'active';
    }

    // The initial case where there is no localStorage value and
    // no session variable has been set, this attempts to set the correct tab
    // to active based on the router
    if(Router.routes[this.path].path(Template.parentData(1)) === ionTabCurrent){
      return 'active';
    }
  },

  activeIcon: function () {
    if (this.iconOn) {
      return this.iconOn;
    } else {
      return this.icon;
    }
  },

  defaultIcon: function () {
    if (this.iconOff) {
      return this.iconOff;
    } else {
      return this.icon;
    }
  }
});
