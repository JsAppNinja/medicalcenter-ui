const orderTemplates = require('./templates/order.template');

module.exports = {
  template(template, data) {
    let html = '';
    switch (template) {
      case 'orderReceipt':
        html = orderTemplates.orderReceiptTemplate(data);
        break;
      default:
        html = '';
    }
    return html;
  },
};
