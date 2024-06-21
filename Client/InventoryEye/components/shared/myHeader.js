import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import appLogo from '../../images/appLogo.png';

//recives props (imageSize,title,titleSize)
export default function MyHeader({ imageSize, title, titleSize }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
            <Image source={appLogo} style={[styles.image, { width: imageSize, height: imageSize }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    image: {
        marginRight: 12,
    },
    title: {
        fontWeight: 'bold',
        color: '#111851',
        marginBottom:7,
        textAlign:'center',
    },
})