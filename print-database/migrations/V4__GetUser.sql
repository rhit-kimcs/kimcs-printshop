/****** Object:  StoredProcedure [dbo].[GetUser]    Script Date: 2/8/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	get a user from the database by ID
-- =============================================
CREATE Or ALTER PROCEDURE dbo.GetUser
    @id Int
AS
BEGIN
    IF @id IS NULL
    BEGIN
        RAISERROR('NULL user ID', 14, 1)
        RETURN
    END

    IF NOT EXISTS (
        SELECT * 
        FROM dbo.Users 
        WHERE id = @id
    )
    BEGIN
        RAISERROR('No user with the provided user ID', 14, 1)
        RETURN
    END

    SELECT id, cid,  first, last, email, phone, default_did
    FROM dbo.Users u
    WHERE id = @id
END
GO