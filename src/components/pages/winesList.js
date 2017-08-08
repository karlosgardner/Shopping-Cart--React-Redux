"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {getWines} from '../../actions/winesActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import WineItem from './wineItem';
import WinesForm from './winesForm';
import Cart from './cart';


class WinesList extends React.Component{
  componentDidMount(){
    this.props.getWines()
  }
  render(){

    const winesList = this.props.wines.map(function(winesArr){
      return(
        <Col xs={12} sm={6} md={4} key={winesArr._id}>
          <WineItem
                _id= {winesArr._id}
                title={winesArr.title}
                description={winesArr.description}
                images={winesArr.images}
                price={winesArr.price}/>
        </Col>
      )
    })
    return(
        <Grid>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
                <Carousel.Caption>
                  <h3></h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
                <Carousel.Caption>
                  <h3></h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <Cart />
          </Row>
          <Row style={{marginTop:'15px'}}>
              {winesList}
          </Row>
        </Grid>
    )
  }
}
function mapStateToProps(state){
  return{
    wines: state.wines.wines,
    state: state,
    stateWines: state.wines,
    stateWinesWines: state.wines.wines
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getWines:getWines
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WinesList);
