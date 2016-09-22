var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <Bio />
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
				<p>My name is Rostyslav. Im web developer. I live and work in Ukraine. <br/> <br/>
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

ReactDOM.render(<App />, document.getElementById('app'))
