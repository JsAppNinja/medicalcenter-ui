import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadableList from 'components/LoadableList';

import QAItem from '../../components/QAItem';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class QATabContent extends Component {
  render() {
    const { doctor } = this.props;

    return (
      <div className="profile-tabs__about">
        <LoadableList limit={2} btnText="Load More Questions" items={doctor.get('qa_list').toJS()}>
          {(item, index) => (
            <QAItem question={item.question} key={`question_${index}`}>
              {item.answer}
            </QAItem>
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

export default withConnect(QATabContent);
