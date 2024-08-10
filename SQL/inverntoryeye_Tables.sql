Create TABLE [Users] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[Role] int NOT NULL,
	[LastSeen] date NOT NULL,
	[FullName] nvarchar(max) NOT NULL,
	[EmailAddress] nvarchar(255) NOT NULL UNIQUE,
	[Password] nvarchar (max) NOT NULL,
	[BirthDate] date NOT NULL,
	[Lat] float(53) NOT NULL,
	[Lng] float(53) NOT NULL,
	[Address] nvarchar(max) NOT NULL,
	[Image] nvarchar(max) NOT NULL,
	[CreatedAt] date NOT NULL,
	PRIMARY KEY ([Id])
);

CREATE TABLE [UserRoles] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[RoleDesc] nvarchar(max) NOT NULL,
	PRIMARY KEY ([Id])
);

CREATE TABLE [Post] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[UserId] int NOT NULL,
	[CreateAt] date NOT NULL,
	[EditedAt] datetime NOT NULL,
	[Name] nvarchar(max) NOT NULL,
	[Content] nvarchar(max) NOT NULL,
	[Image] nvarchar(max) NOT NULL,
	[Tags] nvarchar(max),
	[Category] int NOT NULL,
	[PickUpFromUser] nvarchar(max) NOT NULL DEFAULT 1,
	[PickUpLat] float(53),
	[PicUpLng] float(53),
	[PickUpAddress] nvarchar(max),
	PRIMARY KEY ([Id])
);

CREATE TABLE [Category] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[CategoryDesc] nvarchar(max) NOT NULL,
	[CategoryImage] nvarchar(max) NULL,
	PRIMARY KEY ([Id])
);

CREATE TABLE [Comments] (
	[PostId] int NOT NULL,
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[UserId] int NOT NULL,
	[CreatedAt] date NOT NULL,
	[EditedAt] date NOT NULL,
	[Content] nvarchar(max) NOT NULL,
	[InventoryEye] date,
	[StoreId] int,
	[StockId] int,
	[StoreLocation] nvarchar(max),
	[Bought] bit,
	[BoughtDate] date,
	[ProductQuality] int,
	[Satisfaction] int,
	PRIMARY KEY ([PostId], [Id])
);

CREATE TABLE [Store] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[StoreName] nvarchar(max) NOT NULL,
	PRIMARY KEY ([Id])
);

CREATE TABLE [StoreCategories] (
	[StoreId] int NOT NULL,
	[CategoryId] int NOT NULL,
	[IsActive] bit NOT NULL DEFAULT 1,
	PRIMARY KEY ([StoreId], [CategoryId])
);

CREATE TABLE [StockLevel] (
	[Id] int IDENTITY(1,1) NOT NULL UNIQUE,
	[StockDesc] nvarchar(max) NOT NULL,
	PRIMARY KEY ([Id])
);

CREATE TABLE [CommentScore] (
	[CommentId] int NOT NULL,
	[PublishedBy] int NOT NULL,
	[RatedBy] int NOT NULL,
	[GeneralScore] int NOT NULL,
	[Credibility] int NOT NULL,
	[Bought] bit NOT NULL DEFAULT 0,
	[Content] nvarchar(max),
	PRIMARY KEY ([CommentId], [PublishedBy], [RatedBy])
);

CREATE TABLE [Weights] (
	[GeneralWeight] int NOT NULL,
	[BoughtWeight] int NOT NULL,
	[CredibilityWeight] int NOT NULL
);

ALTER TABLE [Users] ADD CONSTRAINT [Users_fk1] FOREIGN KEY ([Role]) REFERENCES [UserRoles]([Id]);

ALTER TABLE [Post] ADD CONSTRAINT [Post_fk1] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]);

ALTER TABLE [Post] ADD CONSTRAINT [Post_fk8] FOREIGN KEY ([Category]) REFERENCES [Category]([Id]);

ALTER TABLE [Comments] ADD CONSTRAINT [Comments_fk0] FOREIGN KEY ([PostId]) REFERENCES [Post]([Id]);

ALTER TABLE [Comments] ADD CONSTRAINT [Comments_fk2] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]);

ALTER TABLE [Comments] ADD CONSTRAINT [Comments_fk7] FOREIGN KEY ([StoreId]) REFERENCES [Store]([Id]);

ALTER TABLE [Comments] ADD CONSTRAINT [Comments_fk8] FOREIGN KEY ([StockId]) REFERENCES [StockLevel]([Id]);

ALTER TABLE [StoreCategories] ADD CONSTRAINT [StoreCategories_fk0] FOREIGN KEY ([StoreId]) REFERENCES [Store]([Id]);

ALTER TABLE [StoreCategories] ADD CONSTRAINT [StoreCategories_fk1] FOREIGN KEY ([CategoryId]) REFERENCES [Category]([Id]);

ALTER TABLE [CommentScore] ADD CONSTRAINT [CommentScore_fk0] FOREIGN KEY ([CommentId]) REFERENCES [Comments]([Id]);

ALTER TABLE [CommentScore] ADD CONSTRAINT [CommentScore_fk1] FOREIGN KEY ([PublishedBy]) REFERENCES [Users]([Id]);

ALTER TABLE [CommentScore] ADD CONSTRAINT [CommentScore_fk2] FOREIGN KEY ([RatedBy]) REFERENCES [Users]([Id]);
