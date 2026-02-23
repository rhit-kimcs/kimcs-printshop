USE [PrintShop_Chris]
GO
/****** Object:  StoredProcedure [dbo].[AddDepartment]    Script Date: 2/23/2026 1:00:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[AddDepartment]
	@UserID int, @DepartmentName nvarchar(100), @FOPAL nvarchar(100)
AS

IF @DepartmentName IS NULL OR @FOPAL IS NULL
BEGIN
	RAISERROR('NULL values detected', 14, 1)
	RETURN
END

IF NOT EXISTS (SELECT * FROM Department WHERE uid = 1 AND name = @DepartmentName AND FOPAL = @FOPAL)
BEGIN
	INSERT INTO Department (uid, name, FOPAL)
	VALUES (@UserID, @DepartmentName, @FOPAL)
END
