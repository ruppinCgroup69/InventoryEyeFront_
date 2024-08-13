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

@id int =0

AS
BEGIN

	SET NOCOUNT ON;
	if @id=0
	SELECT * from PostView

	else
	SELECT * from PostView where (
	Category in (Select CategoryId
				from StoreCategories
				where StoreId in (select FavStore
									from Survey
									where UserId=@id) 
				UNION 
				Select Category
				from Category
				where Category in (Select FavCategory
									from Survey
									where UserId=@id))
	)

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
-- Description:	<Read All Stores>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadAllStores]


AS
BEGIN

	SET NOCOUNT ON;
	SELECT * from Store
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
-- Description:	<Read All Stock Levels>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadAllStockLevel]


AS
BEGIN

	SET NOCOUNT ON;
	SELECT * from StockLevel
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
-- Description:	<Read comments by comment Id>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadCommentsBycommentId]

@id int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentWiew]
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
-- Description:	<Read all Comments>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllComments]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT * from [CommentWiew] 
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
-- Description:	<Read Comments by PostId>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadCommentsByPostId]

@postId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentWiew]
WHERE [PostId] = @postId;
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
-- Description:	<Read Comment Score by Comment Id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadCommentsByUserId]

@userId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentWiew]
WHERE  [UserId]= @userId ;
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
-- Description:	<Read Comments by userId>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadCommentScoreByCommentId]

@commentId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentScore]
WHERE [CommentId] = @commentId ;
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
-- Description:	<Read Comments by Published User Id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadCommentScoreByPublishedUserId]

@publishedBy int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentScore]
WHERE [PublishedBy] = @publishedBy ;
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
-- Description:	<Read Comments by Rated By User Id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadCommentScoreByRatedByUserId]

@ratedBy int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[CommentScore]
WHERE [RatedBy] = @ratedBy ;
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
-- Description:	<Read all Weights>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllWeights]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT * from  [dbo].[Weights]
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
-- Description:	<Read all Store Categories>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllStoreCategories]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT * from  [dbo].[StoresWithCategoriesView]
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
-- Description:	<Read Store Categories By Category>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadStoreCategoriesByCategory]

@categoryId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[StoresWithCategoriesView]
WHERE [CategoryId] = @categoryId;
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
-- Description:	<Read Store Categories By Store id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadStoreCategoriesByStoreId]

@storeId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[StoresWithCategoriesView]
WHERE [StoreId] = @storeId;
END

-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <13-06-2024>
-- Description:	<Read Post by Search>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_ReadPostBySearch]

@string nvarchar(max)

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM PostView
WHERE [FullName] like CONCAT('%',@string,'%') or [Name] like CONCAT('%',@string,'%') or [Content]  like CONCAT('%',@string,'%') or [Tags] like CONCAT('%',@string,'%')
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
-- Description:	<Read All Survey>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllSurvey]

@id int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [Survey]
WHERE [UserId] = @id;
END
-- =============================================

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <13-06-2024>
-- Description:	<Read all Bonus>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadAllBonus]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT * from  [dbo].[BonusView]
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
-- Description:	<Read Bonus by min score>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadBonusByMinScore]

@minScore int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[BonusView]
WHERE [MinScore]=@minScore
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
-- Description:	<Read Bonus by category>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadBonusByCategory]

@category int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[BonusView]
WHERE [Category]=@category
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
-- Description:	<Read Bonus by user id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadBonusByUserId]

@userId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[BonusView]
WHERE [UserId]=@userId
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
-- Description:	<Read Bonus by bonus id>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_ReadBonusByBonusId]

@bonusId int

AS
BEGIN

	SET NOCOUNT ON;
SELECT *
FROM [dbo].[BonusView]
WHERE [BonusId]=@bonusId
END
