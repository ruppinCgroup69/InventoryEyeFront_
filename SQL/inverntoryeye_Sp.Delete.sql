-- Delete

USE [igroup169_test2]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <24/05/2024>
-- Description:	<Delete User>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteUser]

@emailAddress nvarchar(255)

AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @userId int;

    SELECT @userId = Id FROM Users WHERE EmailAddress = @emailAddress;

    IF @userId IS NULL
    BEGIN
        RETURN;
    END

    DELETE FROM Comments WHERE UserId = @userId;

    DELETE FROM Comments WHERE PostId IN (SELECT Id FROM Post WHERE UserId = @userId);

    DELETE FROM Post WHERE UserId = @userId;

	DELETE FROM Users WHERE Id = @userId;
	
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
-- Create date: <24/05/2024>
-- Description:	<Delete Comments>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteComments]

@id int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from Comments where Id = @id
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
-- Create date: <24/05/2024>
-- Description:	<Delete CommentScore>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteCommentScore]

@commentId int,
@ratedBy int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from CommentScore where [CommentId]=@commentId and [RatedBy]=@ratedBy
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
-- Create date: <24/05/2024>
-- Description:	<Delete Post>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeletePost]

@id int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from Comments where PostId = @id
	Delete from Post where Id=@id
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
-- Create date: <02/06/2024>
-- Description:	<Delete Category>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteCategory]

@id int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from Category where Id=@id
	Delete from StoreCategories where CategoryId = @id
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
-- Create date: <02/06/2024>
-- Description:	<Delete Store>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteStore]

@id int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from Store where Id=@id
	Delete from StoreCategories where StoreId = @id
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
-- Create date: <02/06/2024>
-- Description:	<Delete StoreCategories>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteStoreCategories]

@storeId int,
@categoryId int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from StoreCategories where [StoreId]=@storeId and [CategoryId]=@categoryId
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
-- Create date: <02/06/2024>
-- Description:	<Delete Store>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_DeleteStorckLevel]

@id int

AS
BEGIN
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Delete from StockLevel where Id=@id
END