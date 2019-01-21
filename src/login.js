import React, { Component } from 'react';

const Login = (props) => {
    const userName = 'longtao';

    if (userName) {
        const allProps = {userName, ...props};

        return (
            <React.Fragment>
                {props.children(allProps)}
            </React.Fragment>
        )

    } else {
        return null;
    }
};

export default Login;