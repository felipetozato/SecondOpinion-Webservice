"use strict"

import { Router } from 'express'
import { asyncMiddleware } from '../../middleware/asyncMiddleware'
//@ts-check

/**
 * @param { ChatService } chatService: ChatService
 * @param { DialogService } dialogService: DialogService
 */
export default ({ chatService, dialogService }) => {
    let api = Router()

    api.post('/connect', asyncMiddleware( async (req, res, next) => {
        let userId = req.body.userId
        let password = req.body.password
        let result = await chatService.connect(userId, password)
        res.sendStatus(200)
    }))

    api.post('/private_message', asyncMiddleware( async (req, res, next) => {
        let recipientUserId = req.body.recipient_id
        let message = req.body.message
        let result = await chatService.sendMessageToUser(recipientUserId, message)
        console.log(result)
        res.status(200).send(result)
    }))

    api.get('/', asyncMiddleware( async (req, res, next) => {
        let result = await chatService.getAllChats(req.query.page, req.query.per_page)
        res.status(200).send(result)
    }))

    api.get('/:dialogId/history', asyncMiddleware( async (req, res, next) => {
        let result = await chatService.getMessagesHistory(req.params.dialogId, req.query.page, req.query.per_page)
        res.statusCode = 200
        res.send(result)
    }))

    return api
}