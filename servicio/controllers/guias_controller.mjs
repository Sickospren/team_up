import { insertGuia, getGuias, getGuiasByCampeon, getGuiasByUsuario, getGuiaById, deleteGuiaById } from "../models/guias.mjs";


export const crearGuia = async (req, res) => {
  try {
    console.log(req.body)
    const { id_usuario, id_juego, campeon_nombre, contenido_guia, privada } = req.body;

    if (!id_usuario || !id_juego || !campeon_nombre || !contenido_guia) {
      return res.status(400).json({ success: false, error: "Faltan datos obligatorios" });
    }

    const nuevaGuia = await insertGuia(id_usuario, id_juego, campeon_nombre, contenido_guia, privada);

    return res.status(201).json({
      success: true,
      mensaje: "Guía creada con éxito",
      id_guia: nuevaGuia.id_guia
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al crear la guía"
    });
  }
}


export const selectGuias = async (req, res) => {
  try {
    const guias = await getGuias();

    return res.status(200).json({
      success: true,
      data: guias
    });
  } catch (error) {
    console.error("Error al listar guías públicas:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener las guías públicas"
    });
  }
};


export const selectGuiasPorCampeon = async (req, res) => {
  try {
    const { campeon } = req.params;

    if (!campeon) {
      return res.status(400).json({ success: false, error: 'Falta el parámetro "campeon"' });
    }

    const guias = await getGuiasByCampeon(campeon);

    return res.json({
      success: true,
      data: guias
    });

  } catch (error) {
    console.error('Error al listar guías públicas por campeón:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener las guías públicas'
    });
  }
};


export const selectGuiasPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    if (!id_usuario) {
      return res.status(400).json({ success: false, error: 'Falta el parámetro id_usuario' });
    }

    const guias = await getGuiasByUsuario(id_usuario);

    return res.json({
      success: true,
      data: guias
    });

  } catch (error) {
    console.error('Error al listar guías por usuario:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener las guías del usuario'
    });
  }
};


export const eliminarGuia = async (req, res) => {
  const { id, id_usuario } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, mensaje: "Falta Id Guia" });
  }

  if (!id_usuario) {
    return res.status(400).json({ success: false, mensaje: "Falta id_usuario" });
  }

  try {
    const guia = await getGuiaById(id);

    if (!guia) {
      return res.status(404).json({ success: false, mensaje: "Guía no encontrada" });
    }

    if (guia.id_usuario !== Number(id_usuario)) {
      return res.status(403).json({ success: false, mensaje: "No tienes permiso para eliminar esta guía" });
    }

    const eliminada = await deleteGuiaById(id);

    if (!eliminada) {
      return res.status(500).json({ success: false, mensaje: "No se pudo eliminar la guía" });
    }

    return res.json({ success: true, mensaje: "Guía eliminada correctamente" });

  } catch (error) {
    return res.status(500).json({ success: false, mensaje: "Error al eliminar la guía" });
  }
};

export const obtenerGuiaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const guia = await getGuiaById(id);

    if (!guia) {
      return res.status(404).json({
        success: false,
        mensaje: "Guía no encontrada"
      });
    }

    return res.status(200).json({
      success: true,
      guia
    });

  } catch (error) {
    console.error("Error al obtener la guía:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Error del servidor al obtener la guía"
    });
  }
};



