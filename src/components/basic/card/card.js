import React from 'react';
import './card.css';
import {Button, Icon, Label, Segment} from "semantic-ui-react";
import Authenticate from "../auth/authenticate";
import {EditItemModel} from "../../pages/admin/add-item";
import {Flag} from "../operation";
import {CreateOrderModel} from "../order/create-order";

class Card extends React.Component {

    user = {};

    state = {
        editActive: false,
        image: this.props.image,
        name: this.props.name,
        price: this.props.price,
        id: this.props.id,
        is_deletable: this.props.is_deletable,
        orderModelOpen: false
    };

    render() {
        return (
            <Segment className="card-box" padded>
                <img alt="" src={this.state.image} draggable="false"/>
                <div>{this.state.name}</div>
                <Label tag attached='top right'>
                    ${this.state.price}
                </Label>
                <Flag flag={!this.props.viewOnly}>
                    <Authenticate adminOnly={false} loadUser={(user) => this.user = user}>

                        <Label tag attached='top right' className="shop-label" onClick={() => {
                            this.setState({orderModelOpen: true})
                        }}>
                            <Icon name='shop'/>
                        </Label>
                        <Flag flag={this.state.orderModelOpen}>
                            <CreateOrderModel
                                title="Create Same Order"
                                subOrder={true}
                                offer={this.state.id}
                                open={this.state.orderModelOpen}
                                userId={this.user.id}
                                onClose={() => this.setState({orderModelOpen: false})}/>
                        </Flag>

                    </Authenticate>
                    <Authenticate adminOnly={true}>
                        {this.editablePart()}
                        {this.renderEditModel()}
                    </Authenticate>
                </Flag>
            </Segment>
        );
    }

    editablePart() {
        return (
            <div style={{position: 'absolute', top: 220}}>
                <Button
                    inverted
                    content='Edit'
                    color='blue'
                    onClick={() => {
                        this.setState({editActive: true});
                    }}
                />
                <Button
                    inverted
                    color='red'
                    content='Delete'
                    disabled={!this.state.is_deletable}
                    onClick={() => {
                        if (this.state.is_deletable) {
                            this.props.onDelete();
                        }
                    }}
                />
            </div>
        );
    }

    renderEditModel() {
        if (this.state.editActive) {
            return <EditItemModel
                open={this.state.editActive}
                onClose={() => {
                    this.setState({editActive: false})
                }}
                save={(data) => {
                    this.setState({...data});
                }}
                card={{
                    name: this.state.name,
                    image: this.state.image,
                    price: this.state.price,
                    id: this.state.id
                }}
            />
        }
    }
}

export default Card;