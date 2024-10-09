import React, {useState, useEffect} from 'react';
import { Container } from './styles';
import api from '../../services/api';

export default function Repositorios({match}) {

    const [repositorios, setRepositorios] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        async function load() {
            const nomeRepo = decodeURIComponent(match.params.repositorios);

            const [repositoriosData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    }
                })
            ]);

            setRepositorios(repositoriosData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    }, [match.params.repositorios]);

    return(
        <Container>
            <h1>{repositorios.name}</h1>
            <p>{repositorios.description}</p>

            {loading ? <p>Carregando...</p> : (
                <ul>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <a href={issue.html_url}>{issue.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    )

    }
