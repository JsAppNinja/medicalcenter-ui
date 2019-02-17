import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import ReviewsTabContent from '../ReviewsTabContent';
import CareServicesTabContent from '../CareServicesTabContent';
import AboutTabContent from '../AboutTabContent';
import QATabContent from '../QATabContent';
import BlogTabContent from '../BlogTabContent';
import TravelTabContent from '../TravelTabContent';
import MediaTabContent from '../MediaTabContent';
import MobileTabItem from '../../components/MobileTabItem';

import './style.scss';

class ProfileTabs extends Component {
  renderAdvancedTabs() {
    return [
      <Tab key="qa" eventKey="qa" title="Q&A">
        <QATabContent />
      </Tab>,
      <Tab key="media" eventKey="media" title="Media">
        <MediaTabContent />
      </Tab>,
      <Tab key="blog" eventKey="blog" title="Blogs & Articles">
        <BlogTabContent />
      </Tab>,
      <Tab key="travel" eventKey="travel" title="Travel & Lodging">
        <TravelTabContent />
      </Tab>,
    ];
  }

  renderAdvancedMobileTabs() {
    return [
      <MobileTabItem key="mobile-qa" title="Q&A">
        <QATabContent />
      </MobileTabItem>,
      <MobileTabItem key="media-qa" title="Media">
        <MediaTabContent />
      </MobileTabItem>,
      <MobileTabItem key="mobile-blog" title="Blogs & Articles">
        <BlogTabContent />
      </MobileTabItem>,
      <MobileTabItem key="mobile-travel" title="Travel & Lodging">
        <TravelTabContent />
      </MobileTabItem>,
    ];
  }

  render() {
    const { onSelect, tab, advanced } = this.props;

    return (
      <div className="profile-tabsview">
        <div className="profile-tabsview__desktop">
          <Tabs id="profile-tabs" className="profile-tabs" onSelect={onSelect} activeKey={tab}>
            <Tab eventKey="reviews" title="Reviews">
              <ReviewsTabContent />
            </Tab>
            <Tab eventKey="care-service" title="Care Services & Pricing">
              <CareServicesTabContent advanced={advanced} />
            </Tab>
            <Tab eventKey="about" title="About">
              <AboutTabContent advanced={advanced} />
            </Tab>
            {advanced && this.renderAdvancedTabs()}
          </Tabs>
        </div>
        <div className="profile-tabsview__mobile">
          <MobileTabItem key="mobile-reviews" title="Reviews">
            <ReviewsTabContent />
          </MobileTabItem>
          <MobileTabItem key="mobile-care-service" title="Care Services & Pricing">
            <CareServicesTabContent advanced={advanced} />
          </MobileTabItem>
          <MobileTabItem key="mobile-about" title="About">
            <AboutTabContent advanced={advanced} />
          </MobileTabItem>
          {advanced && this.renderAdvancedMobileTabs()}
        </div>
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  onSelect: PropTypes.func,
  tab: PropTypes.string,
  advanced: PropTypes.bool,
};

ProfileTabs.defaultProps = {
  advanced: true,
};

export default ProfileTabs;
