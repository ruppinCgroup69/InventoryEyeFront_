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
    -- Insert statements for procedure here
	Delete from Users where [EmailAddress] = @emailAddress
	
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
	Delete from Post where Id=@id
	Delete from Comments where PostId = @id
END