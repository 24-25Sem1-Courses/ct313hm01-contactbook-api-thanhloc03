/* eslint-disable no-unused-vars */

const express = require("express");
const contactsController = require("../controllers/contacts.controller");
const {methodNotAllowed} = require('../controllers/errors.controller');
const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerUi } = require("../docs/swagger");

const avatarUpload = require('../middlewares/avatar-upload.middleware');


const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/contacts", router);

  /**
   * @swagger
   * /api/v1/contacts:
   *   get:
   *     summary: Get contacts by filter
   *     description: Get contacts by filter
   *     parameters:
   *       - in: query
   *         name: favorite
   *         schema:
   *           type: boolean
   *         description: Filter by favorite status
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filter by contact name
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: A list of contacts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contacts:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Contact'
   *                     metadata:
   *                       $ref: '#/components/schemas/PaginationMetadata'
   *       400:
   *         description: Bad Request - Invalid parameters or missing required fields.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       404:
   *         description: Not Found - No contacts matching the filter criteria were found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.get("/", contactsController.getContactsByFilter);

  router.get("/", contactsController.getContactsByFilter);

  /**
   * @swagger
   * /api/v1/contacts:
   *   post:
   *     summary: Create a new contact
   *     description: Create a new contact
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Contact'
   *     tags:
   *       - contacts
   *     responses:
   *       201:
   *         description: A new contact has been created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contact:
   *                       $ref: '#/components/schemas/Contact'
   *       400:
   *         description: Bad Request - Invalid input or missing required fields.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       409:
   *         description: Conflict - The contact already exists.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       422:
   *         description: Unprocessable Entity - Validation errors.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.post("/", contactsController.createContact);
  router.post("/", avatarUpload, contactsController.createContact);

  /**
   * @swagger
   * /api/v1/contacts:
   *   delete:
   *     summary: Delete all contacts
   *     description: Deletes all contacts from the database.
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: All contacts deleted
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/200NoData'
   *       400:
   *         description: Bad Request - Invalid request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.delete("/", contactsController.deleteAllContacts);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   get:
   *     summary: Get contact by ID
   *     description: Retrieve a contact by its ID
   *     parameters:
   *       - $ref: '#/components/parameters/contactIdParam'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: A contact was found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contact:
   *                       $ref: '#/components/schemas/Contact'
   *       400:
   *         description: Bad Request - Invalid ID format.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       404:
   *         description: Not Found - Contact not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.get("/:id", contactsController.getContact);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   put:
   *     summary: Update contact by ID
   *     description: Update contact by ID
   *     parameters:
   *       - $ref: '#/components/parameters/contactIdParam'
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Contact'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: The contact has been updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contact:
   *                       $ref: '#/components/schemas/Contact'
   *       400:
   *         description: Bad Request - Invalid input or missing required fields.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       404:
   *         description: Not Found - Contact not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       409:
   *         description: Conflict - Duplicate data found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       422:
   *         description: Unprocessable Entity - Validation errors.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.put("/:id", avatarUpload, contactsController.updateContact);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   delete:
   *     summary: Delete contact by ID
   *     description: Delete a contact by its ID
   *     parameters:
   *       - $ref: '#/components/parameters/contactIdParam'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: Contact deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/200NoData'
   *       400:
   *         description: Bad Request - Invalid ID format.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       401:
   *         description: Unauthorized - Authentication required.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       403:
   *         description: Forbidden - Access denied.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       404:
   *         description: Not Found - Contact not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   *       500:
   *         description: Internal Server Error - The server encountered an unexpected condition.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Detailed error message
   */
  router.delete("/:id", contactsController.deleteContact);

  router.all("/:id", methodNotAllowed);
};
