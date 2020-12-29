const FactoryGirl = require('factory-girl');
const ObjectionAdapter = require('factory-girl-objection-adapter')

const initializeUserFactory = require('./user');

const factory = FactoryGirl.factory;
factory.setAdapter(new ObjectionAdapter())

initializeUserFactory(factory);

module.exports = factory;
