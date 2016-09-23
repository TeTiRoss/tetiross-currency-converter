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

var Header = React.createClass({
  render: function () {
    return (
      <div className='col-md-8 col-md-offset-2'>
				<h1 id='header_txt'>TeTiRoss</h1>
				<a id="git_logo" className="social_icons" target='blank' href="https://github.com/TeTiRoss"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
				<a id="facebook_logo" className="social_icons" target='blank' href="https://www.facebook.com/rostyk.semanyshyn"><i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a>
        <a id="linkedin_logo" className="social_icons" target='blank' href="https://www.linkedin.com/in/rostyk-semanyshyn-04528a116"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
        <hr id="header_hr" />
			</div>
    );
  }
})

var Bio = React.createClass({
  render: function () {
    return (
      <div className='col-md-8 col-md-offset-2'>
				<h1>Bio</h1>
				<p>My name is Rostyslav. I&#39;m web developer. I live and work in Ukraine. <br/> <br/>
					<b>Skills:</b>
					<ul>
						<li>Ruby</li>
					 	<li>Ruby on Rails</li>
						<li>HTML</li>
						<li>CSS</li>
						<li>JavaScript</li>
						<li>jQuery</li>
						<li>Ajax</li>
						<li>ReactJS</li>
					</ul>
				</p>
      </div>
    );
  }
})

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
    var list_items = this.state.list_items.map(function(item) {
      return <ListItem text={item} />
    });

    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <p>Simple form built on ReactJS that allows you to add items to the list.</p>

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

var ListItem = React.createClass({
  render: function() {
    return (
      <li>{this.props.text}</li>
    );
  }
});

var ListItemForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },

  handleTextChange: function(e) {
    var new_value = e.target.value;
    this.setState({text: new_value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var text = this.state.text;

    this.setState({text: ''});
    this.props.onFormSubmit(text);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}
       className='form-inline'>
        <div className="input-group">
          <input type='text' value={this.state.text}
           onChange={this.handleTextChange} className='form-control input-sm'/>
          <span className="input-group-btn">
            <button className='btn btn-sm btn-info'>Add to list</button>
          </span>
        </div>
      </form>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'))
