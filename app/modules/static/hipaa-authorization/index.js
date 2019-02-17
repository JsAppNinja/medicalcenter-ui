import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/PageTitle';
import StaticPage from 'containers/StaticPage';

class HipaaAuthorizationPage extends Component {
  render() {
    return (
      <StaticPage>
        <PageTitle title="KangarooHealth Authorization" />

        <p>KangarooHealth offers services, such as helping you to find and learn about nearby healthcare providers, booking appointments and purchasing care services with the healthcare provider(s) of your choice (each, “Your Healthcare Provider”) and managing and forwarding your health history forms and other health-related information to share with Your Healthcare Providers (“KangarooHealth Services”). As part of providing the KangarooHealth Services, KangarooHealth may collect, use, share, and exchange your health history forms and other health-related information with Your Healthcare Providers. Under a federal law called the Health Insurance Portability and Accountability Act (“HIPAA”), some of this health and health-related information may be considered “protected health information” or “PHI” if such information is received from or on behalf of Your Healthcare Providers.</p>

        <h3>Safeguards for PHI</h3>
        <p>HIPAA protects the privacy and security of your PHI by limiting the uses and disclosures of PHI by most healthcare providers and by health plans (called “Covered Entities”) as well as companies, like KangarooHealth, that provide certain types of assistance to Covered Entities (called “Business Associates”). Under certain circumstances described in HIPAA, an individual needs to sign an Authorization form before a Covered Entity, like Your Healthcare Provider(s), can disclose protected health information to a third party.</p>

        <h3>Non-Protected Health Information</h3>
        <p>As a condition of creating your KangarooHealth account, you are required to read and agree to KangarooHealth’s <Link to="/privacy-policy">Privacy Policy</Link>. KangarooHealth’s Privacy Policy explains how KangarooHealth processes and shares information received from you that is not covered by HIPAA (“Non-PHI”).</p>

        <h3>Your PHI Authorization</h3>
        <p>The purpose of this KangarooHealth Authorization (“Authorization”) is to request your written permission to allow KangarooHealth to use and disclose your PHI in the same way as we use and disclose your Non-PHI. If KangarooHealth is a Business Associate of Your Healthcare Providers, KangarooHealth needs your Authorization to be able to use and disclose your PHI in the same way it can currently use and disclose your Non-PHI when KangarooHealth is not working on behalf of Your Healthcare Providers, but is instead working on its own behalf. Therefore, when KangarooHealth relies on this Authorization, and uses and discloses PHI as described in this Authorization, it is not working as a Business Associate and the HIPAA requirements that apply to Business Associates will not apply to such uses and disclosures.</p>
        <p>If you e-sign this Authorization, you give your permission to KangarooHealth to retain your PHI and to use and/or disclose your PHI in the same way that you have agreed that your Non-PHI can be used and disclosed.</p>
        <p>Specifically, you agree that KangarooHealth can use your PHI to:</p>
        <ul>
          <li>enable and customize your use of the KangarooHealth Services; </li>
          <li>provide you alerts or other KangarooHealth Services regarding future appointments; </li>
          <li>notify you regarding providers we think you may be interested in learning more about; </li>
          <li>share information with you regarding services, products or resources about which we think you may be interested in learning more; </li>
          <li>provide you with updates and information about the KangarooHealth Services; market to you about KangarooHealth and third party products and services; </li>
          <li>conduct analysis for KangarooHealth’s business purposes; </li>
          <li>support development of the KangarooHealth Services; and create de-identified information and then use and disclose this information in any way permitted by law, including to third parties in connection with their commercial and marketing efforts.</li>
        </ul>

        <p>You also agree that KangarooHealth can disclose your PHI to:</p>
        <ul>
          <li>third parties assisting KangarooHealth with any of the uses described above;</li>
          <li>Your Healthcare Providers to enable them to refer you to, and make appointments with, other providers on your behalf, or to perform an analysis on potential health issues or treatments, provided that you choose to use the applicable KangarooHealth Service;</li>
          <li>a third party as part of a potential merger, sale or acquisition of KangarooHealth;</li>
          <li>our business partners who assist us by performing core services (such as hosting, billing, fulfillment, or data storage and security) related to the operation or provision of our services, even when KangarooHealth is no longer working on behalf of Your Healthcare Providers; a provider of medical services, in the event of an emergency; an</li>
          <li>organizations that collect, aggregate and organize your information so they can make it more easily accessible to your providers.</li>
        </ul>

        <h3>Redisclosure</h3>
        <p>If KangarooHealth discloses your PHI, KangarooHealth will require that the person or entity receiving your PHI agrees to only use and disclose your PHI to carry out its specific business obligations to KangarooHealth or for the permitted purpose of the disclosure (as described above). KangarooHealth cannot, however, guarantee that any such person or entity to which KangarooHealth discloses your PHI or other information will not re-disclose it in ways that you or we did not intend or permit.</p>

        <h3>Expiration and Revocation of Authorization</h3>
        <p>Your Authorization remains in effect until you provide written notice of revocation to KangarooHealth.</p>
        <p>YOU CAN CHANGE YOUR MIND AND REVOKE THIS AUTHORIZATION AT ANY TIME AND FOR ANY (OR NO) REASON.</p>
        <p>If you wish to revoke this Authorization, you must notify KangarooHealth by submitting a revocation through your account settings page. Your decision not to execute this Authorization or to revoke it at any time will not affect your ability to use certain of the KangarooHealth Services. A Revocation of Authorization is effective after you submit it to</p>
        <p>KangarooHealth, but it does not have any effect on KangarooHealth’s prior actions taken in reliance on the Authorization before revoked.</p>
        <p>Once KangarooHealth receives your Revocation of Authorization, KangarooHealth can only use and disclose your PHI as permitted in KangarooHealth’s agreements with Your Healthcare Provider(s). Your Revocation of Authorization does not affect KangarooHealth’s use of your Non-PHI.</p>
        <p>We will make available to Your Healthcare Provider(s), current and past, your agreement to or revocation of this Authorization.</p>
      </StaticPage>
    );
  }
}

export default HipaaAuthorizationPage;
