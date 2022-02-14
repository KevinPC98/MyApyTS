import { create } from 'domain'
import { Router } from 'express'
import { createUser, deleteUser, getUsers, getUsersById, updateUser } from '../controller/index.controller'

const router = Router()

router.get('/test', (req, res) => res.send('Running succesfully'))
router.get('/users', getUsers)
router.get('/users/:id', getUsersById)
router.post('/users/', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
/* 
router.post('/users/', getUser)
router.put('/users/:id', getUser)
*/

export default router