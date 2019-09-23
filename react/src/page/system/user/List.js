
import React, { Component} from 'react';
import { connect } from 'dva';
import { Card,Table, Divider, Button, Tooltip} from 'antd';

const columns = [
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
    render: text => <a>{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>修改</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
@connect(({user, loading}) => ({
  user,
  listLoading: loading.effects['user/list'],
}))
class List extends Component{
  state = {

  }
  componentDidMount() {
    this.refreshTable(); // 列表
  }
  /**
   * 刷新表格
   */
  refreshTable = () => {
    const { dispatch } = this.props;  
    const fparams = {url:"/api/system/user/list",currentPage:1,pageSize:10};
    dispatch({
      type: 'user/list',
      payload: fparams
    });
  }
  render(){
    const {user:{list}, listLoading} = this.props;
    return (
    <Card hoverable>
       <div className={"button-group"}>
          <Tooltip title={"新增用户"} className={"button-option"}>
            <Button type={"primary"} icon={"plus"}  >新增用户</Button>
          </Tooltip>                  
        </div> 
      <Table 
        loading={listLoading}
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={list} 
        bordered={true} />
    </Card>
    )
  }
}
export default List;