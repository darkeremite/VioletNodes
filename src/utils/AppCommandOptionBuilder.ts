import {
	ApplicationCommandAttachmentOption,
	ApplicationCommandBooleanOptionData,
	ApplicationCommandChannelOptionData,
	ApplicationCommandMentionableOptionData,
	ApplicationCommandNumericOptionData,
	ApplicationCommandOptionAllowedChannelTypes,
	ApplicationCommandOptionData,
	ApplicationCommandOptionType,
	ApplicationCommandRoleOptionData,
	ApplicationCommandStringOptionData,
	ApplicationCommandUserOptionData,
	BaseApplicationCommandOptionsData,
	LocalizationMap,
} from 'discord.js'

class AppCommandOptionBuilder<T extends ApplicationCommandOptionType>
	implements BaseApplicationCommandOptionsData
{
	private _type: ApplicationCommandOptionType
	private _name: string
	private _nameLocalizations?: LocalizationMap
	private _description: string
	private _descriptionLocalizations?: LocalizationMap
	private _required?: boolean
	private _autocomplete?: boolean

	// Channel Options
	private _channelTypes?: readonly ApplicationCommandOptionAllowedChannelTypes[]

	// Numeric Options (MinValue, MaxValue) / String Options (minLength, maxLength)
	private _min?: number
	private _max?: number

	constructor(
		data: T extends ApplicationCommandOptionType.Attachment
			? ApplicationCommandAttachmentOption
			: T extends ApplicationCommandOptionType.Boolean
			? ApplicationCommandBooleanOptionData
			: T extends ApplicationCommandOptionType.Channel
			? ApplicationCommandChannelOptionData
			: T extends ApplicationCommandOptionType.Integer
			? ApplicationCommandNumericOptionData
			: T extends ApplicationCommandOptionType.Number
			? ApplicationCommandNumericOptionData
			: T extends ApplicationCommandOptionType.Mentionable
			? ApplicationCommandMentionableOptionData
			: T extends ApplicationCommandOptionType.Role
			? ApplicationCommandRoleOptionData
			: T extends ApplicationCommandOptionType.String
			? ApplicationCommandStringOptionData
			: ApplicationCommandUserOptionData
	) {
		this._type = data.type
		this._name = data.name
		this._nameLocalizations = data.nameLocalizations
		this._description = data.description
		this._descriptionLocalizations = data.descriptionLocalizations
		this._required = data.required
		this._autocomplete = data.autocomplete

		switch (data.type) {
			case ApplicationCommandOptionType.Channel:
				this._channelTypes = data.channelTypes
					? data.channelTypes
					: data.channel_types
				break
			case ApplicationCommandOptionType.Integer:
				this._min = data.minValue ? data.minValue : data.min_value
				this._max = data.maxValue ? data.maxValue : data.max_value
				break
			case ApplicationCommandOptionType.String:
				this._min = data.minLength ? data.minLength : data.min_length
				this._max = data.maxLength ? data.maxLength : data.max_length
				break
		}
	}

	get type(): number {
		return this._type.valueOf()
	}

	get name(): string {
		return this._name
	}

	get description(): string {
		return this._description
	}

	get required(): boolean | undefined {
		return this._required
	}

	get channelTypes():
		| readonly ApplicationCommandOptionAllowedChannelTypes[]
		| undefined {
		return this._channelTypes
	}

	get channel_types():
		| readonly ApplicationCommandOptionAllowedChannelTypes[]
		| undefined {
		return this._channelTypes
	}

	get minValue(): number | undefined {
		return this._min
	}

	get min_value(): number | undefined {
		return this._min
	}

	get maxValue(): number | undefined {
		return this._max
	}

	get max_value(): number | undefined {
		return this._max
	}

	get minLength(): number | undefined {
		return this._min
	}

	get min_length(): number | undefined {
		return this._min
	}

	get maxLength(): number | undefined {
		return this._max
	}
	get max_length(): number | undefined {
		return this._max
	}

	// Method for converting a command into a standard Discord API
	data(): ApplicationCommandOptionData {
		const returnData: ApplicationCommandOptionData = {
			type: this.type,
			name: this.name,
			nameLocalizations: this._nameLocalizations,
			description: this.description,
			descriptionLocalizations: this._descriptionLocalizations,
			required: this.required,
		}
		if (this.type === ApplicationCommandOptionType.Channel) {
			return {
				...returnData,
				type: ApplicationCommandOptionType.Channel,
				channelTypes: this.channelTypes,
				autocomplete: undefined,
			}
		}
		if (this.type === ApplicationCommandOptionType.Number) {
			return {
				...returnData,
				type: ApplicationCommandOptionType.Number,
				minValue: this.minValue,
				maxValue: this.maxValue,
				choices: undefined,
			}
		}
		if (this.type === ApplicationCommandOptionType.Integer) {
			return {
				...returnData,
				type: ApplicationCommandOptionType.Integer,
				minValue: this.minValue,
				maxValue: this.maxValue,
				choices: undefined,
			}
		}
		if (this.type === ApplicationCommandOptionType.String) {
			return {
				...returnData,
				type: ApplicationCommandOptionType.String,
				minLength: this.minLength,
				maxLength: this.maxLength,
				choices: undefined,
			}
		}
		return returnData
	}
}

export default AppCommandOptionBuilder
