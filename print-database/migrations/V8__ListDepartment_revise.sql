/****** Object:  StoredProcedure [dbo].[ListDepartment]    Script Date: 2/8/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	list departments from the database by user ID
-- =============================================
CREATE Or ALTER PROCEDURE dbo.GetDepartment
    @uid Int
AS
BEGIN
    IF @uid IS NULL
    BEGIN
        RAISERROR('NULL user ID', 14, 1)
        RETURN
    END

    IF NOT EXISTS (
        SELECT * 
        FROM dbo.Users 
        WHERE id = @uid
    )
    BEGIN
        RAISERROR('No user with the provided user ID', 14, 1)
        RETURN
    END

    SELECT id, name, FOPAL
    FROM dbo.Departments d
    WHERE uid = @uid
END
GO