"use strict"

import { QuickBlox } from 'quickblox'

//@ts-check
export default class ChatService {


    /**
     * Create a new instance of LoginService
     * 
     * @param {QuickBlox} quickblox
     */
    constructor(quickblox) {
        this._quickblox = quickblox
    }

    connect(userId, password) {
        let params = {userId: userId, password: password}
        console.log(params)
        return new Promise((resolve, reject) => {
            this._quickblox.chat.connect(params, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    sendMessageToUser(recipientUserId, message) {
        let msg = {
            recipient_id: recipientUserId,
            message: message,
            send_to_chat: 1,
            save_to_history: 1
        }
        return new Promise((resolve, reject) => {
            let messageId = this._quickblox.chat.message.create(msg, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    getAllChats(page_number, amount_per_page) {
        var filters = {limit: amount_per_page, skip: (page_number - 1) * amount_per_page};
        return new Promise((resolve, reject) => {
            this._quickblox.chat.dialog.list(filters, (err, resDialogs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(resDialogs)
                }
            })
        })
    }

    getMessagesHistory(dialogId, page, per_page) {
        let params = {chat_dialog_id: dialogId, sort_desc: 'date_sent', limit: per_page, skip: (page - 1)*per_page}
        return new Promise((resolve, reject) => {
            this._quickblox.chat.message.list(params, (err, messages) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(messages)
                }
            })
        })
    }
}