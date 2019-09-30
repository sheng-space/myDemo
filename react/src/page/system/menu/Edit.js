import { Component} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Form, Input, InputNumber, Table, Row, Col, Divider, Tree, Icon, Spin, Button, Tooltip } from 'antd';


@connect(({loading}) => ({
  loading: loading.effects['menu/get'],
}))
class Edit extends Component{
  state = {
    data:{}
  }

  componentDidMount() {
    
  }
  //保存信息
  saveInfo = () =>{

  }
  //返回上一页
  rollback = () =>{
    router.goBack();
  }
  render (){
    const {loading} = this.props;
    const {data} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <Card 
        hoverable
        loading={loading}
        title={data.id?"修改"+data.name+"菜单":"新增"+data.name+"菜单"}
        extra={[
          <div className={"card-button-group"}>
            <Tooltip title={"保存信息"} className={"button-option"}>
              <Button type={"primary"} icon={"save"} onClick={this.saveInfo}>保存</Button>
            </Tooltip>   
            <Tooltip title={"返回上一页"} className={"button-option"}>
              <Button type={"primary"} icon={"rollback"} onClick={this.rollback}>返回</Button>
            </Tooltip>                 
          </div> 
        ]}
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="菜单图标"
            hasFeedback
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="请输入菜单图标" id="error" />
          </Form.Item>   
          <Form.Item label="菜单名称" hasFeedback validateStatus="success">
            <Input placeholder="请输入菜单名称"  />
          </Form.Item>
          <Form.Item label="菜单标识" hasFeedback validateStatus="success">
            <Input placeholder="请输入菜单标识"  />
          </Form.Item>
          <Form.Item label="菜单URL" hasFeedback validateStatus="success">
            <Input placeholder="请输入菜单URL"  />
          </Form.Item>
          <Form.Item label="菜单排序" hasFeedback validateStatus="success">
            <InputNumber style={{width:"100%"}} placeholder="请输入菜单排序"  />
          </Form.Item>
        </Form>
      </Card>
    )
  }

}

export default Edit;