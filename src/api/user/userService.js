"use strict"

//@ts-check
export default class UserService {


    /**
     * Create a new instance of LoginService
     * 
     * @param {QuickBlox} quickblox
     */
    constructor(quickblox) {
        this._quickblox = quickblox
    }

    /**
     * Get all users
     * 
     * @param {string} token 
     * @param {string} page_number 
     * @param {string} amount_per_page 
     */
    getAllUsers(token, page_number, amount_per_page) {
        let params = {page: page_number, per_page: amount_per_page}
        return new Promise((resolve, reject) => {
            this._quickblox.users.listUsers(params, (err, result) => {
                if (err !== null) {
                    reject(err)
                } else {
                    result.items = result.items.map((value) => {
                        return value.user
                    })
                    resolve(result)
                }
            })
        })
    }
}