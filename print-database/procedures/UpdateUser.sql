USE [PrintShop_Chris]
GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 2/23/2026 3:19:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[UpdateUser]
	@uid int, @cid nvarchar(100), @fname nvarchar(100), @lname nvarchar(100), 
	@email nvarchar(200), @phone_number nvarchar(20), @department_name nvarchar(100), @FOPAL nvarchar(100)
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

IF EXISTS (SELECT * FROM Department WHERE uid = @uid AND name = @department_name)
BEGIN
	UPDATE Department
	SET FOPAL = @FOPAL
	WHERE uid = @uid AND name = @department_name
END

BEGIN
	BEGIN
		DECLARE @d_did int
		SELECT @d_did = id
		FROM Department
		WHERE uid = @uid AND name = @department_name AND FOPAL = @FOPAL

		UPDATE "User"
		SET cid = @cid, first = @fname, last = @lname,
		email = @email, phone_number = @phone_number, 
		default_did = @d_did
		WHERE id = @uid
	END
END
