"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsersById = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM PERSON');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        return res.status(500).json('Internal server error');
    }
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM PERSON WHERE id = $1', [parseInt(req.params.id)]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUsersById = getUsersById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_user, email, password } = req.body;
    const response = yield database_1.pool.query('INSERT INTO PERSON (name_user, email, password) VALUES ($1, $2, $3)', [name_user, email, password]);
    return res.json({
        message: 'User Added successfully',
        body: {
            user: { name_user, email, password }
        }
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name_user, email, password } = req.body;
    const response = yield database_1.pool.query('UPDATE PERSON SET name_user = $1, email = $2, password = $3 WHERE id = $4', [
        name_user,
        email,
        password,
        id
    ]);
    res.json(`User ${id} Updated Successfully`);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM PERSON where id = $1', [id]);
    return res.json(`User ${id} deleted Successfully`);
});
exports.deleteUser = deleteUser;
