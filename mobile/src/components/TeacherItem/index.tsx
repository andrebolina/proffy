import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import styles from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface ClassItemProps {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface ClassInfoProps {
    classInfo: ClassItemProps;
    favorited: boolean;
}

const TeacherItem: React.FC<ClassInfoProps> = ({ classInfo, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: classInfo.id,
        });
        
        Linking.openURL(`whatsapp://send?phone=${classInfo.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem("Favorites");

        let favoritesArray = [];

        if (favorites) 
            favoritesArray = JSON.parse(favorites);

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((classItem: ClassItemProps) => {
                return classItem.id === classInfo.id;
            })

            favoritesArray.splice(favoriteIndex, 1);
        } else {
            favoritesArray.push(classInfo);
        }

        setIsFavorited(!isFavorited);
        await AsyncStorage.setItem('Favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: classInfo.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{classInfo.name}</Text>
                    <Text style={styles.subject}>{classInfo.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{classInfo.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {classInfo.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorited ? styles.favorited : {} ]}>
                        {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;