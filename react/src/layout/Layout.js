import { Component } from 'react';
import { connect } from 'dva';
import {Layout, Affix, Button} from 'antd';
import SettingDrawer from "@/component/SettingDrawer";
import GlobalHeader from "@/component/GlobalHeader";
import SiderMenu from "@/component/SiderMenu";
import logo from '@/assets/logo.svg';
const { Content, Header } = Layout;
@connect(({layout,setting}) => ({
  layout,
  setting
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme:"dark",
      mode:"inline",
      mobile:false,
      collapsed: false,
      modalVisible:false
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;  
    this.getSetting(dispatch);
    this.getMenuList(dispatch);
    this.getUser(dispatch);
  }
  /**
   * 获取设置
   */
  getSetting=(dispatch)=>{
    dispatch({
      type: 'setting/getSetting',
    });
  }
  /**
   * 获取用户
   */
  getUser = (dispatch) => { 
    const userId =  localStorage.getItem('userId');
    const fparams = {url:"/api/system/user/get",id:userId};
    dispatch({
      type: 'layout/getUser',
      payload: fparams
    });
  }
  /**
   * 获取菜单
   */
  getMenuList = (dispatch) => {
    const fparams = {url:"/api/system/menu/getTree"};
    dispatch({
      type: 'layout/getMenuList',
      payload: fparams
    });
  }
  /**
   * 菜单展开格式
   */
  handleMenuMode = () => {
    this.setState({mode: this.state.mode==="inline"?"vertical":"inline"});
  };
  /**
   * 菜单主题
   */
  handleMenuTheme = () => {
    this.setState({theme: this.state.theme==="dark"?"light":"dark"});
  };
   /**
   * 菜单收缩样式
   */
  handleMenuMobile = () => {
    this.setState({mobile: !this.state.mobile});
  };
  /**
   * 展开/关闭菜单
   */
  handleMenuCollapse = () => {
    this.setState({collapsed: !this.state.collapsed});
  };
   /**
   * 打开抽屉设置主题样式
   */
  handleMenuModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  render() {
    const { children, location, layout:{menuList,user}} = this.props;
    const { collapsed,theme,mode,mobile,modalVisible} = this.state;
    return (
      <Layout>
        <SiderMenu
          logo={logo}       
          menuData={menuList}
          location={location}         
          mode={mode}
          theme={theme}
          mobile={mobile} 
          collapsed={collapsed}      
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: user.name||'A',
                avatar: user.imgUrl,
                userid: user.id,
                notifyCount: 0,
              }}
              onCollapse={this.handleMenuCollapse}
            />           
          </Header>     
          <Content style={{ margin: '10px 5px 0', height: '100%' }}>                
            { children }
          </Content>        
        </Layout>    
        <Affix offsetTop={100} offsetBottom={100} style={{position: 'absolute', bottom: 100, right: 100 }}>
            <Button icon={modalVisible?"close-circle":"setting"} type="primary" onClick={this.handleMenuModalVisible} />
        </Affix>   
        <SettingDrawer
          mode={mode}
          theme={theme}
          mobile={mobile}          
          modalVisible={modalVisible}                       
          onMode={this.handleMenuMode}
          onMobile={this.handleMobile}  
          onTheme={this.handleMenuTheme}
          onModalVisible={this.handleMenuModalVisible}    
          {...this.props}  
        />      
      </Layout>
    );
  }
}

export default Index;
