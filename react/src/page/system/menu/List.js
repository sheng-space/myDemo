
import { Component} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Row, Col, Divider, Tree, Icon, Spin, Button, Tooltip } from 'antd';
const { TreeNode } = Tree;

const columns = [
  {
    title: '菜单图标',
    dataIndex: 'icon',
    key: 'icon',
    render: text => <Icon type={text} />,
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '菜单标识',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '菜单URL',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '菜单排序',
    dataIndex: 'seq',
    key: 'seq',
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
@connect(({menu,loading}) => ({
  menu,
  treeLoading: loading.effects['menu/tree'],
  listLoading: loading.effects['menu/list'],
}))
class List extends Component{
  state = {

  }
  componentDidMount() {
    this.refreshTree();//树
    this.refreshTable(); // 列表
  }
  /**
   * 刷新树
   */
  refreshTree =() =>{
    const { dispatch } = this.props;     
    dispatch({
      type: 'menu/tree',
      payload: {url:"/api/system/menu/getTree"}
    });
  }

  /**
   * 刷新表格
   */
  refreshTable = (parentId) => {
    const { dispatch } = this.props;  
    const fparams = {url:"/api/system/menu/list",currentPage:1,pageSize:10};
    if(parentId){
      fparams.parentId = parentId;//父级id
    }
    dispatch({
      type: 'menu/list',
      payload: fparams
    });
  }
 /**
   * 渲染树
   */
  renderTree = (data)=> {
    return data.map((item) => {
        return (
          <TreeNode icon={<Icon type={item.icon} />} title={item.name} key={item.id}>
            {item.children?this.renderTree(item.children):null}
          </TreeNode>
        );         
    });
  }
 /**
   * 点击树
   */
  onTreeSelect = (ids) => {
    this.refreshTable(ids[0]);
  }
  /**
   * 新增菜单
   */
  insert = () =>{
    router.push('/system/menu/edit');
  }
  /**
   * 修改菜单
   */
  update = (id) =>{
    router.push({pathname: '/system/menu/edit',query: {id:id}});
  }
  render(){
    const {menu:{list, tree},treeLoading,listLoading} = this.props;
    return (
    <div>
      <Row gutter={10}>
          <Col span={6}>
            <Card 
              title={"菜单列表"} 
              hoverable
              extra={
                <div className={"tree-icon"}>
                  <Tooltip title={"刷新"}  className={'action'}>
                    <Icon type={treeLoading?"loading":"reload"} onClick={this.refreshTree} />
                  </Tooltip>                      
                </div>
              }>
              {treeLoading?
                  <div style={{textAlign: 'center'}}>
                      <Spin size="large" />
                  </div>
              :
                  <Tree                                
                    showLine 
                    defaultExpandAll                     
                    onSelect={this.onTreeSelect}
                  >
                  {this.renderTree(tree)}                  
                </Tree>
              }
             
            </Card>         
          </Col>
          <Col span={18}>
            <Card hoverable>
                <div className={"button-group"}>
                  <Tooltip title={"新增菜单"} className={"button-option"}>
                    <Button type={"primary"} icon={"plus"} onClick={this.insert}>新增菜单</Button>
                  </Tooltip>                  
                </div>                            
                <Table  loading={listLoading} 
                        rowSelection={rowSelection} 
                        columns={columns} 
                        dataSource={list} 
                        bordered={true} />
            </Card>        
          </Col>
      </Row>
    </div>
    )
  }
}
export default List;