import React, { Component } from 'react';

class Head extends Component {
    constructor(props){
        super(props)
        this.state={
            data:props.data
        }
        alert('constructor')
    }
    add(){
        let num=this.props.data
        num++
        //console.log(num)
        this.props.change(num)
    }
    componentWillMount(){
        alert('componentWillMount')
    }
    componentDidMount(){
        alert('componentDidMount')
    }
    componentWillReceiveProps(nextProps) {
        alert("componentWillReceiveProps",nextProps);
        this.setState({
            data:nextProps.data
        })
    }
    shouldComponentUpdate() {
        alert("shouldComponentUpdate");
        return true;        // 记得要返回true
    }
    componentWillUpdate(){
        alert('componentWillUpdate')
    }
    componentDidUpdate(){
        alert('componentDidUpdate')
    }
    componentWillUnmount() {
        alert("componentWillUnmount");
    }

    render() {
        alert('render')

        return (
            <div>
                {this.state.data}

                <button onClick={this.add.bind(this)}>+1</button>
            </div>
        );
    }
}

export default Head;
