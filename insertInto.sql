USE team_up;

-- Insertar categorías únicas
INSERT INTO categorias (nombre) VALUES 
('Estrategia'), 
('MOBA'), 
('FPS'), 
('Shooter');

-- Insertar juegos con id_categoria y puntos sin emoticonos
INSERT INTO juegos (id_juego, nombre, descripcion, banner, foto_juego, dispositivos, id_categoria, rangos)
VALUES
-- Clash Royale (Estrategia)
(
  1,
  'Clash Royale',
  'Clash Royale es un juego multijugador en tiempo real con elementos de cartas, torres y estrategia.',
  'https://shorturl.at/Ohj6s',
  'https://shorturl.at/FgC5G',
  'Android, iOS',
  (SELECT id_categoria FROM categorias WHERE nombre = 'Estrategia'),
  JSON_ARRAY(
    JSON_OBJECT('nombre', 'Entrenamiento', 'puntos', '0'),
    JSON_OBJECT('nombre', 'Estadio Duende', 'puntos', '0'),
    JSON_OBJECT('nombre', 'Foso de Huesos', 'puntos', '300'),
    JSON_OBJECT('nombre', 'Coliseo Bárbaro', 'puntos', '600'),
    JSON_OBJECT('nombre', 'Valle de Hechizos', 'puntos', '1000'),
    JSON_OBJECT('nombre', 'Taller del Constructor', 'puntos', '1300'),
    JSON_OBJECT('nombre', 'Fuerte P.E.K.K.A.', 'puntos', '1600'),
    JSON_OBJECT('nombre', 'Arena Real', 'puntos', '2000'),
    JSON_OBJECT('nombre', 'Pico Helado', 'puntos', '2300'),
    JSON_OBJECT('nombre', 'Arena Selvática', 'puntos', '2600'),
    JSON_OBJECT('nombre', 'Montepuerco', 'puntos', '3000'),
    JSON_OBJECT('nombre', 'Electrovalle', 'puntos', '3400'),
    JSON_OBJECT('nombre', 'Pueblo Espeluznante', 'puntos', '3800'),
    JSON_OBJECT('nombre', 'Escondite de los Pillos', 'puntos', '4200'),
    JSON_OBJECT('nombre', 'Pico Sereno', 'puntos', '4600'),
    JSON_OBJECT('nombre', 'La Gran Mina', 'puntos', '5000'),
    JSON_OBJECT('nombre', 'La Cocina del Verdugo', 'puntos', '5500'),
    JSON_OBJECT('nombre', 'Cripta Real', 'puntos', '6000'),
    JSON_OBJECT('nombre', 'Santuario del Silencio', 'puntos', '6500'),
    JSON_OBJECT('nombre', 'Termas de Dragones', 'puntos', '7000'),
    JSON_OBJECT('nombre', 'Clash Fest', 'puntos', '7500'),
    JSON_OBJECT('nombre', '¡TORTITAS!', 'puntos', '8000'),
    JSON_OBJECT('nombre', 'Arena Legendaria', 'puntos', '8500')
  )
),
-- League of Legends (MOBA)
(
  2,
  'League of Legends',
  'League of Legends es un MOBA competitivo 5v5 donde los jugadores escalan rangos mediante partidas clasificadas.',
  'https://shorturl.at/RIEED',
  'https://shorturl.at/6SWTM',
  'PC',
  (SELECT id_categoria FROM categorias WHERE nombre = 'MOBA'),
  JSON_ARRAY(
    JSON_OBJECT('nombre', 'Hierro IV', 'puntos', '0'),
    JSON_OBJECT('nombre', 'Hierro III', 'puntos', '100'),
    JSON_OBJECT('nombre', 'Hierro II', 'puntos', '200'),
    JSON_OBJECT('nombre', 'Hierro I', 'puntos', '300'),
    JSON_OBJECT('nombre', 'Bronce IV', 'puntos', '400'),
    JSON_OBJECT('nombre', 'Bronce III', 'puntos', '500'),
    JSON_OBJECT('nombre', 'Bronce II', 'puntos', '600'),
    JSON_OBJECT('nombre', 'Bronce I', 'puntos', '700'),
    JSON_OBJECT('nombre', 'Plata IV', 'puntos', '800'),
    JSON_OBJECT('nombre', 'Plata III', 'puntos', '900'),
    JSON_OBJECT('nombre', 'Plata II', 'puntos', '1000'),
    JSON_OBJECT('nombre', 'Plata I', 'puntos', '1100'),
    JSON_OBJECT('nombre', 'Oro IV', 'puntos', '1200'),
    JSON_OBJECT('nombre', 'Oro III', 'puntos', '1300'),
    JSON_OBJECT('nombre', 'Oro II', 'puntos', '1400'),
    JSON_OBJECT('nombre', 'Oro I', 'puntos', '1500'),
    JSON_OBJECT('nombre', 'Platino IV', 'puntos', '1600'),
    JSON_OBJECT('nombre', 'Platino III', 'puntos', '1700'),
    JSON_OBJECT('nombre', 'Platino II', 'puntos', '1800'),
    JSON_OBJECT('nombre', 'Platino I', 'puntos', '1900'),
    JSON_OBJECT('nombre', 'Esmeralda IV', 'puntos', '2000'),
    JSON_OBJECT('nombre', 'Esmeralda III', 'puntos', '2100'),
    JSON_OBJECT('nombre', 'Esmeralda II', 'puntos', '2200'),
    JSON_OBJECT('nombre', 'Esmeralda I', 'puntos', '2300'),
    JSON_OBJECT('nombre', 'Diamante IV', 'puntos', '2400'),
    JSON_OBJECT('nombre', 'Diamante III', 'puntos', '2500'),
    JSON_OBJECT('nombre', 'Diamante II', 'puntos', '2600'),
    JSON_OBJECT('nombre', 'Diamante I', 'puntos', '2700'),
    JSON_OBJECT('nombre', 'Maestro', 'puntos', '2800'),
    JSON_OBJECT('nombre', 'Gran Maestro', 'puntos', '2900'),
    JSON_OBJECT('nombre', 'Aspirante', 'puntos', '3000')
  )
),
-- Valorant (FPS)
(
  3,
  'Valorant',
  'Valorant es un shooter táctico 5v5 que combina habilidades únicas y disparos precisos.',
  'https://shorturl.at/rriMs',
  'https://shorturl.at/cEhY9',
  'PC',
  (SELECT id_categoria FROM categorias WHERE nombre = 'FPS'),
  JSON_ARRAY(
    JSON_OBJECT('nombre', 'Hierro', 'puntos', '0'),
    JSON_OBJECT('nombre', 'Bronce', 'puntos', '400'),
    JSON_OBJECT('nombre', 'Plata', 'puntos', '800'),
    JSON_OBJECT('nombre', 'Oro', 'puntos', '1200'),
    JSON_OBJECT('nombre', 'Platino', 'puntos', '1600'),
    JSON_OBJECT('nombre', 'Diamante', 'puntos', '2000'),
    JSON_OBJECT('nombre', 'Ascendente', 'puntos', '2400'),
    JSON_OBJECT('nombre', 'Inmortal', 'puntos', '2800'),
    JSON_OBJECT('nombre', 'Radiante', 'puntos', '3200')
  )
),
-- Overwatch 2 (Shooter)
(
  4,
  'Overwatch 2',
  'Overwatch 2 es un shooter por equipos de héroes con diferentes habilidades, clases y roles.',
  'https://shorturl.at/4NbX1',
  'https://shorturl.at/YKkah',
  'PC, Xbox, PlayStation, Switch',
  (SELECT id_categoria FROM categorias WHERE nombre = 'Shooter'),
  JSON_ARRAY(
    JSON_OBJECT('nombre', 'Bronce', 'puntos', '0'),
    JSON_OBJECT('nombre', 'Plata', 'puntos', '500'),
    JSON_OBJECT('nombre', 'Oro', 'puntos', '1000'),
    JSON_OBJECT('nombre', 'Platino', 'puntos', '1500'),
    JSON_OBJECT('nombre', 'Diamante', 'puntos', '2000'),
    JSON_OBJECT('nombre', 'Maestro', 'puntos', '2500'),
    JSON_OBJECT('nombre', 'Gran Maestro', 'puntos', '3000')
  )
);
