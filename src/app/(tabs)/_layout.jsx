import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<SafeAreaView className="flex flex-col items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="size-6"
			/>
			<Text
				className={`${
					focused ? "font-psemibold" : "font-pregular"
				} text-xs w-full`}
				style={{ color }}
			>
				{name}
			</Text>
		</SafeAreaView>
	);
};

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#ffa001",
				tabBarInactiveTintColor: "#cdcde0",
				tabBarStyle: {
					backgroundColor: "#161622",
					borderTopWidth: 1,
					borderTopColor: "#232533",
					height: 84,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							icon={icons.home}
							color={color}
							name="Home"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="bookmark"
				options={{
					title: "Bookmark",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							icon={icons.bookmark}
							color={color}
							name="Bookmark"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							icon={icons.plus}
							color={color}
							name="Create"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							icon={icons.profile}
							color={color}
							name="Profile"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
