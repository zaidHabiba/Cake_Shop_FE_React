import React from 'react';
import Authenticate from "../../basic/auth/authenticate";
import {Button, Form, Header, Message, Segment} from 'semantic-ui-react';
import Email from "../../basic/base/Email";
import Password from "../../basic/base/Password";
import './login.css';
import request from "../../../api/base";
import Cookies from "js-cookie";
import {Link, Redirect} from "react-router-dom";
import Menu from "../../basic/menu";

export class LoginBox extends React.Component {
    state = {
        username: '',
        password: '',
        error: false,
        errorMsg: 'Email or password are not correct, Please try again!'
    };

    handleLogin = async (e) => {
        if (!this.state.password || !this.state.username) {
            this.setState({
                error: true,
                errorMsg: 'Please Enter valid email and password'
            });
        }
        if (this.state.password && this.state.username) {
            try {
                const response = await request.post('/user-auth/', {
                    password: this.state.password,
                    username: this.state.username
                });
                if (response.status === 200) {
                    Cookies.set('token', response.data.token);
                    if (this.props.loginSuccess)
                        this.props.loginSuccess(true);
                } else {
                    this.setState({
                        error: true,
                        password: '',
                        errorMsg: 'Email or password are not correct, Please try again!'
                    });
                }
            } catch (e) {
                this.setState({
                    error: true,
                    password: '',
                    errorMsg: 'Email or password are not correct, Please try again!'
                });
            }
        }
    };

    render() {
        return (
            <Authenticate isUnauthenticated={true} ato='/'>
                <div className="login-container">
                    <Segment>
                        <Header size='large'>{this.props.title}</Header>
                        <Form onSubmit={this.handleLogin}>
                            {this.renderErrorMsg()}
                            <Form.Field>
                                <label>Email</label>
                                <Email value={this.state.username} onChange={(e) => {
                                    this.setState({username: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Password value={this.state.password} onChange={(e) => {
                                    this.setState({password: e.target.value})
                                }}/>
                            </Form.Field>
                            <Button color='teal'>Login</Button>
                            <Link to='/register' style={{paddingLeft: 10}}>I don't have an account</Link>
                        </Form>
                    </Segment>
                </div>
            </Authenticate>
        );
    }

    renderErrorMsg() {
        if (this.state.error) {
            return (
                <Message negative>
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>
            )
        }
    }
}


class Login extends React.Component {
    state = {
        loginSuccess: false
    };


    render() {
        if (this.state.loginSuccess) {
            return <Redirect to='/'/>
        }
        return (
            <Authenticate isUnauthenticated={true} ato='/'>
                <Menu/>
                <LoginBox title="Login" loginSuccess={(value) => this.setState({loginSuccess: value})}/>
            </Authenticate>
        );
    }
}

export default Login;