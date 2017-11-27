import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchTopics, selectTopic } from "../actions/topics";
import { fetchArtifacts } from "../actions/artifacts";
import TopicList from '../components/TopicList';
import TopicShow from '../components/TopicShow'
import TopicNew from '../components/TopicNew'
import SubtopicShow from './SubtopicShow'
import SubtopicNew from '../components/SubtopicNew'


class TopicContainer extends Component {
  componentDidMount(){
     this.props.fetchTopics()
     this.props.fetchArtifacts()
  }

  render() {
    return (
      <div>
        <Route exaxt path={`${this.props.match.url}/${this.props.selectTopic.id}/subtopics/:subtopicId`} component={SubtopicShow} />
        <Route exact path={this.props.match.url} render={() => (
          <div>
            <TopicList topics={this.props.topics} onSelect={this.props.onSelect}/>
            <TopicNew />
            <TopicShow topic={this.props.selectTopic} />
          </div>
        )}/>

      </div>
    );
  }
}

  function mapStateToProps(state) {
    return {
      topics: state.topics.topics,
      selectTopic: state.topics.selectTopic,
      isLoading: state.isLoading
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchTopics: () => {
        dispatch(fetchTopics());
      },
      fetchArtifacts: () => {
        dispatch(fetchArtifacts())
      },
      onSelect: topic => {
        dispatch(selectTopic(topic))
      }
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(TopicContainer);