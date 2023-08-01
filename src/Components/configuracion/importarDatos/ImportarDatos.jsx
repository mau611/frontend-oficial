import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const endpoint = "https://stilettoapi.com/api";

const ImportarDatos = () => {
  const [archivo, setArchivo] = useState(null);
  const navigate = useNavigate();

  const enviarArchivo = async () => {
    const formData = new FormData();
    formData.append("name", "archivo");
    formData.append("file", archivo);
    await axios.post(`${endpoint}/importar`, formData)
    .catch((err) => alert("File Upload Error"));
    navigate(0);
  };

  return (
    <div>
      <form>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>
            <h3>Seleccione el archivo para la importacion de datos</h3>
          </Form.Label>
          <Form.Control
            required
            type="file"
            size="lg"
            onChange={(e) => setArchivo(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="success" type="submit" onClick={()=>enviarArchivo()}>
          Importar
        </Button>
      </form>
    </div>
  );
};

export default ImportarDatos;
