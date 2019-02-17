import React, { Component } from 'react';
import PageTitle from 'components/PageTitle';
import StaticPage from 'containers/StaticPage';

class RefundPolicyPage extends Component {
  render() {
    return (
      <StaticPage>
        <PageTitle title="Refund Policy" />

        <ul>
          <li>If you are unable to obtain your selected service, or would like to cancel your selected service more than 48 hours ahead of your service appointment time, we will issue a full refund to you;</li>
          <li>If you would like to cancel your selected service within 48 hours ahead of your service appointment time, we will issue a 50% refund. As the healthcare providers listed on KangarooMD are not employees of KangarooMD or KangarooHealth, we need to pay providers fees for short-notice cancellations.</li>
          <li>If your service appointment time has already passed, we are sorry but we cannot issue any refund.  As the healthcare providers listed on KangarooMD are not employees of KangarooMD or KangarooHealth, we need to pay providers fees for their time booked.</li>
        </ul>
        <p>KangarooMD is founded on the idea of connecting savvy healthcare consumers seeking affordable and reliable care with providers offering high quality care services at fair prices. We are always striving to empower consumers like you with unparalleled transparency, diverse care choices, and retail-like convenience, while enabling providers to fall in love with patient care again by offering fair values for their time and expertise. That is the KangarooMD Promise.</p>

      </StaticPage>
    );
  }
}

export default RefundPolicyPage;
