"use strict"

import { QuickBlox } from 'quickblox'

//@ts-check
export default class LoginService {

    /**
     * Create a new instance of LoginService
     * 
     * @param {QuickBlox} quickblox
     */
    constructor(quickblox) {
        this._quickblox = quickblox
    }

    /**
     * Do login with email
     * 
     * @param {string} email 
     * @param {string} password
     * 
     * @returns {async} applicationSession
     */
    async loginWithEmail(email, password) {
        console.log("entrou do servico loginWithEmail")
        //let applicationSession = await this._createApplicationSession()
        let userSession = await this._createSession(email, password)
        console.log(login);
        let login = await this._emailLogin(email, password)
        userSession.user_login = login
        return userSession
    }

    /**
     * Create an application sesstion
     * 
     * @returns {Promise} result
     */
    _createApplicationSession() {
        return new Promise((resolve, reject) => {
            this._quickblox.createSession((err, res) => {
                if (err != null) {
                    console.log("Error while creating Application Session")
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    _emailLogin(userEmail, userPassword) {
        console.log("entrou no servico _emailLogin")
        let param = {email: userEmail, password: userPassword}
        return new Promise((resolve, reject) => {
            this._quickblox.login(param, (err, res) => {
                if (err != null) {
                    console.log("Error while trying to login user with email:"+userEmail+" and password:"+userPassword)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    _createSession(userEmail, userPassword) {
        console.log("entrou no servico _emailLogin")
        let param = {email: userEmail, password: userPassword}
        return new Promise((resolve, reject) => {
            this._quickblox.createSession(param, (err, res) => {
                if (err != null) {
                    console.log("Error while trying to login user with email:"+userEmail+" and password:"+userPassword)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}