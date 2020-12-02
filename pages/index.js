import Head from 'next/head'
import { FiCalendar, FiCheckSquare, FiEdit, FiTrash2 } from 'react-icons/fi'
import { FaClipboardList } from 'react-icons/fa'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input, Table, InputGroup, Progress } from 'reactstrap'
import { useState, useEffect } from 'react'
import api from './_utils/_api'
import moment from 'moment'

export default function Home() {
  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  async function loadTasks() {
    const token = localStorage.getItem('@token')

    const response = await api.get('tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setTarefas(response.data)
  }

  async function  addTarefas(e) {
    e.preventDefault()

    const token = localStorage.getItem('@token')

    const response = await api.post('tasks', {
      title: titulo,
      description: descricao,
      status: 'pendente'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setTarefas([response.data])

    loadTasks()
  }

  function limparForm() {
    const inputTitle = document.getElementById('titulo');

    inputTitle.value = ''

    setTitulo('')
    const inputDescricao = document.getElementById('descricao');
    inputDescricao.value = ''

    setDescricao('')
  }

  async function deleteTarefa(id) {
    const token = localStorage.getItem('@token')

    await api.delete(`tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    loadTasks()
  }

  async function trocarStatus(id, taskStatus) {
    const token = localStorage.getItem('@token')

    if(taskStatus === 'pendente') {
      await api.put(`tasks/${id}`, {
        status: 'progresso'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })      
    } else if (taskStatus === 'progresso') {
      await api.put(`tasks/${id}`, {
        status: 'completo'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })      
    } else {
      await api.put(`tasks/${id}`, {
        status: 'pendente'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })      
    }

    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      <Head>
        <title>Lista de Tarefas</title>
      </Head>

      <Container className="themed-container mt-5" fluid="xl">
        
        <br />
        <Container id="container-list" className="themed-container " fluid="lg">
          <h1 >Lista de Tarefas</h1>
          <FaClipboardList size={48} />
        </Container>
        <hr/>     

        <Container className="themed-container" fluid="lg">
          <Form onSubmit={addTarefas}>
            <Row form>
              <Col xs="4" sm="4">
                <FormGroup>
                  <Input required type="text" name="titulo" id="titulo" placeholder="Titulo"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xs="4" sm="6" >
                <FormGroup>
                  <Input type="text" name="descricao" id="descricao" placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col >
                <Button id="botao-form" className="w-100" >+ Tarefa</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Container className="themed-container" fluid="lg">
          <Table  striped> 
            <thead className="thead-dark">
              <tr>
                <th id="th-actions">Actions</th>             
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Data &nbsp; <FiCalendar /> </th>
                <th id="th-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map(tarefa => (
                <tr key={tarefa.id}>
                  <th>
                    <div id="div-actions">
                      <FiCheckSquare color="green" 
                      onClick={()=>trocarStatus(tarefa.id, tarefa.status)}
                      />                                      
                      <FiTrash2 color="#c0392b" 
                      onClick={()=>deleteTarefa(tarefa.id)}
                      />
                    </div>
                  </th>                 
                  <td>{tarefa.title}</td>
                  <td>{tarefa.description}</td>
                  <td>{moment(tarefa.updated_at).format('DD/MM/YYYY - HH:mm')}</td>               
                  <td> 
                  <Progress animated color={
                    tarefa.status === 'pendente' 
                      ? 'danger' 
                      : tarefa.status === 'progresso' 
                        ? 'primary' 
                        : 'success'
                  } value={
                    tarefa.status === 'pendente' 
                      ? '45' 
                      : tarefa.status === 'progresso' 
                        ? '70' 
                        : '100'                  
                  } >
                    {tarefa.status}
                  </Progress>
                  </td>            
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Container>
    </div>
  )
}
