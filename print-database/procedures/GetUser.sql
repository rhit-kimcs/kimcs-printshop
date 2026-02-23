USE [PrintShop_Chris]
GO
/****** Object:  StoredProcedure [dbo].[GetUser]    Script Date: 2/23/2026 12:43:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[GetUser]
	@inputID int
AS

IF @inputID IS NULL or @inputID < 1
BEGIN
	RAISERROR('Invalid user ID input', 14, 1)
	RETURN
END

IF NOT EXISTS (SELECT * FROM "User" WHERE id = @inputID)
BEGIN
	RAISERROR('No user with the provided userID', 14, 1)
	RETURN
END

BEGIN
	SELECT u.id, u.cid, u.first, u.last, u.email, u.phone_number, u.default_did, d.name, d.FOPAL
	FROM "User" as u
	LEFT JOIN Department as d ON u.id = d.uid
	WHERE u.id = @inputID AND @inputID = d.uid AND u.default_did = d.id
END
