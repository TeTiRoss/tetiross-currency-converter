var React = require('react');

var ListItemContainer = React.createClass({
  getInitialState: function() {
    return {
      list_items: ['example']
    }
  },

  handleSubmit: function(text) {
    var list_items = this.state.list_items;
    var new_list = list_items.concat([text]);
    this.setState({
      list_items: new_list,
    });
  },

  render: function() {
    var list_items = this.state.list_items.map(function(item, i) {
      return <ListItem text={item} key={i} />
    });

    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <p>
            Simple form built on ReactJS that allows you to add items to the list.
            Added content will be gone on page refresh.
          </p>

          <ListItemForm onFormSubmit={this.handleSubmit} />
          <br/>

          <ul>
            {list_items}
          </ul>
        </div>
      </div>
    );
  }
});

function ListItem(props) {
  return <li>{props.text}</li>;
};

var ListItemForm = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      empty_field: false
    }
  },

  handleTextChange: function(e) {
    var new_value = e.target.value;
    this.setState({text: new_value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var text = this.state.text.trim();

    if (!text) {
      this.setState({empty_field: true});
      return;
    } else if (this.state.empty_field == true) {
      this.setState({empty_field: false});
    }

    this.setState({text: ''});
    this.props.onFormSubmit(text);
  },

  render: function() {

    var error_msg = (
      <div className='alert alert-danger'>
        Input field can&#39;t be empty.
      </div>
    );

    return (

      <form onSubmit={this.handleSubmit}
       className='form-inline'>
       {this.state.empty_field ? error_msg : ''}
        <div className="input-group">
          <input id='list_item_input' type='text' value={this.state.text}
           onChange={this.handleTextChange} className='form-control input-sm'/>
          <span className="input-group-btn">
            <button className='btn btn-sm btn-info'>Add to list</button>
          </span>
        </div>
      </form>
    );
  }
});

module.exports = ListItemContainer;
