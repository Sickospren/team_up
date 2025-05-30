import {getAmistadesUsuario,eliminarAmistad, sonAmigos} from "../models/amistades.mjs";

export const getAmistades = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({
      success: false,
      mensaje: "Falta el parámetro 'email'"
    });
  }

  try {
    const amistades = await getAmistadesUsuario(email);

    return res.json({
      success: true,
      data: amistades
    });
  } catch (error) {
    console.error('Error en getAmistades:', error);
    return res.status(500).json({
      success: false,
      mensaje: "Error al obtener las amistades",
      error: error.message
    });
  }
};

export const deleteAmistad = async (req, res) => {
  const { id1, id2 } = req.body;
  if (!id1 || !id2) {
    return res.status(400).json({
      success: false,
      mensaje: "Se requieren ambos ids: 'id1' y 'id2'"
    });
  }

  const success = await eliminarAmistad(id1, id2);

  if (success) {
    res.json({ success: true, mensaje: "Amistad eliminada correctamente." });
  } else {
    console.log("error");
    res.status(500).json({ success: false, mensaje: "No se pudo eliminar la amistad." });
  }
};


export const getSonAmigos = async (req, res) => {
  const { id1, id2 } = req.params;

  if (!id1 || !id2) {
    return res.status(400).json({
      success: false,
      message: 'Faltan parámetros: id1 e id2 son requeridos.'
    });
  }

    if (id1 === id2) {
    return res.status(400).json({
      success: false,
      message: 'Faltan parámetros: id1 e id2 son requeridos.'
    });
  }

  const idUsuario1 = parseInt(id1);
  const idUsuario2 = parseInt(id2);

  if (isNaN(idUsuario1) || isNaN(idUsuario2)) {
    return res.status(400).json({
      success: false,
      message: 'Los parámetros deben ser numeros enteros.'
    });
  }


  /**
   * Metodo que devuelve true si los usuarios son amigos
   */
  const resultado = await sonAmigos(idUsuario1, idUsuario2);

  if (!resultado) {
    return res.json({
      success: true,
      data: false,
      message: "Los usuarios no son amigos"
    });
  }
  return res.json({
    success: true,
    data: true,
    sonAmigos: `El usuario con la id1 -> ${id1} y el usuario con la id2-> ${id2} son amigos`
  });


};
