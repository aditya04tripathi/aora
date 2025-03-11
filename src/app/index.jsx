import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "context/GlobalProvider";

const IndexRoute = () => {
	const { isLoading, isLoggedIn } = useGlobalContext();

	if (!isLoading && isLoggedIn) {
		console.log("IS LOGGED IN");
		return <Redirect href="/home" />;
	}

	return (
		<SafeAreaView className="h-full bg-primary">
			<ScrollView contentContainerStyle={{ width: "100%" }}>
				<View className="w-full min-h-[85vh] justify-center items-center h-full px-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>

					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>

					<Text className="mt-5 text-3xl font-bold text-center text-white">
						Discovere Endless Possibilities with{" "}
						<Text className="relative text-secondary-200">Aora</Text>
					</Text>

					<Text className="mt-7 text-sm text-center text-gray-100 font-pregular">
						Where creativity meets innovation: embark on a journey of limitless
						exploration with Aora
					</Text>

					<CustomButton
						title="Continue with Email"
						onPress={() => router.push("/sign-in")}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default IndexRoute;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
