import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>BlueSky Fold Components</Text>
        <Text style={styles.subtitle}>Prototyping Environment</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Component Testing Area</Text>
          <Text style={styles.description}>
            This is your prototyping environment. Add your component fixtures
            and tests here. Your BlueSkyIcons and FoldComponents are ready to be
            used.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Components</Text>
          <Text style={styles.description}>
            • BlueSkyIcons/ - All your icon components{"\n"}• FoldComponents/ -
            Your fold component library{"\n"}• generated-tokens/ - Design tokens
            {"\n"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1DA1F2",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#657786",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#14171A",
  },
  description: {
    fontSize: 14,
    color: "#657786",
    lineHeight: 20,
  },
});
