import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export const ComponentFixtures = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fold Component Fixtures</Text>
      <Text style={styles.description}>Add your Fold component tests here</Text>

      {/* Example fixture structure */}
      <View style={styles.fixture}>
        <Text style={styles.fixtureTitle}>Button Components</Text>
        <View style={styles.componentGrid}>
          {/* Components will be added here during prototyping */}
        </View>
      </View>

      <View style={styles.fixture}>
        <Text style={styles.fixtureTitle}>Input Components</Text>
        <View style={styles.componentGrid}>
          {/* Components will be added here during prototyping */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1DA1F2",
  },
  description: {
    fontSize: 14,
    color: "#657786",
    marginBottom: 24,
  },
  fixture: {
    marginBottom: 32,
  },
  fixtureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#14171A",
  },
  componentGrid: {
    gap: 16,
  },
});
