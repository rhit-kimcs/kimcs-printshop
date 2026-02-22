USE [PrintShop]
GO
/****** Object:  StoredProcedure [dbo].[AddUser]    Script Date: 2/6/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Veronica Kleinschmidt
-- Create date: 02/05/2026
-- Description:	Adds a new user to the database
-- =============================================
ALTER PROCEDURE [dbo].[AddUser] 
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
END
