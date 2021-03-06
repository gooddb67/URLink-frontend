import React from 'react';
import { Link } from 'react-router-dom';
import SubtopicNew from './SubtopicNew';
import { Grid } from 'semantic-ui-react';

const TopicShow = props => {
  const handleDelete = subtopic => {
    props.onDelete(subtopic.id);
  };

  const getSubtopicLinks = () => {
    if (props.topic.subtopics) {
      return props.topic.subtopics.map((subtopic, idx) => (
        <Grid.Column key={idx}>
          <div className="subtopic-card-container" textalign="center">
            <Link
              id="subtopicName"
              to={`/topics/${props.topic.id}/subtopics/${subtopic.id}`}
            >
              {subtopic.name}
            </Link>
            <div id="deleteSub" onClick={() => handleDelete(subtopic)}>
              X
            </div>
          </div>
        </Grid.Column>
      ));
    }
    return null;
  };

  const subtopicLinks = getSubtopicLinks();

  return (
    <div>
      <div className="subtopic-header">
        <h2>{props.topic ? props.topic.name : null}</h2>
      </div>
      {subtopicLinks ? <SubtopicNew /> : null}
      <Grid columns="two">{subtopicLinks}</Grid>
    </div>
  );
};

export default TopicShow;
