-- Score Function

Create Function CalcUserScore(@userId int)
returns int
Begin
	declare @generalAvg float=(select AVG ([GeneralScore]) from [CommentScore] where PublishedBy=@userId)
	declare @credabilityAvg float=(select AVG ([Credibility]) from [CommentScore] where PublishedBy=@userId)
	declare @bought int =(select Count ([Bought]) from [CommentScore] where PublishedBy=@userId and Bought=1)
	declare @generalWeight float =(select [GeneralWeight] from Weights)/100
	declare @credabilityWeight float =(select [CredibilityWeight] from Weights)/100
	declare @boughtWeight float =(select [BoughtWeight] from Weights)/100
	declare @score int =(@generalAvg*@generalWeight+@credabilityAvg*@credabilityWeight+@bought*@boughtWeight)
	return @score
End
Go