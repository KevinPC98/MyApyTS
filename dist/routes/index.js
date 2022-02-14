"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controller/index.controller");
const router = (0, express_1.Router)();
router.get('/test', (req, res) => res.send('Running succesfully'));
router.get('/users', index_controller_1.getUsers);
router.get('/users/:id', index_controller_1.getUsersById);
router.post('/users/', index_controller_1.createUser);
router.put('/users/:id', index_controller_1.updateUser);
router.delete('/users/:id', index_controller_1.deleteUser);
/*
router.post('/users/', getUser)
router.put('/users/:id', getUser)
*/
exports.default = router;
