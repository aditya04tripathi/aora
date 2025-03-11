import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">{title}</Text>

			<View className="flex-row items-center px-4 w-full h-16 rounded-2xl border-2 border-black-200 focus:border-secondary bg-black-100">
				<TextInput
					autoCapitalize={
						title !== "Email" || title !== "Username" ? "none" : "words"
					}
					className="flex-1 text-base text-white font-psemibold"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					{...props}
				/>

				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword((pv) => !pv)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
