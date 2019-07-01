"use strict"

import { Router } from 'express'
import { asyncMiddleware } from '../../middleware/asyncMiddleware'
import MedicalStructureService from '../chat/medicalStructureService';
//@ts-check

/**
 * @param { MedicalStructureService } medicalService: MedicalStructureService
 */
export default ({ medicalService }) => {
    let api = Router()

    api.get('/', asyncMiddleware( async (req, res, next) => {
        let result = await medicalService.getAllPatients()
        console.log(result)
        res.status(200).send(result)
    }))

    api.get('/data', asyncMiddleware( async (req, res, next) => {
        let name = req.query.name
        if (name == undefined) return res.status(422).send("missing name paramenter")
        let result = await medicalService.getPatientData(name)
        console.log(result)
        res.status(200).send(result)
    }))

    return api;
}