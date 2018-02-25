"use strict"

import { Router } from 'express';
import { asyncMiddleware } from '../../middleware/asyncMiddleware'
//@ts-check

/**
 * @param { UserService } userService: UserService
 */
export default ({ userService }) => {
    let api = Router()

    api.get('/', asyncMiddleware( async (req, res, next) => {
        let result = await userService.getAllUsers(req.query.token, req.query.page, req.query.per_page)
        console.log(JSON.stringify(result))
        res.status(200).json(result)
    }))

    return api
}