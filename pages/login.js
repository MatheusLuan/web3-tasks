import {useRouter} from 'next/router'
import React, { useState } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Button, Form, FormGroup, Col, Row, Input } from 'reactstrap';
import api from './_utils/_api';


const  Login = (props) => {
    const router = useRouter()

    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);
      const [email, setEmail] = useState('');
      const [senha, setSenha] = useState('');
    
      const toggle = () => setModal(!modal);

    const handleLogin = async (e)  => {
        e.preventDefault();

        try{
            const response = await api.post('auth', {
                email,
                password: senha
            })
            
            localStorage.setItem('@token', response.data.token)

            router.push('/')
        }catch{
            alert('Deu erro porque você é veadao')
        }

    }

    return (
        <div>
            <Container id="ctn-pai">          
                <Container id="box">                    
                    <Form className="mt-5"> 
                    <h2>Faça seu Login!</h2> 
                    <hr/>                  
                        <FormGroup>
                            <Input className="w-100" required type="email" name="titulo" id="E-mail" placeholder="E-mail" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input  className="w-100" type="password" name="senha" id="senha" placeholder="Senha" 
                             value={senha}
                             onChange={e => setSenha(e.target.value)}
                            />
                        </FormGroup>                        
                        <div id="div-botao-login">
                            <Button id="botao-login-login" onClick={handleLogin}>Login</Button>
                            <Button id="botao-login-cad" onClick={toggle}>Cadastrar</Button>                       
                        </div>
                    </Form>
                </Container>
            </Container>
                      
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}><h3>Faça seu cadastro!</h3></ModalHeader>
                <ModalBody>
                    <Form>                               
                        <FormGroup>
                            <Input className="w-100" required type="text" name="nome" id="nome" placeholder="Nome" />
                        </FormGroup>
                        <FormGroup>
                            <Input className="w-100" required type="email" name="email" id="email" placeholder="E-mail" />
                        </FormGroup>
                        <FormGroup>
                            <Input  className="w-100" type="password" name="senha" id="senha" placeholder="Senha" />
                        </FormGroup>                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Save</Button>{' '}
                <Button color="danger" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
           
        </div>
    );
}

export default Login;