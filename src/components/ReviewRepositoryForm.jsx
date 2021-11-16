import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";
import { CREATE_REVIEW_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
//Statistiikan tyylit
const reviewStyles = StyleSheet.create({
    container: {
        //Latoo kaikki itemit päällekäin
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',

    },
    infoContainer: {
        flexGrow: 1,
    },
    submitButton: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#0366d6',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    fieldStyle: {
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left'
    }

});
const initialValues = {
    ownerName: "zeit",
    repositoryName: "next.js",
    rating: "12",
    text: "jotain tekstii"

};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name required'),
    repositoryName: yup
        .string()
        .required('Repo name required'),
    rating: yup
        .number()
        .required('Rating is required')
        .max(100),
});

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={reviewStyles.container}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" style={[reviewStyles.textInput, reviewStyles.fieldStyle]} />
            <FormikTextInput name="repositoryName" placeholder="Repository name" style={[reviewStyles.textInput, reviewStyles.fieldStyle]} />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={[reviewStyles.textInput, reviewStyles.fieldStyle]} />
            <FormikTextInput name="text" placeholder="Review" style={[reviewStyles.textInput, reviewStyles.fieldStyle]} multiline={true} />
            <Pressable onPress={onSubmit}>
                <Text style={
                    [reviewStyles.submitButton,
                    reviewStyles.text
                    ]}>Review a Repo</Text>
            </Pressable>
        </View>
    );
};


const ReviewRepo = () => {
    //En saanut hookia toimimaan niin siksi graphQL haku suoraan tästä komponentista
    const [createReview] = useMutation(CREATE_REVIEW_MUTATION);
    let history = useHistory();

    const onSubmit = async (values) => {
        //ks. kenttiin täytettävät tiedot "__tests__/components/RepositoryList.js"
        const { ownerName, repositoryName, rating, text } = values;
        //console.log('PAINALLUS TULEE ONSUBMITIIN???', ownerName, repositoryName, rating, text);

        const { data, loading } = await createReview({ variables: { review: { ownerName, repositoryName, rating: parseInt(rating), text } } });
        if (loading) {
            return (
                <View style={
                    [
                        {
                            width: '100%',
                            height: '100%',
                            //backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center'


                        },
                    ]}>
                    <Text style={[
                        {
                            fontSize: 30,
                            color: 'black',
                        }

                    ]}>Loading...</Text>
                </View>);
        }
        //console.log('REVIEW DATA', data.createReview.repositoryId);
        history.push(`/singleRepsoitory/${data.createReview.repositoryId}`);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
export default ReviewRepo;