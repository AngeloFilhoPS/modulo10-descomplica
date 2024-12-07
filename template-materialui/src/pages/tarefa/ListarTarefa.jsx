// ListarTarefa.js
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Card, CardHeader, CardContent, CardActions, Button, 
  DeleteIcon, EditIcon, Modal, Grid 
} from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar dados
function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa,
  prioridadeTarefa,
) {
  return { 
    idTarefa, 
    tituloTarefa, 
    descricaoTarefa, 
    inicioTarefa, 
    fimTarefa, 
    statusTarefa, 
    recursoTarefa, 
    prioridadeTarefa 
  };
}

// Dados iniciais com Prioridade
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1', 'Alta'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2', 'Média'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3', 'Baixa'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4', 'Alta'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5', 'Média'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6', 'Baixa'),
];

// Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState(null);
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    const tarefaParaEditar = tarefas.find(obj => obj.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(current => current.filter(tarefa => tarefa.idTarefa !== id));
  };

  // Função para ordenar por prioridade
  const ordenarPorPrioridade = () => {
    const ordemPrioridade = { 'Alta': 1, 'Média': 2, 'Baixa': 3 };
    const tarefasOrdenadas = [...tarefas].sort((a, b) => ordemPrioridade[a.prioridadeTarefa] - ordemPrioridade[b.prioridadeTarefa]);
    setTarefas(tarefasOrdenadas);
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Tarefas"
          subheader="Listagem de Tarefas"
        />
        <CardContent>
          <Button 
            variant="outlined" 
            startIcon={<SortByAlphaIcon />} 
            onClick={ordenarPorPrioridade}
            sx={{ mb: 2 }}
          >
            Ordenar por Prioridade
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="tabela de tarefas">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Início</TableCell>
                  <TableCell align="right">Fim</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="right">Prioridade</TableCell> {/* Nova Coluna */}
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row) => (
                  <TableRow
                    key={row.idTarefa}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idTarefa}
                    </TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="right">{row.prioridadeTarefa}</TableCell> {/* Exibir Prioridade */}
                    <TableCell align="center">
                      <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</Button>
          <Button size="small" variant="outlined">Cancelar</Button>
        </CardActions> 
      </Card>

      {/* Modal para Criar Tarefa */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-criar-tarefa"
        aria-describedby="modal-criar-tarefa-descricao"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  

      {/* Modal para Editar Tarefa */}
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-editar-tarefa"
        aria-describedby="modal-editar-tarefa-descricao"
      >
        <div>
          <EditarTarefa 
            handleCloseEditar={handleCloseEditar} 
            idTarefaSelecionada={idTarefaSelecionada} 
            tarefas={tarefas} 
            tarefa={tarefa} 
            setTarefas={setTarefas} 
          />
        </div>
      </Modal>  
    </>    
  );
};

export default ListarTarefa;
