import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path);
  });
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = [];
    this.flatMenuKeys = [];
    this.state = { openKeys: [] };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {  
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({openKeys: this.getDefaultCollapsedSubMenus(nextProps)});
    }
    if(nextProps.menuData !== this.menu){
      this.menus = nextProps.menuData;
      this.flatMenuKeys = this.getFlatMenuKeys(nextProps.menuData);
      this.setState({openKeys:this.getDefaultCollapsedSubMenus(nextProps)});
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    return urlToList(pathname).map(item => {return getMeunMatcheys(this.flatMenuKeys, item)[0]; }).filter(item => item);
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };
  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return urlToList(pathname).map(itemPath => getMeunMatcheys(this.flatMenuKeys, itemPath).pop());
  };

  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  isMainMenu = key => {
    return this.menus.some(item => key && (item.key === key || item.path === key));
  };
  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
  render() {
    const { logo, collapsed, onCollapse,theme,mode} = this.props;
    const { openKeys } = this.state;
    const menuProps = collapsed?{}:{openKeys};
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length&&openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={240}
        reverseArrow={true}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        {this.menus.length>0?
          <Menu
            key="Menu"
            theme={theme}
            mode={mode}
            {...menuProps}
            onOpenChange={this.handleOpenChange}
            selectedKeys={selectedKeys}
            style={{ padding: '16px 0', width: '100%' }}
          >
          {this.getNavMenuItems(this.menus)}
          </Menu>: 
          <div className={styles.example}>
            <Spin  size="large" />
          </div>
        }
      </Sider>
    );
  }
}
