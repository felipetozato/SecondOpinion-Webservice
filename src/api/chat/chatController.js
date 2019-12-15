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
        let isNew = req.query.isNew
        let message = req.body.message
        var result = null;
        if (req.body.recipient_id) {
            let recipientUserId = req.body.recipient_id
            let senderId = req.body.sender_id
            result = await chatService.sendMessageToUser(recipientUserId, senderId, message, isNew)
        } else {
            let dialogId = req.body.chat_dialog_id
            let senderId = req.body.sender_id
            result = await chatService.sendMessageToDialog(dialogId, senderId, message)
        }
        console.log(result)
        res.status(200).send(result)
    }))

    api.post('/group_dialog', asyncMiddleware( async (req, res, next) => {
        let params = req.body;
        console.log(params)
        let result = await chatService.createrGroupDialog(params.type, params.occupants_ids, params.name)
        res.status(201).send(result)
    }))

    api.get('/', asyncMiddleware( async (req, res, next) => {
        let result = await chatService.getAllChats(req.query.page, req.query.per_page)
        console.log(result)
        res.status(200).send(result)
    }))

    api.get('/:dialogId/history', asyncMiddleware( async (req, res, next) => {
        let result = await chatService.getMessagesHistory(req.params.dialogId, req.query.page, req.query.per_page)
        res.statusCode = 200
        res.send(result)
    }))

    api.get('/suggestions', asyncMiddleware( async (req, res, next) => {
        if (req.query.doctor_id == undefined) {
            res.statusCode = 400
            res.send()
            return;
        }
        let result = await chatService.getSuggestionList(req.query.doctor_id)
        console.log(result)
        res.statusCode = 200
        res.send(result)
    }))

    return api
}