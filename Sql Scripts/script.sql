USE [master]
GO
/****** Object:  Database [GymManagement]    Script Date: 5/12/2020 5:15:28 PM ******/
CREATE DATABASE [GymManagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Gym management', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Gym management.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Gym management_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Gym management_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GymManagement] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GymManagement].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GymManagement] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GymManagement] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GymManagement] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GymManagement] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GymManagement] SET ARITHABORT OFF 
GO
ALTER DATABASE [GymManagement] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GymManagement] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GymManagement] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GymManagement] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GymManagement] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GymManagement] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GymManagement] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GymManagement] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GymManagement] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GymManagement] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GymManagement] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GymManagement] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GymManagement] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GymManagement] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GymManagement] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GymManagement] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GymManagement] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GymManagement] SET RECOVERY FULL 
GO
ALTER DATABASE [GymManagement] SET  MULTI_USER 
GO
ALTER DATABASE [GymManagement] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GymManagement] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GymManagement] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GymManagement] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GymManagement] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GymManagement', N'ON'
GO
ALTER DATABASE [GymManagement] SET QUERY_STORE = OFF
GO
USE [GymManagement]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CodeMember] [nchar](10) NOT NULL,
	[FullName] [nvarchar](250) NOT NULL,
	[DOB] [date] NOT NULL,
	[Address] [nvarchar](500) NOT NULL,
	[RegistrationDate] [datetime] NOT NULL,
	[ExpirationDate] [date] NULL,
	[NumberTraining] [int] NULL,
	[NumberRemaining] [int] NULL,
	[Status] [bit] NULL,
	[IsDelete] [bit] NULL,
	[Image] [nvarchar](max) NULL,
	[TimeIn] [datetime] NOT NULL,
	[TimeOut] [datetime] NULL,
	[SpaceTime] [datetime] NULL,
	[Age] [int] NULL,
	[TypeOfSeviceId] [int] NOT NULL,
	[PhoneNumber] [int] NOT NULL,
	[Email] [nchar](100) NULL,
	[Sex] [bit] NOT NULL,
	[FixDate] [datetime] NULL,
	[DeletedDate] [datetime] NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeOfService]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeOfService](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Money] [int] NULL,
 CONSTRAINT [PK_TypeOfService] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Member]  WITH CHECK ADD  CONSTRAINT [FK_Member_TypeOfService] FOREIGN KEY([TypeOfSeviceId])
