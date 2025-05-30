import {nuevaSolicitud,getIsPendienteIds,getSolicitudesEnviadasUsuario,rechazarSolicitud,revisarSolicitudesEnviadas,revisarSolicitudesRecibidas,aceptarSolicitud} from "../models/solicitudes_amistad.mjs";

export const newSolicitud = async (req, res) => {
    const { id_remitente, id_destinatario } = req.body;

    if (!id_remitente || !id_destinatario) {
        return res.status(400).json({
            success: false,
            mensaje: "Faltan parámetros: se requieren 'id_remitente' e 'id_destinatario'"
        });
    }

    try {
        const id_solicitud = await nuevaSolicitud(id_remitente, id_destinatario);
        res.json({
            success: true,
            data: id_solicitud
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al insertar la solicitud en la BD",
            error
        });
    }
};

export const getIsPendiente = async (req, res) => {
  const { id1, id2 } = req.params;

  if (!id1 || !id2) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: id1 y id2 son requeridos"
    });
  }

  try {
    const resultado = await getIsPendienteIds(parseInt(id1), parseInt(id2));

    if (resultado === 0) {
      return res.json({
        success: true,
        estado: 0,
        mensaje: "No hay solicitud pendiente"
      });
    }

    const { id_solicitud, estado } = resultado;

    return res.json({
      success: true,
      estado,
      id_solicitud,
      mensaje:
        estado === 1
          ? "Solicitud pendiente enviada por el usuario actual"
          : "Solicitud pendiente recibida por el usuario actual"
    });
  } catch (error) {
    console.error("Error en getIsPendiente:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Error al revisar las solicitudes pendientes",
      error: error.message || error
    });
  }
};


export const getSolicitudesEnviadasEmail = async(req, res) => {
    const email = req.body.email;
    console.log("email: ", email);
    if (!email) {
        return res.status(400).json({
            success: false,
            mensaje: "Falta el parámetro 'email'"
        });
    }

    try {
        const result = await getSolicitudesEnviadasUsuario(email);
        res.json({
            success: true,
            data: (result.length === 0) ? "No hay registros" : result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al revisar las solicitudes",
            error
        });
    }
};

export const revisarRecibidas = async(req, res) => {
    const id_destinatario = req.body.id_destinatario;
    if (!id_destinatario) {
        return res.status(400).json({
            success: false,
            mensaje: "Falta el parámetro 'id_destinatario'"
        });
    }

    try {
        const result = await revisarSolicitudesRecibidas(id_destinatario);
        res.json({
            success: true,
            data: (result.length === 0) ? "No hay registros" : result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al revisar las solicitudes",
            error
        });
    }
};


export const revisarEnviadas = async(req, res) => {
    const id_remitente = req.body.id_remitente;
    if (!id_remitente) {
        return res.status(400).json({
            success: false,
            mensaje: "Falta el parámetro 'id_remitente'"
        });
    }

    try {
        const result = await revisarSolicitudesEnviadas(id_remitente);
        res.json({
            success: true,
            data: (result.length === 0) ? "No hay registros" : result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al revisar las solicitudes",
            error
        });
    }
};




export const rechazar = async(req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            mensaje: "Falta el parámetro 'id'"
        });
    }

    try {
        const result = await rechazarSolicitud(id);
        res.json({ result });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al rechazar la solicitud",
            error
        });
    }
};

// Acepta la solicitud y crea la amistad
export const aceptar = async(req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            mensaje: "Falta el parámetro 'id'"
        });
    }

    try {
        const result = await aceptarSolicitud(id);
        res.json({ result });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al aceptar la solicitud",
            error
        });
    }
};