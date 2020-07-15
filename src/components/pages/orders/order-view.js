import React from 'react';
import Authenticate from "../../basic/auth/authenticate";
import './order-view.css';
import Menu from "../../basic/menu";
import request from '../../../api/base';
import Cookies from "js-cookie";
import {Button, Icon, Item, Label, Modal} from "semantic-ui-react";
import {Flag} from "../../basic/operation";
import {NavBar} from "../../basic/nav-bar";
import Card from "../../basic/card/card";


function OrderModel(props) {
    return (
        <Modal size="small" open={props.open} onClose={props.onClose}>
            <Modal.Header>Order View<Flag flag={!!props.offer}> ( Offer Order )</Flag></Modal.Header>
            <Modal.Content className="container-order">
                <Flag flag={!!props.offer}>
                    <Card {...props.offer} viewOnly={true}/>
                </Flag>
                <div>
                    <Modal.Header as='h4'>Order
                        Date: {`${new Date(props.create_at).toLocaleDateString()}, ${new Date(props.create_at).toLocaleTimeString()}`}</Modal.Header>
                    <Modal.Header as='h4'>Order Details: </Modal.Header>
                    <p>{props.description}</p>
                    <Flag flag={props.user && props.ownerUser.is_superuser}>
                        <Modal.Header as='h4'>User information:</Modal.Header>
                        <div className="user-info-section">
                            <Label icon='phone' className="info-label" content={props.user.phone}/>
                            <Label icon='mail' className="info-label" content={props.user.email}/>
                            <Label icon='location arrow' className="info-label" content={props.user.location}/>
                        </div>
                    </Flag>
                </div>

            </Modal.Content>
            <Flag flag={props.image}>
                <div className="image-container">
                    <div className="image">
                        <img alt="" src={props.image} draggable="false"/>
                    </div>
                </div>
            </Flag>
            <Modal.Actions>
                <Button
                    content='Close'
                    onClick={() => {
                        if (props.onClose) {
                            props.onClose();
                        }
                    }}
                />
            </Modal.Actions>
        </Modal>
    );
}

class OrderItem extends React.Component {

    state = {
        OrderModelOpen: false
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        return (
                <Item>
                    <Item.Content>
                        <Flag flag={this.props.ownerUser && this.props.ownerUser.is_superuser}
                              else={
                                  <Item.Header size="small" as='h4'>
                                      {`${new Date(this.props.create_at).toLocaleDateString()}, ${new Date(this.props.create_at).toLocaleTimeString()}`}
                                  </Item.Header>
                              }>
                            <Item.Header as='h4'>User Name:{this.props.user.full_name}</Item.Header>
                            <Item.Meta>
                        <span
                            className='cinema'>{`${new Date(this.props.create_at).toLocaleDateString()}, ${new Date(this.props.create_at).toLocaleTimeString()}`}</span>
                            </Item.Meta>
                        </Flag>
                        <Item.Description>{this.props.description}</Item.Description>

                        <Item.Extra>
                            <Flag flag={this.props.user && this.props.user.is_superuser}>
                                User information:
                                <Label icon='phone' content={this.props.user.phone}/>
                                <Label icon='mail' content={this.props.user.email}/>
                            </Flag>
                            <Button primary floated='right' onClick={() => this.setState({OrderModelOpen: true})}>
                                View Order
                                <Icon name='right chevron'/>
                            </Button>
                        </Item.Extra>
                    </Item.Content>
                    <Flag flag={this.state.OrderModelOpen}>
                        <OrderModel open={this.state.OrderModelOpen} {...this.props}
                                    onClose={() => this.setState({OrderModelOpen: false})}/>
                    </Flag>
                </Item>
        );
    }
}


class OrderView extends React.Component {

    state = {
        orderList: [],
        msg: '',
        user: {}
    };

    componentDidMount = async () => {
        const response = await request.get('/order', {
            headers: {
                Authorization: `Token ${Cookies.get("token")}`
            }
        });
        if (response.status === 200) {
            this.setState({orderList: response.data});
        } else {
            this.setState({msg: 'No orders to view'});
        }
    };


    renderItemList = () => {
        if (this.state.user) {
            return this.state.orderList.map((item, key) => {
                return <OrderItem key={key} ownerUser={this.state.user} {...item}/>;
            });
        }
        return null;
    };

    render() {
        return (
            <Authenticate fto='/' loadUser={user => this.setState({user: user})}>
                <Menu/>
                <Flag flag={this.state.orderList.length <= 0}>
                    <div className="no-order-msg">
                        <Flag flag={this.state.user && this.state.user.is_superuser}>
                            <p>You don't receive any order</p>
                        </Flag>
                        <Flag flag={this.state.user && !this.state.user.is_superuser}>
                            <p>You don't have any order</p>
                        </Flag>
                    </div>
                </Flag>
                <div className="order-container">
                    <Item.Group>
                        {this.renderItemList()}
                    </Item.Group>
                </div>
                <NavBar/>
            </Authenticate>
        );
    }

}

export default OrderView;