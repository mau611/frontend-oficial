import React from "react";
import Table from "react-bootstrap/Table";

const Contabilidad = ({ citas }) => {
  return (
    <div style={{ textAlign: "justify" }}>
      <h4>Facturas pagadas</h4>
      <br />
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#155E30", color: "white" }}>
          <tr>
            <th>Fecha</th>
            <th>Numero de factura</th>
            <th>Detalles del pago</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {citas?.map((cita) =>
            cita.facturas?.map((factura) =>
              factura.estado_pago == "pagado" ? (
                <tr>
                  <td>{factura.fecha}</td>
                  <td>{factura.numero}</td>
                  <td>{factura.detalles_pago}</td>
                  <td>{factura.total} Bs</td>
                </tr>
              ) : (
                <></>
              )
            )
          )}
        </tbody>
      </Table>
      <hr />
      <h4>Pendientes de pago</h4>
      <br />
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#155E30", color: "white" }}>
          <tr>
            <th>Fecha</th>
            <th>Numero de factura</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {citas?.map((cita) =>
            cita.facturas?.map((factura) =>
              factura.estado_pago == "no pagado" ? (
                <tr>
                  <td>{factura.fecha}</td>
                  <td>{factura.numero}</td>
                  <td>{factura.total}</td>
                </tr>
              ) : (
                <></>
              )
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Contabilidad;
