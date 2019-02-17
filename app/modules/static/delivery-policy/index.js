import React, { Component } from 'react';
import PageTitle from 'components/PageTitle';
import StaticPage from 'containers/StaticPage';

class DeliveryPolicyPage extends Component {
  render() {
    return (
      <StaticPage>
        <PageTitle title="Delivery Policy" />
        <ul>
          <li>After you make a successful payment in the care service, you will get an email confirming your purchase date and details of your purchase details (i.e., the confirmation code, the purchase price, the care service appointment location, the physician you choose, the provider’s contact phone number) within 24 hours of your purchase (most of the time, the purchase confirmation email is delivered to you within one hour of your purchase time).</li>
          <li>Once the chosen healthcare provider reviews the appointment times proposed by you, he/she will either confirm with you or propose a new appointment time to you in a following email within 72 hours of your purchase (most of the time, the appointment time email from providers is delivered to you within 24 hours of your purchase time.  The exact delivery time may vary among providers). If you have not received such email within 72 hours of your purchase, please call the provider’s contact phone number provided to you in the first purchase confirmation email. Please let the provider’s office know your confirmation code and your name and ask for appointment confirmation. KangarooHealth system will always remind providers about appointment time confirmation with you at the earliest convenience of the providers.</li>
        </ul>
      </StaticPage>
    );
  }
}

export default DeliveryPolicyPage;
