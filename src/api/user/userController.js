"use strict"

import { Router } from 'express';
import { asyncMiddleware } from '../../middleware/asyncMiddleware'
//@ts-check

/**
 * @param { UserService } userService: UserService
 */
export default ({ userService }) => {
    let api = Router()

    api.get('/:userId/', asyncMiddleware( async (req, res, next) => {
        try {
            let result = await userService.getSingleUser(req.params.userId)
            console.log(JSON.stringify(result))
            res.status(200).json(result)
        } catch (ex) {
            res.status(404).send("User: "+req.params.userId+" not found")
            next(ex)
        }
    }))

    api.get('/', asyncMiddleware( async (req, res, next) => {
        let result = await userService.getAllUsers(req.query.page, req.query.per_page)
        res.status(200).json(result)
    }))

    return api
}