import './home.css';
import React from "react";
import {Button, Header, Icon, Responsive} from 'semantic-ui-react';
import Menu from "../../basic/menu";
import Card from "../../basic/card/card";

import backend from '../../../api/base';
import request from '../../../api/base';
import Cookies from "js-cookie";
import {NavBar} from "../../basic/nav-bar";
import Cake1 from '../../../resource/cake1.png';
import Cake2 from '../../../resource/cake2.png';
import Cake3 from '../../../resource/cake3.png';
import {CreateOrderModel} from "../../basic/order/create-order";
import Authenticate from "../../basic/auth/authenticate";
import {Flag} from "../../basic/operation";
import Marquee from "react-marquee-slider";
import times from "lodash/times";
import Photos from './photos';
import {LoginBox} from "../auth/login";

function HomeSection() {
    return (
        <div className="home-section" style={{paddingTop: 30}}>
            <div>
                <div style={{height: 200}}>
                    <Marquee key={1} velocity={8} direction={'rtl'}>
                        {times(9, Number).map(id => (
                            <img alt="" className="image-home-view" draggable="false"
                                 width={200} src={Photos[id]} key={`marquee-example-people-${id}`} style={{
                                marginLeft: "87px",
                            }}/>
                        ))}
                    </Marquee>
                </div>
                <div style={{height: 0.5 * 60}}/>
                <div style={{height: 290}}>
                    <Marquee key={2} velocity={12} direction={'ltr'}>
                        {times(8, Number).map(id => (
                            <img
                                alt="" className="image-home-view" draggable="false"
                                width={200}
                                src={Photos[id + 9]}
                                key={`marquee-example-people-${id + 9}`}
                                style={{
                                    marginLeft: "7px",
                                    marginRight: "80px",
                                }}
                            />
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
}


class Home extends React.Component {

    state = {
        cards: [],
        user: {},
        noDataMsgDisplay: false,
        createOrderDisplay: false
    };

    componentDidMount = async () => {
        const response = await backend.get('/offers/');
        if (response.status === 200) {
            this.setState({noDataMsgDisplay: false, cards: response.data});
        } else {
            this.setState({noDataMsgDisplay: true, cards: []});
        }
    };

    removeItem = async (id) => {
        const response = await request.delete(`/offer/${id}`, {
            headers: {
                Authorization: `Token ${Cookies.get("token")}`
            }
        });
        if (response.status === 204) {
            const newCardList = [];
            this.state.cards.forEach(item => {
                if (item.id !== id) {
                    newCardList.push(item);
                }
            });
            this.setState({cards: [...newCardList]});
        }
    };

    renderCards = () => {
        if (!this.state.cards || this.state.cards.length < 1 || this.state.noDataMsgDisplay) {
            return <Header size='huge'>No data to view</Header>;
        }
        return this.state.cards.map((card, key) => {
            return <Card onDelete={() => {
                this.removeItem(card.id);
            }} key={card.id} {...card}/>;
        });
    };

    renderCardSections() {
        if (!this.state.cards || this.state.cards.length < 1) {
            return null;
        }
        return (
            <div className="section-two">
                <div className="view-box">
                    <div className="view-box-header-section">
                        <h2 className="view-box-header">Available Products</h2>
                        <Authenticate adminOnly={false} loadUser={(user) => {
                            this.setState({user: user});
                        }}>
                            <Button
                                className="button-color"
                                animated
                                onClick={() => {
                                    this.setState({createOrderDisplay: true});
                                }}
                            >
                                <Button.Content visible>Order Now!</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right'/>
                                </Button.Content>
                            </Button>
                            <Flag flag={this.state.createOrderDisplay}>
                                <CreateOrderModel
                                    userId={this.state.user.id}
                                    subOrder={true}
                                    open={this.state.createOrderDisplay}
                                    onClose={() => {
                                        this.setState({createOrderDisplay: false});
                                    }}
                                />
                            </Flag>
                        </Authenticate>
                        <Authenticate adminOnly={false} isUnauthenticated={true}>
                            <Button
                                animated
                                onClick={() => {
                                    window.open('/login', "_self");
                                }}
                            >
                                <Button.Content visible>Order Now!</Button.Content>
                                <Button.Content hidden>
                                    Login first
                                </Button.Content>
                            </Button>
                        </Authenticate>
                    </div>
                    <div className="view-box-card">
                        {this.renderCards()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Menu change={(event, data) => {
                    if (event === Menu.MODEL_NEW_CARD) this.setState({cards: [...this.state.cards, data]});
                }}/>
                <HomeSection/>
                <Responsive {...Responsive.onlyTablet}>
                    <div className="home-view">
                        <div className="home-text-view">
                            <h2>khathu baking</h2>
                            <p>
                                What are you waiting for? <br/> Enter the deepest worlds<br/>
                                with the tastiest cakes
                            </p>
                        </div>
                        <Authenticate isUnauthenticated={true}>
                            <LoginBox title="Login Now!" loginSuccess={(value) => {
                                window.open('/', '_self');
                            }}/>
                        </Authenticate>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <div className="home-view">
                        <div className="home-text-view">
                            <h2>khathu baking</h2>
                            <p>What are you waiting for? <br/> Enter the deepest worlds<br/>
                                with the tastiest cakes</p>
                        </div>
                        <Authenticate isUnauthenticated={true}>
                            <LoginBox title="Login Now!" loginSuccess={(value) => {
                                window.open('/', '_self');
                            }}/>
                        </Authenticate>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <div className="home-view">
                        <Authenticate isUnauthenticated={true}>
                            <LoginBox title="Login Now!" loginSuccess={(value) => {
                                window.open('/', '_self');
                            }}/>
                        </Authenticate>
                        <Authenticate>
                            <div className="home-text-view">
                                <h2>khathu baking</h2>
                                <p>What are you waiting for? <br/> Enter the deepest worlds<br/>
                                    with the tastiest cakes</p>
                            </div>
                        </Authenticate>
                    </div>
                </Responsive>
                <div className="section-one">
                    <h2 className="section-one-box-header">Looking For Something Else</h2>
                    <div className="section-one-box">
                        <div>
                            <img alt="" src={Cake2} draggable="false"/>
                            <h3>Special Cakes</h3>
                            <p>Stand out from the crowd by choosing your own cakes with unmatched design and taste</p>
                        </div>
                        <div>
                            <img alt="" src={Cake3} draggable="false"/>
                            <h3>Cake Types</h3>
                            <p>We have a wide variety of cakes, with delicious flavor and attractive appearance</p>
                        </div>
                        <div>
                            <img alt="" src={Cake1} draggable="false"/>
                            <h3>Parties Cakes</h3>
                            <p>Let your parties feature luxurious with special cakes and distinctive taste and special
                                look</p>
                        </div>
                    </div>
                </div>
                {this.renderCardSections()}
                <NavBar/>
            </div>
        );
    }
}

export default Home;