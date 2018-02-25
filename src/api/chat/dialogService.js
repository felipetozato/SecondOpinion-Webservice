"use strict"

import { QuickBlox } from 'quickblox'

//@ts-check
export default class DialogService {

    /**
     * Create a new instance of LoginService
     * 
     * @param {QuickBlox} quickblox
     */
    constructor(quickblox) {
        this._quickblox = quickblox
    }

    createPrivateDialog(toId) {
        let params = {
            type: 3,
            occupants_ids: [toId]
        }
        return new Promise((resolve, reject) => {
            this._quickblox.chat.dialog.create(params, (err, createdDialog) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    console.log(err)
                    resolve(createdDialog)
                }
            })
        })
    }
}