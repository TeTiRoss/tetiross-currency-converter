var React = require('react');
var ReactDOM = require('react-dom')

var ListItemContainer = require('./components/ListItemContainer')

var App = React.createClass({
  render: function () {
    return (
      <div>
        <ReactHeader />
        <ListItemContainer />
      </div>
    );
  }
});

var ReactHeader = React.createClass({
  render: function () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <h1>React apps</h1>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'))
