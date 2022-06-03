updateOutput();

document.getElementById('input').addEventListener('input', function() {
  updateOutput();
});

function updateOutput() {
  document.getElementById('output').innerHTML = '';
  var text = document.getElementById('input').value;
  var container = document.getElementById('output');
  var allLines = text.split('\n');
  for (var line = 0; line < allLines.length; line++ ){
    if (allLines[line] == '')
      continue
    var words = allLines[line].split(' ');
    for (var i = 0; i < words.length; i++ ) {
      var node = translateForDisplay(words[i]);
      if (node)
        container.appendChild(node);
    }
    var newLine = document.createElement('br');
    container.appendChild(newLine);
  }
  return container;
}

function clearField() {
    document.getElementById('input').value = '';
    document.getElementById('output').innerHTML = '';
}

function copyText() {
  var value = getActualOutput();
  if(value.length <= 0){
    Android.onErrorText('Enter text for the copy');
    return;
  }
  Android.onCopyText(value);
}

function shareText() {
  var value = getActualOutput();
  if(value.length <= 0){
      Android.onErrorText('Enter text for the sharing');
      return;
  }
  Android.onShareText(value);
}

function getActualOutput() {
  var value = '';
  var nodes = output.children;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === 'SELECT') {
      // Do this instead of .value because we want to maintain whitespace.
      value += nodes[i].options[nodes[i].selectedIndex].textContent;
    } else if (nodes[i].tagName === 'BR') {
      value += '\n';
    } else if (nodes[i].tagName != 'OPTION') {
      value += nodes[i].textContent;
    }
  }
  return value;
}