REFERENCES [dbo].[TypeOfService] ([Id])
GO
ALTER TABLE [dbo].[Member] CHECK CONSTRAINT [FK_Member_TypeOfService]
GO
/****** Object:  StoredProcedure [dbo].[CreateOrUpdateTypeOfService]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CreateOrUpdateTypeOfService]
	-- Add the parameters for the stored procedure here
	@Id int = 0,
       @Name varchar(250),
       @Money int = null
      
AS
declare @Return int = 0
BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	IF @Id = 0
    -- Insert statements for procedure here
	begin
	INSERT INTO TypeOfService
              (Id, Name, Money)
       VALUES
              (@Id, @Name, @Money)
	SET @Return = 1
	end
	else
	begin
	UPDATE TypeOfService SET Name = @Name, Money = @Money
              WHERE Id =@Id	
			  
			  set @Return = 2	
	end

	select @Return As Retrun
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteTypeOfServiceById]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteTypeOfServiceById]
	-- Add the parameters for the stored procedure here
	@Id int 
            
AS
declare @Return int = 0
BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		
	Delete TypeOfService 
	WHERE Id =@Id 

	Set @Return = 1 

	Select @Return as ReturnValue

END
GO
/****** Object:  StoredProcedure [dbo].[GetTypeOfServiceAll]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTypeOfServiceAll]
	-- Add the parameters for the stored procedure here
	
            
AS

BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		
	Select * from TypeOfService


END
GO
/****** Object:  StoredProcedure [dbo].[GetTypeOfServiceById]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTypeOfServiceById]
	-- Add the parameters for the stored procedure here
	@Id int 
            
AS

BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		
	Select * from TypeOfService 
	WHERE Id =@Id 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateOrUpdateMember]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_CreateOrUpdateMember]
	-- Add the parameters for the stored procedure here
		@Id int = 0,
		@CodeMember nchar(10),
		@FullName nvarchar(250),
		@DOB date,
		@Address nvarchar(500),
		@RegistrationDate datetime,
		@ExpirationDate date,
		@Status bit,
		@IsDelete bit,
		@Image nvarchar(max),
		@TimeIn datetime,
		@TimeOut datetime,
		@SpaceTime datetime,
		@PhoneNumber int,
		@Email nchar(100),
		@Sex bit,
		@TypeOfSeviceId int

AS

BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	IF @Id = 0
    -- Insert statements for procedure here
	begin
	INSERT INTO Member
              ( 
			  [CodeMember],
			  [FullName],
			  [DOB],
			  [Address],
			  [RegistrationDate],
			  [ExpirationDate],
			  [Status],
			  [IsDelete],
			  Image,
			  [PhoneNumber],
			  [Email],
			  [Sex],
			[TypeOfSeviceId]
			  )
       VALUES
              (
			  @CodeMember,
			  @FullName,
			  @DOB,
			  @Address,
			  @RegistrationDate,
			  @ExpirationDate,
			  @Status,
			  0,
			  @Image,
			  @PhoneNumber,
			  @Email,
			  @Sex,
			  @TypeOfSeviceId
			  )
		DECLARE @IdMember INT
		SET @IdMember = SCOPE_IDENTITY()
		SELECT @IdMember AS Id

	end
	else
	begin
		UPDATE Member
		 SET [FullName] = @FullName,
			  [DOB] = @DOB,
			  [Address] = @Address ,
			  [RegistrationDate] = @RegistrationDate,
			  [ExpirationDate] = @ExpirationDate,
			  [Status] =  @Status,
			  [PhoneNumber] = @PhoneNumber,
			  [Email] = @Email,
			  [Sex] = @Sex,
			  TypeOfSeviceId= @TypeOfSeviceId,
			  [FixDate]=GETDATE()

		WHERE Id = @Id

		SELECT @Id AS Id
	end

END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteMenberById]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		quanmb
-- Create date: 12/5/2022
-- Description: Delete member by id
-- =============================================
CREATE PROCEDURE [dbo].[sp_DeleteMenberById]
	-- Add the parameters for the stored procedure here
	@Id int 
            
AS

BEGIN	
		DECLARE @Result BIT = 0

	BEGIN TRY
		UPDATE Member
		   SET IsDelete = 1,
			[DeletedDate] = GETDATE()
		WHERE Id = @Id

		SET @Result = 1
	END TRY
	BEGIN CATCH
	END CATCH
	
	Select @Result as Result

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllMember]    Script Date: 5/12/2020 5:15:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		quanmb
-- Create date: 11/5/2020
-- Description:	get All Member
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAllMember]
	-- Add the parameters for the stored procedure here       
	@Statistical bit = 0
AS

BEGIN
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		
	Select  m.FullName,
	m.CodeMember,
	(CASE
	WHEN m.Sex = 0 THEN 'Nữ'       
        ELSE 'Nam'
     END) As Sex,
	m.Address,
	m.DOB,
	m.Image,
	m.RegistrationDate,
	m.ExpirationDate,
	(CASE
	WHEN m.Status = 0 THEN 'Không Hoạt Động'       
        ELSE 'Đang Hoạt Động'
     END)As Status,
	m.PhoneNumber,
	m.Email,
	tos.Name
	
	from Member m join TypeOfService tos
	on m.TypeOfSeviceId= tos.Id and
	m.IsDelete = 0

END
GO
USE [master]
GO
ALTER DATABASE [GymManagement] SET  READ_WRITE 
GO
