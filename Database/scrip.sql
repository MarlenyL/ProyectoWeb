       DROP TABLE IF EXISTS USUARIOS CASCADE;
    CREATE TABLE USUARIOS(
        id INT NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        usuario VARCHAR(25) NOT NULL,
        contraseña VARCHAR(50) NOT NULL,
        foto VARCHAR(250),
        CONSTRAINT PK_usuario PRIMARY KEY(id)
    );

    DROP TABLE IF EXISTS TRANSACCION CASCADE; 
    CREATE TABLE TRANSACCION(
        id INT NOT NULL,
        monto_inicial DECIMAL(10,2) NOT NULL,
        monto_final DECIMAL(10,2) CHECK (monto_final>=0) NOT NULL, 
        fecha DATE,
        CONSTRAINT PK_transaccion PRIMARY KEY(id)
    );

    DROP TABLE IF EXISTS LUGAR CASCADE;
    CREATE TABLE LUGAR(
        id INT NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        CONSTRAINT PK_lugar PRIMARY KEY(id)
    );

    DROP TABLE IF EXISTS BENEFICIARIO CASCADE;
    CREATE TABLE BENEFICIARIO(
        id INT NOT NULL,
        usuarioId INT NOT NULL,
        carnet VARCHAR(8) NOT NULL,
        saldo DECIMAL(10,2) CHECK (saldo>=0),
        CONSTRAINT PK_beneficiario PRIMARY KEY(id),
        CONSTRAINT FK_Usuario_beneficiario FOREIGN KEY (usuarioId)
        references USUARIOS(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS EMPLEADO CASCADE;
    CREATE TABLE EMPLEADO(
        id INT NOT NULL,
        usuarioId INT NOT NULL,
        telefono VARCHAR(50),
        CONSTRAINT PK_empleado PRIMARY KEY(id),
        CONSTRAINT FK_Usuario_empleado FOREIGN KEY (usuarioId)
        references USUARIOS(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS TRANSFERENCIA CASCADE;
    CREATE TABLE TRANSFERENCIA(
        id INT NOT NULL,
        transaccionId INT NOT NULL,
        CONSTRAINT PK_transferencia PRIMARY KEY(id),
        CONSTRAINT FK_Transaccion_transferencia FOREIGN KEY (transaccionId)
        references TRANSACCION(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS COMPRA CASCADE;
    CREATE TABLE COMPRA(
        id INT NOT NULL,
        transaccionId INT NOT NULL,
        detalle VARCHAR(50) NOT NULL,
        tipo TEXT NOT NULL,
        CONSTRAINT PK_compra PRIMARY KEY(id),
        CONSTRAINT FK_Transaccion_compra FOREIGN KEY (transaccionId)
        references TRANSACCION(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS TRABAJA CASCADE;
    CREATE TABLE TRABAJA(
        id INT NOT NULL,
        lugarId INT NOT NULL,
        empleadoId INT NOT NULL,
        fecha_inicio DATE,
        fecha_fin DATE,
        CONSTRAINT PK_trabaja PRIMARY KEY(id,lugarId,empleadoId),
        CONSTRAINT FK_Trabaja_lugar FOREIGN KEY (lugarId)
        references LUGAR(id) on delete cascade on update cascade,
        CONSTRAINT FK_Trabaja_empleado  FOREIGN KEY (empleadoId)
        references EMPLEADO(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS EFECTUA CASCADE;
    CREATE TABLE EFECTUA(
        id INT NOT NULL,
        transferenciaId INT NOT NULL,
        beneficiario_donadorId INT NOT NULL,
        beneficiario_receptorId INT NOT NULL,
        monto DECIMAL(10,2) CHECK(monto>0),
        CONSTRAINT PK_efectua PRIMARY KEY(id,transferenciaId, beneficiario_donadorId, beneficiario_receptorId),
        CONSTRAINT FK_Efectua_transferencia FOREIGN KEY (transferenciaId)
        references TRANSFERENCIA(id) on delete cascade on update cascade,
        CONSTRAINT FK_efectua_beneficiario_donador FOREIGN KEY (beneficiario_donadorId)
        references BENEFICIARIO(id) on delete cascade on update cascade,
        CONSTRAINT FK_efectua_beneficiario_receptor FOREIGN KEY (beneficiario_receptorId)
        references BENEFICIARIO(id) on delete cascade on update cascade
    );

    DROP TABLE IF EXISTS REALIZA CASCADE;
    CREATE TABLE REALIZA(
        id INT NOT NULL,
        compraId INT NOT NULL,
        beneficiarioId INT NOT NULL,
        empleadoId INT NOT NULL,
        lugarId INT NOT NULL,
        monto DECIMAL(10,2),
        CONSTRAINT PK_realiza PRIMARY KEY(id, compraId, beneficiarioId, empleadoId, lugarId),
        CONSTRAINT FK_Realiza_compra FOREIGN KEY (compraId)
        references COMPRA(id) on delete cascade on update cascade,
        CONSTRAINT FK_realiza_beneficiario FOREIGN KEY (beneficiarioId)
        references BENEFICIARIO(id) on delete cascade on update cascade,
        CONSTRAINT FK_Realiza_empleado FOREIGN KEY (empleadoId)
        references EMPLEADO(id) on delete cascade on update cascade,
        CONSTRAINT FK_Realiza_lugar FOREIGN KEY (lugarId)
        references LUGAR(id) on delete cascade on update cascade
    );

    --PROCEDIMIENTO PARA PODER CALCULAR EL SALDO EN COMPRA Y ACTUALIZAR MONTO INICIAL Y FINAL EN TRANSACCION

    CREATE OR REPLACE FUNCTION saldo_acumulado_beneficiario() RETURNS trigger AS $$
    DECLARE
        monto_a_sumar BENEFICIARIO.saldo%TYPE;
    BEGIN
        IF TG_OP = 'INSERT' THEN
            monto_a_sumar := NEW.monto;
            UPDATE TRANSACCION SET monto_inicial = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiarioId) WHERE id = (SELECT transaccionId FROM COMPRA WHERE id = NEW.compraId);
            UPDATE BENEFICIARIO SET saldo=saldo+monto_a_sumar WHERE id=NEW.beneficiarioId;
            UPDATE TRANSACCION SET monto_final = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiarioId) WHERE id = (SELECT transaccionId FROM COMPRA WHERE id = NEW.compraId);
            RAISE NOTICE 'Debido a la compra en el lugar %, se va a sumar/restar al beneficiario % el monto de $%',(SELECT l.nombre FROM LUGAR l WHERE l.id = NEW.lugarId), (SELECT u.nombre FROM USUARIOS u, BENEFICIARIO b WHERE u.id = b.usuarioId AND b.id = NEW.beneficiarioId),monto_a_sumar;
            RETURN NEW;
        END IF;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS actualiza_saldo_acumulado_beneficiario ON REALIZA;
    CREATE TRIGGER actualiza_saldo_acumulado_beneficiario BEFORE INSERT ON REALIZA FOR EACH ROW EXECUTE PROCEDURE saldo_acumulado_beneficiario();

    --PROCEDIMIENTO PARA PODER CALCULAR EL SALDO EN TRANSFERENCIAS Y ACTUALIZAR MONTO INICIAL Y FINAL EN TRANSACCION
    CREATE OR REPLACE FUNCTION saldo_acumulado_transferencia_beneficiario() RETURNS trigger AS $$
    DECLARE
        monto_a_sumar BENEFICIARIO.saldo%TYPE;
    BEGIN
        IF TG_OP = 'INSERT' THEN
            monto_a_sumar := NEW.monto;
            UPDATE TRANSACCION SET monto_inicial = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiario_donadorId) WHERE id = (SELECT transaccionId FROM TRANSFERENCIA WHERE id = NEW.transferenciaId);
            UPDATE BENEFICIARIO SET saldo=saldo-monto_a_sumar WHERE id=NEW.beneficiario_donadorId;
            UPDATE TRANSACCION SET monto_final = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiario_donadorId) WHERE id = (SELECT transaccionId FROM TRANSFERENCIA WHERE id = NEW.transferenciaId);
            UPDATE TRANSACCION SET monto_inicial = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiario_receptorId) WHERE id = (SELECT transaccionId FROM TRANSFERENCIA WHERE id = NEW.transferenciaId);
            UPDATE BENEFICIARIO SET saldo=saldo+monto_a_sumar WHERE id=NEW.beneficiario_receptorId;
            UPDATE TRANSACCION SET monto_final = (SELECT SALDO FROM BENEFICIARIO WHERE id=NEW.beneficiario_receptorId) WHERE id = (SELECT transaccionId FROM TRANSFERENCIA WHERE id = NEW.transferenciaId);
            RAISE NOTICE 'Debido a la transferencia, se va a sumar al beneficiario % el monto de $% y al beneficiario % se le restara el monto de $% ',(SELECT u.nombre FROM USUARIOS u, BENEFICIARIO b WHERE u.id = b.usuarioId AND b.id = NEW.beneficiario_receptorId),monto_a_sumar,(SELECT u.nombre FROM USUARIOS u, BENEFICIARIO b WHERE u.id = b.usuarioId AND b.id = NEW.beneficiario_donadorId), monto_a_sumar;
            RETURN NEW;
        END IF;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS actualiza_saldo_acumulado_transferencia_beneficiario ON REALIZA;
    CREATE TRIGGER actualiza_saldo_acumulado_transferencia_beneficiario BEFORE INSERT ON EFECTUA FOR EACH ROW EXECUTE PROCEDURE saldo_acumulado_transferencia_beneficiario();

    --USUARIO/BENEFICIARIO
    INSERT INTO USUARIOS VALUES(1,'Carlos Francisco Estévez Lemus','00120218','00120218','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(2,'Christian Gerardo Chinchilla Ramirez','00049518','00049518','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(3,'Andrea Pamela Ochoa Figueroa','00094118','00094118','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(4,'Rocio Marleny Landaverde Solis','00153118','00153118','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(5,'Vania Michelle Benitez Nochez','00171419','00171419','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(6,'Carlo Juan Martín Perez','cmartin','lapalabramagica','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    --USUARIO/EMPLEADO
    INSERT INTO USUARIOS VALUES(7,'Marleny Solis','msolis','root','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(8,'Michelle Noches','mnoches','root','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(9,'Rodrigo Pineda','rpineda','root','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(10,'Miguel Garcia','mgarcia','root','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');
    INSERT INTO USUARIOS VALUES(11,'Josue Hernandez','jhernandez','root','https://res.cloudinary.com/ste0219/image/upload/v1574811825/Base/perfil_i5hmiy.jpg');

    --BENEFICIARIO
    INSERT INTO BENEFICIARIO VALUES(1,1,'00120218',0.00);
    INSERT INTO BENEFICIARIO VALUES(2,2,'00049518',0.00);
    INSERT INTO BENEFICIARIO VALUES(3,3,'00094118',0.00);
    INSERT INTO BENEFICIARIO VALUES(4,4,'00153118',0.00);
    INSERT INTO BENEFICIARIO VALUES(5,5,'00171419',0.00);
    INSERT INTO BENEFICIARIO VALUES(6,6,'cmartin',0.00);

    --EMPLEADO
    INSERT INTO EMPLEADO VALUES(1,7,'7845-1523');
    INSERT INTO EMPLEADO VALUES(2,8,'7743-2363');
    INSERT INTO EMPLEADO VALUES(3,9,'7503-2623');
    INSERT INTO EMPLEADO VALUES(4,10,'7964-7854');
    INSERT INTO EMPLEADO VALUES(5,11,'7423-3127');
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
    INSERT INTO TRABAJA VALUES(1,1,1,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(2,1,2,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(3,2,3,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(4,2,4,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(5,3,5,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(6,3,1,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(7,4,2,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(8,4,3,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(9,5,4,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(10,5,5,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(11,6,1,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(12,6,2,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(13,7,3,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(14,7,4,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(15,8,5,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(16,8,1,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(17,9,2,'2019-01-01','2020-01-01');
    INSERT INTO TRABAJA VALUES(18,9,3,'2019-01-01','2020-01-01');
    
    --TRANSACCION/COMPRA/RECARGA
    INSERT INTO TRANSACCION VALUES(1,0.00,0.00,'2019-11-01');
    INSERT INTO TRANSACCION VALUES(2,0.00,0.00,'2019-11-01');
    INSERT INTO TRANSACCION VALUES(3,0.00,0.00,'2019-11-01');
    INSERT INTO TRANSACCION VALUES(4,0.00,0.00,'2019-11-01');
    INSERT INTO TRANSACCION VALUES(5,0.00,0.00,'2019-11-01');
    INSERT INTO TRANSACCION VALUES(6,0.00,0.00,'2019-11-01');
    INSERT INTO COMPRA VALUES(1,1,'Recarga inicial','Recarga');
    INSERT INTO COMPRA VALUES(2,2,'Recarga inicial','Recarga');
    INSERT INTO COMPRA VALUES(3,3,'Recarga inicial','Recarga');
    INSERT INTO COMPRA VALUES(4,4,'Recarga inicial','Recarga');
    INSERT INTO COMPRA VALUES(5,5,'Recarga inicial','Recarga');
    INSERT INTO COMPRA VALUES(6,6,'Recarga inicial','Recarga');

    --REALIZA
    BEGIN;
    INSERT INTO REALIZA VALUES(1,1,1,1,1,15.00);
    INSERT INTO REALIZA VALUES(2,2,2,5,5,15.00);
    INSERT INTO REALIZA VALUES(3,3,3,4,2,15.00);
    INSERT INTO REALIZA VALUES(4,4,4,3,4,20.00);
    INSERT INTO REALIZA VALUES(5,5,5,2,6,25.00);
    INSERT INTO REALIZA VALUES(6,6,6,4,2,100.00);
    COMMIT;
    --TRANSACCION/TRANSFERENCIA
    INSERT INTO TRANSACCION VALUES(7,0.00,0.00,'2019-11-05');
    INSERT INTO TRANSACCION VALUES(8,0.00,0.00,'2019-11-07');
    INSERT INTO TRANSACCION VALUES(9,0.00,0.00,'2019-11-04');
    INSERT INTO TRANSFERENCIA VALUES(1,7);
    INSERT INTO TRANSFERENCIA VALUES(2,8);
    INSERT INTO TRANSFERENCIA VALUES(3,9);

    --EFECTUA
    INSERT INTO EFECTUA VALUES(1,1,1,2,2.50);
    INSERT INTO EFECTUA VALUES(2,2,3,1,3.50);
    INSERT INTO EFECTUA VALUES(3,3,4,3,4.50);

    --TRANSACCION/COMPRA/GASTO
    INSERT INTO TRANSACCION VALUES(10,0.00,0.00,'2019-11-08');
    INSERT INTO TRANSACCION VALUES(11,0.00,0.00,'2019-11-09');
    INSERT INTO TRANSACCION VALUES(12,0.00,0.00,'2019-11-10');
    INSERT INTO TRANSACCION VALUES(13,0.00,0.00,'2019-11-08');
    INSERT INTO TRANSACCION VALUES(14,0.00,0.00,'2019-11-07');
    INSERT INTO TRANSACCION VALUES(15,0.00,0.00,'2019-11-11');
    INSERT INTO COMPRA VALUES(7,1,'Dulces','Gasto');
    INSERT INTO COMPRA VALUES(8,2,'Churros','Gasto');
    INSERT INTO COMPRA VALUES(9,3,'Cafe mocaccino','Gasto');
    INSERT INTO COMPRA VALUES(10,4,'Maruchan','Gasto');
    INSERT INTO COMPRA VALUES(11,5,'Coca-Cola','Gasto');
    INSERT INTO COMPRA VALUES(12,6,'Café negro y pan dulce','Gasto');

    --REALIZA
    BEGIN;
    INSERT INTO REALIZA VALUES(7,7,1,1,1,-1.20);
    INSERT INTO REALIZA VALUES(8,8,2,5,5,-2.25);
    INSERT INTO REALIZA VALUES(9,9,3,4,2,-1.25);
    INSERT INTO REALIZA VALUES(10,10,4,3,4,-0.80);
    INSERT INTO REALIZA VALUES(11,11,5,2,6,-0.65);
    INSERT INTO REALIZA VALUES(12,12,6,4,4,-1.50);
    COMMIT;
