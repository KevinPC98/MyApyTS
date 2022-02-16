import { Router } from 'express'
import { createUser, deleteUser, getUsers, getUsersById, updateUser } from '../controllers/index.controller'

const router = Router()

router.get('/test', (req, res) => res.send('Running succesfully'))
router.get('/users', getUsers)
router.get('/users/:id', getUsersById)
router.post('/users/', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router