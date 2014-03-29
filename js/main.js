(function(){
	window.App = {};
	App.Models = {};
	App.Views = {};
	App.Collections = {};
	App.Helpers = {};

})();
// Model for Person
var Person = Backbone.Model.extend({
 defaults: {
    name : 'Vairamuthu',
	age : 32,
	occupation : 'worker'
	
 },
 
 validate: function(attrs) {
  if (attrs.age < 0){
    return 'Age must be positive ';
  }
  if (!attrs.name){
	return 'Name should not be Blank';
  }
 }, 
 
 
 
 
 work: function(){
    return this.get('name') + 'is working .';
 }

});


// List of people

var PeopleCollection = Backbone.Collection.extend({

model : Person

});



// Person View
var PersonView = Backbone.View.extend({
   tagName : 'li',
   className :'person-backbone',
   id : 'person',
   
   initialize: function(){   
	//console.log(this.model);
	this.render();
   },
   
   template: _.template('<%= name %> (<%= age %> ) - <%= occupation%>' ),
   
   render : function(){
	this.$el.html(this.template(this.model.toJSON()));
   }
 });

 var person = new Person;
 var personview = new PersonView({ model : person});
 
 var person2 = new Person ({ name : 'xxxx', age :30, occupation : 'tailor'});
 var personview2 = new PersonView({ model : person2});
 
 
 var peoplecollection = new PeopleCollection;
 peoplecollection.add(person);
 peoplecollection.add(person2);
 
// var Person = function(config){
// this.name = config.name;
// this.age = config.age;
// this.occupation = config.occupation;
// };

// Person.prototype.work = function(){
// return this.name+' is working';
// };

// var Quiz = function(title) {
// this.title = title;
// };