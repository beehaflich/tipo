


document.addEventListener('DOMContentLoaded', function(event) {
  var types = [
    'string',
    'number',
    'array',
    'function',
    'undefined',
    'null',
    'boolean',
    'object'
  ];
  var named_function = function(foo) {return foo;};
  var tests = [
    {
      'test': '"I\'m a little teapot"',
      'name': 'Literal string'
    }, {
      'test': new String('"short and stout"'),
      'name': 'Constructed String'
    }, {
      'test': 4,
      'name': 'Literal number (non-decimal)'
    }, {
      'test': 4.8,
      'name': 'Literal number (decimal)'
    }, {
      'test': new Number('4'),
      'name': 'Constructed number (non-decimal)'
    }, {
      'test': new Number('4.8'),
      'name': 'Constructed number (decimal)'
    }, {
      'test': +'not a number',
      'name': 'Not a Number (NaN)'
    }, {
      'test': Infinity,
      'name': 'Infinity'
    }, {
      'test': [0, 1, 2, 'foo', 'bar'],
      'name': 'Literal array'
    }, {
      'test': new Array(0, 1, 2, 'foo', 'bar'),
      'name': 'Constructed array'
    }, {
      'test': function() {return true;},
      'name': 'Literal anonymous function'
    }, {
      'name': 'Constructed function',
      'test': new Function('return true;')
    }, {
      'name': 'Literal named function',
      'test': function foo() {return 'bar';}
    }, {
      'name': 'Literal function from variable',
      'test': named_function
    }, {
      'name': 'Function used as constructor',
      'test': new named_function()
    }, {
      'name': 'Literal Object',
      'test': {'foo': 'bar'}
    }, {
      'name': 'Constructed Object',
      'test': new Object()
    }, {
      'name': 'Variable undefined',
      'test': undefined
    }, {
      'name': 'Variable undefined, redefined to string**',
      'test': undefined = '"haha string"'
    }, {
      'name': 'Generated undefined',
      'test': (function() {})()
    }, {
      'name': 'Literal null',
      'test': null
    }, {
      'name': 'Literal Boolean (false)',
      'test': false
    }, {
      'name': 'Constructed Boolean (false)',
      'test': new Boolean(false)
    }, {
      'name': 'Literal Boolean (true)',
      'test': true
    }, {
      'name': 'Constructed Boolean (true)',
      'test': new Boolean(true)
    }
  ];

  // gonna just do this vanilla-style
  var tbody = document.getElementById('test-tbody');
  var i, j, test, type, tr, td, result;
  var ilen = tests.length;
  var jlen = types.length;

  for (i = 0; i < ilen; i++) {
    test = tests[i];
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerHTML = test.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = test.test;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = tipo.type(test.test);
    tr.appendChild(td);
    for (j = 0; j < jlen; j++) {
      type = types[j];
      td = document.createElement('td');
      result = tipo[type](test.test);
      td.innerHTML = result;
      td.classList.add(result ? 'green' : 'red');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  if (window.console && window.console.log) {
    console.log(' _   _         ');
    console.log('| |_|_|___ ___ ');
    console.log('|  _| | . | . |');
    console.log('|_| |_|  _|___|');
    console.log('      |_|      ');
    console.log('Welcome to the console! Here is a list of tipo functions.');
    var fxns = [];
    for (var key in tipo) {
      if (tipo.hasOwnProperty(key) && tipo.function(tipo[key])) {
        fxns.push('tipo.' + key);
      }
    }
    console.log(fxns.sort());
    console.log('Feel free to try them out here!');
  }
});

