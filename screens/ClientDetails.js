import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Divider, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, View } from "react-native";

export default (props) => {
	const mytheme = useTheme();
	const item = props.route.params.item;
	return (
		<Layout style={styles.parent}>
			<Card style={styles.card}>
				<View style={styles.row}>
					<MaterialCommunityIcons
						style={styles.icon}
						name="account-circle"
						size={35}
						color={mytheme["color-primary-600"]}
					/>
					<View>
						<Text style={styles.text} category="s1">
							{item.name}
						</Text>
					</View>
				</View>
				<Divider />
				<View style={styles.row}>
					<MaterialCommunityIcons
						style={styles.icon}
						name="file-phone-outline"
						size={35}
						color={mytheme["color-primary-600"]}
					/>

					<Text style={styles.text} category="s1">
						{item.phone}
					</Text>
				</View>
				<Divider />
				<View style={styles.row}>
					<MaterialCommunityIcons
						style={styles.icon}
						name="email"
						size={35}
						color={mytheme["color-primary-600"]}
					/>

					<Text style={styles.text} category="s1">
						{item.email}
					</Text>
				</View>
				<Divider />
				<View style={styles.row}>
					<MaterialCommunityIcons
						style={styles.icon}
						name="book-marker"
						size={35}
						color={mytheme["color-primary-600"]}
					/>

					<Text style={styles.text} category="s1">
						{item.address}
					</Text>
				</View>
				<View style={styles.row}>
					<FontAwesome5
						style={styles.icon}
						name="birthday-cake"
						size={35}
						color={mytheme["color-primary-600"]}
					/>

					<Text style={styles.text} category="s1">
						{item.dob}
					</Text>
				</View>
			</Card>
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
		margin: 10,
	},
	icon: {
		marginRight: 20,
	},
	text: {
		marginTop: 5,
	},
});
