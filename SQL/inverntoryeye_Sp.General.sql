
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Yarden And Sharon>
-- Create date: <Create Date,02/06/2024,>
-- Description:	<Description,SP_Login>
-- =============================================
CREATE PROCEDURE SP_InEye_Login
	-- Add the parameters for the stored procedure here
@email nvarchar,
@password nvarchar

AS
BEGIN

if exists (select * from Users where [EmailAddress]=@email and [Password] = @password)
	select * from [UserView] where [EmailAddress]=@email
END
GO

