import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";

const KeyboardAvoidingContainer = ({ children, style }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[styles.contentContainer, style]}
                >
                    {React.Children.map(children, child =>
                        typeof child === 'string' ? <Text>{child}</Text> : child
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: 0, 
    }
});