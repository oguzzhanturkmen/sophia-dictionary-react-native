import React from 'react';
import ContentList from '../../Utils/ContentList';

const ContentListView = ({ id, refreshKey }) => {
  return <ContentList id={id} key={refreshKey}  />;
};

export default ContentListView;
