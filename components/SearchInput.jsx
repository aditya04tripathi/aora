import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className="flex-row items-center w-full h-16 px-4 space-x-4 border-2 rounded-2xl border-black-200 focus:border-secondary bg-black-100">
			<TextInput
				autoCapitalize={
					title !== "Email" || title !== "Username" ? "none" : "words"
				}
				className="text-base mt-0.5 text-white font-pregular flex-1"
				value={value}
				placeholder={"Search for a video topic"}
				placeholderTextColor="#7b7b8b"
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password" && !showPassword}
				{...props}
			/>

			<TouchableOpacity>
				<Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
