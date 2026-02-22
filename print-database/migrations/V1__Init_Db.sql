-- Database export via SQLPro (https://www.sqlprostudio.com/)
-- Exported by zeen at 08-02-2026 22:53.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE dbo.Department
IF OBJECT_ID('dbo.Departments', 'U') IS NOT NULL
DROP TABLE dbo.Departments;
GO

CREATE TABLE dbo.Departments (
	id int NOT NULL IDENTITY(1,1),
	uid int NULL,
	name nvarchar(100) NOT NULL,
	FOPAL nvarchar(100) NOT NULL
);
GO

ALTER TABLE dbo.Departments ADD CONSTRAINT PK__Departme__3213E83FE4436876 PRIMARY KEY (id);
GO

-- Table dbo.Departments contains no data. No inserts have been generated.
-- END TABLE dbo.Departments
-- BEGIN TABLE dbo.flyway_schema_history
IF OBJECT_ID('dbo.flyway_schema_history', 'U') IS NOT NULL
DROP TABLE dbo.flyway_schema_history;
GO

CREATE TABLE dbo.flyway_schema_history (
	installed_rank int NOT NULL,
	version nvarchar(50) NULL,
	description nvarchar(200) NULL,
	[type] nvarchar(20) NOT NULL,
	script nvarchar(1000) NOT NULL,
	checksum int NULL,
	installed_by nvarchar(100) NOT NULL,
	installed_on datetime NOT NULL DEFAULT (getdate()),
	execution_time int NOT NULL,
	success bit NOT NULL
);
GO

ALTER TABLE dbo.flyway_schema_history ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);
GO

-- Inserting 1 row into dbo.flyway_schema_history
-- Insert batch #1
INSERT INTO dbo.flyway_schema_history (installed_rank, version, description, [type], script, checksum, installed_by, installed_on, execution_time, success) VALUES
(1, '1', '<< Flyway Baseline >>', 'BASELINE', '<< Flyway Baseline >>', NULL, 'wangz30', '2026-02-08 22:48:42.613', 0, 1);

-- END TABLE dbo.flyway_schema_history

-- BEGIN TABLE dbo.PrintingProfiles
IF OBJECT_ID('dbo.PrintingProfiles', 'U') IS NOT NULL
DROP TABLE dbo.PrintingProfiles;
GO

CREATE TABLE dbo.PrintingProfiles (
	id int NOT NULL IDENTITY(1,1),
	uid int NULL,
	name nvarchar(100) NOT NULL,
	is_color bit NULL,
	double_sizing nvarchar(100) NOT NULL,
	paper_color nvarchar(100) NOT NULL,
	paper_size nvarchar(100) NOT NULL,
	distribution nvarchar(100) NOT NULL,
	binding nvarchar(100) NOT NULL
);
GO

ALTER TABLE dbo.PrintingProfiles ADD CONSTRAINT PK__Printing__3213E83FE4EE1389 PRIMARY KEY (id);
GO

-- Table dbo.PrintingProfiles contains no data. No inserts have been generated.
-- END TABLE dbo.PrintingProfiles

-- BEGIN TABLE dbo.PrintJobs
IF OBJECT_ID('dbo.PrintJobs', 'U') IS NOT NULL
DROP TABLE dbo.PrintJobs;
GO

CREATE TABLE dbo.PrintJobs (
	id int NOT NULL IDENTITY(1,1),
	oid int NULL,
	pid int NULL,
	file_name nvarchar(1024) NOT NULL,
	num_copies int NOT NULL,
	num_pages int NOT NULL,
	comment nvarchar(4000) NULL
);
GO

ALTER TABLE dbo.PrintJobs ADD CONSTRAINT PK__PrintJob__3213E83F84920A11 PRIMARY KEY (id);
GO

-- Table dbo.PrintJobs contains no data. No inserts have been generated.
-- END TABLE dbo.PrintJobs

-- BEGIN TABLE dbo.PrintOrders
IF OBJECT_ID('dbo.PrintOrders', 'U') IS NOT NULL
DROP TABLE dbo.PrintOrders;
GO

CREATE TABLE dbo.PrintOrders (
	id int NOT NULL IDENTITY(1,1),
	uid int NULL,
	departmentname nvarchar(100) NOT NULL,
	FOPAL nvarchar(100) NOT NULL,
	status nvarchar(10) NOT NULL,
	date_needed date NOT NULL,
	time_needed time NULL,
	date_submitted date NOT NULL DEFAULT (getdate())
);
GO

ALTER TABLE dbo.PrintOrders ADD CONSTRAINT PK__PrintOrd__3213E83F9F497263 PRIMARY KEY (id);
GO

-- Table dbo.PrintOrders contains no data. No inserts have been generated.
-- END TABLE dbo.PrintOrders

-- BEGIN TABLE dbo.Templates
IF OBJECT_ID('dbo.Templates', 'U') IS NOT NULL
DROP TABLE dbo.Templates;
GO

CREATE TABLE dbo.Templates (
	id int NOT NULL IDENTITY(1,1),
	uid int NULL,
	name nvarchar(100) NOT NULL,
	did int NULL
);
GO

ALTER TABLE dbo.Templates ADD CONSTRAINT PK__Template__3213E83F76C5C5E3 PRIMARY KEY (id);
GO

-- Table dbo.Templates contains no data. No inserts have been generated.
-- END TABLE dbo.Templates

