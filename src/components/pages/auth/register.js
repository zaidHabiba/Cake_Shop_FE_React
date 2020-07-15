import React from 'react';
import Authenticate from "../../basic/auth/authenticate";
import {Button, Form, Header, Message, Segment} from 'semantic-ui-react';
import Email from "../../basic/base/Email";
import Password from "../../basic/base/Password";
import './login.css';
import request from "../../../api/base";
import {Link, Redirect} from "react-router-dom";
import Menu from "../../basic/menu";
import {ValidateEmail, ValidatePhone} from "../../basic/validators";

class Register extends React.Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: '',
        phone: '',
        location: '',
        error: false,
        loginSuccess: false,
        errorMsg: ['Some fields missing please try again']
    };

    handleRegister = async (e) => {
        let error = false;
        let errorMsg = [];
        if (!this.state.email) {
            errorMsg.push('You should enter your email.');
            error = true;
        }
        if (this.state.email && !ValidateEmail(this.state.email)) {
            errorMsg.push('Email you entered is not valid.');
            error = true;
        }
        if (!this.state.password1 || !this.state.password2) {
            errorMsg.push('You should enter your password and confirm it.');
            error = true;
        }
        if (!this.state.phone) {
            errorMsg.push('You should enter your phone number.');
            error = true;
        }
        if (this.state.phone && !ValidatePhone(this.state.phone)) {
            errorMsg.push('Phone number you entered is not valid.');
            error = true;
        }
        if (!this.state.firstName || !this.state.lastName) {
            errorMsg.push('You should enter your first and last name.');
            error = true;
        }
        if (!this.state.location) {
            errorMsg.push('You should enter your location.');
            error = true;
        }
        if ((this.state.password1 && this.state.password2) && this.state.password1 !== this.state.password2) {
            errorMsg.push('Passwords not match!');
            error = true;
        }
        if (error) {
            this.setState({errorMsg: errorMsg, error: true});
            return;
        }
        try {
            const response = await request.post('/register/', {
                password: this.state.password1,
                email: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                phone: this.state.phone,
                location: this.state.location
            });
            if (response.status === 201) {
                this.setState({loginSuccess: true});
            } else {
                this.setState({
                    error: true,
                    errorMsg: response.data.email ? response.data.email[0] : ["There's fields missing please try again"]
                });
            }
        } catch (e) {
            this.setState({error: true, errorMsg: ["There's error please try again"]});
        }
    };

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to='/login'/>
        }
        return (
            <Authenticate isUnauthenticated={true} ato='/'>
                <Menu/>
                <div className="register-container">
                    <Segment>
                        <Header size='large'>Registration</Header>
                        <Form onSubmit={this.handleRegister}>
                            {this.renderErrorMsg()}
                            <Form.Field>
                                <label>Email</label>
                                <Email value={this.state.email} onChange={(e) => {
                                    this.setState({email: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='First name'
                                            value={this.state.firstName} onChange={(e) => {
                                    this.setState({firstName: e.target.value})
                                }}/>
                                <Form.Input fluid label='Last name' placeholder='Last name' value={this.state.lastName}
                                            onChange={(e) => {
                                                this.setState({lastName: e.target.value})
                                            }}/>
                            </Form.Group>
                            <Form.Field>
                                <label>Password</label>
                                <Password value={this.state.password1} onChange={(e) => {
                                    this.setState({password1: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <Password placeholder="Confirm Password" value={this.state.password2} onChange={(e) => {
                                    this.setState({password2: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Phone Number' value={this.state.phone} placeholder="Phone number" onChange={(e) => {
                                    if ((e.target.value && !isNaN(e.target.value)) || e.target.value === '') {
                                        this.setState({phone: e.target.value})
                                    }
                                }}/>
                                <Form.Input fluid label='Location' placeholder='Your location' value={this.state.location}
                                            onChange={(e) => {
                                                this.setState({location: e.target.value})
                                            }}/>
                            </Form.Group>
                            <Button color='teal'>Register</Button>
                            <Link to='/login' style={{paddingLeft: 10}}>I have an account</Link>
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
                    <Message.Header>There was some errors with your registration.</Message.Header>
                    <Message.List items={this.state.errorMsg} />
                </Message>
            )
        }
    }
}

export default Register;