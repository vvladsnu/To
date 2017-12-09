
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

  var li = function(str) {
    
    if(str.done){
      return `<li class="checked" slot="${str.id}">${str.target}<span class="close" onclick="rm_rf(this)">×</span></li>`;
    }else{
      return `<li slot="${str.id}">${str.target}<span id="close" class="close" onclick="rm_rf(this)">×</span></li>`;
    }
  };
  
function getUsers() {
  sendData('result', 'GET', {}, users => {
    let rows = '';
    $.each(result, (index, result) => {
      rows += row(Object.assign(result))
    });
    $('table tbody').append(rows);
  });
}

function defence() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
      alert("Вы ничего не ввели");
    } else {
        $('#myInput').submit();
    
    }
    document.getElementById("myInput").value = "";
}

$('#myInput').on('submit', function(e){
    e.preventDefault();
    let target = this.value;
    let done = false;
    sendData('result', 'POST', JSON.stringify({target, done}), result => {
        $('#myUL').append(li(Object.assign(result)));
    });
});

var list = document.querySelector('ul');
list.addEventListener('click',function(ev){
    if(ev.target.tagName === "LI"){
        ev.target.classList.toggle('checked');
        var id = ev.target.slot;
        var done;
        var target = ev.target.textContent;
        if(ev.target.className === 'checked'){
            done = true;
        }else{
            done = false;
        }
        sendData('result'+id, 'PUT', JSON.stringify({target, done}), result => {});
    }
}, false);

function rm_rf(e){
    var div = e.parentElement;
    var id = div.slot;
    sendData('resulr/'+id, 'DELETE', {}, result => {
        div.remove();
    }); 
}

getUsers();