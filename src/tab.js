import React, { Component } from 'react';

class Tabs extends React.Component {
    state = {
        activeIndex: 0
    }

    render() {
        // console.log('props children: ', this.props.children)
        const newChildren = React.Children.map(this.props.children, (child, index) => {
            if (child.type) {
                // console.log('child: ', child);
                return React.cloneElement(child, {
                    active: this.state.activeIndex === index,
                    onClick: () => this.setState({activeIndex: index})
                });
            } else {
                return child;
            }
        });

        return (
            <React.Fragment>
                {newChildren}
            </React.Fragment>
        )
    }
}

export default Tabs;