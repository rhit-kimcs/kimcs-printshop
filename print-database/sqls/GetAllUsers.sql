USE [PrintShop]
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]    Script Date: 2/6/2026 1:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[GetAllUsers]
AS
SELECT *
FROm dbo.Users
