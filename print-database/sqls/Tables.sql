Create Table "User" (
  "id" INT Primary key Identity(1,1),
  "cid" NVARCHAR(100) Unique,
  "first" NVARCHAR(100) NOT NULL,
  "last" NVARCHAR(100) NOT NULL,
  "name" AS (first + ' ' + last),
  "email" NVARCHAR(200) NOT NULL Unique
);

Create Table "Department"(
	id INT Primary Key Identity(1,1),
  	uid INT FOREIGN key references "User"(id),
    name NVARCHAR(100) NOT NULL,
    FOPAL NVARCHAR(100) NOT NULL,
    CONSTRAINT "UQ_Department_uid_Name_FOPAL" Unique (uid,name,fopal)
);

Alter Table "User" Add 
"default_did" INT FOREIGN key references "Department"(id);


Create Table "PrintOrder"(
  "id" INT Primary Key Identity(1,1),
  "uid" INT FOREIGN key references "User"(id),
  "departmentname" NVARCHAR(100) NOT NULL,
  "FOPAL" NVARCHAR(100) NOT NULL,
  "status" NVARCHAR(10) NOT NULL CHECK (status IN('DRAFTED', 'SUBMITTED', 'ARCHIVED')),
  "date_needed" DATE NOT NULL,
  "time_needed" TIME,
  "date_submitted" DATE NOT NULL Default(GETDATE())
);

Create Table "PrintingProfile"(
	id INT Primary Key Identity(1,1),
    uid INT FOREIGN key references "User"(id),
    name NVARCHAR(100) NOT NULL,
    is_color BIT,
  	double_sizing NVARCHAR(100) NOT NULL,
    paper_color NVARCHAR(100) NOT NULL,
    paper_size NVARCHAR(100) NOT NULL,
    distribution NVARCHAR(100) NOT NULL,
    binding NVARCHAR(100) NOT NULL,
);

Create Table "PrintJob"(
  id INT Primary Key Identity(1,1),
  oid INT FOREIGN key references "PrintOrder"(id),
  pid INT FOREIGN key references "PrintingProfile"(id),
  file_name NVARCHAR(1024) NOT NULL,
  num_copies INT NOT NULL,
  num_pages INT NOT NULL,
  comment NVARCHAR(4000)
);

Create Table "Template"(
  	id INT Primary Key Identity(1,1),
    uid INT FOREIGN key references "User"(id),
    name NVARCHAR(100) NOT NULL,
    did INT FOREIGN key references "Department"(id),
);

