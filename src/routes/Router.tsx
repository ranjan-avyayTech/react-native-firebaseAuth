import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppwriteContext } from '../appwrite/AppwriteContext'
import Loading from '../components/Loading'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'


export const Router = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)

    useEffect((
        () => {
            appwrite.getCurrentUser().then(res => {
                setIsLoading(false)

                if (res) {
                    setIsLoggedIn(true)
                }
            })
                .catch(_ => {
                    setIsLoading(false)
                    setIsLoggedIn(false)
                })
        }

    ), [appwrite, setIsLoading])

    if (isLoading) {
        return <Loading />
    }
    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
