/****** Object:  StoredProcedure [dbo].[GetDepartment]    Script Date: 2/8/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/08/2026
-- Description:	get a department from the database by ID
-- =============================================
CREATE Or ALTER PROCEDURE dbo.GetDepartment
    @id Int
AS
BEGIN
    IF @id IS NULL
    BEGIN
        RAISERROR('NULL department ID', 14, 1)
        RETURN
    END

    IF NOT EXISTS (
        SELECT * 
        FROM dbo.Departments 
        WHERE id = @id
    )
    BEGIN
        RAISERROR('No department with the provided department ID', 14, 1)
        RETURN
    END

    SELECT id, name, FOPAL
    FROM dbo.Departments d
    WHERE id = @id
END
GO