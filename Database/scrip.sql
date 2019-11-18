DROP TABLE IF EXISTS USUARIO CASCADE;
DROP TABLE IF EXISTS USUARIOS CASCADE;
CREATE TABLE USUARIOS(
    id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    usuario VARCHAR(25) NOT NULL,
    contraseña VARCHAR(12) NOT NULL,
    CONSTRAINT PK_usuario PRIMARY KEY(id)
);

DROP TABLE IF EXISTS TRANSACCION CASCADE; 
CREATE TABLE TRANSACCION(
    id_transaccion INT NOT NULL,
    monto_inicial NUMERIC NOT NULL,
    monto_final NUMERIC CHECK (monto_final>=0) NOT NULL, 
    fecha DATE,
    CONSTRAINT PK_transaccion PRIMARY KEY(id_transaccion)
);

DROP TABLE IF EXISTS LUGAR CASCADE;
CREATE TABLE LUGAR(
    id_lugar INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    CONSTRAINT PK_lugar PRIMARY KEY(id_lugar)
);

DROP TABLE IF EXISTS BENEFICIARIO CASCADE;
CREATE TABLE BENEFICIARIO(
    id_beneficiario INT NOT NULL,
    id INT NOT NULL,
    carnet VARCHAR(8) NOT NULL,
    saldo NUMERIC CHECK (saldo>=0),
    CONSTRAINT PK_beneficiario PRIMARY KEY(id_beneficiario),
    CONSTRAINT FK_Usuario_beneficiario FOREIGN KEY (id)
	references USUARIOS(id) on delete cascade on update cascade
);

DROP TABLE IF EXISTS EMPLEADO CASCADE;
CREATE TABLE EMPLEADO(
    id_empleado INT NOT NULL,
    id INT NOT NULL,
    telefono VARCHAR(50),
    CONSTRAINT PK_empleado PRIMARY KEY(id_empleado),
    CONSTRAINT FK_Usuario_empleado FOREIGN KEY (id)
	references USUARIOS(id) on delete cascade on update cascade
);

DROP TABLE IF EXISTS TRANSFERENCIA CASCADE;
CREATE TABLE TRANSFERENCIA(
    id_transferencia INT NOT NULL,
    id_transaccion INT NOT NULL,
    CONSTRAINT PK_transferencia PRIMARY KEY(id_transferencia),
    CONSTRAINT FK_Transaccion_transferencia FOREIGN KEY (id_transaccion)
	references TRANSACCION(id_transaccion) on delete cascade on update cascade
);

DROP TABLE IF EXISTS COMPRA CASCADE;
CREATE TABLE COMPRA(
    id_compra INT NOT NULL,
    id_transaccion INT NOT NULL,
    detalle VARCHAR(50) NOT NULL,
    tipo TEXT NOT NULL,
    CONSTRAINT PK_compra PRIMARY KEY(id_compra),
    CONSTRAINT FK_Transaccion_compra FOREIGN KEY (id_transaccion)
	references TRANSACCION(id_transaccion) on delete cascade on update cascade
);

DROP TABLE IF EXISTS TRABAJA CASCADE;
CREATE TABLE TRABAJA(
    id_lugar INT NOT NULL,
    id_empleado INT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    CONSTRAINT PK_trabaja PRIMARY KEY(id_lugar,id_empleado),
    CONSTRAINT FK_Trabaja_lugar FOREIGN KEY (id_lugar)
	references LUGAR(id_lugar) on delete cascade on update cascade,
    CONSTRAINT FK_Trabaja_empleado  FOREIGN KEY (id_empleado)
	references EMPLEADO(id_empleado) on delete cascade on update cascade
);

DROP TABLE IF EXISTS EFECTUA CASCADE;
CREATE TABLE EFECTUA(
    id_transferencia INT NOT NULL,
    id_beneficiario_donador INT NOT NULL,
    id_beneficiario_receptor INT NOT NULL,
    monto NUMERIC CHECK(monto>0),
    CONSTRAINT PK_efectua PRIMARY KEY(id_transferencia, id_beneficiario_donador, id_beneficiario_receptor),
    CONSTRAINT FK_Efectua_transferencia FOREIGN KEY (id_transferencia)
	references TRANSFERENCIA(id_transferencia) on delete cascade on update cascade,
    CONSTRAINT FK_efectua_beneficiario_donador FOREIGN KEY (id_beneficiario_donador)
	references BENEFICIARIO(id_beneficiario) on delete cascade on update cascade,
    CONSTRAINT FK_efectua_beneficiario_receptor FOREIGN KEY (id_beneficiario_receptor)
	references BENEFICIARIO(id_beneficiario) on delete cascade on update cascade
);

