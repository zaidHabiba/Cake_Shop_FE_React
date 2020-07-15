import React from 'react';

class Password extends React.Component {

    state = {
        passwordType: "password",
        icon:"eye link icon",
    };

    onClickPasswordType = () => {
        if (this.state.passwordType === "password") {
            this.setState({passwordType: "text",icon:"eye slash link icon"});
        } else {
            this.setState({passwordType: "password",icon:"eye link icon"});
        }
    };

    renderPlaceHolder = () => {

        if(this.props.placeholder !== undefined){
            return this.props.placeholder;
        }else {
            return "Password";
        }

    };

    render() {
        return (
            <div className="ui icon input">
                <input type={this.state.passwordType}
                       name="password"
                       autoComplete="off"
                       placeholder={this.renderPlaceHolder()}
                       {...this.props}
                />
                <i className={this.state.icon} onClick={this.onClickPasswordType}/>
            </div>
        );
    }
}

export default Password;