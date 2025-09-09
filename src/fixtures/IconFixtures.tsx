import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const IconFixtures = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Icon Fixtures</Text>
      <Text style={styles.description}>
        Add your icon component tests here
      </Text>
      
      {/* Example fixture structure */}
      <View style={styles.fixture}>
        <Text style={styles.fixtureTitle}>Arrow Icons</Text>
        <View style={styles.iconGrid}>
          {/* Icons will be added here during prototyping */}
        </View>
      </View>
      
      <View style={styles.fixture}>
        <Text style={styles.fixtureTitle}>Status Icons</Text>
        <View style={styles.iconGrid}>
          {/* Icons will be added here during prototyping */}
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
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1DA1F2',
  },
  description: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 24,
  },
  fixture: {
    marginBottom: 32,
  },
  fixtureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#14171A',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
