import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import { IUser, encrypPassword, validatePassword } from "../models/user";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  //User signup
  const user: IUser = {
    username: req.body.name_user,
    email: req.body.email,
    password: req.body.password,
  };
  user.password = await encrypPassword(user.password);
  //Token
  const response: QueryResult = await pool.query(
    "INSERT INTO PERSON (name_user, email, password) VALUES ($1, $2, $3)",
    [user.username, user.email, user.password]
  );

  const token: string = jwt.sign({ _id: response.oid }, "ssdds");
  console.log(user);
  res.header("auth-token", token).json(response);
};

export const signin = async (req: Request, res: Response) => {
  const response: QueryResult = await pool.query(
    "SELECT (name_user, email, password) FROM PERSON WHERE EMAIL = ($1) LIMIT  1",
    [req.body.email]
  );
  if (!response.rows[0]) return res.status(400).json("Email is wrong");
  const correctPassword: boolean = await validatePassword(
    req.body.password,
    "$2a$10$2JFHzZsw9zmy.ZMrgsnTruTeQkrDx7S8CVLnWo1UWkfmlSboKT3wS"
  );
  if (!correctPassword) return res.status(400).json("Invalid password");

  const token: string = jwt.sign({ _id: response.oid }, "ssdds", {
    expiresIn: 60 * 60 * 24,
  });
  console.log(token);
  res.header("auth-token", token).json(response);
};

export const profile = (req: Request, res: Response) => {
  res.send("profile");
};
//solving fryday
