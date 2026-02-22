/****** Object:  StoredProcedure [dbo].[UpdateUserProfile]    Script Date: 2/6/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	update a user profile in the database
-- =============================================
Create or ALTER PROCEDURE [dbo].[UpdateUserProfile] 
	-- Add the parameters for the stored procedure here
	@id int,
	@first nvarchar(100),
	@last nvarchar(100),
	@phone nvarchar(20) = NULL,
    @department nvarchar(100) = NULL,
	@FOPAL nvarchar(100) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if @id  IS NULL
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

    DECLARE @did int;

    if @department IS NULL AND @FOPAL IS NULL
    BEGIN
        SET @did = NULL
    END
    ELSE IF @department IS NULL OR @FOPAL IS NULL
    BEGIN
        RAISERROR('Both department and FOPAL must be provided together', 14, 1)
        RETURN
    END
    ELSE
    BEGIN
        -- Check if the department already exists for the user, if not create it
        SELECT @did = id FROM [dbo].[Departments] WHERE name = @department AND FOPAL = @FOPAL AND uid = @id
        IF @did IS NULL
        BEGIN
            INSERT INTO [dbo].[Departments] (name, FOPAL, uid) VALUES (@department, @FOPAL, @id)
            SET @did = SCOPE_IDENTITY()
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
