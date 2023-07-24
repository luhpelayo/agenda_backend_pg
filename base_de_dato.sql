-- Creación de la tabla Roles
CREATE TABLE Roles (
  id_rol SERIAL PRIMARY KEY,
  nombre_rol VARCHAR(50) NOT NULL,
  permisos VARCHAR(255)
);

-- Creación de la tabla Usuarios
CREATE TABLE Usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(100) NOT NULL,
  id_rol INTEGER REFERENCES Roles(id_rol)
);

-- Creación de la tabla EstadosReservas
CREATE TABLE EstadosReservas (
  id_estado_reserva SERIAL PRIMARY KEY,
  nombre_estado VARCHAR(50) NOT NULL
);


-- Creación de la tabla TiposEventos
CREATE TABLE TiposEventos (
  id_tipo_evento SERIAL PRIMARY KEY,
  nombre_tipo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255),
  id_qr INTEGER REFERENCES QR(id_qr) -- Referencia al código QR asociado al tipo de evento
);


-- Creación de la tabla QR
CREATE TABLE QR (
  id_qr SERIAL PRIMARY KEY,
  qr_value DECIMAL(10, 2) NOT NULL, -- Valor del código QR con 10 dígitos y 2 decimales de precisión
  qr_image BYTEA NOT NULL -- Imagen del código QR en formato BYTEA
);

-- Creación de la tabla Agenda
CREATE TABLE Agenda (
  id_evento SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  id_usuario_responsable INTEGER REFERENCES Usuarios(id_usuario),
  descripcion TEXT,
  id_tipo_evento INTEGER REFERENCES TiposEventos(id_tipo_evento),
  id_estado_reserva INTEGER REFERENCES EstadosReservas(id_estado_reserva),
);

-- Creación de la tabla EstadosDeudas
CREATE TABLE EstadosDeudas (
  id_estado_deuda SERIAL PRIMARY KEY,
  nombre_estado VARCHAR(50) NOT NULL
);

-- Creación de la tabla Deudas
CREATE TABLE Deudas (
  id_deuda SERIAL PRIMARY KEY,
  id_usuario_deudor INTEGER REFERENCES Usuarios(id_usuario),
  id_qr INTEGER REFERENCES QR(id_qr), -- Referencia al código QR asociado a la deuda
  mes DATE NOT NULL,
  id_estado_deuda INTEGER REFERENCES EstadosDeudas(id_estado_deuda)
);


-- Creación de la tabla Turnos
CREATE TABLE Turnos (
  id_turno SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  disponible BOOLEAN DEFAULT true,
  id_usuario_reservado INTEGER REFERENCES Usuarios(id_usuario)
);


-- Creación de la tabla Pagos
CREATE TABLE Pagos (
  id_pago SERIAL PRIMARY KEY,
  id_usuario INTEGER REFERENCES Usuarios(id_usuario),
  fecha_pago DATE NOT NULL,
  monto_pagado DECIMAL(10, 2),
  id_deuda INTEGER REFERENCES Deudas(id_deuda),
  id_evento INTEGER REFERENCES Agenda(id_evento)
);


-- Creación de la tabla DetallesDeudas
CREATE TABLE DetallesDeudas (
  id_detalle_deuda SERIAL PRIMARY KEY,
  id_deuda INTEGER REFERENCES Deudas(id_deuda),
  concepto VARCHAR(100),
  monto_cargo DECIMAL(10, 2),
  monto_abono DECIMAL(10, 2),
  fecha_detalle DATE
);

--Insertando Roles 
INSERT INTO Roles (nombre_rol, permisos)
VALUES
  ('Administrador', 'Administrar usuarios y eventos'),
  ('Usuario', 'Reservar eventos y pagar deudas');
  ('Tesorero', 'Encargado de verificar pagos');

--Insertando Usuarios
INSERT INTO Usuarios (nombre, apellido, correo, contraseña, id_rol)
VALUES
  ('Juan', 'Perez', 'juan@gmail.com', 'contraseña123', 1),
  ('Maria', 'Gomez', 'maria@gmail.com', 'pass456', 2);
  ('Wlater', 'Lage', 'walter@gmail.com', 'pass456', 3);

--Insertando EstadosReservas
INSERT INTO EstadosReservas (nombre_estado)
VALUES
  ('Pendiente de Pago'),
  ('Pagado'),
  ('Cancelado');

--Insertando TipoEventos
INSERT INTO TiposEventos (nombre_tipo, descripcion, id_qr)
VALUES
  ('Reunión', 'Eventos de reunión', 1),
  ('Cita', 'Citas con clientes', 2),
  ('Entrevista', 'Entrevistas de trabajo', 3),
  ('Otro', 'Otro tipo de eventos', 4);

--Insertando QR
INSERT INTO QR (qr_value, qr_image)
VALUES
  (4000.00, 'https://i.pinimg.com/originals/d3/a4/21/d3a42160f600dddd066a842e55b0731f.png'),
  (2000.00, 'https://i.pinimg.com/originals/d3/a4/21/d3a42160f600dddd066a842e55b0731f.png'),
  (1000.00, 'https://i.pinimg.com/originals/d3/a4/21/d3a42160f600dddd066a842e55b0731f.png'),
  (700.00, 'https://i.pinimg.com/originals/d3/a4/21/d3a42160f600dddd066a842e55b0731f.png');

--Insertando Agenda
INSERT INTO Agenda (fecha, hora_inicio, hora_fin, id_usuario_responsable, descripcion, id_tipo_evento, id_estado_reserva)
VALUES
  ('2023-07-30', '10:00:00', '12:00:00', 1, 'Reunión de equipo', 1, 1),
  ('2023-08-05', '15:00:00', '16:30:00', 2, 'Cita con cliente', 2, 2);

--Insertando EstadosDeudas
INSERT INTO EstadosDeudas (nombre_estado)
VALUES
  ('Pendiente'),
  ('Pagada'),
  ('Vencida');

--Insertando Deudas
INSERT INTO Deudas (id_usuario_deudor, id_qr, mes, monto, id_estado_deuda)
VALUES
  (1, 1, '2023-07-01', 50.00, 1),
  (2, 2, '2023-08-01', 30.00, 2);

--Insertando Turnos
INSERT INTO Turnos (fecha, hora_inicio, hora_fin, disponible, id_usuario_reservado)
VALUES
  ('2023-07-25', '14:00:00', '15:00:00', true, NULL),
  ('2023-08-01', '11:30:00', '12:30:00', false, 2);

--Insertando Pagos
INSERT INTO Pagos (id_usuario, fecha_pago, monto_pagado, id_deuda, id_evento)
VALUES
  (1, '2023-07-10', 50.00, 1, NULL),
  (2, '2023-08-02', 30.00, 2, NULL);

-- --Insertando DetallesDeudas
INSERT INTO DetallesDeudas (id_deuda, concepto, monto_cargo, monto_abono, fecha_detalle)
VALUES
  (1, 'Cargo adicional por retraso', 10.00, 0.00, '2023-07-15'),
  (1, 'Abono realizado', 0.00, 5.00, '2023-07-20'),
  (2, 'Cargo adicional por retraso', 5.00, 0.00, '2023-08-05'),
  (2, 'Abono realizado', 0.00, 10.00, '2023-08-10');