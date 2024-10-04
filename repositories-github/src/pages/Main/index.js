import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton} from './styles';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorio, setRepositorio] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {

        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };
  
        setRepositorio([...repositorio, data]);
        setNewRepo('');
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    
    }

    submit();
  }, [newRepo, repositorio]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback((repo) => {
    const find = repositorio.filter(r => r.name !== repo);
    setRepositorio(find);
  }, []);

  return (
    <Container>
      <h1>
        <FaGithub />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />

        <SubmitButton Loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
         
        </SubmitButton>
      </Form>

          <List>

          {repositorio.map(repo => (
              <li key={repo.name}>
                <span>
                  <DeleteButton onClick={()=>handleDelete(repo.name)}>
                  <FaTrash size={14}/>
                  </DeleteButton>
                  {repo.name}
                  </span>
                <a href="">
                  <FaBars size={20}/>
                </a>
              </li>
            ))}
          
          </List>
          
    </Container>
  );
}