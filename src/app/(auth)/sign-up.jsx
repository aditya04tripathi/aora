import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import FormField from "components/FormField";
import CustomButton from "components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "lib/appwrite";
import { useGlobalContext } from "context/GlobalProvider";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [submitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLoggedIn } = useGlobalContext();

	const handleSubmit = async () => {
		if (!form.email || !form.password || !form.username) {
			Alert.alert("Please fill in all the fields.");
		}

		setIsSubmitting(true);
		try {
			const result = await createUser(form.email, form.password, form.username);

			setUser(result);
			setIsLoggedIn(true);

			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full bg-primary">
			<ScrollView>
				<View className="justify-center px-4 my-6 w-full min-h-[85vh]">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="mt-10 text-2xl text-white text-semibold font-psemibold">
						Log in to Aora
					</Text>

					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-10"
					/>

					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>

					<CustomButton
						onPress={handleSubmit}
						isLoading={submitting}
						containerStyles="mt-7"
						title="Sign Up"
					/>

					<View className="flex-row gap-2 justify-center pt-5">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href="/sign-in"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
