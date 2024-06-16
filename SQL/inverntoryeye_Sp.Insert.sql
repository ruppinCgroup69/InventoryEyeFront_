-- Insert

USE [igroup169_test2]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Yarden and Sharon>
-- Create date: <24/05/2024>
-- Description:	<Insert User>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertUser]
@role int,
@lastSeen date,
@fullName nvarchar(max),
@emailAddress nvarchar(255),
@birthDate date ,
@lat float(53),
@lng float(53),
@address nvarchar(max) ,
@image nvarchar(max),
@createdAt date,
@password nvarchar(max)

AS
BEGIN
	SET NOCOUNT ON;

	if exists (select EmailAddress from Users where EmailAddress = @emailAddress)
	begin
		return 0
	end

INSERT INTO Users ([Role],[LastSeen],[FullName],[EmailAddress],[BirthDate],[Lat],[Lng],[Address],[Image],[CreatedAt],[Password])
VALUES (@role,@lastSeen,@fullName,@emailAddress,@birthDate,@lat,@lng,@address,@image,@createdAt,@password);
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
-- Create date: <24/05/2024>
-- Description:	<Insert Comments>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertComments]

@userId int,
@createdAt date,
@editedAt date,
@content nvarchar(max),
@inventoryEye date,
@storeId int,
@stockId int,
@storeLocation nvarchar(max),
@bought bit,
@boughtDate date,
@productQuality int

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO Comments ([UserId],[CreatedAt],[EditedAt],[Content],[InventoryEye],[StoreId],[StockId],[StoreLocation],[Bought],[BoughtDate],[ProductQuality])
VALUES (@userId,@createdAt,@editedAt,@content,@inventoryEye,@storeId,@stockId,@storeLocation,@bought,@boughtDate,@productQuality);
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
-- Create date: <24/05/2024>
-- Description:	<Insert CommentScore>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_InsertCommentScore]

@commentId int,
@generalScore int,
@credibility int,
@bought bit,
@content nvarchar(max),
@publishdBy int

AS
BEGIN
	SET NOCOUNT ON;
declare @ratedBy int = (
	select [UserId] from [dbo].[Post] where [Id] = (
		select PostId from [dbo].[Comments] where [Id] = @commentId
	)
)
if(@ratedBy!=@publishdBy)
Begin
INSERT INTO CommentScore ([GeneralScore],[Credibility],[Bought],[Content],[PublishedBy],[RatedBy],[CommentId])
VALUES (@generalScore,@credibility,@bought,@content,@publishdBy,@ratedBy,@commentId);
return 1
End
else 
return -1
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
-- Description:	<Insert Post>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertPost]

	@userId int,
	@createAt date ,
	@editedAt datetime,
	@name nvarchar(max),
	@content nvarchar(max) ,
	@image nvarchar(max) ,
	@tags nvarchar (max),
	@category int ,
	@pickUpFromUser nvarchar(max),
	@pickUpLat float(53),
	@picUpLng float(53),
	@pickUpAddress nvarchar(max)

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO Post ([UserId],[CreateAt],[EditedAt],[Name],[Content],[Image],[Tags],[Category],[PickUpFromUser],[PickUpLat],[PicUpLng],[PickUpAddress])
VALUES (@userId,@createAt,@editedAt,@name,@content,@image,@tags,@category,@pickUpFromUser,@pickUpLat,@picUpLng,@pickUpAddress);
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
-- Create date: <02/06/2024>
-- Description:	<Insert Category>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertCategory]

@categoryDesc nvarchar (max)

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO Category(CategoryDesc)
VALUES (@categoryDesc);
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
-- Create date: <02/06/2024>
-- Description:	<Insert Store>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertStore]

@storeName nvarchar (max)

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO Store(StoreName)
VALUES (@storeName);
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
-- Create date: <02/06/2024>
-- Description:	<Insert Store Categories>
-- =============================================
Alter PROCEDURE [dbo].[SP_InEye_InsertStoreCategories]

@storeId int,
@categoryId int,
@isActive nvarchar (max)

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO StoreCategories([StoreId],[CategoryId],IsActive)
VALUES (@storeId,@categoryId,@isActive);
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
-- Create date: <02/06/2024>
-- Description:	<Insert StockLevel>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InEye_InsertStockLevel]

@stockDesc nvarchar (max)

AS
BEGIN
	SET NOCOUNT ON;

INSERT INTO StockLevel(StockDesc)
VALUES (@stockDesc);
return 1

END

-- =============================================