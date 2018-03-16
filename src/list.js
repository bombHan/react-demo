import React, { Component } from 'react';
import './list.css'
import {Link} from 'react-router'
import ListAdd from './components/list'
import { Modal, Button ,Input } from 'antd';

const Search = Input.Search;

class List extends Component {
    constructor(props){
        super(props)
        this.state={
            list:[{id:0,item:'列表任务一',check:false},{id:1,item:'列表任务二',check:false}], //列表信息
            finish:0,  //完成的数量显示
            searchList:[], //搜索之后得出的结果列表
            loading: false, //antd插件的加载符号判断参数
            visible: false,  //点击编辑出现弹窗的显示与隐藏得控制
            item:{}, //点击编辑时选中的那个任务项信息
            index:0, //点击编辑时选中的是第几个任务项
            changeTxt:'', //编辑弹窗中输入改变的内容
        }
    }
    showModal = (item,index) => { //任务修改弹框出现
        //console.log(item)
        this.setState({
          visible: true,
          item:item,
          index:index
        });
      }
    handleOk = () => { //点击完成后修改任务内容
        this.setState({ loading: true });
        setTimeout(() => {
            //console.log(this.state.changeTxt)
            this.state.list[this.state.index].item=this.state.changeTxt
            this.setState({ loading: false, visible: false, changeTxt:'' });
        }, 100);
    }
    handleCancel = () => {  //任务修改框点击取消隐藏
        this.setState({ visible: false });
    }
    onChangeTxt = (e) => { //实时更改任务修改弹框中更改任务内容的input的内容
        this.setState({ changeTxt: e.target.value });
    }
    finish(e){  //完成该项任务内容操作
        const target= e.target || e.srcElement
        //console.log(this.state.list[target.parentNode.getAttribute('index')])
        let item=this.state.list[target.parentNode.getAttribute('index')]
        //console.log(target.parentNode.children[0])
        if(item.check){
            item.check=false   
            this.setState({
                finish:this.state.finish-1,
                list:this.state.list
            })
        }else{
            item.check=true       
            this.setState({
				finish:this.state.finish+1,
                list:this.state.list
			})
        }
    }
    delete(i){ //删除该项任务内容操作
        //console.log(index)
        const that=this
        this.state.list=this.state.list.filter(function(item,index){
            if(i===index){
                if(item.check){
                    that.state.finish--
                }
                return false
            }else{
                return true
            }
        })
        //console.log(this.state.list)
        this.setState({
            list:this.state.list,
            finish:this.state.finish
        })
    }
    change(list){  //增加组件中需要用到的增加列表内容的函数
        //console.log(list)
        this.setState({
            list:list,
            searchList:[]
        })
    }
    search(){  //搜索功能
        if(this.refs.txt.value===''){
            alert('请输入内容再搜索')
        }else{
            //console.log(this.refs.txt.value)
            let that=this
            this.state.searchList=this.state.list.filter(function(item,index){
                //console.log(item)
                let arr=item.item.split('')
                let flag=false
                let targetArr=that.refs.txt.value.trim().split('')
                for(let i=0;i<arr.length;i++){
                    for(let j=0;j<targetArr.length;j++){
                        if(arr[i]===targetArr[j]){
                            flag=true
                        }
                    }
                }
                return flag
            })
        }
        this.setState({
            searchList:this.state.searchList
        })
        if(this.state.searchList.length===0){
            alert('无搜索结果！')
        }
        //console.log(this.state.searchList)

    }
    reset(){ //重置搜索功能
        this.setState({
            searchList:[]
        }) 
        this.refs.txt.value=''
    }
    componentDidMount(){
        const that=this
        this.refs.txt.onkeydown=function(ev){ //当focus搜索框时按enter键直接触发搜索功能
            if(ev.keyCode===13){
                that.search()
            }
        }
        
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <div>
                <h1>Demo2:TodoList</h1>
                
                <div className="box">
                    <p className='box-title'>TodoList</p>
                    <div className="list-box">  
                        <ul>  
                        {this.state.searchList.length>0 ? this.state.searchList.map((item,index)=>{
                            return(
                                <li className={item.check?'checked':''} index={index} key={index}><input type="checkBox" onClick={this.finish.bind(this)} checked={item.check}/><div className='content' onClick={this.finish.bind(this)} >{item.id}.{item.item}</div><Button type="primary" onClick={this.showModal.bind(this,item,index)}>编辑</Button><div className="delet" onClick={this.delete.bind(this,index)}>删除</div></li>
                            )
                        }) : this.state.list.map((item,index)=>{
                            return(
                                <li className={item.check?'checked':''} index={index} key={index}><input type="checkBox" onClick={this.finish.bind(this)} checked={item.check}/><div className='content' onClick={this.finish.bind(this)} >{item.id}.{item.item}</div><Button type="primary" onClick={this.showModal.bind(this,item,index)}>编辑</Button><div className="delet" onClick={this.delete.bind(this,index)}>删除</div></li>
                            )
                        })}
                        </ul>
                        <Modal  
                                visible={visible}
                                title="任务内容修改"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                    完成
                                    </Button>,
                                ]}
                                >
                                <div>
                                    <p>原本任务内容为：{this.state.item.item}</p>
                                    <Search placeholder="任务内容修改" onChange={this.onChangeTxt} value={this.state.changeTxt} onSearch={this.handleOk}/>
                                </div>
                                </Modal>
                    </div>
                    <p className='num'>已完成{this.state.finish}项/一共{this.state.list.length}项</p>
                    <ListAdd list={this.state.list} change={this.change.bind(this)} />           
                    <div className="search-box">
                        <input type="text" className='search-txt'ref='txt' placeholder='请输入需要搜索的内容，敲击enter搜索'/>
                        <div className='search-btn' onClick={this.search.bind(this)}>搜索</div>
                        <div className='search-reset' onClick={this.reset.bind(this)}>重置</div>
                    </div>

                </div>
                <Link to='/'>去往Demo1</Link>
            </div>
        );
    }
}

export default List;
