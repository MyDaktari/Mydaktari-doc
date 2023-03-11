import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatLayout from "../screens/Chat";
import Main from "../screens/Main";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Location from "../screens/Location";
import Clients from "../screens/Clients";
import ClientDetails from "../screens/ClientDetails";

export default () => {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Signup"
					component={Signup}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Location"
					component={Location}
					options={{
						headerTitle: "Location",
					}}
				/>
				<Stack.Screen
					name="Main"
					component={Main}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name="Chat"
					component={ChatLayout}
					options={{
						title: "Virtual assistant",
					}}
				/>
				<Stack.Screen
					name="Clients"
					component={Clients}
					options={{
						title: "My clients",
					}}
				/>
				<Stack.Screen
					name="ClientDetails"
					component={ClientDetails}
					options={{
						title: "Client Details",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
