import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import renderHTML from 'react-render-html';
import {Grid} from 'semantic-ui-react'
import { Button, Comment, Form, Modal } from 'semantic-ui-react'
import { createComment, deleteComment, deleteArtifactFromDb } from "../actions/artifacts";
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react'
import {HuePicker} from 'react-color'



class ArtifactCard extends React.Component {

  state = {
    content: '',
    artifact_id: this.props.artifact.id,
    artifactColor: '#fff'
  }

   mediaRender(){
    if (this.props.artifact.media === 'Image') {
      return renderHTML(`<img src="${this.props.artifact.url}" />`)
    }else if(this.props.artifact.media === 'Link'){
      return renderHTML(`<a href="${this.props.artifact.url}"target="_blank"> ${this.props.artifact.url} </a>`)
    }else{
      return renderHTML(this.props.artifact.url)
    }
  }

  handleChange = event =>{
    this.setState({
      content: event.target.value,
    })
  }

  handleSave = event =>{
    event.preventDefault();
    if (this.state.content !== ''){
      this.props.createComment(this.state)
      this.setState({
        content: ''
      })
    }else{
      console.log('all fields required')
    }
  }

  handleModal = event => {
    return this.props.artifact.comments.map((comment, idx) => {
      return <p key={idx}>{comment.content} <Divider /></p>
    })
  }

  handleChangeComplete = (color) => {

  this.setState({ artifactColor: color.hex });

};

  handleDelete = event => {
    event.preventDefault()
    this.props.deleteArtifactFromDb(this.props.artifact.id)
  }



  render(){
    const artifactBackground = {backgroundColor: this.state.artifactColor}

    return(
        <div className='artifact-container'>
          <Segment style={artifactBackground} attached='top' textAlign="center" compact>
            {this.mediaRender()}
          </Segment>
          <Segment attached='bottom'>
          <Form>
            <Form.Group>
              <Form.Input value={this.state.content} placeholder="Add Note" onChange={this.handleChange} size="small"></Form.Input>
              <Button onClick={this.handleSave} size="small" floated="right">Save</Button>
              <Modal trigger ={
                <Button onClick={this.handleModal} color='green' floated="right">View Notes</Button>}>
                <Modal.Header>Artifact Notes</Modal.Header>
                <Modal.Content>
                  <div>
                    {this.handleModal()}
                  </div>
                </Modal.Content>
              </Modal>
              <Button float='right' onClick={this.handleDelete} color='red' floated="right">X</Button>
            </Form.Group>
          </Form>
          <HuePicker
            color={this.state.artifactColor}
            onChangeComplete={ this.handleChangeComplete }
         />
          </Segment>
        </div>
      )
    }
  }

  function mapStateToProps(state){
    return{
      storeArtifacts: state.artifacts.artifacts
    }
  }

  function mapDispatchToProps(dispatch){
    return{
      createComment: (params) => {
        dispatch(createComment(params))
      },
      deleteArtifactFromDb: (artifact) => {
        dispatch(deleteArtifactFromDb(artifact))
      }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ArtifactCard)
