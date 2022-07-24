CREATE TABLE classes(
    class_id bigserial PRIMARY KEY,
    class_name VARCHAR(30) NOT NULL,
    class_price FLOAT NOT NULL
);

CREATE TABLE rooms (
    room_no INTEGER PRIMARY KEY,
    class_id INTEGER NOT NULL,
    isavailable BOOLEAN NOT NULL
);

CREATE TABLE reservation(
    res_id bigserial PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    room_no INTEGER NOT NULL,
    date_in DATE NOT NULL,
    date_out DATE NOT NULL, 
    date_range INTEGER NOT NULL,
    adults INTEGER NOT NULL,
    children INTEGER,
    CONSTRAINT fk_customers FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_rooms FOREIGN KEY(room_no) REFERENCES rooms(room_no)
)

-- CREATE TABLE reservation(
--     res_id bigserial PRIMARY KEY,
--     customer_id INTEGER NOT NULL,
--     rooms INTEGER[],
--     date_in DATE NOT NULL,
--     date_out DATE NOT NULL, 
--     date_range INTEGER NOT NULL,
--     adults INTEGER NOT NULL,
--     children INTEGER,
--     CONSTRAINT fk_customers FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
-- )

CREATE TABLE customers(
    customer_id bigserial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
)

CREATE TABLE payments(
    pay_id bigserial PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    amount FLOAT NOT NULL
)



ALTER SEQUENCE payments_pay_id_seq RESTART WITH 1001 INCREMENT BY 2;
ALTER SEQUENCE customers_customer_id_seq RESTART WITH 2001 INCREMENT BY 1;
ALTER SEQUENCE reservation_res_id_seq RESTART WITH 3001 INCREMENT BY 1;

/*create or replace function calcdaterange()
returns trigger as $$
BEGIN
NEW.date_range = abs(extract(day from NEW.date_in::timestamp - NEW.date_out::timestamp));
return NEW;
END
$$ LANGUAGE plpgsql;

create or replace function calcdaterange2()
returns trigger as $$
BEGIN
NEW.diff = abs(extract(day from NEW.indate::timestamp - NEW.outdate::timestamp));
return NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER calc before insert or update on dates for each row EXECUTE PROCEDURE calcdaterange2();
CREATE TRIGGER calcrange before insert or update on reservation for each row EXECUTE PROCEDURE calcdaterange();

SELECT c.class_id,class_name, count(*), class_price FROM rooms r inner join classes c on c.class_id = r.class_id WHERE r.isavailable = '1' AND r.room_no in (101,102,107) GROUP BY c.class_id ORDER BY c.class_id
*/
-- ALTER TABLE test.test_id
--     ALTER COLUMN test_id TYPE INTEGER[]
--     USING array[test_id]::INTEGER[];
ALTER TABLE rooms ADD CONSTRAINT fk_rooms_classes FOREIGN KEY (class_id) REFERENCES classes(class_id);
-- ALTER TABLE customers ALTER COLUMN customer_id TYPE bigserial PRIMARY KEY;
SELECT c.class_id,class_name, count(*), class_price FROM rooms r inner join classes c on c.class_id = r.class_id WHERE r.isavailable = '1' GROUP BY c.class_id ORDER BY c.class_id;
/*
    INSERT INTO classes(class_name, class_price) VALUES('single', 2000.00);
    INSERT INTO classes(class_name, class_price) VALUES('double', 3000.00);
    INSERT INTO classes(class_name, class_price) VALUES('triple', 4000.00);
    INSERT INTO classes(class_name, class_price) VALUES('quad', 6000.00);
    INSERT INTO classes(class_name, class_price) VALUES('cabana', 8000.00);
    INSERT INTO classes(class_name, class_price) VALUES('villa', 10000.00);
    INSERT INTO classes(class_name, class_price) VALUES('penthouse', 17000.00);

    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(101, 1, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(102, 2, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(103, 5, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(104, 1, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(105, 2, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(106, 1, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(107, 2, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(108, 1, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(109, 3, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(110, 4, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(111, 7, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(112, 7, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(113, 4, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(114, 6, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(115, 5, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(116, 6, '1');
    INSERT INTO rooms(room_no,class_id, isavailable) VALUES(117, 6, '1');


    INSERT INTO customers(c_first_name,c_last_name,email) values('Jack', 'Dan','Jack@examples.com'),('Joe', 'Biden','Joe@examples.com'),('John', 'Doe','John@examples.com');
*/