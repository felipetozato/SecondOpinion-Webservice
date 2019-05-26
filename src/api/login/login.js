"use strict"

import { Router } from 'express';
import { asyncMiddleware } from '../../middleware/asyncMiddleware'
//@ts-check

/**
 * @param {LoginService} loginService: LoginService
 */
export default ({ loginService }) => {
    let api = Router()

    api.post('/', async (req, res, next) => {
        try {
            let result = await loginService.loginWithEmail(req.body.email, req.body.password)
            res.status(200).send(result);
        } catch (err) {
            switch (err.code) {
                case 401:
                    res.status(401).send(err)
                default:
                    res.status(err.code).send(err)
            }
        }
    })

    return api
}