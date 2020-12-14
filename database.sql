create table test.customers (
	customer_id int generated always as identity,
	customer_name varchar(255) not null,
	primary key(customer_id)
);

create table test.contacts (
	contact_id int generated always as identity,
	customer_id int,
	contact_name varchar(255) not null,
	phone varchar(15),
	email varchar(100),
	primary key(contact_id),
	constraint fk_customer
		foreign key(customer_id)
			references test.customers(customer_id)
            on delete cascade
);

INSERT INTO test.customers(customer_name)
VALUES('Whale Corp'),
      ('Dolphin LLC');	   
	   
INSERT INTO test.contacts(customer_id, contact_name, phone, email)
VALUES(1,'John Doe','07234122345','john.doe@whale.com'),
      (1,'Jane Doe','07894324352','jane.doe@whale.com'),
      (2,'Joe Bloggs','07897823456','joe.bloggs@dolphin.com');

SELECT a.customer_id, a.customer_name, b.contact_id, b.contact_name, b.phone, b.email
FROM test.customers a
LEFT JOIN test.contacts b
ON a.customer_id = b.customer_id;