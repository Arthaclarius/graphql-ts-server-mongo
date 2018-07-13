import { changeUserPassword } from './changeUserPassword'
import { lockUser } from './lockUser'
import { registerUser } from './registerUser'
import { removeUserSessions } from './removeUserSessions'
import { saveUserSession } from './saveUserSession'
import { unlockUser } from './unlockUser'

export const UserLogic = {
	removeUserSessions,
	registerUser,
	saveUserSession,
	changeUserPassword,
	lockUser,
	unlockUser
}
