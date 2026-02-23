USE [PrintShop_Chris]
GO
/****** Object:  StoredProcedure [dbo].[ListDepartment]    Script Date: 2/23/2026 1:00:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[ListDepartment]
	@uid int
AS

IF @uid IS NULL or @uid < 1
BEGIN
	RAISERROR('Invalid user ID input', 14, 1)
	RETURN
END

IF NOT EXISTS (SELECT * FROM "User" WHERE id = @uid)
BEGIN
	RAISERROR('No user with the provided userID', 14, 1)
	RETURN
END

BEGIN
	SELECT uid, name, FOPAL
	FROM Department
	WHERE uid = @uid
END
