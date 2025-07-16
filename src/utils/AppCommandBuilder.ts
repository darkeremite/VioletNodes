import {
	ApplicationCommandType,
	BaseApplicationCommandData,
	LocalizationMap,
	PermissionResolvable,
	ApplicationCommandData,
	ChatInputApplicationCommandData,
	UserApplicationCommandData,
	MessageApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandOptionData,
} from 'discord.js'
import { AppCommandExecute } from '../types/AppCommandExecute.js'
import { AppCommandData } from '../types/AppCommandData.js'
import AppCommandOptionBuilder from './AppCommandOptionBuilder.js'

class AppCommandBuilder<T extends ApplicationCommandType>
	implements BaseApplicationCommandData
{
	private _type: ApplicationCommandType
	private _name: string
	private _nameLocalizations?: LocalizationMap
	private _dmPermission?: boolean
	private _defaultMemberPermissions?: PermissionResolvable | null
	private _nsfw?: boolean

	// ChatInput Command Options
	private _description?: string
	private _options?: AppCommandOptionBuilder<ApplicationCommandOptionType>[]

	private _execute: AppCommandExecute

	constructor(
		data: T extends ApplicationCommandType.ChatInput
			? ChatInputApplicationCommandData & AppCommandData
			: T extends ApplicationCommandType.User
			? UserApplicationCommandData & AppCommandData
			: T extends ApplicationCommandType.Message
			? MessageApplicationCommandData & AppCommandData
			: never
	) {
		this._name = data.name
		this._nameLocalizations = data.nameLocalizations
		this._dmPermission = data.dmPermission
		this._defaultMemberPermissions = data.defaultMemberPermissions
		this._nsfw = data.nsfw

		switch (data.type) {
			case ApplicationCommandType.ChatInput:
				this._type = ApplicationCommandType.ChatInput
				this._description = data.description
				break
			default:
				throw new Error('Invalid AppCommand Type')
		}

		this._execute = data.execute
	}

	get type(): number {
		return this._type.valueOf()
	}

	get name(): string {
		return this._name
	}

	get dmPermission(): boolean | undefined {
		return this._dmPermission
	}

	get defaultMemberPermissions(): PermissionResolvable | null | undefined {
		return this._defaultMemberPermissions
	}

	get nsfw(): boolean | undefined {
		return this._nsfw
	}

	get execute(): AppCommandExecute {
		return this._execute
	}

	get description(): string | undefined {
		return this._description
	}

	get options(): ApplicationCommandOptionData[] {
		if (!this._options) {
			return []
		}
		return this._options.map(option => {
			return option.data()
		})
	}

	// Method for converting a command into a standard Discord API
	data(): ApplicationCommandData {
		const returnData: ApplicationCommandData = {
			type: this.type,
			name: this.name,
			nameLocalizations: this._nameLocalizations,
			dmPermission: this.dmPermission,
			defaultMemberPermissions: this.defaultMemberPermissions,
			nsfw: this.nsfw,
		}
		if (this.type === ApplicationCommandType.ChatInput) {
			return {
				...returnData,
				type: ApplicationCommandType.ChatInput,
				description: this.description!,
				options: this.options,
			}
		}
		if (this.type === ApplicationCommandType.User) {
			return {
				...returnData,
			}
		}
		if (this.type === ApplicationCommandType.Message) {
			return {
				...returnData,
			}
		}
		throw new Error('Invalid AppCommand Type')
	}
}

export default AppCommandBuilder
