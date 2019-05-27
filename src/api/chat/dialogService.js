"use strict"

import { QuickBlox } from 'quickblox'

//@ts-check
export default class DialogService {

    /**
     * Create a new instance of LoginService
     * 
     * @param {QuickBlox} quickblox
     */
    constructor(quickblox, userService) {
        this._quickblox = quickblox
        this._userService = userService
    }

    createPrivateDialog(toId) {
        this._userService.getSingleUser(toId)
            .then(user => {
                let params = {
                    type: 3,
                    occupants_ids: [toId],
                    photo: user.photo
                }
                return new Promise((resolve, reject) => {
                    this._quickblox.chat.dialog.create(params, (err, createdDialog) => {
                        if (err !== null) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(createdDialog)
                        }
                    })
                })
            })
    }
}