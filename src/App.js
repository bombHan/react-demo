import React, { Component } from 'react';
import './App.css';
import Head from './components/head'
import {Link} from 'react-router'


class App extends Component {
    constructor(props){
        super(props)
        this.state={
            testData:2,
            test2:1,
            arr:[{id:1,name:'han'},{id:2,name:'ma'}],
        }
    }
    change(data){
        console.log(data)
        this.setState({
            testData:data
        });
    }

    componentDidMount(){
        //console.log(window.location)
    }



render() {
        return (
            <div className="App">
                <h1>此为Demo1：组件传值，遍历等</h1>
                <Head data={this.state.testData} change={this.change.bind(this)} />
                {this.state.testData>=5?<div>上值大于3的时候显示test2的值：{this.state.test2}</div>:<div>小于3时候显示{
                    this.state.arr.map((item,index)=>{
                        return(
                            <div key={index}>
                                <p>{item.id}</p>
                                <p>{item.name}</p>
                            </div>)
                    })
                }
                </div>}
                <Link to='/list'>去往demo2：TodoList</Link>

            </div>
        );
    }
}

export default App;
