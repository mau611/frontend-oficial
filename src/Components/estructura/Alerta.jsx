import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

const Alerta = ({mostrar, titulo, contenido}) => {
  const [show, setShow] = useState(mostrar);
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{titulo}</Alert.Heading>
        <p>
          {contenido}
        </p>
      </Alert>
    );
  }
}

export default Alerta