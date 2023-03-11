import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card, Layout, List, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Encrypt from "../Encrypt";
import { link } from "../link.json";

export default (props) => {
	const [data, setdata] = React.useState([]);
	const mytheme = useTheme();
	React.useEffect(() => {
		Refresh();
	}, []);

	const Refresh = () => {
		let body = {
			id: global.user.id,
		};
		body = Encrypt(JSON.stringify(body));
		let url = link + "doctor_clients.php";
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
	};
	const renderData = ({ item }) => {
		return (
			<Card
				style={styles.card}
				onPress={() => {
					props.navigation.navigate("ClientDetails", { item: item });
				}}
			>
				<View style={styles.row}>
					<MaterialCommunityIcons
						style={styles.icon}
						name="account-circle"
						size={35}
						color={mytheme["color-primary-600"]}
					/>
					<View>
						<Text category="h6">{item.name}</Text>
						<Text appearance="hint">{item.phone}</Text>
					</View>
				</View>
			</Card>
		);
	};
	return (
		<Layout style={styles.parent}>
			<List renderItem={renderData} data={data} />
		</Layout>
	);
};

const styles = StyleSheet.create({
	parent: {
		flex: 1,
	},
	card: {
		margin: 10,
	},
	row: {
		flexDirection: "row",
	},
	icon: {
		marginRight: 20,
	},
	text: {
		alignSelf: "center",
	},
});
