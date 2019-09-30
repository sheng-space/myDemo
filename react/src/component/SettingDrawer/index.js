import React, { PureComponent } from 'react';
import { Select, Drawer, List, Switch, Divider,Tooltip } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';

const { Option } = Select;

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

class SettingDrawer extends PureComponent {

  getLayoutSetting = () => {
    const {
      setting: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
    } = this.props;
    return [
      {
        title: '内容区域宽度',
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => this.changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">定宽</Option>
            )}
            <Option value="Fluid">流式</Option>
          </Select>
        ),
      },
      {
        title: '固定 Header',
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />
        ),
      },
      {
        title: '下滑时隐藏 Header',
        disabled: !fixedHeader,
        disabledReason: '固定 Header 时可配置',
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />
        ),
      },
      {
        title: '固定侧边菜单',
        disabled: layout === 'topmenu',
        disabledReason: '侧边菜单布局时可配置',
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  changeSetting = (key, value) => {
    const { setting } = this.props;
    const nextState = { ...setting };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }
    this.setState(nextState, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'setting/changeSetting',
        payload: this.state,
      });
    });
  };

  togglerContent = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/toggleThemeModal',
    });
  };

  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  render() {
    const { setting:{navTheme, primaryColor, layout, colorWeak}, modalVisible,onModalVisible } = this.props;
    console.log(this.props);
    return (
      <Drawer
        visible={modalVisible}
        width={320}
        onClose={onModalVisible}
        placement="right"
        /* handler={
          <div className={styles.handle}>
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        } */
        onHandleClick={this.togglerContent}
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.content}>
          <Body title='整体风格设置'>
            <BlockChecbox
              list={[
                {
                  key: 'dark',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: '暗色菜单风格',
                },
                {
                  key: 'light',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: '亮色菜单风格',
                },
              ]}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title='主题色'
            value={primaryColor}
            onChange={color => this.changeSetting('primaryColor', color)}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockChecbox
              list={[
                {
                  key: 'sidemenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: '侧边菜单布局',
                },
                {
                  key: 'topmenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  title: '顶部菜单布局',
                },
              ]}
              value={layout}
              onChange={value => this.changeSetting('layout', value)}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />

          <Divider />

          <Body title='其他设置'>
            <List.Item
              actions={[
                <Switch
                  size="small"
                  checked={!!colorWeak}
                  onChange={checked => this.changeSetting('colorWeak', checked)}
                />,
              ]}
            >
              {formatMessage({ id: 'app.setting.weakmode' })}
            </List.Item>
          </Body>
          <Divider />
          {/* <CopyToClipboard
            text={JSON.stringify(omit(setting, ['colorWeak']), null, 2)}
            onCopy={() => message.success(formatMessage({ id: 'app.setting.copyinfo' }))}
          >
            <Button block icon="copy">色弱模式</Button>
          </CopyToClipboard> */}
          {/* <Alert
            type="warning"
            className={styles.productionHint}
            message={
              <div>
                {formatMessage({ id: 'app.setting.production.hint' })}{' '}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  src/defaultSettings.js
                </a>
              </div>
            }
          /> */}
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
