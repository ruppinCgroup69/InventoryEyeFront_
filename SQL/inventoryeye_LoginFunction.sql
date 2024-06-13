create function LoginUser(@email varchar(max), @password varchar(max))
returns table
as 
	return (
		select * from [UserView] where [EmailAddress]= (
			select [EmailAddress] from Users where [EmailAddress]=@email and [Password] = @password
		)
	)
go


