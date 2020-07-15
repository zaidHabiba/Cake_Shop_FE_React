import {Link} from "react-router-dom";
import Authenticate from "./auth/authenticate";
import React from "react";
import {AddItemModel} from "../pages/admin/add-item";
import './basic.css';

class Menu extends React.Component {

    static MODEL_NEW_CARD = 'MODEL_NEW_CARD';

    state = {
        addItemModelOpen: false,
        user: {}
    };

    render() {
        return (
            <div className="wave">
                <div className="px-menu">
                    <div className="menu-left">
                        <div className="menu-item">
                            <Link to=''>Home</Link>
                        </div>
                        <Authenticate adminOnly={true}>
                            <div className="menu-item" onClick={() => this.setState({addItemModelOpen: true})}>Add
                                product
                            </div>
                        </Authenticate>
                        <Authenticate>
                            <div className="menu-item"><Link to='/order-list'>View Orders</Link></div>
                        </Authenticate>
                    </div>
                    <div className="menu-right">
                        <Authenticate loadUser={(user) => this.setState({user: user})}>
                            <div className="menu-item"><Link
                                to='/logout'>Logout</Link></div>
                        </Authenticate>
                        <Authenticate isUnauthenticated={true}>
                            <div className="menu-item"><Link to='/login'>Login</Link></div>
                            <div className="menu-item"><Link to='/register'>Register</Link></div>
                        </Authenticate>
                    </div>
                </div>
                <Authenticate adminOnly={true}>
                    <AddItemModel open={this.state.addItemModelOpen}
                                  onClose={(e) => this.setState({addItemModelOpen: false})} save={
                        (card) => {
                            this.props.change(Menu.MODEL_NEW_CARD, card);
                            console.log(card)
                        }}/>
                </Authenticate>
            </div>
        );
    }
}

export default Menu;