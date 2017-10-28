//defining global variable for the form and initializing the shopping list array
const form = document.getElementById('form');

var shoppingList = [
  {dept: 'Dairy', items: []},
  {dept: 'Deli', items: []}, 
  {dept: 'Condiments', items: []},
  {dept: 'Cereals', items: []},
  {dept: 'Spices & Baking', items: []},
  {dept: 'Health', items: []},
  {dept: 'Meat', items: []},
  {dept: 'Baby', items: []},
  {dept: 'Cleaning', items: []},
  {dept: 'Bread', items: []},
  {dept: 'Frozen', items: []},
  {dept: 'Produce', items: []},
];

//function to populate local storage with shopping list
function updateStorage() {
  shoppingList.forEach(function (element) {
    if (element.items.length > 0) {
      window.localStorage.setItem(element.dept, JSON.stringify(element.items));
    }
  });
}

//function to populate shopping list with local storage
function getStorage() {
  for (var i=0; i < window.localStorage.length; i++) {
    shoppingList.forEach(function (element) {
      if (element.dept === window.localStorage.key(i)) {
        var key = window.localStorage.key(i);
        element.items = JSON.parse(window.localStorage.getItem(key));
      }
    });
  }  
  console.log(shoppingList);
}

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
	return x.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").trim();
}

//function for initial page load
function initialLoad() {
  document.getElementById('list').style.display = 'none';
  getStorage();
  buildList();
  if ( document.getElementById('list').innerText.trim() === '' ) {
    document.getElementById('list').style.display = 'none';
  } else { 
    document.querySelector('.dept').style.cssText = 'border-radius: 5px 5px 0 0; margin-top: 10px;';
    document.getElementById('list').style.display = 'block';
    document.getElementById('item').value = '';
    document.getElementById('item').focus();
  }
}

//starting script off with initialLoad function
initialLoad();

//event to populate array with entered item then write list to page
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var item = encodeItem(document.getElementById('item').value);
  var department = document.getElementById('department').value;
  var position = shoppingList.findIndex(i => i.dept.toLowerCase() === department.toLowerCase());
  shoppingList[position].items.push(item);                    
  buildList();
  updateStorage();
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
	var itemToDelete = encodeItem(e.target.innerText);
	var storageKey = depart.innerText;
	var storageItems = window.localStorage.getItem(storageKey);
	for (var i=0; i < shoppingList.length; i++) {
		if ( depart.innerText == shoppingList[i].dept ) {
				var deletePos = shoppingList[i].items.findIndex(x => x.items === itemToDelete);
				shoppingList[i].items.splice(deletePos, 1);
				window.localStorage.setItem(storageKey, storageItems.replace(',"' + itemToDelete + '"', '').replace('"' + itemToDelete + '",', '').replace('"' + itemToDelete + '"', ''));
		}
	}
	parent.removeChild(e.target);
});