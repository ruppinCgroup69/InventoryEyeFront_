-- Read
USE [igroup169_test2]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <13-06-2024>
-- Description:	<Read all users>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllUsers]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT * from [UserView] 
END

-- =============================================
USE [igroup169_test2]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <13-06-2024>
-- Description:	<Read user by id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadUserById]

@id int

AS
BEGIN

	SET NOCOUNT ON;
SELECT uv.*, u.[Password]
FROM [UserView] uv INNER JOIN [Users] u ON uv.[Id] = u.[Id]
WHERE uv.[Id] = @id;
END