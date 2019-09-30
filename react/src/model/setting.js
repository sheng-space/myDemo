const STORAGE_SETTING_NAME = 'setting';
let lessNodesAppended;
const updateTheme = primaryColor => {
  if (!primaryColor) {
    return;
  }
  function buildIt() {
    if (!window.less) {
      return;
    }
    window.less.modifyVars({
      '@primary-color': primaryColor,
    }).then(() => {

    }).catch(() => {

    });
  }
  if (!lessNodesAppended) {
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

const updateColorWeak = colorWeak => {
  document.body.className = colorWeak ? 'colorWeak' : '';
};

const getDefaultSettings = () => {
  const settings =  JSON.parse(localStorage.getItem(STORAGE_SETTING_NAME));
  if(!settings) {
    const data = JSON.stringify({
      navTheme: 'dark',
      primaryColor: '#1890FF',
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      fixedHeader: false,
      autoHideHeader: false,
      fixSiderbar: false,
      colorWeak: false,
      menu: {disableLocal: false},
      title: 'myDemo',
      pwa: true,
      iconfontUrl: '',
    });
    localStorage.setItem(STORAGE_SETTING_NAME, data);
    return data;
  }
  return settings;
}

export default {
  namespace: 'setting',
  state: {
    ...getDefaultSettings(),
  },
  reducers: {
    getSetting(state) {
      const setting = {};
      const { primaryColor, colorWeak } = setting;   
      updateColorWeak(colorWeak);
      if(state.primaryColor !== primaryColor) {
        updateTheme(state.primaryColor);
      }
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state, { payload }) {
      const { primaryColor, colorWeak, contentWidth } = payload;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(colorWeak);
      let data = {
        ...state,
        ...payload,
      };
      localStorage.setItem(STORAGE_SETTING_NAME, JSON.stringify(data));
      return data;
    },
  },
};
