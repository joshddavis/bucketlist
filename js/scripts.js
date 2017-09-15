//defining global variable for the form and initializing the shopping list array
const form = document.getElementById('form');

var shoppingList = [
  {dept: 'Dairy', items: []},
  {dept: 'Deli', items: []}, 
  {dept: 'Condiments', items: []},
  {dept: 'Cereals', items: []},
  {dept: 'Health', items: []},
  {dept: 'Meat', items: []},
  {dept: 'Baby', items: []},
  {dept: 'Cleaning', items: []},
  {dept: 'Bread', items: []},
  {dept: 'Frozen', items: []},
  {dept: 'Produce', items: []},
];

//function to build list of items using DOM node functions
function buildList () {
  var list = document.getElementById('list');
  list.innerHTML = '';
 
  shoppingList.forEach(function (element) {
    if (element.items.length > 0) {

    var department = document.createElement('li');
    var deptText = document.createTextNode(element.dept);
    var itemsUL = document.createElement('ul');
    department.appendChild(deptText);
    department.setAttribute('class', 'dept');
    list.append(department);
    list.append(itemsUL);
    
    element.items.forEach(function (e) {
      var item = document.createElement('li');
      var itemText = document.createTextNode(e);
      item.appendChild(itemText);
      item.setAttribute('class', 'item');
      itemsUL.append(item);
    });
};
  });
}

//function to HTML encode user input
function encodeItem(x) {
	return x.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

//start by hiding the list element then focus on input field
document.getElementById('list').style.display = 'none';
document.getElementById('item').focus();

//populate array with entered item then write list to page
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var item = encodeItem(document.getElementById('item').value);
  var department = document.getElementById('department').value;
  var position = shoppingList.findIndex(i => i.dept.toLowerCase() === department.toLowerCase());
  shoppingList[position].items.push(item);                    
  buildList ();
  document.querySelector('.dept').style.cssText = 'border-radius: 5px 5px 0 0; margin-top: 10px;';
  document.getElementById('list').style.display = 'block';
  document.getElementById('item').value = '';
  document.getElementById('item').focus();
});

//sets focus back on the item field after changing department
document.getElementById('department').addEventListener('change', function() {
	document.getElementById('item').value = '';
	document.getElementById('item').focus();
});

//removes a list item when clicked
document.getElementById('list').addEventListener('click', function(e) {
	var parent = e.target.parentNode;
	var depart = parent.previousSibling;
	var itemToDelete = '<li class="item">' + encodeItem(e.target.innerText) + '</li>';
	for (i=0; i < shoppingList.length; i++) {
		if ( depart.innerText == shoppingList[i].dept ) {
				shoppingList[i].items = shoppingList[i].items.replace(itemToDelete, '');
		}
	}
	parent.removeChild(e.target);
});