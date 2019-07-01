"use strict"

//@ts-check
export default class mongoDbService {

    constructor(config) {
        this._config = config
        this._client = require('mongodb').MongoClient
        this.__patientCollection = "patients"
    }

    getPatients() {
        return new Promise((resolve, reject) => {
            this._execute(function(db) {
                try {
                    let result = db.collection(this.__patientCollection).find().project({Patient : 1})
                    resolve(result)    
                } catch(ex) {
                    reject(ex)
                }
            })
        })    
    }

    _execute(action) {
        this._client.connect(this._config.uri, function(err, db) {
            if (err) {
                console.log("An error occured while trying to connect: " + err)
            } else {
                console.log("connected with mongo")
            }
            action(db)
            db.close()
        })
    }
}