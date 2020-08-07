import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api';

import './styles.css';

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
    classInfos: ClassItemProps;
}

const ClassItem: React.FC<ClassInfoProps> = ({ classInfos }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: classInfos.id,
        });
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={classInfos.avatar} alt={classInfos.name}/>
                <div>
                    <strong>{classInfos.name}</strong>
                    <span>{classInfos.subject}</span>
                </div>
            </header>

            <p>{classInfos.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {classInfos.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${classInfos.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default ClassItem;