-- BEGIN TABLE dbo.Users
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users (
	id int NOT NULL IDENTITY(1,1),
	cid nvarchar(100) NULL,
	[first] nvarchar(100) NOT NULL,
	[last] nvarchar(100) NOT NULL,
	name AS (([first]+' ')+[last]),
	email nvarchar(200) NOT NULL,
	default_did int NULL
);
GO

ALTER TABLE dbo.Users ADD CONSTRAINT PK__User__3213E83FDFE0B5F1 PRIMARY KEY (id);
GO

-- Inserting 1 row into dbo.Users
SET IDENTITY_INSERT dbo.Users ON

-- Insert batch #1
INSERT INTO dbo.Users (id, cid, [first], [last], email, default_did) VALUES
(1, 'kleinsv', 'Veronica', 'Kleinschmidt', 'kleinsv@rose-hulman.edu', NULL);

SET IDENTITY_INSERT dbo.Users OFF

-- END TABLE dbo.Users

IF EXISTS ( SELECT * FROM sysobjects WHERE  id = object_id(N'dbo.AddUser') AND OBJECTPROPERTY(id, N'IsProcedure') = 1 )
	DROP PROCEDURE dbo.AddUser
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO
-- =============================================
-- Author:		Veronica Kleinschmidt
-- Create date: 02/05/2026
-- Description:	Adds a new user to the database
-- =============================================
CREATE PROCEDURE [dbo].[AddUser] 
	-- Add the parameters for the stored procedure here
	@Username nvarchar(100),
	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@Email nvarchar(200)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO Users (cid, first, last, email)
	VALUES (@Username, @FirstName, @LastName, @Email)
	SELECT @@IDENTITY
END
GO

IF EXISTS ( SELECT * FROM sysobjects WHERE  id = object_id(N'dbo.GetAllUsers') AND OBJECTPROPERTY(id, N'IsProcedure') = 1 )
	DROP PROCEDURE dbo.GetAllUsers
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO
CREATE PROC dbo.GetAllUsers
AS
SELECT *
FROm dbo.Users
GO

IF EXISTS ( SELECT * FROM sysobjects WHERE  id = object_id(N'dbo.GetUserInfoFromEmail') AND OBJECTPROPERTY(id, N'IsProcedure') = 1 )
	DROP PROCEDURE dbo.GetUserInfoFromEmail
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO
CREATE PROC dbo.GetUserInfoFromEmail
@InputEmail nvarchar(200)
AS
BEGIN
IF @InputEmail IS NULL
BEGIN
RAISERROR('NULL email address', 14, 1)
RETURN
END

IF NOT EXISTS (
SELECT * 
FROM dbo.Users 
WHERE email = @InputEmail
)
BEGIN
RAISERROR('No user with the provided email address', 14, 1)
RETURN
END

SELECT *
FROM dbo.Users u
WHERE email = @InputEmail
END
GO

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL AND OBJECT_ID('dbo.Users', 'U') IS NOT NULL
	ALTER TABLE dbo.Departments
	ADD CONSTRAINT FK__Department__uid__60A75C0F
	FOREIGN KEY (uid)
	REFERENCES dbo.Users (id);

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL AND OBJECT_ID('dbo.Users', 'U') IS NOT NULL
	ALTER TABLE dbo.PrintingProfiles
	ADD CONSTRAINT FK__PrintingPro__uid__693CA210
	FOREIGN KEY (uid)
	REFERENCES dbo.Users (id);

IF OBJECT_ID('dbo.PrintingProfiles', 'U') IS NOT NULL AND OBJECT_ID('dbo.PrintingProfiles', 'U') IS NOT NULL
	ALTER TABLE dbo.PrintJobs
	ADD CONSTRAINT FK__PrintJob__pid__6D0D32F4
	FOREIGN KEY (pid)
	REFERENCES dbo.PrintingProfiles (id);

IF OBJECT_ID('dbo.PrintOrders', 'U') IS NOT NULL AND OBJECT_ID('dbo.PrintOrders', 'U') IS NOT NULL
	ALTER TABLE dbo.PrintJobs
	ADD CONSTRAINT FK__PrintJob__oid__6C190EBB
	FOREIGN KEY (oid)
	REFERENCES dbo.PrintOrders (id);

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL AND OBJECT_ID('dbo.Users', 'U') IS NOT NULL
	ALTER TABLE dbo.PrintOrders
	ADD CONSTRAINT FK__PrintOrder__uid__6477ECF3
	FOREIGN KEY (uid)
	REFERENCES dbo.Users (id);

IF OBJECT_ID('dbo.Departments', 'U') IS NOT NULL AND OBJECT_ID('dbo.Departments', 'U') IS NOT NULL
	ALTER TABLE dbo.Templates
	ADD CONSTRAINT FK__Template__did__70DDC3D8
	FOREIGN KEY (did)
	REFERENCES dbo.Departments (id);
	
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL AND OBJECT_ID('dbo.Users', 'U') IS NOT NULL
	ALTER TABLE dbo.Templates
	ADD CONSTRAINT FK__Template__uid__6FE99F9F
	FOREIGN KEY (uid)
	REFERENCES dbo.Users (id);

IF OBJECT_ID('dbo.Departments', 'U') IS NOT NULL AND OBJECT_ID('dbo.Departments', 'U') IS NOT NULL
	ALTER TABLE dbo.Users
	ADD CONSTRAINT FK__User__default_di__619B8048
	FOREIGN KEY (default_did)
	REFERENCES dbo.Departments (id);