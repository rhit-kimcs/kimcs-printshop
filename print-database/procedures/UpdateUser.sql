/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 2/6/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	update a user in the database
-- =============================================
Create or ALTER PROCEDURE [dbo].[UpdateUser] 
	-- Add the parameters for the stored procedure here
	@id int,
	@first nvarchar(100),
	@last nvarchar(100),
	@phone nvarchar(20) = NULL,
	@did int = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if @id IS NULL
	BEGIN
		RAISERROR('Id cannot be null', 14, 1)
		RETURN
	END


	if Not EXISTS (
		SELECT id from [dbo].[Users] where id = @id
	)
	BEGIN
		RAISERROR('User does not exist', 14, 1)
		RETURN
	END

	if @did IS NOT NULL
	BEGIN
		IF NOT EXISTS (
			SELECT id from [dbo].[Departments] where id = @did and uid = @id
		)
		BEGIN
			RAISERROR('Department does not exist or does not belong to the user', 14, 1)
			RETURN
		END
	END
	


    -- Insert statements for procedure here
	update Users
	-- COALESCE will be used to pick the new value if provided, otherwise it will keep the existing value
	set first = COALESCE(@first, first), 
		last = COALESCE(@last, last), 
		phone = COALESCE(@phone, phone), 
		default_did = COALESCE(@did, default_did)
	where id = @id
	
	-- Return the result
	SELECT id, cid, first, last, email, phone, default_did
  	FROM dbo.Users
  	WHERE id = @id;
END
