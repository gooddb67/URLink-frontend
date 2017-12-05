import React from 'react'
import TopicList from '../components/TopicList';
import TopicShow from '../components/TopicShow'
import TopicNew from '../components/TopicNew'

  export default class TopicGrid extends React.Component{

  render(){
    return (
            <div>
              <TopicNew topic={this.props.selectTopic}/>

                <TopicList
                  onDelete={this.props.onDelete}
                  topics={this.props.topics}
                  topic={this.props.selectTopic}
                  onSelect={this.props.onSelect}
                />

            <TopicShow topic={this.props.selectTopic} />
          </div>
      )
    }
  }
