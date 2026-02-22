/****** Object:  StoredProcedure [dbo].[ListPrintingProfile]    Script Date: 2/15/2026 1:22:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Zeen Wang
-- Create date: 02/15/2026
-- Description:	list printing profiles from the database by user ID
-- =============================================
CREATE Or ALTER PROCEDURE dbo.ListPrintingProfile
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

    SELECT id, name, is_color, double_sizing, paper_color, paper_size, distribution, binding
    FROM dbo.PrintingProfiles pp
    WHERE uid = @uid
END
GO

-- -- seed data
-- Insert Into PrintingProfiles (uid, name, is_color, double_sizing, paper_color, paper_size, distribution, binding)
-- Values (1, 'Profile 1', 1, 0, 'White', 'A4', 'Even', 'Staple')

-- Insert Into PrintingProfiles (uid, name, is_color, double_sizing, paper_color, paper_size, distribution, binding)
-- Values (1, 'Profile 2', 0, 1, 'Yellow', 'Letter', 'Odd', 'None')