import React from 'react';
import './order.css';
import {Button, Form, Message, Modal} from "semantic-ui-react";
import Cookies from "js-cookie";
import request from "../../../api/base";

export class CreateOrderModel extends React.Component {

    state = {
        subOrder: !!this.props.subOrder,
        description: '',
        offer: this.props.offer ? this.props.offer: '',
        image: '',
        title: this.props.title ? this.props.title: 'New order',
        errorMsg: [''],
        error: false
    };


    createOrder = () => {
        const errorList = [];
        let error = false;
        if (!this.state.description) {
            errorList.push("Please write more details about your order");
            error = true;
        }
        if (this.state.image && this.state.image.type !== 'image/jpeg'
            && this.state.image.type !== 'image/png' && this.state.image.type !== 'image/jpg') {
            errorList.push("Uploaded image is not valid.");
            error = true;
        }
        if (error) {
            this.setState({errorMsg: errorList, error: true});
            return;
        }
        const formData = new FormData();
        if (this.state.image) {
            formData.append("image", this.state.image);
        }
        if (this.state.offer) {
            formData.append("offer", this.state.offer);
        }
        formData.append("user", this.props.userId);
        formData.append("description", this.state.description);
        request.post('/order/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${Cookies.get("token")}`
            }
        }).then((data) => {
            if (data.status === 201) {
                this.setState({userId: '', description: '', offer: '', image: '', error: false});
                this.props.onClose();
            }
        }).catch(() => {
            this.setState({errorMsg: ["There's error please try again"], error: true});
        });
    };

    render() {
        return (
            <Modal size="small" open={this.props.open} onClose={this.props.onClose}>
                <Modal.Header>{this.state.title}</Modal.Header>
                <Modal.Content>
                    <Form>
                        {this.renderErrorMsg()}
                        <Form.Group widths='equal'>
                            <Form.TextArea
                                label='Order Details'
                                placeholder='Write more about your order'
                                onChange={(e) => {
                                    this.setState({description: e.target.value})
                                }}
                                value={this.state.description}
                            />
                        </Form.Group>
                        <div className="field">
                            <label>Upload image</label>
                            <div className="ui fluid input">
                                <input
                                    required={true}
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg"
                                    src={this.state.image}
                                    onChange={(e) => {
                                        this.setState({image: e.target.files[0]})
                                    }}
                                />
                            </div>
                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        icon='send'
                        labelPosition='right'
                        content='Order now'
                        type="submit"
                        onClick={() => {
                            this.createOrder();
                        }}
                    />
                    <Button
                        content='Close'
                        onClick={() => {
                            if (this.props.onClose) {
                                this.setState({userId: '', description: '', offer: '', image: '', error: false});
                                this.props.onClose();
                            }
                        }}
                    />
                </Modal.Actions>
            </Modal>
        );
    }

    renderErrorMsg() {
        if (this.state.error) {
            return (
                <Message negative>
                    <Message.Header>There was some errors with your order.</Message.Header>
                    <Message.List items={this.state.errorMsg}/>
                </Message>
            )
        }
    }

}