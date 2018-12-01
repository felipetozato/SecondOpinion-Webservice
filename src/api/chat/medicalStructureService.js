"use sctrict"
import request from 'request-promise'

export default class MedicalStructureService {

    /**
     * 
     * @param {string} baseUrl 
     */
    constructor(baseUrl) {
        this._baseUrl = baseUrl
    }

    /**
     * 
     * @param {string} message 
     * @returns {Promise<void>} save and process result
     */
    saveAndProcess(message) {
        let option = {
            method: 'POST',
            uri: this._baseUrl + "/processText",
            body: {
                body: message
            },
            json: true
        }
        return request.post(option)
    }
}