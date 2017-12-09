function sendData(url, method, data, cb) {
  $.ajax({
    url: url,
    method: method,
    data: data,
    contentType: 'application/json',
    success: function(data) {
      cb(data);
    }
  });
}

// сброс значений формы
$('#myReset').on('click', e => {
  e.preventDefault();
  reset();
});

// сброс формы
function reset() {
  var form = document.forms['userForm'];
  form.elements['id'].value = 0;
  form.reset();
}

// создание строки для таблицы
var li = function(str) {
  if(_or.done){
    return `<li class="checked">${str.terget}<span class="close">x</span></li>`;
  }else{
    return `<li>${str.terget}<span class="close">x</span></li>`;
  }
};

module.exports = function getUsers() {
  sendData('result', 'GET', {}, users => {
    let rows = '';
    $.each(result, (index, result) => {
      rows += row(Object.assign(result))
    });
    $('table tbody').append(rows);
  });
}

function getUser(id) {
  sendData('/api/users/' + id, 'GET', {}, user => {
    let form = document.forms['userForm'];
    form.elements['id'].value = user.id;
    form.elements['name'].value = user.name;
    form.elements['age'].value = user.age;
  })
}

function createUser(user) {
  sendData('result', 'POST', JSON.stringify(user), user => {
    reset();
    $('table tbody').append(row(user));
  })
}

function editUser(id, user) {
  sendData('/api/users/' + id, 'PUT', JSON.stringify(user), user => {
    reset();
    $('tr[data-rowid="' + user.id + '"]').replaceWith(row(user));
  })
}

function deleteUser(id) {
  sendData('/api/users/' + id, 'DELETE', {}, user => {
    $('tr[data-rowid="' + user.id + '"]').remove();
  })
}

$('form').on('submit', function(e) {
  e.preventDefault();
  let id = +this.elements['id'].value;
  let name = this.elements['name'].value;
  let age = this.elements['age'].value;

  if (id === 0) {
    createUser({name, age});
  } else {
    editUser(id, {name, age});
  }
});

$('table tbody').on('click', '.removeLink', function() {
  let id = $(this).data('id');
  deleteUser(id);
})

$('table tbody').on('click', '.editLink', function() {
  let id = $(this).data('id');
  getUser(id);
})

getUsers();