const routes = require('express').Router();
const cartRoutes = require('./cart.routes');
const doctorRoutes = require('./doctor.routes');
const doctorsRoutes = require('./doctors.routes');
const emailRoutes = require('./email.routes');
const orderRoutes = require('./order.routes');
const partnerRoutes = require('./partner.routes');
const packageRoutes = require('./package.routes');
const packagesRoutes = require('./packages.routes');
const profileRoutes = require('./profile.routes');
const wishlistRoutes = require('./wishlist.routes');
const contactRoutes = require('./contact.routes');
const quicksearchRoutes = require('./quicksearch.routes');
const couponRoutes = require('./coupon.routes');
const onboardingRoutes = require('./onboarding.routes');
const fileRoutes = require('./file.routes');

// WISHLIST ENDPOINTS
routes.use('/wishlist', wishlistRoutes);

// CART ENDPOINTS
routes.use('/cart', cartRoutes);

// EMAIL ENDPOINTS
routes.use('/email', emailRoutes);

// DOCTOR ENDPOINTS
routes.use('/doctors', doctorsRoutes);
routes.use('/doctor', doctorRoutes);

// PACKAGE ENDPOINTS
routes.use('/packages', packagesRoutes);
routes.use('/package', packageRoutes);

// ORDER ENDPOINTS
routes.use('/order', orderRoutes);

// PROFILE ENDPOINTS
routes.use('/profile', profileRoutes);

// PARTNER ENDPOINTS
routes.use('/partner', partnerRoutes);

// CONTACT US ENDPOINTS
routes.use('/contact', contactRoutes);

// QUICK SEARCH
routes.use('/quick-search', quicksearchRoutes);

// COUPON
routes.use('/coupon', couponRoutes);

// Onboarding
routes.use('/onboarding', onboardingRoutes);

// file upload
routes.use('/file', fileRoutes);

module.exports = routes;
