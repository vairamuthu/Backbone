(function(){
	window.App = {
		Models : {},
		Views : {},
		Collections : {}
		
	};
	
	
   App.Models.Task = Backbone.Model.extend({
	validate : function(attrs){
		if (!attrs.title == '') {
			return 'Please give title'
		}
	}
   
   });
   App.Collections.Tasks = Backbone.Collection.extend({model: App.Models.Task});
   
   App.Views.Tasks = Backbone.View.extend({
	tagName : 'ul',
	
	initialize : function(){
		//console.log(this.collection);
		this.collection.on('add', this.addone, this);	
	},
	
	render:function() {
		this.collection.each(this.addone, this );
		return this;
	},
	
	addone:function(task){
		var taskview = new App.Views.Task({ model : task});
		this.$el.append(taskview.render().el);
		
	}
   });
   
   App.Views.Task = Backbone.View.extend({
	tagName : 'li',
	template : _.template($('#product_template').html()),
	initialize : function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.destroy, this);
	},
	
	events : {
		'click .edit' : 'editTask',
		'click .delete' : 'deleteTask'
	},
	
	editTask : function(){
		var newTask = prompt("Please enter new title for that task : ", this.model.get('title'));
		this.model.set('title', newTask);
	},
	
	deleteTask : function(){
		this.model.destroy();
	},
	
	destroy : function() {
		this.$el.remove();
	},
	
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
   });
 
	App.Views.AddTask = Backbone.View.extend({
		el:'#addTask',
		
		events : {
			'submit' : 'submit'
		},
		
		submit : function(e){
			e.preventDefault();		
			var addTaskTitle = $(e.currentTarget).find('input[type=text]').val();			
			var task = new App.Models.Task({ title : addTaskTitle});
			this.collection.add(task);
			console.log(this.collection.toJSON());
		}
	});
 
 
 var taskcollection = new App.Collections.Tasks([
	{
		title: 'Go to Bank', 
		priority: 1
	},
	{
		title: 'Fill the challan', 
		priority: 2
	},
	{	
		title: 'withdraw the money', 
		priority: 3
	}
 
 ]);
 var addTaskview = new App.Views.AddTask({collection : taskcollection});
 var taskview = new App.Views.Tasks({collection : taskcollection});
// console.log(taskview.render().el); 
 $('.tasks').html(taskview.render().el);
 
})();
