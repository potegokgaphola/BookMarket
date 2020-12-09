CREATE table Users(
 id int identity(1,1) primary key,
 email varchar(255) unique,
 firstname varchar(255) not null,
 lastname varchar(255) not null,
 password varchar(255) not null,
)