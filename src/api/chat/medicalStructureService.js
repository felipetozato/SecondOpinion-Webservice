"use sctrict"
import request from 'request-promise'

export default class MedicalStructureService {

    constructor(baseUrl, mongoDbService) {
        this._baseUrl = baseUrl
        this._mongoDbService = mongoDbService
    }

    /**
     * 
     * @param {string} message 
     * @returns {Promise<void>} save and process result
     */
    saveAndProcess(message, senderId) {
        console.log("AQUIIII")
        console.log(message)
        console.log(senderId)
        let option = {
            method: 'POST',
            uri: this._baseUrl + "/processText",
            body: {
                body: message,
                doctorName: senderId
            },
            json: true
        }
        return request.post(option)
    }

    /**
     * Return a list of all patients
     * 
     * @returns {Promise<Array<Patient>>} a list of patients objects
     */
    getAllPatients() {
        let option = {
            method: 'GET',
            uri: this._baseUrl + "/patients",
            json: true
        }
        return request.get(option)
    }

    /**
     * Return all data of a patient based on it's name
     * 
     * @param {String} patient name 
     * @returns {Document} document with all things
     */
    getPatientData(name) {
        let option = {
            method: 'POST',
            uri: this._baseUrl + "/patients/data",
            json: true,
            body: {
                "name": name
            }
        }
        return request.post(option)
    }
    
    getSuggestionList(doctorId) {
        let option = {
            method: 'GET',
            uri: this._baseUrl + "/doctor/word_count?name=" + doctorId,
            json: true
        }
        return request.get(option)
    }
}