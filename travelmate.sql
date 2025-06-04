-- =======================================
-- TravelMate - Base de Datos
-- =======================================
-- Script TV
-- =======================================
-- CREACIÓN DE LA BASE DE DATOS
-- =======================================
CREATE DATABASE IF NOT EXISTS travelmate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travelmate_db;
-- =======================================
-- TABLA: USUARIO
-- =======================================
CREATE TABLE Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  foto_perfil VARCHAR(255),
  fecha_registro DATE,
  rol ENUM('usuario', 'admin') DEFAULT 'usuario',
  token_recuperacion VARCHAR(255),
  fecha_token DATETIME
);
-- =======================================
-- TABLA: DESTINO
-- =======================================
CREATE TABLE Destino (
  id_destino INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  pais VARCHAR(100),
  descripcion TEXT,
  foto VARCHAR(255),
  precio_estimado DECIMAL(10,2),
  valoracion DECIMAL(3,2),
  popularidad INT DEFAULT 0
);
-- =======================================
-- TABLA: CATEGORIA
-- =======================================
CREATE TABLE Categoria (
  id_categoria INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50)
);
-- Relación muchos a muchos entre Destino y Categoría
CREATE TABLE DestinoCategoria (
  id_destino INT,
  id_categoria INT,
  PRIMARY KEY (id_destino, id_categoria),
  FOREIGN KEY (id_destino) REFERENCES Destino(id_destino) ON DELETE CASCADE,
  FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE
);
-- =======================================
-- TABLA: PUNTOS DE INTERÉS
-- =======================================
CREATE TABLE PuntoInteres (
  id_punto INT PRIMARY KEY AUTO_INCREMENT,
  id_destino INT,
  nombre VARCHAR(100),
  descripcion TEXT,
  ubicacion VARCHAR(255),
  FOREIGN KEY (id_destino) REFERENCES Destino(id_destino) ON DELETE CASCADE
);
-- =======================================
-- TABLA: PUBLICACIÓN
-- =======================================
CREATE TABLE Publicacion (
  id_publicacion INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_destino INT,
  titulo VARCHAR(100),
  contenido TEXT,
  fecha_publicacion DATETIME,
  foto VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_destino) REFERENCES Destino(id_destino) ON DELETE SET NULL
);
-- =======================================
-- TABLA: COMENTARIO
-- =======================================
CREATE TABLE Comentario (
  id_comentario INT PRIMARY KEY AUTO_INCREMENT,
  id_publicacion INT,
  id_usuario INT,
  contenido TEXT,
  fecha_comentario DATETIME,
  FOREIGN KEY (id_publicacion) REFERENCES Publicacion(id_publicacion) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
-- =======================================
-- TABLA: LIKE A PUBLICACIONES
-- =======================================
CREATE TABLE LikePublicacion (
  id_like INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_publicacion INT,
  fecha_like DATETIME,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_publicacion) REFERENCES Publicacion(id_publicacion) ON DELETE CASCADE
);
-- =======================================
-- TABLA: AMISTAD
-- =======================================
CREATE TABLE Amistad (
  id_amistad INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario1 INT,
  id_usuario2 INT,
  estado ENUM('pendiente', 'aceptada', 'bloqueada'),
  fecha_solicitud DATETIME,
  FOREIGN KEY (id_usuario1) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario2) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
-- =======================================
-- TABLAS PARA PLANIFICACIÓN DE VIAJES
-- =======================================
-- ITINERARIO
CREATE TABLE Itinerario (
  id_itinerario INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  nombre VARCHAR(100),
  descripcion TEXT,
  fecha_creacion DATE,
  duracion_total INT,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
-- ETAPAS DEL VIAJE
CREATE TABLE EtapaViaje (
  id_etapa INT PRIMARY KEY AUTO_INCREMENT,
  id_itinerario INT,
  id_destino INT,
  fecha_inicio DATE,
  fecha_fin DATE,
  notas TEXT,
  FOREIGN KEY (id_itinerario) REFERENCES Itinerario(id_itinerario) ON DELETE CASCADE,
  FOREIGN KEY (id_destino) REFERENCES Destino(id_destino) ON DELETE CASCADE
);
-- PLANTILLAS DE ITINERARIO
CREATE TABLE Plantilla (
  id_plantilla INT PRIMARY KEY AUTO_INCREMENT,
  id_itinerario_base INT,
  nombre_plantilla VARCHAR(100),
  FOREIGN KEY (id_itinerario_base) REFERENCES Itinerario(id_itinerario) ON DELETE SET NULL
);
-- COSTE ESTIMADO
CREATE TABLE CosteEstimado (
  id_coste INT PRIMARY KEY AUTO_INCREMENT,
  id_itinerario INT,
  descripcion VARCHAR(255),
  monto DECIMAL(10,2),
  FOREIGN KEY (id_itinerario) REFERENCES Itinerario(id_itinerario) ON DELETE CASCADE
);
