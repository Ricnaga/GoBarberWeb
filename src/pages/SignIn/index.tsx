import React, {useCallback, useRef, useContext} from 'react';
import {FiLogIn, FiMail,FiLock} from 'react-icons/fi';
import * as Yup from 'yup';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors'
import {Container, Content, Background} from './styles';
import {AuthContext} from '../../context/AuthContext';

interface SignInFormData{
    email: string;
    password:string;
}

const SignIn: React.FC = ()=> {

    const formRef = useRef<FormHandles>(null)
    const {user, signIn} = useContext(AuthContext)
    console.log(user)
 
    const handleSubmit = useCallback( async(data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um email válido'),
                password: Yup.string()
                .required('Senha obrigatória'),
            })

            await schema.validate(data, {
                abortEarly: false
            })
            
            signIn({
                email: data.email,
                password:data.password,
            })
        } catch (error) {
            const errors = getValidationErrors(error)

            formRef.current?.setErrors(errors)
        }
    },[signIn])

    return (
    <Container>
        <Content>
        <img src={logoImg} alt="GoBarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input icon={FiMail} name="email" placeholder="E-mail"/>
            <Input icon={FiLock} 
            name="password" 
            type="password" 
            placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
        </Form>
            <a href="account">
                <FiLogIn/>
                Criar conta
            </a>
        
        </Content>
        <Background />
    </Container>
    )
    };

export default SignIn;