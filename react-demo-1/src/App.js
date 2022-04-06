import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {x: 1}
	}

	onClick = () => {
		this.setState({
			x: this.state.x + 1
		})
	}

render(){
	return (
		<div className="App">
			App <button onClick={this.onClick}>+1</button>
			<B name={this.state.x}/>
		</div>
	 )
  }
}

class B extends React.Component {
	UNSAFE_componentWillReceiveProps(newProps, nextContext) {
		console.log('旧的props')
		console.log(this.props)
		console.log('props变化了')
		console.log('新的props')
		console.log(newProps)
	}

	render() {
		return (
			<div>{this.props.name}</div>
		)
	}
}

export default App
