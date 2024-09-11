/*global module require*/

const JSend = require("../jsend");

function createContact(req, res) {
  return res.status(201).json(JSend.success({ contact: {} }));
}

function getContactsByFilter(req, res) {
  const filters = [];
  const { favorite, name } = req.query;

  if (favorite !== undefined) {
    filters.push(`favorite=${favorite}`);
  }
  if (name) {
    filters.push(`name=${name}`);
  }
  console.log(filters.join("&"));
  return res.json(
    JSend.success({
      contacts: [],
    })
  );
}

function getContact(req, res) {
  return res.json(JSend.success({ contact: {} }));
}

function updateContact(req, res) {
  return res.json(JSend.success());
}

function deleteContact(req, res) {
  return res.json(JSend.success());
}

function deleteAllContacts(req, res) {
  return res.json({
    message: "All contact deleted",
  });
}

module.exports = {
  createContact,
  getContactsByFilter,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
};
