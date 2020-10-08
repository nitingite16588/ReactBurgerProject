import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    sideDrawerCloseHanlder = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler } />
            <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHanlder}
                />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>

        )

    }

}
export default Layout; 