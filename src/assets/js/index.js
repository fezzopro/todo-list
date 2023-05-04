import _ from 'lodash';
import '../css/app.css';

function component() {
  const div = document.createElement('h1');

  // Lodash, now imported by this script
  div.innerHTML = _.join(['Hello', 'webpack'], ' ');
  div.classList.add('hello');

  return div;
}

document.body.appendChild(component());
