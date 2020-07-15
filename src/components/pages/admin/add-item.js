import React from 'react';
import {Button, Form, Message, Modal} from "semantic-ui-react";
import Cookies from "js-cookie";
import request from "../../../api/base";

export class AddItemModel extends React.Component {

    state = {
        error: false,
        errorMsg: '',
        open: false,
        photo: '',
        name: '',
        price: ''
    };

    addItem = () => {
        let error = false;
        const errorList = [];
        if (!this.state.name) {
            errorList.push("You should enter name.");
            error = true;
        }
        if (!this.state.price) {
            errorList.push("You should enter price.");
            error = true;
        }
        if (!this.state.photo || !this.state.photo.type) {
            errorList.push("You should select image.");
            error = true;
        }
        if (this.state.photo && this.state.photo.type !== 'image/jpeg' && this.state.photo.type !== 'image/png' && this.state.photo.type !== 'image/jpg') {
            errorList.push("Uploaded image is not valid.");
            error = true;
        }
        if (error) {
            this.setState({errorMsg: errorList, error: true});
            return;
        }
        const formData = new FormData();
        formData.append("image", this.state.photo);
        formData.append("name", this.state.name);
        formData.append("price", this.state.price);
        request.post('/create-offer/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${Cookies.get("token")}`
            }
        }).then((data) => {
            if (data.status === 201) {
                this.setState({photo: '', name: '', price: '', error: false});
                this.props.save(data.data);
                this.props.onClose();
            }
        }).catch(() => {
            this.setState({errorMsg: ["There's error please try again"], error: true});
        });
    };

    render() {
        return (
            <Modal size="small" open={this.props.open} onClose={this.props.onClose}>
                <Modal.Header>Add new product</Modal.Header>
                <Modal.Content>
                    <Form>
                        {this.renderErrorMsg()}
                        <Form.Group widths='equal'>
                            <Form.Input
                                required={true}
                                fluid label='Name'
                                placeholder='Name'
                                onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}
                                value={this.state.name}
                            />
                            <div className="field">
                                <label>Price</label>
                                <div className="ui fluid input"><input
                                    type="number"
                                    required={true}
                                    placeholder="$0.00"
                                    onChange={(e) => {
                                        this.setState({price: e.target.value})
                                    }}
                                    value={this.state.price}
                                /></div>
                            </div>
                        </Form.Group>
                        <div className="field">
                            <label>Image</label>
                            <div className="ui fluid input">
                                <input
                                    required={true}
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg"
                                    src={this.state.photo}
                                    onChange={(e) => {
                                        this.setState({photo: e.target.files[0]})
                                    }}
                                />
                            </div>
                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        type="submit"
                        onClick={() => {
                            this.addItem();
                        }}
                    />
                    <Button
                        content='Close'
                        onClick={() => {
                            this.setState({photo: '', name: '', price: '', error: false});
                            this.props.onClose();
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
                    <Message.Header>There was some errors with your submit.</Message.Header>
                    <Message.List items={this.state.errorMsg} />
                </Message>
            )
        }
    }

}


export class EditItemModel extends React.Component {

    state = {
        error: false,
        errorMsg: '',
        open: false,
        photo: '',
        name: this.props.card.name,
        price: this.props.card.price,
        id: this.props.card.id
    };

    addItem = () => {
        let error = false;
        const errorList = [];
        if (!this.state.name) {
            errorList.push("You should enter name.");
            error = true;
        }
        if (!this.state.price) {
            errorList.push("You should enter price.");
            error = true;
        }
        if (this.state.photo && this.state.photo.type !== 'image/jpeg' && this.state.photo.type !== 'image/png' && this.state.photo.type !== 'image/jpg') {
            errorList.push("Uploaded image is not valid.");
            error = true;
        }
        if (error) {
            this.setState({errorMsg: errorList, error: true});
            return;
        }
        const formData = new FormData();
        if (this.state.photo) {
            formData.append("image", this.state.photo);
        }
        formData.append("name", this.state.name);
        formData.append("price", this.state.price);
        request.put(`/offer/${this.state.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${Cookies.get("token")}`
            }
        }).then((data) => {
            if (data.status === 200) {
                this.setState({photo: '', name: '', price: '', error: false});
                this.props.save(data.data);
                this.props.onClose();
            }
        }).catch(() => {
            this.setState({errorMsg: ["There's error please try again"], error: true});
        });
    };

    render() {
        return (
            <Modal size="small" open={this.props.open} onClose={this.props.onClose}>
                <Modal.Header>Add new product</Modal.Header>
                <Modal.Content>
                    <Form>
                        {this.renderErrorMsg()}
                        <Form.Group widths='equal'>
                            <Form.Input
                                required={true}
                                fluid label='Name'
                                placeholder='Name'
                                onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}
                                value={this.state.name}
                            />
                            <div className="field">
                                <label>Price</label>
                                <div className="ui fluid input"><input
                                    type="number"
                                    required={true}
                                    placeholder="$0.00"
                                    onChange={(e) => {
                                        this.setState({price: e.target.value})
                                    }}
                                    value={this.state.price}
                                /></div>
                            </div>
                        </Form.Group>
                        <div className="field">
                            <label>Image</label>
                            <div className="ui fluid input">
                                <input
                                    required={true}
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg"
                                    src={this.state.photo}
                                    onChange={(e) => {
                                        this.setState({photo: e.target.files[0]})
                                    }}
                                />
                            </div>
                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        type="submit"
                        onClick={() => {
                            this.addItem();
                        }}
                    />
                    <Button
                        content='Close'
                        onClick={() => {
                            if (this.props.onClose)
                                this.props.onClose();
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
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>
            )
        }
    }

}
