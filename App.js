import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import Navigation from "./navigation/Navigation";
import * as eva from "@eva-design/eva";
import {
	ApplicationProvider,
	IconRegistry,
	Layout,
	Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default function App() {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<Navigation />
			</ApplicationProvider>
		</>
	);
}
