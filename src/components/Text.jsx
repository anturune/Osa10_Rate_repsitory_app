import React from 'react';
import { StyleSheet, Text as NativeText, Platform } from 'react-native';
import theme from '../theme';


const styles = StyleSheet.create({
    text: {
        //color: theme.colors.textPrimary,
        //Tekstin värit käyttöjärjestelmittäin
        color: Platform.select({
            android: 'blue',
            ios: 'green',
            default: 'black',
        }),
        fontSize: theme.fontSizes.body,
        //Tekstin fontit käyttöjärjestelmittäin
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default,
        }),

        //fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontsizeBodyText: {
        fontSize: theme.fontSizes.body,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
    flexContainer: {
        display: 'flex',
    },

});

//Customoitu Text -komponentti
const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'body' && styles.fontsizeBodyText,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;