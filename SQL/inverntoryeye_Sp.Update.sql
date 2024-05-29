-- Update

USE [igroup169_test2]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <25/04/2024>
-- Description:	<Update User>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_UpdateUser]
	@role int,
	@lastSeen date,
	@fullName nvarchar(max),
	@emailAddress nvarchar(255),
	@birthDate date ,
	@lat float(53),
	@lng float(53),
	@address nvarchar(max) ,
	@image nvarchar(max),
	@createdAt date

AS
BEGIN
	SET NOCOUNT ON;

	if not exists (select [EmailAddress] from Users where [EmailAddress] = @emailAddress)
	begin
		return 0
	end

    -- update statements for procedure here
	update Users set [Role]=@role,[LastSeen]=@lastSeen,[FullName]=@fullName,[EmailAddress]=@emailAddress,[BirthDate]=@birthDate,[Lat]=@lat,[Lng]=@lng,[Address]=@address,[Image]=@image,[CreatedAt]=@createdAt
	where [EmailAddress] = @emailAddress	   
	return 1
	
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
-- Create date: <25/04/2024>
-- Description:	<Update Comments>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_UpdateComments]

	@userId int,
	@createdAt date,
	@editedAt date,
	@content nvarchar(max),
	@inventoryEye date,
	@storeId int,
	@stockId int,
	@storeLocation nvarchar(max),
	@bought nvarchar(max),
	@boughtDate date,
	@productQuality int

AS
BEGIN
	SET NOCOUNT ON;

	if not exists (select [UserId] from Comments where [UserId] = @userId)
	begin
		return 0
	end

    -- update statements for procedure here
	update Comments set [EditedAt]=@editedAt,[Content]=@content,[InventoryEye]=@inventoryEye,[StoreId]=@storeId,[StockId]=@stockId,[StoreLocation]=@storeLocation,[Bought]=@bought,[BoughtDate]=@boughtDate,[ProductQuality]=@productQuality
	where [UserId] = @userId	   
	return 1
	
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
-- Create date: <25/04/2024>
-- Description:	<Update Post>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_UpdatePost]
    @userId int,
    @createAt date,
    @editedAt datetime,
    @name nvarchar(max),
    @content nvarchar(max),
    @image nvarchar(max),
    @tags nvarchar(max),
    @category int,
    @pickUpFromUser nvarchar(max),
    @pickUpLat float(53),
    @picUpLng float(53),
    @pickUpAddress nvarchar(max)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT [UserId] FROM Post WHERE [UserId] = @userId)
    BEGIN
        RETURN 0;
    END;

    -- Update statements for procedure here
    UPDATE Post
    SET [EditedAt] = @editedAt,
        [Name] = @name,
        [Content] = @content,
        [Image] = @image,
        [Tags] = @tags,
        [Category] = @category,
        [PickUpFromUser] = @pickUpFromUser,
        [PickUpLat] = @pickUpLat,
        [PicUpLng] = @picUpLng,
        [PickUpAddress] = @pickUpAddress
    WHERE [UserId] = @userId;

    RETURN 1;
END;

-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <25/04/2024>
-- Description:	<Update Post>
-- =============================================
CREATE PROCEDURE [dbo].[SP_InEye_UpdateCommentScore]

	@commentId INT, 
	@publishedBy INT, 
	@ratedBy INT,
	@content NVARCHAR(MAX)

AS
BEGIN
    SET NOCOUNT ON;

    -- Update statements for procedure here
    UPDATE CommentScore SET [Content] = @content
    
    WHERE [PublishedBy] = @publishedBy and  [RatedBy]= @ratedBy and [CommentId] = @commentId;

    RETURN 1;
END;