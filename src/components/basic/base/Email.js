import React from 'react';

class Email extends React.Component {

    state = {
        error: '',
        touched: false
    };

    renderStyleInput = () => {
        if (this.state.error && this.state.touched) {
            return {borderColor: "rgba(200,50,50,0.5)", backgroundColor: "rgba(200,50,50,0.2)"};
        } else {
            return {};
        }
    };


    render() {
        return (
            <div className="ui icon input">
                <input {...this.props}
                       type="text"
                       name="email"
                       autoComplete="on"
                       placeholder="emailName@domain.com"
                       style={this.renderStyleInput()}
                />
                <i className="user circle icon"/>
            </div>
        );
    }
}

export default Email;