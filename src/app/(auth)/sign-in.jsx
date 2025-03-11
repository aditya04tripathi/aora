import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import FormField from "components/FormField";
import CustomButton from "components/CustomButton";
import { Link } from "expo-router";
import { signIn } from "lib/appwrite";
import { useGlobalContext } from "context/GlobalProvider";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [submitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLoading } = useGlobalContext();

	const handleSubmit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Please fill in all the fields.");
		}

		setIsSubmitting(true);
		try {
			const result = await signIn(form.email, form.password);

			setUser(result);
			setIsLoading(false);

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
						title="Sign In"
					/>

					<View className="flex-row gap-2 justify-center pt-5">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href="/sign-up"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
