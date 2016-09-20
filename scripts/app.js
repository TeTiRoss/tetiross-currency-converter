var green = "rgb(74, 195, 130)";
var yellow = "rgb(222, 228, 105)";

var ColoringDiv = React.createClass({
  getInitialState: function () {
    return {color: green}
  },

  changeColor: function() {
    var newColor = this.state.color == green ? yellow : green;
    this.setState({color: newColor})
  },

  render: function() {
    return (
      <div style={{backgroundColor: this.state.color}} onClick={this.changeColor}>
      </div>
    )
  }
});

// Put container element id below
// ReactDOM.render(<ColoringDiv />, document.getElementById(''))
