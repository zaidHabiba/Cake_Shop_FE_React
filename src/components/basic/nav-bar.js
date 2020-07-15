import React from "react";
import {Button, Container, Grid, Header, Segment} from 'semantic-ui-react';
import './basic.css';
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

export function NavBar(props) {

    return (
        <Segment inverted vertical style={{padding: '5em 0em'}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as='h3' inverted>
                                Products Provides
                            </Header>
                            <div className="products-provides">
                                <div>All kinds of cakes</div>
                                <div>Pastries of various shapes</div>
                                <div>Birthday cake</div>
                                <div>Wedding cake</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3' inverted>
                                khathu <span style={{color: '#fe8dad', fontStyle: 'italic'}}>baking</span>
                            </Header>
                            <div className="products-provides-service">
                                <div>Fast Service</div>
                                <div>Unparalleled taste!</div>
                                <div>Meet the request in detail</div>
                                <div>You can order online</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3' inverted>
                                Contact <span style={{color: '#fe8dad', fontStyle: 'italic'}}>Us</span>
                            </Header>
                            <div className="contact-us">
                                <div>
                                    <Header as='h5' inverted>
                                        Phone Number
                                    </Header>
                                    <Icon name="phone"/><span style={{color: '#fe8dad', fontStyle: 'italic'}}>079 547 2084</span>
                                </div>
                                <div>
                                    <Header as='h5' inverted>
                                        Location
                                    </Header>
                                    <Icon name="location arrow"/><span style={{color: '#fe8dad', fontStyle: 'italic'}}>Shayandima venda</span>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3' inverted>
                                Follow  <span style={{color: '#fe8dad', fontStyle: 'italic'}}>Us</span>
                            </Header>
                            <div>
                                <Button
                                    circular color='facebook' icon='facebook'
                                    onClick={() => {
                                        window.open('https://www.facebook.com/angela.k.madi', '_blank')
                                    }}/>
                                <Button
                                    circular color='instagram' icon='instagram'
                                    onClick={() => {
                                        window.open('https://www.instagram.com/khathus_home_bake/?hl=en', '_blank')
                                    }}
                                />
                                <Button
                                    circular color='twitter' icon='twitter'
                                    onClick={() => {
                                        window.open('http://localhost:3000', '_blank')
                                    }}
                                />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}