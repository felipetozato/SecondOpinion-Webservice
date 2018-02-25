"use strict"

import { Router } from 'express';
import asyncMiddleware from '../../middleware/asyncMiddleware'
//@ts-check

/**
 * @param {LoginService} loginService: LoginService
 */
export default ({ loginService }) => {
    let api = Router()

    api.post('/', async (req, res, next) => {
        try {
            let result = await loginService.loginWithEmail(req.body.email, req.body.password)
            res.statusCode = 200
            res.send(result)
        } catch (e) {
            next(e)
        }
    });

    return api
}