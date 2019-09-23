import {Component} from 'react'
import LoadableComponent from '@/util/LoadableComponent'
import loginBg from '@/assets/images/login_bg1.jpg';
import style from './style.less'
const LoginForm = LoadableComponent(import('./LoginForm'))
const RegisterForm = LoadableComponent(import('./RegisterForm'))
const Background = LoadableComponent(import('@/component/Background'))
class Login extends Component {
    state = {
        show: 'login'    //当前展示的是登录框还是注册框
    }
    /**
     * 切换登录和注册的面板
     */
    toggleShow = () => {
        this.setState({show:this.state.show === 'login' ? 'register' : 'login'})
    }
    render() {
        const { show } = this.state;
        return (
            <Background url={loginBg}>
                <div className={style.container}>                   
                    <div className={show === 'login'?style.active:style.hide}>
                        <LoginForm toggleShow={this.toggleShow} />
                    </div>                
                    <div className={show === 'register'?style.active:style.hide}>
                        <RegisterForm toggleShow={this.toggleShow} />
                    </div>                   
                </div>
            </Background>
        )
    }
}
export default Login