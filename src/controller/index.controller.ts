import { Request, Response } from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg' 

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM PERSON')
        return res.status(200).json(response.rows) 
    } catch (error) {
        return res.status(500).json('Internal server error')
    }

}

export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM PERSON WHERE id = $1', [parseInt(req.params.id)])
        return res.status(200).json(response.rows) 
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name_user, email, password } = req.body;
    const response = await pool.query('INSERT INTO PERSON (name_user, email, password) VALUES ($1, $2, $3)', [name_user, email, password]);
    return res.json({
        message: 'User Added successfully',
        body: {
            user: { name_user, email, password }
        }
    })
}

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name_user, email, password } = req.body;

    const response = await pool.query('UPDATE PERSON SET name_user = $1, email = $2, password = $3 WHERE id = $4', [
        name_user,
        email,
        password,
        id
    ]);

    res.json(`User ${id} Updated Successfully`);
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM PERSON where id = $1', [id]);
    return res.json(`User ${id} deleted Successfully`);
};
