function Model(data) {
	var self = this;
	self.data = data;

	self.addItem = function(item) {
		if (item.length === 0) {
			return;
		};
		self.data.push(item);
		return self.data;
	};

	self.removeItem = function(item) {
		var index = self.data.indexOf(item);

		if (index === -1) {
			return;
		};
		self.data.splice(index, 1);
		return self.data;
	};

	self.renameItem = function(item, index) {

		self.data[index] = item;

		return self.data;
	};

};


function View(model) {
	var self = this;

	function init() {
		var wrapper = tmpl($('#wrapper-template').html());

		$('.container').append(wrapper);

		self.elements = {
			input: $('.controlls__item-value'),
			addBtn: $('.controlls__item-add'),
			listContainer: $('.todo-list'),
			inputItem: $('.todo-list__input')
		};

		self.renderList(model.data);

	};

	self.renderList = function(data) {
		var list = tmpl($('#list-template').html(), {
			data: data
		});
		
		self.elements.listContainer.html(list)
	};

	init();

};


function Controller(model, view) {
	var self = this;
	
	view.elements.addBtn.on('click', addItem);
	
	view.elements.input.on('keypress', function(e) {
		if (e.which == 13) {
			var newItem = view.elements.input.val();
			model.addItem(newItem);
			view.renderList(model.data);
			view.elements.input.val('');
		}
	});

	view.elements.listContainer.on('click', '.todo-list__item-delete', removeItem);
	
	view.elements.listContainer.on('dblclick', '.todo-list__input', function() {
		$(this).addClass('active').removeAttr('disabled');
		$(this).one('focusout', renameItem);
		$(this).on('keypress', function(e) {

			if (e.which == 13) {
				var item = $(this).val();
				var index = $(this).parent().index();
				
				model.renameItem(item, index);
				$(this).removeClass('active');
				view.renderList(model.data);
			};
		});
	});

	$('body').on('click', function() {
		$('.todo-list__input').removeClass('active').attr({
			'disabled': true
		});

	});

	function addItem() {
		var newItem = view.elements.input.val();

		model.addItem(newItem);
		view.renderList(model.data);
		view.elements.input.val('');
	};

	function removeItem() {
		var item = $(this).attr('data-value');

		model.removeItem(item);
		view.renderList(model.data);
	};

	function renameItem() {
		var item = $(this).val();
		var index = $(this).parent().index();

		model.renameItem(item, index);
		view.renderList(model.data);
	};
};

$(function() {
	var firstToDoList = ['JavaScript', 'HTML', 'CSS', 'jQuery'];
	var model = new Model(firstToDoList);
	var view = new View(model);
	var controller = new Controller(model, view);

});