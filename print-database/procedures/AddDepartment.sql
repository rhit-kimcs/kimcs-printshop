USE PrintShop_Chris
GO

CREATE PROC dbo.AddDepartment
	@DepartmentName nvarchar(100), @FOPAL nvarchar(100)
AS

IF @DepartmentName IS NULL OR @FOPAL IS NULL
BEGIN
	RAISERROR('NULL values detected', 14, 1)
	RETURN
END

IF NOT EXISTS (SELECT * FROM Department WHERE uid = 1 AND name = @DepartmentName AND FOPAL = @FOPAL)
BEGIN
	INSERT INTO Department (uid, name, FOPAL)
	VALUES (1, @DepartmentName, @FOPAL)
END
GO