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
    getAllUsers(page_number, amount_per_page) {
        let params = {page: page_number, per_page: amount_per_page}
        return new Promise((resolve, reject) => {
            this._quickblox.users.listUsers(params, (err, result) => {
                if (err !== null) {
                    reject(err)
                } else {
                    result.items = result.items.map((value) => {
                        console.log(value.user.custom_data)
                        return this._prepareUserPhotodata(value.user)
                    })
                    resolve(result)
                }
            })
        })
    }

    getSingleUser(userId) {
        return new Promise((resolve, reject) => {
            console.log("user with id: "+userId)
            var params = {filter: { field: 'id', param: 'in', value: [userId] }};
            this._quickblox.users.listUsers(params, (err, result) => {
                if (err !== null) {
                    reject(err)
                } else {
                    let user = result.items[0].user
                    resolve(this._prepareUserPhotodata(user))
                }
            })
        })
    }

    _prepareUserPhotodata(user) {
        if (user.custom_data) {
            let customData = JSON.parse(user.custom_data)
            if (customData.photo) {
                user.photo = customData.photo
            }
        }
        return user
    }
}