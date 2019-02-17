import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadableList from 'components/LoadableList';

import BlogItem from '../../components/BlogItem';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class BlogTabContent extends Component {
  render() {
    const articles = this.props.doctor.get('articles').toJS();

    return (
      <div className="profile-tabs__about">
        <LoadableList limit={2} btnText="Load More Articles" items={articles}>
          {(item, index) => (
            <BlogItem
              key={`blog_${index}`}
              title={item.title}
              url={item.url}
              imgSrc={item.imgSrc}
              date={item.date}
              author={item.author}
            >
              {item.description}
            </BlogItem>
          )}
        </LoadableList>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(BlogTabContent);
