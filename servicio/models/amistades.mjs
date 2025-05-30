import db from "../config/db.mjs";

//Lista las amistades de un usuario, con datos extra
export const getAmistadesUsuario = async (email) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ua.fecha_amistad,
        u.id_usuario,
        u.nombre_usuario,
        u.email,
        u.avatar
      FROM usuarios_amistades ua
      INNER JOIN usuario u1 ON ua.id_usuario_1 = u1.id_usuario
      INNER JOIN usuario u2 ON ua.id_usuario_2 = u2.id_usuario
      INNER JOIN usuario u ON 
        (u1.email = ? AND u.id_usuario = u2.id_usuario)
        OR 
        (u2.email = ? AND u.id_usuario = u1.id_usuario)
      ORDER BY ua.fecha_amistad DESC
    `, [email, email]);

    return rows;
  } catch (error) {
    console.error('Error al obtener amistades:', error);
    return [];
  }
};

export const eliminarAmistad = async (id1, id2) => {
  try {
    //Eliminar la amistad sin importar el orden de los IDs
    await db.query(`
      DELETE FROM usuarios_amistades
      WHERE (id_usuario_1 = ? AND id_usuario_2 = ?)
         OR (id_usuario_1 = ? AND id_usuario_2 = ?)
    `, [id1, id2, id2, id1]);

    return true;
  } catch (error) {
    console.error('Error al eliminar la amistad:', error);
    return false;
  }
};


//Metodo para comprobar si 2 usuarios son amigos
export const sonAmigos = async (id_usuario_1, id_usuario_2) => {
  try {
    if (id_usuario_1 === id_usuario_2) {
      return false;
    }

    const [rows] = await db.query(`
      SELECT * FROM usuarios_amistades
      WHERE 
        (id_usuario_1 = ? AND id_usuario_2 = ?)
        OR 
        (id_usuario_1 = ? AND id_usuario_2 = ?)
    `, [id_usuario_1, id_usuario_2, id_usuario_2, id_usuario_1]);

    if(rows.length > 0){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.error('Error al comprobar si son amigos:', error);
    return false;
  }
};