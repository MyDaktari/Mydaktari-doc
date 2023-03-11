import { Button, Card, Icon, Layout, List, Text } from "@ui-kitten/components";
import * as React from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Encrypt from "../Encrypt";
import { link } from "../link.json";
export default (props) => {
	const data = [
		{
			title: "Appointments",
			Icon: () => <FontAwesome size={24} name="clipboard" color={"white"} />,
			action: () => {},
		},
		{
			title: "Virtual assistant",
			Icon: () => (
				<MaterialCommunityIcons name="robot" size={24} color="white" />
			),
			action: () => {
				props.navigation.navigate("Chat");
			},
		},
		{
			title: "My clients",
			Icon: () => (
				<MaterialCommunityIcons name="account-group" size={24} color="white" />
			),
			action: () => {
				props.navigation.navigate("Clients");
			},
		},
	];

	React.useEffect(() => {
		let body = {
			id: global.user.id,
		};
		body = Encrypt(JSON.stringify(body));
		let url = link + "doctor_appointments.php";
		const data = new FormData();
		data.append("body", body);
		let method = { method: "post", body: data };
		fetch(url, method)
			.then((res) => res.json())
			.then((res) => {
				setdata(res);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const [dataappointments, setdata] = React.useState([]);

	const RenderHelp = ({ item }) => {
		return (
			<View style={{ marginHorizontal: 10, marginTop: 10 }}>
				<TouchableOpacity style={styles.iconparent} onPress={item.action}>
					<item.Icon />
				</TouchableOpacity>
				<Text style={{ color: "white" }}>{item.title}</Text>
			</View>
		);
	};
	const Appointments = ({ item }) => {
		return (
			<Card style={styles.parentCard}>
				<Text style={styles.cardtext}>{item.title}</Text>
				<Text appearance="hint">{item.link}</Text>
				<View style={styles.cardRow}>
					<Text style={styles.cardtext3}>{item.date}</Text>
					<Text style={styles.cardtext2}>{item.time}</Text>
				</View>
			</Card>
		);
	};
	return (
		<Layout style={styles.parent}>
			<Card style={styles.card}>
				<Text style={styles.textcard}>Hi Doctor,</Text>
				<Text style={styles.textcard}>How can I help you today?</Text>
				<List
					style={{
						backgroundColor: "transparent",
						alignSelf: "center",
					}}
					horizontal
					data={data}
					renderItem={RenderHelp}
				/>
			</Card>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Text style={styles.parentText}>Current appointments</Text>
				<Text style={styles.parenthint} appearance="hint">
					{" "}
					see all
				</Text>
			</View>
			<List
				style={{
					backgroundColor: "transparent",
				}}
				data={dataappointments}
				renderItem={Appointments}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#001fff",

		elevation: 5,
	},
	parent: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	textcard: {
		color: "#fff",
		marginVertical: 5,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	iconparent: {
		borderColor: "#00bfff",
		borderWidth: 1,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		height: 50,
		marginHorizontal: 10,
		alignSelf: "center",
	},
	parentText: {
		margin: 20,
		fontWeight: "700",
	},
	parenthint: {
		margin: 20,
	},
	parentCard: {
		margin: 10,
		fontWeight: "700",
	},
	cardRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	cardtext2: {
		padding: 2,
		backgroundColor: "#005fff",
		color: "white",
		margin: 10,
		borderRadius: 5,
	},
	cardtext3: {
		padding: 2,
		backgroundColor: "#665fff",
		color: "white",
		margin: 10,
		borderRadius: 5,
	},
	cardtext: {
		fontWeight: "700",
		marginVertical: 5,
	},
});
