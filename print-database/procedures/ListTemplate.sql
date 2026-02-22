/****** Object:  StoredProcedure [dbo].[ListTemplate]    Script Date: 2/8/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	list print templates from the database by user ID
-- =============================================
CREATE Or ALTER PROCEDURE dbo.ListTemplate
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
        WHERE id = @id
    )
    BEGIN
        RAISERROR('No user with the provided user ID', 14, 1)
        RETURN
    END

    SELECT id, name, departmentId, FOPAL
    FROM dbo.Template pt
    JOIN dbo.Departments d ON pt.departmentId = d.id
    WHERE uid = @uid
END
GO