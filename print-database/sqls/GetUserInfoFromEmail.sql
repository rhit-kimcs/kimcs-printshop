USE PrintShop
GO
CREATE PROC dbo.GetUserInfoFromEmail
    @InputEmail nvarchar(200)
AS
BEGIN
    IF @InputEmail IS NULL
    BEGIN
        RAISERROR('NULL email address', 14, 1)
        RETURN
    END

    IF NOT EXISTS (
        SELECT * 
        FROM dbo.Users 
        WHERE email = @InputEmail
    )
    BEGIN
        RAISERROR('No user with the provided email address', 14, 1)
        RETURN
    END

    SELECT *
    FROM dbo.Users u
    WHERE email = @InputEmail
END
GO