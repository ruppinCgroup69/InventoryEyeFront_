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
-- Description:	<Read All Categories>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadAllCategories]


AS
BEGIN

	SET NOCOUNT ON;
	SELECT * from Category 
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
-- Description:	<Read All Posts>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadAllPosts]


AS
BEGIN

	SET NOCOUNT ON;
	SELECT * from PostView
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
-- Description:	<Read posts by post id>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadPostsByPostId]

@id int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [PostView]
WHERE [Id] = @id;
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
-- Description:	<Read posts by category>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadPostsByCategory]

@categoryId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [PostView]
WHERE [Category] = @categoryId;
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
-- Description:	<Read posts by userId>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadPostsByUserId]

@userId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [PostView]
WHERE  [UserId]= @userId ;
END
