import { version } from '../../package.json'
import { Router } from 'express'
import login from './login/login'
import LoginService from './login/loginService'
import users from './user/userController'
import UserService from './user/userService'
import tokenInterceptor from '../middleware/tokenInterceptor'
import ChatService from './chat/chatService'
import DialogService from './chat/dialogService'
import MedicalService from './chat/medicalStructureService'
import chat from './chat/chatController'
import patients from './patient/patientController'

export default ({ config, QB }) => {
	let api = Router()
	
	//Handle token
	api.use(tokenInterceptor)

	// mount the login resource
	let loginService = new LoginService(QB)
	api.use('/login', login({ loginService }))

	// mount the user resource
	let userService = new UserService(QB)
	api.use('/users', users({ userService }))

	//Medical Service
	let medicalService = new MedicalService(config.medicalService)

	// mount the patient resource
	api.use('/patients', patients({ medicalService }))

	// mount the chat resource
	let dialogService = new DialogService(QB, userService)
	let chatService = new ChatService(QB, medicalService, dialogService)
	api.use('/chat', chat({ chatService, dialogService }))

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version })
	});

	return api
}