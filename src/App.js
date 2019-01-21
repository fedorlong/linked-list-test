import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login';
import Tabs from './tab';
import TabItem from './tabItem';
import myPromise from './myPromise';

class App extends Component {

  state = {
    count: 0
  }

  clickCount = this.clickCount.bind(this);

  clickCount() {
    this.setState(this.increment);
  }

  increment(state, props) {
    return {count: state.count + 1};
  }

  componentWillMount() {
    // debugger;
    // console.log('componentWillMount');
  }

  componentDidMount() {
    // this.testPromise();
    this.intoPromise();
  }

  intoPromise() {
    new myPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('after 3s, invoke resolve');
      }, 3000);
    }).then((data) => {
      console.log('hahah here, ', data)
    });

    // prom1.then((data) => {
    //   console.log('haha, we got here, ', data);
    // });
  }

  testPromise() {
    let p = new myPromise((resolve, reject) => {
      // reject('失败-0');
      setTimeout(() => {
        resolve('3s 过了，执行resolve');
      }, 3000);
    });

    function anotherOne() {
      let p2 = new myPromise((resolve, reject) => {
        setTimeout(() => {
          resolve('又过了3s，执行resolve');
        }, 3000);
      });
      return p2;
    }

    p.then((data) => {
      console.log('成功 ' + data);
      return anotherOne();
    }, (err) => {
      console.log('失败 ' + err);
    })
    .then((data) => {
      console.log('成功1 ' + data);
    }, (err) => {
      console.log('失败1 ' + err);
    })
  }

  render() {
    // console.log('app virtual dom: ', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Login>
          {({userName}) => <h1>Hello {userName}</h1>}
        </Login>

        <Tabs>
          <TabItem>One</TabItem>
          <TabItem>Two</TabItem>
          <TabItem>Three</TabItem>
        </Tabs>

        <button onClick={this.clickCount}>clickMe + {this.state.count}</button>
      </div>
    );
  }
}

export default App;