DROP TABLE IF EXISTS REALIZA CASCADE;
CREATE TABLE REALIZA(
    id_compra INT NOT NULL,
    id_beneficiario INT NOT NULL,
    id_empleado INT NOT NULL,
    id_lugar INT NOT NULL,
    monto MONEY,
    CONSTRAINT PK_realiza PRIMARY KEY(id_compra, id_beneficiario, id_empleado, id_lugar),
    CONSTRAINT FK_Realiza_compra FOREIGN KEY (id_compra)
	references COMPRA(id_compra) on delete cascade on update cascade,
    CONSTRAINT FK_realiza_beneficiario FOREIGN KEY (id_beneficiario)
	references BENEFICIARIO(id_beneficiario) on delete cascade on update cascade,
    CONSTRAINT FK_Realiza_empleado FOREIGN KEY (id_empleado)
	references EMPLEADO(id_empleado) on delete cascade on update cascade,
    CONSTRAINT FK_Realiza_lugar FOREIGN KEY (id_lugar)
	references LUGAR(id_lugar) on delete cascade on update cascade
);

--USUARIO
INSERT INTO USUARIOS VALUES(1,'Carlos Francisco Estévez Lemus','00120218','00120218');
INSERT INTO USUARIOS VALUES(2,'Christian Gerardo Chinchilla Ramirez','00049518','00049518');
INSERT INTO USUARIOS VALUES(3,'Andrea Pamela Ochoa Figueroa','00094118','00094118');
INSERT INTO USUARIOS VALUES(4,'Rocio Marleny Landaverde Solis','00153118','00153118');
INSERT INTO USUARIOS VALUES(5,'Vania Michelle Benitez Noches','00171419','00171419');
INSERT INTO USUARIOS VALUES(6,'Rodrigo Alessandro Carrero Pineda','00193019','00193019');
INSERT INTO USUARIOS VALUES(7,'Jose Miguel Ramos Garcia','00192618','00192618');
INSERT INTO USUARIOS VALUES(8,'Fernando Josue Vasquez Hernandez','00179118','00179118');

INSERT INTO USUARIOS VALUES(9,'Marleny Solis','msolis','root');
INSERT INTO USUARIOS VALUES(10,'Michelle Noches','mnoches','root');
INSERT INTO USUARIOS VALUES(11,'Rodrigo Pineda','rpineda','root');
INSERT INTO USUARIOS VALUES(12,'Miguel Garcia','mgarcia','root');
INSERT INTO USUARIOS VALUES(13,'Josue Hernandez','jhernandez','root');
 
--BENEFICIARIO
INSERT INTO BENEFICIARIO VALUES(1,1,'00120218',0);
INSERT INTO BENEFICIARIO VALUES(2,2,'00049518',0);
INSERT INTO BENEFICIARIO VALUES(3,3,'00094118',0);
INSERT INTO BENEFICIARIO VALUES(4,4,'00153118',0);
INSERT INTO BENEFICIARIO VALUES(5,5,'00171419',0);
INSERT INTO BENEFICIARIO VALUES(6,6,'00193019',0);
INSERT INTO BENEFICIARIO VALUES(7,7,'00192618',0);
INSERT INTO BENEFICIARIO VALUES(8,8,'00179118',0);

--EMPLEADO
INSERT INTO EMPLEADO VALUES(1,9,'7845-1523');
INSERT INTO EMPLEADO VALUES(2,10,'7743-2363');
INSERT INTO EMPLEADO VALUES(3,11,'7503-2623');
INSERT INTO EMPLEADO VALUES(4,12,'7964-7854');
INSERT INTO EMPLEADO VALUES(5,13,'7423-3127');
--LUGAR
INSERT INTO LUGAR VALUES(1,'Cafeteria ICAS');
INSERT INTO LUGAR VALUES(2,'Cafeteria Central');
INSERT INTO LUGAR VALUES(3,'Cafeteria Entrada Peatonal');
INSERT INTO LUGAR VALUES(4,'Las Terrazas');
INSERT INTO LUGAR VALUES(5,'Tienda UCA');
INSERT INTO LUGAR VALUES(6,'Libreria UCA');
INSERT INTO LUGAR VALUES(7,'Cafeteria Polideportivo');
INSERT INTO LUGAR VALUES(8,'Supermercado UCA');
INSERT INTO LUGAR VALUES(9,'Cafeteria ICAS');

--Trabaja
INSERT INTO TRABAJA VALUES(1,1,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(1,2,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(2,3,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(2,4,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(3,5,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(3,1,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(4,2,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(4,3,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(5,4,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(5,5,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(6,1,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(6,2,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(7,3,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(7,4,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(8,5,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(8,1,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(9,2,'2019-01-01','2020-01-01');
INSERT INTO TRABAJA VALUES(9,3,'2019-01-01','2020-01-01');
