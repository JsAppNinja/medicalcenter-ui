const { uid } = require('rand-token');
const moment = require('moment');
const _ = require('lodash');
const neo4j = require('../config/neo4j');
const { filters } = require('../lib');
const mailService = require('./email');

function createOrder(order) {
  const props = _.pick(order, [
    'uuid',
    'transactionId',
    'consultDateOne',
    'consultDateTwo',
    'consultDateThree',
    'consultDateFour',
    'zipcode',
    'firstName',
    'lastName',
    'email',
    'phone',
    'dob',
    'total',
    'billingAddress',
    'billingZipcode',
    'cc',
    'cardToken',
    'expire',
    'timestamp',
  ]);
  const { bundleID, doctorID } = order;

  const statement = `
    MATCH (p:Provider)<-[:BUNDLE]-(b:Bundle)
    WHERE (p.canonical_name="${doctorID}" OR p.uuid="${doctorID}") AND (b.uuid="${bundleID}")
    WITH b
    CREATE (o:Order)-[:BOOKED]->(b)
    SET o={props}
  `;

  const session = neo4j.session();
  return session
    .writeTransaction((transaction) => transaction.run(statement, { props }))
    .then(() => {
      session.close();
      return order;
    });
}

function processOrder(req) {
  if (!req) {
    throw new Error('Data was not provided');
  }

  const orderObject = {
    uuid: uid(16),
    transactionId: '',
    consultDateOne: '',
    consultDateTwo: '',
    consultDateThree: '',
    consultDateFour: '',
    zipcode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    total: '',
    billingAddress: '',
    billingZipcode: '',
    cc: '',
    cardToken: '',
    expire: '',
    terms: '',
    hipaa: '',
    timestamp: moment().unix(),
  };

  // check for required fields
  const required = filters.orderPayloadRequired(req.body);
  if (required.error) {
    throw new Error(required.message);
  }

  // filter each form field against data type, format and whitelist
  Object.keys(req.body).forEach((k) => {
    const filter = filters.orderPayloadFilter(k, req.body[k]);
    if (filter.error) {
      throw new Error(filter.message);
    }
    orderObject[k] = req.body[k];
  });

  return createOrder(orderObject)
    .then(() => {
      mailService.sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `Checkout for ${orderObject.doctorName} - $${orderObject.total}`,
        text: [
          `Subtotal: $${orderObject.subtotal}`,
          `Discount: -$${orderObject.discount}`,
          `Coupon: ${orderObject.coupon}`,
          '---------------------------------',
          `Total: $${orderObject.total}`,
          '',
          `Guest Name: ${orderObject.firstName} ${orderObject.lastName}`,
          `Doctor Name: ${orderObject.doctorName}`,
          `Doctor UUID: ${orderObject.doctorID}`,
          `Bundle: ${orderObject.bundleTitle}`,
          `Bundle UUID: ${orderObject.bundleID}`,
          `Date One: ${orderObject.consultDateOne}`,
          `Date Two: ${orderObject.consultDateTwo}`,
          `Date Three: ${orderObject.consultDateThree}`,
          `Date Four: ${orderObject.consultDateFour}`,
          `Email: ${orderObject.email}`,
          `Zipcode: ${orderObject.zipcode}`,
          `Phone: ${orderObject.phone}`,
          `DOB: ${orderObject.dob}`,
          `Billing Address: ${orderObject.billingAddress}`,
          `Billing Zipcode: ${orderObject.billingZipcode}`,
          `Card Number: ${orderObject.cc}`,
          `Card Token: ${orderObject.cardToken}`,
          `Card Type: ${orderObject.cardType}`,
        ].join('\n'),
      });
      mailService.sendEmail({
        to: orderObject.email,
        subject: `Checkout successful for appointment with ${orderObject.doctorName}`,
        text: [
          'Checkout Details',
          '-----------------------',
          `Subtotal: $${orderObject.subtotal}`,
          `Discount: -$${orderObject.discount}`,
          `Coupon: ${orderObject.coupon}`,
          '---------------------------------',
          `Total: $${orderObject.total}`,
          '',
          `Name: ${orderObject.firstName} ${orderObject.lastName}`,
          `Doctor Name: ${orderObject.doctorName}`,
          `Doctor UUID: ${orderObject.doctorID}`,
          `Bundle: ${orderObject.bundleTitle}`,
          `Bundle UUID: ${orderObject.bundleID}`,
          `Date One: ${orderObject.consultDateOne}`,
          `Date Two: ${orderObject.consultDateTwo}`,
          `Date Three: ${orderObject.consultDateThree}`,
          `Date Four: ${orderObject.consultDateFour}`,
          `Billing Address: ${orderObject.billingAddress}`,
          `Billing Zipcode: ${orderObject.billingZipcode}`,
          `Card Number: ${orderObject.cc}`,
          `Card Type: ${orderObject.cardType}`,
        ].join('\n'),
      });

      return {
        result: orderObject,
      };
    }).catch((e) => {
      console.error(e); // eslint-disable-line
    });
}

module.exports = {
  processOrder,
};
