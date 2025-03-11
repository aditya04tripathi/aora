import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="sign-up" />
			</Stack>

			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default _layout;
