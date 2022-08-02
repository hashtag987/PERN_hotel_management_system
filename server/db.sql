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
-- select classes.class_id as id, class_name as name, count(room_no) as roomcount from rooms join classes on rooms.class_id = classes.class_id where isavailable = 't' or room_no in (select room_no from rooms join reservation on rooms.room_no = any(reservation.rooms) where date_out < '2022-07-31' ) group by classes.class_id , class_name order by classes.class_id;
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

    update classes set description='Our comfortable single rooms are just the right size if you are travelling alone. Similar to all the other rooms in the Amsterdam Forest Hotel, the single room is fully equipped with all comforts. In addition to the comfortable hotel lounge, the room is equipped with a Smart TV, Wi-Fi and iPod docking station.Our spacy single rooms offer all the space and comfort you need during your stay in India.' WHERE class_id = 1;
    update classes set description='Ideal for one to two people, double rooms at Froyo Grande overlook either the courtyard or street. All rooms have double glazing, ensuring a calm and relaxing environment for our guests. Double rooms have a double bed, an en-suite bathroom with bath, and separate toilet.' WHERE class_id = 2;
    update classes set description='Our Triple rooms can accommodate up to three people. We offer a double bed and a single bed. Our triple rooms overlook the street and have double glazing to ensure peace and quiet for our guests. All of our triple rooms have an en-suite bathroom with bath and toilet.' WHERE class_id = 3;
    update classes set description='Our Quad rooms can accommodate up to Four people. We offer two double beds with excellency. Our Quad rooms overlook the street and have double glazing to ensure peace and quiet for our guests. All of our Quad rooms have an en-suite bathroom with bath and toilet.' WHERE class_id = 4;
    update classes set description='Our cabana rooms raise the bar in hotel accommodations anywhere. These rooms are even more spacious and come with a balcony that opens into a pool right outside your own room. Whether on business or vacation, our cabana rooms offer a unique holiday feeling and come equipped with high-speed internet, flat screen television, mini bar, coffee maker, fridge, desk, and high-end amenities. Enjoy total stimulation or total relaxation, as you wish.' WHERE class_id = 5;
    update classes set description='Experience the stay in our villa in Froyo Grande India.Exclusive style, traditional Indian architecture and enviable service may make it challenging for you to leave your comfortable and idyllic surroundings to discover all the the calming environment. Located at the top of a hill, the villa is built sparing no luxury. On the outside, the private pool is surrounded by a lush garden looking out to a magnificent view.' WHERE class_id = 6;
    update classes set description='Our penthouse is the main room of the apartment with huge bright lounge with a fireplace, big dining table for 8 people and staircase leading to the second floor with gallery. In the lounge you can enjoy three comfortable sofas and a satellite flat-screen TV. You will also appreciate superb chaise lounge with lamp for relaxing or reading and a wine chiller.' WHERE class_id = 7;



    INSERT INTO customers(c_first_name,c_last_name,email) values('Jack', 'Dan','Jack@examples.com'),('Joe', 'Biden','Joe@examples.com'),('John', 'Doe','John@examples.com');
*/

/*
CREATE OR REPLACE FUNCTION updateHistory()
  RETURNS TRIGGER 
  AS
$$
BEGIN
	INSERT INTO reservation_history VALUES(NEW.res_id, NEW.customer_id, NEW.rooms, NEW.date_in, NEW.date_out);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER historyTrigger AFTER INSERT ON reservation FOR EACH ROW EXECUTE PROCEDURE updateHistory();

CREATE OR REPLACE FUNCTION updateReservations()
  RETURNS TRIGGER 
  AS
$$
DECLARE
length INTEGER = 0;
BEGIN
	IF OLD.isavailable = 'F' AND NEW.isavailable = 'T' THEN
		SELECT cardinality(rooms) INTO length FROM reservation WHERE OLD.roomno = ANY(rooms);
		IF length > 1 THEN
			UPDATE reservation SET rooms = array_remove(rooms, OLD.roomno) WHERE OLD.roomno = ANY(rooms);
		ELSE
			DELETE FROM reservation WHERE res_id = (SELECT res_id FROM reservation WHERE OLD.roomno = ANY(rooms));
		END IF;
	END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reservationTrigger AFTER UPDATE ON rooms FOR EACH ROW EXECUTE PROCEDURE updateReservations();
*/
select rooms.room_no from rooms join classes on rooms.class_id = classes.class_id where class_name = 'double' and (isavailable = 't' or room_no in (select room_no from rooms join reservation on rooms.room_no = any(reservation.rooms) where date_out < '2022-07-31' ));