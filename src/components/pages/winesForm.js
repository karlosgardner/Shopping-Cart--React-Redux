"use strict"
import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postWines, deleteWines, getWines, resetButton} from '../../actions/winesActions';
import axios from 'axios';

class WinesForm extends React.Component{
  constructor() {
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }
  componentDidMount(){
    this.props.getWines();
    //GET IMAGES FROM API
    axios.get('/api/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img:''})
      }.bind(this))
  }
  handleSubmit(){
    const wine=[{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images:findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.postWines(wine);
  }

  onDelete(){
    let wineId = findDOMNode(this.refs.delete).value;

    this.props.deleteWines(wineId);
  }

  handleSelect(img){
    this.setState({
      img: '/images/'+ img
    })
  }

  resetForm(){
    //RESET THE Button
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({img:''});
  }
  render(){
    const winesList = this.props.wines.map(function(winesArr){
      return (
        <option key={winesArr._id}> {winesArr._id}</option>
      )
    })
    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <MenuItem key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
      )
    }, this)

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an image"
                  bsStyle="primary">
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Brand</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Brand"
                    ref="title" />
                    <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Wine-Spirts-Beer</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Description"
                    ref="description" />
                    <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="price" validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Price"
                    ref="price" />
                    <FormControl.Feedback/>
              </FormGroup>
              <Button
                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                {(!this.props.msg)?("Save"):(this.props.msg)}
              </Button>
            </Panel>
            <Panel>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a item to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                    {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete</Button>
            </Panel>
          </Col>
        </Row>

      </Well>
    )
  }
}
function mapStateToProps(state){
  return {
    wines: state.wines.wines,
    msg: state.wines.msg,
    style: state.wines.style,
    validation: state.wines.validation
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postWines,
    deleteWines,
    getWines,
    resetButton
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WinesForm);
