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

    return api;
}