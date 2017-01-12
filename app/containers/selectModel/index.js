import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const images = {
  twoDS: require('./images/2ds.png'),
  o3DS: require('./images/old3dsxl.png'),
  n3DS: require('./images/new3dsxl.png')
}

class Device extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <section>
        <div onClick={this.props.clickHandler}>{this.props.name}</div>
        <img onClick={this.props.clickHandler} className={styles.device} src={this.props.image} />
      </section>
    )
  }
}

const totalSteps = 2
const nextScreen = '/config/region'

export default class selectModel extends Component {
  constructor () {
    super()
    this.state = {
      step: 1
    }
    this.goBack = this.goBack.bind(this)
  }
  setModel (model) {
    return () => {
      config.model = model
      this.goForward()
    }
  }
  setXL (isXL) {
    return () => {
      config.XL = isXL
      this.goForward()
    }
  }
  goBack () {
    if (this.state.step === 1) {
      // go back
      return browserHistory.goBack()
    } else {
      this.setState({
        ...this.state,
        step: this.state.step - 1
      })
    }
  }
  goForward () {
    if (this.state.step === totalSteps) {
      this.props.router.push(nextScreen)
    } else {
      this.setState({
        ...this.state,
        step: this.state.step + 1
      })
    }
  }
  getContent () {
    switch (this.state.step) {
      case 1: {
        return <div>
          <Device clickHandler={this.setModel('n3ds')} name='New 3DS' image={images.n3DS} />
          <Device clickHandler={this.setModel('o3ds')} name='Old 3DS' image={images.o3DS} />
          <Device clickHandler={this.setModel('o2ds')} name='2DS' image={images.twoDS} />
        </div>
      }
      case 2: {
        return <div>
          is your device an XL model?
          <div onClick={this.setXL(true)}>Yes</div>
          <div onClick={this.setXL(false)}>No</div>
        </div>
      }
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Model Selection</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={this.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
